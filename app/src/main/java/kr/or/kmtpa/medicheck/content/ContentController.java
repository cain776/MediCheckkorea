package kr.or.kmtpa.medicheck.content;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * "Content" — 뉴스레터 호 목록.
 *
 * <p>협회 사이트의 {@code communications/index.html#newsletter} 를 옮겨 온 자리다.
 * 협회 쪽은 뉴스레터 · 보도자료 · 발간물이 탭 셋으로 있는데 여기는 뉴스레터 하나만
 * 가져왔다 — 나머지 둘은 협회가 하는 일이고, 없는 것을 탭으로 세우면 눌렀을 때
 * 빈 화면이 나온다(31장).
 *
 * <p><b>지금 표에 있는 호는 전부 샘플이고 본문이 없다.</b> 상담 게시판(V12)과 같이
 * {@code sample} 수를 함께 내려보내, 화면이 그 사실을 스스로 판단하지 않고 서버가
 * 준 값으로 적게 한다 — 판단을 화면에 두면 언젠가 그 판단이 빠지고 샘플이 진짜처럼
 * 열린다.
 *
 * <p>본문이 아직 없는 호는 {@code bodyUrl} 이 null 이다. 화면은 그런 호를 '준비 중'으로
 * 세우고 링크를 걸지 않는다 — 걸어 두고 404 를 주느니 아직 없다고 말하는 편이 낫다.
 */
@RestController
public class ContentController {

    private final JdbcTemplate jdbc;

    public ContentController(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @GetMapping("/api/content")
    public Map<String, Object> content() {
        List<Map<String, Object>> issues = jdbc.query(
                """
                SELECT vol, published_on, title_en, title_ko, summary_en, summary_ko,
                       body_url, is_sample
                FROM newsletter_issue
                ORDER BY vol DESC
                """,
                (rs, rowNum) -> {
                    Map<String, Object> row = new LinkedHashMap<>();
                    row.put("vol", rs.getInt("vol"));
                    row.put("publishedOn", rs.getString("published_on"));
                    row.put("titleEn", rs.getString("title_en"));
                    row.put("titleKo", rs.getString("title_ko"));
                    row.put("summaryEn", rs.getString("summary_en"));
                    row.put("summaryKo", rs.getString("summary_ko"));
                    // 없으면 null 이다. '준비 중'을 글자로 저장하지 않는다 — 상태를 두 곳에
                    // 두면 둘이 어긋난다 (V12 의 answer 와 같은 판단)
                    row.put("bodyUrl", rs.getString("body_url"));
                    row.put("sample", rs.getInt("is_sample") == 1);
                    return row;
                });

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("issues", issues);
        body.put("total", issues.size());
        body.put("sample", issues.stream().filter(i -> (Boolean) i.get("sample")).count());
        // 본문이 실제로 있는 호. 화면의 '읽기' 링크가 몇 개 서는지와 같은 수다
        body.put("published", issues.stream().filter(i -> i.get("bodyUrl") != null).count());
        return body;
    }
}
