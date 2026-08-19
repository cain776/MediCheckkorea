package kr.or.kmtpa.medicheck.inquiry;

import jakarta.servlet.http.HttpServletRequest;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/**
 * "Send an inquiry" — 이 사이트에서 가장 중요한 버튼.
 *
 * <p><b>회신은 기관이 직접 한다</b>(5장). 협회는 받아서 대신 답하지 않고 전달하고 기록한다.
 * 그래서 이 컨트롤러가 하는 일은 셋뿐이다 — 받고, 기관에 넘기고, 두 시각을 남긴다.
 */
@RestController
public class InquiryController {

    private final InquiryService inquiries;

    public InquiryController(InquiryService inquiries) {
        this.inquiries = inquiries;
    }

    /**
     * 문의 접수.
     *
     * <p>인증 없는 공개 쓰기다. 협회 쪽 상담 신청이 같은 이유로 IP 당 제한을 걸어 두었고
     * (backend-java {@code ConsultationController}), 여기도 같은 자리다 —
     * 한 곳에서 계속 밀어 넣으면 상담 표가 그대로 불어난다.
     */
    @PostMapping("/api/inquiries")
    public ResponseEntity<Map<String, Object>> create(
            @RequestBody Map<String, Object> body, HttpServletRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(inquiries.create(body, request.getRemoteAddr()));
    }

    /**
     * 기관이 "회신했습니다"를 누른 것.
     *
     * <p>협회는 <b>답이 갔는지</b>만 안다. 무엇이라 답했는지는 받지 않는다 —
     * 내용을 보게 만들면 그 순간 협회가 응답 품질의 책임을 지게 되고, 기관 직접 회신으로
     * 정한 이유가 통째로 되돌아간다(5장 · 27장).
     */
    @PostMapping("/api/inquiries/{id}/replied")
    public Map<String, Object> markReplied(@PathVariable long id, @RequestParam String token) {
        if (!inquiries.markReplied(id, token)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "no such inquiry, or the token does not match");
        }
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("id", id);
        body.put("replied", true);
        return body;
    }
}
