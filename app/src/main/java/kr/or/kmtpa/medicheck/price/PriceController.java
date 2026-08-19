package kr.or.kmtpa.medicheck.price;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * "Check the price" — 정찰가.
 *
 * <p><b>아직 값이 하나도 없다.</b> 기관이 정찰가를 제출하는 길도, 그것을 담을 표도 만들지
 * 않았다. 그래서 이 controller 는 빈 목록과 <b>0</b> 을 돌려준다 — 화면이 그 0 을 그대로
 * 적는다. 인증 화면이 '심사받은 기관 0곳'을 감추지 않는 것과 같은 이유다(26장).
 *
 * <p>화면이 스스로 "아직 없다"를 판단하게 두지 않는다. 값이 생기는 날 이 응답만 바뀌면
 * 화면은 고치지 않아도 된다.
 */
@RestController
public class PriceController {

    @GetMapping("/api/prices")
    public Map<String, Object> prices() {
        Map<String, Object> body = new LinkedHashMap<>();
        // 정찰가를 낸 기관. 값이 생기면 여기에 기관 · 시술 · 가격대 · 제출일 · 유효기간이 담긴다
        body.put("hospitals", List.of());
        body.put("published", 0);
        return body;
    }
}
