-- 인증 설명 페이지도 근거가 둘인 것을 말해야 한다.
--
-- 28장의 '확인한 것' 목록은 보건복지부 등록을 전제로 쓰여 있다. 서울시 목록을
-- 근거로 올라온 기관에 그 문장을 그대로 붙이면, 화면이 확인하지 않은 것을
-- 확인했다고 말하게 된다.
--
-- '확인하지 않은 것' 넷은 근거와 무관하게 그대로다 — 치료 결과도, 의료진 실력도,
-- 가격도, 어느 쪽이 나은지도 협회는 보지 않는다. 그래서 ANY 로 둔다.

ALTER TABLE certification_scope ADD COLUMN source TEXT NOT NULL DEFAULT 'MOHW';

UPDATE certification_scope SET source = 'ANY' WHERE kind = 'NOT_CHECKED';

INSERT INTO certification_scope (kind, source, item_en, item_ko, sort_no) VALUES
 ('CHECKED', 'SEOUL', 'That the hospital is on Seoul''s medical tourism directory', '서울시 의료관광 협력기관 목록에 올라 있는가', 1),
 ('CHECKED', 'SEOUL', 'That the entry is the hospital''s own page there', '그 항목이 이 기관의 것인가', 2),
 ('CHECKED', 'SEOUL', 'Which languages it says it can answer in', '어느 언어로 응대한다고 적혀 있는가', 3),
 ('CHECKED', 'SEOUL', 'The day we read that directory', '그 목록을 읽은 날', 4);
