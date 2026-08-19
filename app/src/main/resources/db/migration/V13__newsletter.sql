-- 컨텐츠 — 뉴스레터 호 목록.
--
-- 협회 사이트의 `homepage/communications/index.html#newsletter` 를 옮겨 온 자리다.
-- 협회 쪽은 뉴스레터 · 보도자료 · 발간물이 한 화면의 탭 셋으로 있는데, 여기는
-- **뉴스레터 하나만** 가져온다. 나머지 둘은 협회가 하는 일이지 메디체크가 하는 일이
-- 아니고, 없는 것을 탭으로 세워 두면 눌렀을 때 빈 화면이 나온다(31장).
--
-- **여기 들어 있는 호는 전부 샘플이다.** 본문은 아직 쓰지 않았다. V12 상담 게시판과
-- 같은 이유로 is_sample 칸을 두고, 화면도 맨 위에 그렇게 밝힌다. 지우는 법은 한 줄이다:
--
--     DELETE FROM newsletter_issue WHERE is_sample = 1;
--
-- 제목·요약을 두 언어로 나눠 담는 이유는 14장이다 — 영문이 원본이고 국문은 번역이
-- 아니라 대응이다. 한쪽만 채우면 그 언어 화면에서 빈칸이 난다.
--
-- body_url 은 이 저장소의 뉴스레터 파일을 가리킨다(newsletter/*.html). 아직 안 쓴 호는
-- NULL 이고, 화면은 그 호를 '준비 중'으로 세운다 — 링크를 걸어 두고 404 를 주지 않는다.

CREATE TABLE newsletter_issue (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    -- 호수. 화면에서 서로를 부르는 번호이므로 id 와 따로 둔다 (V12 의 post_no 와 같은 이유)
    vol          INTEGER NOT NULL UNIQUE,
    -- 발행월. 날짜까지 적지 않는다 — 월간이고, 날짜를 적으면 그 날짜가 맞는지
    -- 누가 관리해야 한다. 27장이 문의 화면에서 달만 받기로 한 것과 같은 판단이다
    published_on TEXT NOT NULL,
    title_en     TEXT NOT NULL,
    title_ko     TEXT NOT NULL,
    summary_en   TEXT NOT NULL,
    summary_ko   TEXT NOT NULL,
    -- 본문 파일. 아직 안 쓴 호는 NULL 이고 화면이 '준비 중'으로 세운다
    body_url     TEXT,
    is_sample    INTEGER NOT NULL DEFAULT 0 CHECK (is_sample IN (0, 1))
);

-- 샘플 두 호. 화면이 어떻게 생겼는지 보여 주는 것이 전부이고, 본문은 없다.
-- 호수를 1 부터 매기는 이유는 협회 뉴스레터(Vol. 25)와 헷갈리지 않기 위해서다 —
-- 메디체크는 아직 한 호도 낸 적이 없고, 25호부터 시작한 척하면 그게 4장 위반이다.
INSERT INTO newsletter_issue (vol, published_on, title_en, title_ko, summary_en, summary_ko, body_url, is_sample) VALUES
(2, '2026-09',
 'What we check, and what we do not',
 '무엇을 확인하고, 무엇을 확인하지 않는가',
 'A sample issue. The body has not been written yet.',
 '샘플 호예요. 본문은 아직 쓰지 않았어요.',
 NULL, 1),
(1, '2026-08',
 'Reading a public record for yourself',
 '공개 기록을 직접 읽어 보기',
 'A sample issue. The body has not been written yet.',
 '샘플 호예요. 본문은 아직 쓰지 않았어요.',
 NULL, 1);
