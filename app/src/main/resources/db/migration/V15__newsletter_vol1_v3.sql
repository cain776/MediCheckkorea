-- 제 1호 제목·요약을 본문 개정판에 맞춘다.
--
-- 본문(vol1.html)이 크게 고쳐졌다 — 2025년 201만 명이 들어왔고, 「기록은 이미 있다」
-- 절이 새로 생겨 「문제가 있다 → 공적 기록은 이미 존재한다 → 다만 환자와 거리가 멀다
-- → 메디체크가 그 거리를 좁힌다」로 논리가 이어진다.
--
-- **목록의 제목과 본문의 제목은 같은 말이어야 한다.** 한쪽만 고치면 목록에서 읽은
-- 제목과 열어서 본 제목이 달라지고, 그때 어느 쪽이 이 호의 이름인지 알 수 없게 된다.

UPDATE newsletter_issue
   SET title_en   = 'What 1.17 million patients does not tell you about your choice',
       title_ko   = '117만 명이라는 숫자가, 당신의 선택에 관해 말해 주지 않는 것',
       summary_en = '1.17 million in 2024, 2.01 million in 2025. The market keeps growing; choosing a hospital did not get easier. What the number leaves out, and three things worth checking before you decide.',
       summary_ko = '2024년 117만 명, 2025년 201만 명. 시장은 계속 커지는데 병원을 고르는 문제는 그대로입니다. 그 숫자가 가리는 것과, 결정 전에 확인할 세 가지.'
 WHERE vol = 1;
