package kr.or.kmtpa.medicheck.inquiry;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

/** 문의를 받아 기관에 넘기고, 전달·회신 두 시각을 남긴다. */
@Service
public class InquiryService {

    private static final DateTimeFormatter TIMESTAMP = DateTimeFormatter.ISO_OFFSET_DATE_TIME;
    private static final SecureRandom RANDOM = new SecureRandom();

    /** 27장 — 응대 언어는 둘뿐이다. 목록에 없는 언어는 안 받는다(14장). */
    private static final List<String> LANGUAGES = List.of("en", "ko");

    private final JdbcTemplate jdbc;
    private final int replyBusinessDays;
    private final RateLimiter rateLimiter = new RateLimiter();

    public InquiryService(JdbcTemplate jdbc, @Value("${medicheck.reply-business-days:3}") int replyBusinessDays) {
        this.jdbc = jdbc;
        this.replyBusinessDays = replyBusinessDays;
    }

    @Transactional
    public Map<String, Object> create(Map<String, Object> body, String remoteAddress) {
        rateLimiter.check(remoteAddress);

        String name = required(body, "name");
        String email = required(body, "email");
        String hospitalId = required(body, "hospitalId");
        String message = required(body, "message");

        // 동의 없이는 받지 않는다. 무엇에 동의하는지는 화면이 문장으로 적는다(27장).
        if (!Boolean.TRUE.equals(body.get("consentPrivacy"))) {
            throw badRequest("consentPrivacy is required");
        }

        String hospitalName = hospitalNameOrReject(hospitalId);

        String language = optional(body, "language");
        if (language == null || !LANGUAGES.contains(language)) {
            language = "en";
        }

        String now = OffsetDateTime.now(ZoneOffset.UTC).format(TIMESTAMP);
        String token = newToken();

        // 1단계에서 '전달'은 담당자 메일이다. 기관 쪽 문의함은 2단계에 생긴다(5장).
        // 메일을 실제로 쏘는 자리가 여기지만 지금은 붙일 메일 서버가 없다 —
        // 전달 시각만 남기고, 메일 발송은 2단계에서 이 줄 옆에 붙는다.
        String forwardedAt = now;

        jdbc.update(
                """
                INSERT INTO consultation
                  (name, email, phone, country, specialty, message, preferred_month, has_records,
                   consent_privacy, created_at, hospital_member_id, source_site, language,
                   forwarded_at, replied_at, reply_token)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, 'medicheck', ?, ?, NULL, ?)
                """,
                name,
                email,
                optional(body, "phone"),
                optional(body, "country"),
                optional(body, "specialty"),
                message,
                optional(body, "preferredMonth"),
                Boolean.TRUE.equals(body.get("hasRecords")) ? 1 : 0,
                now,
                hospitalId,
                language,
                forwardedAt,
                token);

        Long id = jdbc.queryForObject("SELECT last_insert_rowid()", Long.class);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("id", id);
        result.put("hospitalName", hospitalName);
        result.put("forwardedAt", forwardedAt);
        // 화면이 "3영업일 안에" 라고 적는 그 숫자다. 화면에 적은 기한과 실제 관리
        // 기한이 달라지면 그 사이 동안 사이트가 거짓말을 하게 되므로 한 곳에서 내려 준다(27장).
        result.put("replyBusinessDays", replyBusinessDays);
        return result;
    }

    @Transactional
    public boolean markReplied(long id, String token) {
        String now = OffsetDateTime.now(ZoneOffset.UTC).format(TIMESTAMP);
        // 이미 표시된 건은 시각을 덮어쓰지 않는다 — 처음 답한 때가 관리에 쓰이는 값이다.
        return jdbc.update(
                        "UPDATE consultation SET replied_at = ? WHERE id = ? AND reply_token = ? AND replied_at IS NULL",
                        now, id, token)
                == 1;
    }

    private String hospitalNameOrReject(String hospitalId) {
        List<String> found = jdbc.queryForList(
                """
                SELECT c.org_name_en FROM member_corp c
                JOIN medicheck_listing l ON l.member_id = c.member_id
                WHERE c.member_id = ?
                  AND l.listed = 1
                  AND c.promotion_reg_no IS NOT NULL AND c.promotion_reg_no <> ''
                """,
                String.class,
                hospitalId);
        if (found.isEmpty()) {
            // 등재되지 않은 기관으로는 문의를 만들 수 없다. 받을 곳 없는 문의가 생긴다(27장).
            throw badRequest("hospitalId is not a listed hospital");
        }
        return found.get(0);
    }

    private static String newToken() {
        byte[] bytes = new byte[24];
        RANDOM.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private static String required(Map<String, Object> body, String key) {
        String value = optional(body, key);
        if (value == null) {
            throw badRequest(key + " is required");
        }
        return value;
    }

    private static String optional(Map<String, Object> body, String key) {
        Object value = body.get(key);
        if (value == null) {
            return null;
        }
        String text = value.toString().trim();
        return text.isEmpty() ? null : text;
    }

    private static ResponseStatusException badRequest(String message) {
        return new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
    }

    /**
     * 주소 하나가 짧은 시간에 몰아 넣는 것만 막는다.
     *
     * <p>협회 쪽은 {@code AuthenticationRateLimiter} 가 같은 일을 한다. 여기서 그걸
     * 가져다 쓰지 않고 작게 다시 둔 이유는 이 앱이 아직 혼자 서기 때문이다 —
     * 협회 시스템과 합칠 때 이 클래스를 지우고 그쪽을 부른다.
     */
    static final class RateLimiter {

        private static final int LIMIT = 10;
        private static final Duration WINDOW = Duration.ofMinutes(10);

        private final Map<String, Window> windows = new ConcurrentHashMap<>();

        void check(String address) {
            String key = address == null ? "unknown" : address;
            Instant now = Instant.now();
            Window window = windows.compute(key, (ignored, current) -> {
                if (current == null || now.isAfter(current.startedAt.plus(WINDOW))) {
                    return new Window(now, 1);
                }
                return new Window(current.startedAt, current.count + 1);
            });
            if (window.count > LIMIT) {
                throw new ResponseStatusException(
                        HttpStatus.TOO_MANY_REQUESTS, "too many inquiries from this address — try again later");
            }
        }

        private record Window(Instant startedAt, int count) {}
    }
}
