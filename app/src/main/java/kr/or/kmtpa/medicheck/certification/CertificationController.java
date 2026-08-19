package kr.or.kmtpa.medicheck.certification;

import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * "About certification" — 배지가 무슨 뜻인지 설명하는 곳.
 *
 * <p>28장이 이 페이지를 이 사이트에서 가장 중요한 한 장이라고 했다. 배지를 보여 주기만 하고
 * 뜻을 설명하지 않으면 해외 환자에게는 모르는 도장이기 때문이다.
 *
 * <p><b>하차 기록이 같은 응답에 담긴다.</b> 따로 두면 아무도 안 본다. 4장의
 * "탈락이 한 번도 없는 인증은 아무도 믿지 않는다"가 지켜지는지 밖에서 확인할 수 있는
 * 유일한 자리이므로, 설명과 같은 화면에 있어야 한다.
 */
@RestController
public class CertificationController {

    private final JdbcTemplate jdbc;

    public CertificationController(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @GetMapping("/api/certification")
    public Map<String, Object> certification() {
        Map<String, Object> body = new LinkedHashMap<>();
        // 근거마다 확인한 것이 다르다. 한 목록으로 합치면 서울시 목록을 근거로 올라온
        // 기관에까지 '보건복지부 등록을 확인했다'가 붙는다.
        body.put("checkedByMohw", scope("CHECKED", "MOHW"));
        body.put("checkedBySeoul", scope("CHECKED", "SEOUL"));
        // 확인하지 않은 것은 근거와 무관하게 같다.
        body.put("notChecked", scope("NOT_CHECKED", "ANY"));
        // 근거마다 지금 몇 곳이 서 있는지. 보건복지부 등록이 0 곳인 것을 감추지 않는다 —
        // 근거를 설명해 놓고 실제로는 아무도 그 위에 서 있지 않다면, 그 사실이
        // 설명만큼 중요하다. 협회가 등록부를 조회해 채우면 이 수가 오른다.
        body.put("standingOn", standingOn());
        body.put("removals", removals());
        // 메디체크 인증 — 아직 시행하지 않는다. 정의만 있고 등급이 붙은 기관은 0곳이다.
        // 그 사실을 감추면 화면이 있는 제도를 있는 것처럼 말하게 된다(26장).
        body.put("grades", grades());
        body.put("axes", axes());
        body.put("graded", 0);
        return body;
    }

    private java.util.List<Map<String, Object>> grades() {
        return jdbc.query(
                """
                SELECT code, name_en, name_ko, score_from, percentile, dot, bg, ink
                FROM medicheck_grade ORDER BY sort_no
                """,
                (rs, rowNum) -> {
                    Map<String, Object> row = new LinkedHashMap<>();
                    row.put("code", rs.getString("code"));
                    row.put("en", rs.getString("name_en"));
                    row.put("ko", rs.getString("name_ko"));
                    row.put("scoreFrom", rs.getInt("score_from"));
                    row.put("percentile", rs.getString("percentile"));
                    row.put("dot", rs.getString("dot"));
                    row.put("bg", rs.getString("bg"));
                    row.put("ink", rs.getString("ink"));
                    return row;
                });
    }

    private java.util.List<Map<String, Object>> axes() {
        return jdbc.query(
                """
                SELECT code, name_en, name_ko, points, floor,
                       fear_en, fear_ko, looks_en, looks_ko, evidence_en, evidence_ko
                FROM medicheck_axis ORDER BY sort_no
                """,
                (rs, rowNum) -> {
                    Map<String, Object> row = new LinkedHashMap<>();
                    row.put("code", rs.getString("code"));
                    row.put("en", rs.getString("name_en"));
                    row.put("ko", rs.getString("name_ko"));
                    row.put("points", rs.getInt("points"));
                    row.put("floor", rs.getInt("floor"));
                    row.put("fearEn", rs.getString("fear_en"));
                    row.put("fearKo", rs.getString("fear_ko"));
                    row.put("looksEn", rs.getString("looks_en"));
                    row.put("looksKo", rs.getString("looks_ko"));
                    row.put("evidenceEn", rs.getString("evidence_en"));
                    row.put("evidenceKo", rs.getString("evidence_ko"));
                    return row;
                });
    }

    private Map<String, Object> standingOn() {
        Map<String, Object> counts = new LinkedHashMap<>();
        counts.put("MOHW", 0L);
        counts.put("SEOUL", 0L);
        jdbc.query(
                """
                SELECT l.source, COUNT(*) AS n
                FROM member_corp c JOIN medicheck_listing l ON l.member_id = c.member_id
                WHERE l.listed = 1 AND c.org_type <> 'AGENCY'
                GROUP BY l.source
                """,
                rs -> {
                    counts.put(rs.getString("source"), rs.getLong("n"));
                });
        return counts;
    }

    private java.util.List<Map<String, Object>> scope(String kind, String source) {
        return jdbc.query(
                """
                SELECT item_en, item_ko FROM certification_scope
                WHERE kind = ? AND source = ? ORDER BY sort_no
                """,
                (rs, rowNum) -> Map.of("en", rs.getString("item_en"), "ko", rs.getString("item_ko")),
                kind,
                source);
    }

    /**
     * 내려간 목록. 사유는 낱말 하나로만 나간다.
     *
     * <p>설명을 붙이면 협회가 그 기관을 평가하는 문장이 되고, 그건 다툼이 된다(28장).
     * 그래서 표에도 CHECK 로 네 낱말만 들어가게 묶어 두었다.
     */
    private java.util.List<Map<String, Object>> removals() {
        return jdbc.query(
                """
                SELECT org_name_en, listed_from, listed_to, reason
                FROM medicheck_removal ORDER BY listed_to DESC
                """,
                (rs, rowNum) -> {
                    Map<String, Object> row = new LinkedHashMap<>();
                    row.put("nameEn", rs.getString("org_name_en"));
                    row.put("listedFrom", rs.getString("listed_from"));
                    row.put("listedTo", rs.getString("listed_to"));
                    row.put("reason", rs.getString("reason"));
                    return row;
                });
    }
}
