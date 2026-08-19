package kr.or.kmtpa.medicheck;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 메디체크 코리아 — 해외 환자에게 협회 확인 기관을 보여 주는 사이트.
 *
 * <p>기획서는 {@code medicheck/docs/01-기획서.html} 부터 {@code 07-화면-설계.html} 까지에 있다.
 * 이 앱은 그 1단계 — 검색 · 신뢰 확인 · 문의 — 까지만 한다. 예약 버튼은 없다(10장).
 *
 * <p>패키지는 메뉴와 하나씩 맞춘다. 자세한 대응은 {@link kr.or.kmtpa.medicheck.config.SpaWebConfig} 에.
 */
@SpringBootApplication
public class MedicheckApplication {

    public static void main(String[] args) {
        ensureDatabaseDirectory();
        SpringApplication.run(MedicheckApplication.class, args);
    }

    /**
     * DB 파일이 들어갈 폴더를 미리 만든다.
     *
     * <p>SQLite 는 폴더를 대신 만들어 주지 않고 {@code path to 'data/medicheck.db' does not exist}
     * 로 죽는다. 처음 받아 실행하는 사람은 그 메시지만 보고 무엇을 해야 하는지 모른다 —
     * 문서에 "먼저 mkdir 하세요" 한 줄을 적느니 앱이 하는 편이 낫다.
     *
     * <p>스프링이 뜨기 전에 해야 해서 여기 있다. DataSource 는 컨텍스트 초기화 중에
     * 이미 연결을 열어 보므로 {@code @Component} 로는 늦는다.
     */
    private static void ensureDatabaseDirectory() {
        String url = System.getenv().getOrDefault("MEDICHECK_DB", "data/medicheck.db");
        Path parent = Paths.get(url).toAbsolutePath().getParent();
        if (parent == null) {
            return;
        }
        try {
            Files.createDirectories(parent);
        } catch (IOException e) {
            throw new IllegalStateException("could not create the database directory: " + parent, e);
        }
    }
}
