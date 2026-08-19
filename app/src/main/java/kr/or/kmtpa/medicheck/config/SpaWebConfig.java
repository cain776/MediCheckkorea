package kr.or.kmtpa.medicheck.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 화면 경로를 하나뿐인 {@code index.html} 로 넘긴다.
 *
 * <p><b>메뉴 · 경로 · 패키지 · API 를 하나로 맞춘다.</b> 같은 것을 세 군데서 다르게 부르면
 * 어느 이름이 진짜인지 아무도 모르게 된다. 메뉴 이름은 영문이 원본이고(14장),
 * 경로는 그 이름을 그대로 소문자·하이픈으로 옮긴 것이며, 자바 패키지는 그 경로의
 * 핵심 낱말이다.
 *
 * <pre>
 *   메뉴 (영문 원본)      경로                      패키지         API
 *   ─────────────────────────────────────────────────────────────────────────────
 *   (첫 화면)             /                        home           /api/home
 *   Find a hospital       /find-a-hospital         hospital       /api/hospitals
 *                         /find-a-hospital/{id}                   /api/hospitals/{id}
 *   About certification   /about-certification     certification  /api/certification
 *   Patient journey       /patient-journey         journey        /api/journey
 *   Online consultation   /online-consultation     consultation   /api/consultations
 *   Send an inquiry       /send-an-inquiry         inquiry        /api/inquiries
 * </pre>
 *
 * <p>{@code index.html} 은 하나뿐이다. 화면을 늘려도 파일이 늘지 않는다 —
 * 늘어나는 것은 위 표의 줄이고, 줄이 늘면 여기와 프런트 라우터를 함께 고친다.
 */
@Configuration
public class SpaWebConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        for (String path : new String[] {
            "/",
            "/find-a-hospital",
            "/find-a-hospital/{id}",
            "/about-certification",
            "/patient-journey",
            "/online-consultation",
            "/send-an-inquiry",
        }) {
            registry.addViewController(path).setViewName("forward:/index.html");
        }
    }
}
