-- 제 1호를 실제로 세운다.
--
-- V13 이 자리만 잡아 두었던 두 호 중 1호는 본문을 썼고, 2호는 지운다.
--
-- **2호를 지우는 이유**: 2026-09 라는 아직 오지 않은 달에 제목까지 붙어 있었다.
-- 화면이 '샘플'이라고 밝히고 있었지만, 나오지도 않은 호를 목록에 세워 두는 것은
-- V6 이 지어낸 기관 24곳을 걷어낸 것과 같은 종류의 문제다 — 있을 예정인 것과
-- 있는 것을 같은 자리에 두면 언젠가 구분이 사라진다. 2호는 쓸 때 다시 넣는다.
--
-- 제목·요약은 본문(vol1.html)과 같은 말이어야 한다. 여기만 고치고 본문을 안 고치면
-- 목록에서 읽은 제목과 열어서 본 제목이 달라진다.

UPDATE newsletter_issue
   SET title_en   = 'What 1.17 million patients does — and does not — tell you',
       title_ko   = '117만 명이 왔다는 말은, 당신에게 무슨 뜻인가',
       summary_en = 'A record 1.17 million foreign patients came to Korea in 2024. Here is what that number leaves out, and the three things worth asking before you choose a hospital.',
       summary_ko = '2024년 한국에 온 외국인 환자는 117만 명. 그 숫자가 가리는 것과, 병원을 고르기 전에 물어볼 만한 세 가지.',
       body_url   = '/newsletter/vol1.html',
       is_sample  = 0
 WHERE vol = 1;

DELETE FROM newsletter_issue WHERE vol = 2;
