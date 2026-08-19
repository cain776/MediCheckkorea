package kr.or.kmtpa.medicheck.journey;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * "Patient journey" — 처음부터 귀국까지 무슨 일이 일어나는지.
 *
 * <p>MHTC 의 여섯 단계를 한국 실무에 맞게 다시 짠 것이다(레퍼런스 3절). 두 곳이 다르다 —
 * 1단계에 <b>병원 고르기</b>가 들어가고, 마지막이 '출국'이 아니라 <b>귀국 후</b>다.
 *
 * <p>단계마다 {@code ask} 가 붙는다. 협회는 기관의 응대를 보증할 수 없으므로(4장),
 * 대신 답하지 않고 <b>무엇을 물어야 하는지</b>를 알려 준다. 이 여섯 질문은 그대로
 * 2층 심사가 볼 것과 짝이 된다(24장).
 */
@RestController
public class JourneyController {

    private final JdbcTemplate jdbc;

    public JourneyController(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @GetMapping("/api/journey")
    public Map<String, Object> journey() {
        List<Map<String, Object>> steps = jdbc.query(
                """
                SELECT step_no, title_en, lead_en, body_en, ask_en, ask_ko
                FROM journey_step ORDER BY step_no
                """,
                (rs, rowNum) -> {
                    Map<String, Object> row = new LinkedHashMap<>();
                    row.put("step", rs.getInt("step_no"));
                    row.put("title", rs.getString("title_en"));
                    row.put("lead", rs.getString("lead_en"));
                    row.put("body", rs.getString("body_en"));
                    row.put("askEn", rs.getString("ask_en"));
                    row.put("askKo", rs.getString("ask_ko"));
                    return row;
                });

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("steps", steps);
        return body;
    }
}
