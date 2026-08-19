-- 제 2호 — 「우리가 설명하지 않고 남겨 둔 숫자」.
--
-- 1호가 설명하지 않고 넘어간 숫자(2024년 외국인 암 환자 7,147명)를 이어받아,
-- 그 이유가 한국 의료의 수준이 아니라 거리라는 것을 다룬다.
--
-- 발행월이 1호와 같은 2026-08 이다. 본문의 현황 문단이 「2026년 8월」이고
-- 「지난 편지와 같습니다」라고 적고 있어 그 달에 맞췄다 — 달을 9월로 올리면
-- 본문과 목록이 서로 다른 말을 하게 된다. 월간으로 자리 잡으면 다음 호부터
-- 한 달씩 간다.
--
-- 판이 둘인 것은 1호와 같다. 웹 판은 신문 지면(v2), 이메일 판은 카드(v3).

INSERT INTO newsletter_issue
       (vol, published_on, title_en, title_ko, summary_en, summary_ko, body_url, email_url, is_sample)
VALUES (2, '2026-08',
        'The Number We Left Unexplained',
        '우리가 설명하지 않고 남겨 둔 숫자',
        'In 2024 only 7,147 international patients came to Korea for cancer treatment — fewer than in 2019, while the market as a whole more than doubled. The explanation is not Korean medicine. It is distance.',
        '2024년 암 치료로 한국에 온 외국인 환자는 7,147명. 전체 시장이 두 배 넘게 커지는 동안 이 영역만 줄었습니다. 이유는 한국 의료의 수준이 아니라 거리였습니다.',
        '/newsletter/vol2.html',
        '/newsletter/vol2-email.html',
        0);
