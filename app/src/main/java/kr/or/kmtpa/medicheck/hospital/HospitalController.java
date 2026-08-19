package kr.or.kmtpa.medicheck.hospital;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/** "Find a hospital" — {@code /find-a-hospital} 이 부르는 곳. */
@RestController
public class HospitalController {

    private final HospitalRepository hospitals;

    public HospitalController(HospitalRepository hospitals) {
        this.hospitals = hospitals;
    }

    @GetMapping("/api/hospitals")
    public Map<String, Object> list(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String specialty,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String language,
            @RequestParam(required = false, defaultValue = "name") String sort) {

        List<Map<String, Object>> found = hospitals.search(q, specialty, region, language, sort);

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("hospitals", found);
        body.put("total", found.size());
        // 4장 — 정렬 기준을 공개한다. 화면이 이 값을 그대로 적는다.
        body.put("sortedBy", "updated".equals(sort) ? "updated" : "name");
        body.put("facets", hospitals.facets());
        return body;
    }

    @GetMapping("/api/hospitals/{id}")
    public ResponseEntity<Map<String, Object>> detail(@PathVariable String id) {
        return hospitals
                .findById(id)
                .map(ResponseEntity::ok)
                // 등재가 아닌 기관은 여기서 404 다. 한때 등재됐다가 내려간 곳은
                // 인증 설명 페이지의 하차 기록에 남는다(28장) — 조용히 지우지 않는다.
                .orElseGet(() -> ResponseEntity.status(404).build());
    }
}
