package kr.or.kmtpa.medicheck.home;

import java.util.LinkedHashMap;
import java.util.Map;
import kr.or.kmtpa.medicheck.hospital.HospitalRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/** 첫 화면이 쓰는 숫자 한 줄. */
@RestController
public class HomeController {

    private final HospitalRepository hospitals;
    private final JdbcTemplate jdbc;
    private final int minimumListed;

    public HomeController(
            HospitalRepository hospitals,
            JdbcTemplate jdbc,
            @Value("${medicheck.minimum-listed:20}") int minimumListed) {
        this.hospitals = hospitals;
        this.jdbc = jdbc;
        this.minimumListed = minimumListed;
    }

    /**
     * 첫 화면의 통계 줄.
     *
     * <p><b>숫자가 작으면 숫자를 쓰지 않는다</b>(30장). 등재가 열 곳일 때
     * "10 hospitals listed"를 쓰면 빈 사이트라고 광고하는 것이다. 그래서 판단을
     * 화면에 맡기지 않고 서버가 {@code showCount} 로 내려 준다 — 화면 두 곳에서
     * 각자 판단하면 언젠가 한 곳이 어긋난다.
     *
     * <p>기준값은 {@code medicheck.minimum-listed} 로 바꾼다. 이 수를 넘기기 전에는
     * 애초에 사이트를 열지 않는다는 것이 9장의 결론이므로, 이 값은 <b>공개 시점의
     * 조건이기도 하다</b>.
     */
    @GetMapping("/api/home")
    public Map<String, Object> home() {
        int listed = hospitals.listedCount();

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("listedCount", listed);
        body.put("showCount", listed >= minimumListed);
        body.put("minimumListed", minimumListed);
        body.put("lastVerifiedAt", hospitals.lastVerifiedAt().orElse(null));

        // 진료과목 타일. 자료에 실제로 있는 것만 나온다 — 없는 과목을 걸어 두면 0건이 나온다.
        // 전부 내려 준다. 잘라 내면 화면이 "이게 다인가?" 를 답하지 못한다 —
        // 종류는 열 몇 개뿐이라 한 줄에 다 선다.
        body.put("specialties", hospitals.specialtiesByFrequency(20));

        // 하차 기록 건수. 첫 화면이 이 수를 그대로 적는다 — 탈락이 한 번도 없는 인증은
        // 아무도 믿지 않으므로(4장), 이 수가 0 이라도 감추지 않는다.
        Long removals = jdbc.queryForObject("SELECT COUNT(*) FROM medicheck_removal", Long.class);
        body.put("removalCount", removals == null ? 0 : removals);
        return body;
    }
}
