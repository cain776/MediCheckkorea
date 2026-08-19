package kr.or.kmtpa.medicheck.config;

import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 거르기 값의 두 이름.
 *
 * <p>진료과목·지역·응대 언어는 자료에 한 언어로만 들어 있다. 화면이 그걸 그대로 쓰면
 * 어느 쪽 언어에서도 섞여 보인다 — 한국어 화면에 'Plastic surgery', 영어 화면에 '강남구'.
 *
 * <p>화면마다 사전을 들고 있으면 넷이 어긋난다. 한 번 받아 앱 전체가 나눠 쓴다.
 * 어느 화면에도 속하지 않는 것이라 도메인 패키지가 아니라 여기 둔다.
 */
@RestController
public class LabelController {

    private final JdbcTemplate jdbc;

    public LabelController(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @GetMapping("/api/labels")
    public Map<String, Map<String, Map<String, String>>> labels() {
        Map<String, Map<String, Map<String, String>>> byKind = new LinkedHashMap<>();
        jdbc.query(
                "SELECT kind, code, name_en, name_ko FROM label ORDER BY kind, code",
                rs -> {
                    byKind
                            .computeIfAbsent(rs.getString("kind"), key -> new LinkedHashMap<>())
                            .put(
                                    rs.getString("code"),
                                    Map.of("en", rs.getString("name_en"), "ko", rs.getString("name_ko")));
                });
        return byKind;
    }
}
