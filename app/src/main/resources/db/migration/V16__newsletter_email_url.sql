-- 호마다 판이 둘이 됐다 — 웹 판과 이메일 판.
--
-- 웹 판(vol1.html)은 Claude Design v2 의 신문 지면이고, 이메일 판(vol1-email.html)은
-- v3 를 표 기반으로 옮긴 것이다. 화면에서 둘 다 열 수 있어야 하므로 주소를 따로 든다.
--
-- **파일 이름으로 유추하지 않는다.** body_url 에서 '-email' 을 붙여 만들 수도 있지만,
-- 그건 이름 규칙을 코드가 외우는 일이다. 다음 호에서 이름이 조금만 달라져도
-- 화면은 없는 파일을 가리키고, 그 사실은 눌러 보기 전까지 아무 데도 안 나온다.

ALTER TABLE newsletter_issue ADD COLUMN email_url TEXT;

UPDATE newsletter_issue SET email_url = '/newsletter/vol1-email.html' WHERE vol = 1;
