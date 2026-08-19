-- 지어낸 자료를 뺀다.
--
-- V2 의 'OO ...' 24곳은 화면을 보여 주려고 만든 자리표시였다. 서울시 목록에서
-- 실명 100곳이 들어오면서 셋이 어긋났다.
--
--   1. 첫 화면이 "124 hospitals listed" 라고 적는다. 그중 24가 지어낸 것이면
--      **그 숫자 자체가 거짓**이다. 30장이 사실만 적으라고 한 바로 그 줄이다.
--   2. 지역 상자에 영문 도시명(Seoul·Busan…)과 한글 자치구(강남구…)가 섞인다.
--      앞의 것은 지어낸 기관만 쓰는 값이다.
--   3. 실명 옆에 'OO Dental Clinic' 이 서면, 읽는 사람은 둘을 같은 무게로 본다.
--
-- 하차 기록 4건도 같이 뺀다. 'OO Skin Clinic 이 등록 만료로 내려갔다'는 사실이
-- 아니다. 4장은 탈락을 **공개하라**고 했지 **있어 보이게 하라**고 하지 않았다 —
-- 없는 탈락을 지어내는 것은 그 장이 막으려는 바로 그 일이다.
-- 지금 하차가 0인 것은 이 사이트가 아직 아무도 내리지 않았다는 뜻이고,
-- 화면은 그 사실을 그대로 말한다.
--
-- 보건복지부 등록을 근거로 하는 기관은 이제 0곳이다. 근거 자체는 그대로 살아 있다 —
-- 표에도, 인증 설명 화면에도, 문안 대장에도. 협회가 등록부를 실제로 조회해
-- 채우는 날 그대로 켜진다.

DELETE FROM consultation WHERE hospital_member_id LIKE 'M%';
DELETE FROM medicheck_listing WHERE member_id LIKE 'M%';
DELETE FROM member_corp WHERE member_id LIKE 'M%';

DELETE FROM medicheck_removal;
