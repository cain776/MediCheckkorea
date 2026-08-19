package kr.or.kmtpa.medicheck.consultation;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * "Online consultation" — 기관을 정하지 않은 사람이 협회에 묻는 자리.
 *
 * <p>「Send an inquiry」와 헷갈리기 쉬워서 선을 그어 둔다. 문의는 <b>한 기관에게</b>
 * 보내는 것이고 회신은 협회를 거치지 않는다(5장). 이 게시판은 <b>협회 사무국에게</b>
 * 묻는 것이고, 물음과 답이 목록으로 남아 다음 사람이 읽는다.
 *
 * <p><b>답한 것과 답하지 않은 것을 함께 내려보낸다.</b> 답이 달린 글만 보여 주면
 * 게시판이 실제보다 부지런해 보이고, 그것은 4장이 금지한 종류의 꾸밈이다.
 * 대기중이 몇 건인지도 세어 내려보낸다.
 *
 * <p>지금 표에 있는 글은 전부 샘플이다(V12). 화면이 그 사실을 맨 위에 적을 수 있도록
 * {@code sample} 수를 함께 내려보낸다 — 화면이 스스로 판단하게 두면 언젠가 그 판단이
 * 빠지고 샘플이 진짜처럼 열린다.
 */
@RestController
public class ConsultationController {

    private final JdbcTemplate jdbc;

    public ConsultationController(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @GetMapping("/api/consultations")
    public Map<String, Object> consultations() {
        List<Map<String, Object>> posts = jdbc.query(
                """
                SELECT post_no, lang, author_masked, title, question,
                       answer, answered_by, created_at, answered_at, is_sample
                FROM consultation_post
                ORDER BY post_no DESC
                """,
                (rs, rowNum) -> {
                    Map<String, Object> row = new LinkedHashMap<>();
                    row.put("no", rs.getInt("post_no"));
                    row.put("lang", rs.getString("lang"));
                    row.put("author", rs.getString("author_masked"));
                    row.put("title", rs.getString("title"));
                    row.put("question", rs.getString("question"));
                    // 답이 없으면 null 이다. 화면은 이 값 하나로 '대기중'과 '답변완료'를
                    // 가른다 — 상태를 따로 저장하면 둘이 어긋난다
                    row.put("answer", rs.getString("answer"));
                    row.put("answeredBy", rs.getString("answered_by"));
                    row.put("createdAt", rs.getString("created_at"));
                    row.put("answeredAt", rs.getString("answered_at"));
                    row.put("sample", rs.getInt("is_sample") == 1);
                    return row;
                });

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("posts", posts);
        body.put("total", posts.size());
        body.put("answered", posts.stream().filter(p -> p.get("answer") != null).count());
        body.put("waiting", posts.stream().filter(p -> p.get("answer") == null).count());
        body.put("sample", posts.stream().filter(p -> Boolean.TRUE.equals(p.get("sample"))).count());
        return body;
    }
}
