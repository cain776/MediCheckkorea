-- 배지의 근거가 둘이 된다.
--
-- 3장은 1층 배지를 '보건복지부 유치기관 등록' 하나로 잡았다. 그런데 서울시가
-- 운영하는 「의료관광 협력기관」 목록에는 등록번호가 실려 있지 않다. 등록번호를
-- 지어 넣고 협회가 확인했다고 적으면 실재하는 기관에 대한 허위 표시가 되므로,
-- 대신 **무엇을 보고 붙였는지를 배지가 말하게** 한다.
--
-- 원칙은 그대로다 — 근거 없이는 안 올라간다. 인정하는 근거가 둘로 늘었을 뿐이고,
-- 둘 다 밖에서 확인할 수 있다. MOHW 는 등록번호로, SEOUL 은 원문 주소로.

ALTER TABLE medicheck_listing ADD COLUMN source TEXT NOT NULL DEFAULT 'MOHW';

-- 누구나 눌러서 대조할 수 있는 주소. 이게 없으면 SEOUL 근거는 성립하지 않는다.
-- MOHW 는 기관별 공개 주소가 없어 비운다 — 대신 등록번호가 그 자리를 한다.
ALTER TABLE medicheck_listing ADD COLUMN source_url TEXT;

-- ─────────────────────────────────────────────────────────────
-- org_name_en 의 NOT NULL 을 푼다.
--
-- 서울시 목록에는 영문명이 없다. 협회가 로마자로 옮겨 적으면 그건 기관이 쓰지
-- 않은 이름을 협회가 지어낸 것이 된다 — 7장이 "기관이 직접 고친다"고 한 이유가
-- 이것이다. 그래서 없는 것은 없는 채로 두고, 화면은 국문명을 그대로 보여 준다.
--
-- SQLite 는 제약을 떼는 ALTER 가 없어 표를 다시 만든다.
-- ─────────────────────────────────────────────────────────────
CREATE TABLE member_corp_new (
    member_id        TEXT PRIMARY KEY,
    org_name         TEXT NOT NULL,
    org_name_en      TEXT,
    promotion_reg_no TEXT,
    specialties      TEXT,
    address          TEXT,
    website          TEXT,
    org_type         TEXT NOT NULL
);

INSERT INTO member_corp_new (member_id, org_name, org_name_en, promotion_reg_no, specialties, address, website, org_type)
SELECT member_id, org_name, org_name_en, promotion_reg_no, specialties, address, website, org_type
FROM member_corp;

DROP TABLE member_corp;

ALTER TABLE member_corp_new RENAME TO member_corp;


-- ─────────────────────────────────────────────────────────────
-- 지역을 칸으로 뺀다.
--
-- 6장은 지역 거르기를 address 로 하기로 했고, 코드는 'Gangnam-gu, Seoul' 처럼
-- 쉼표가 있다는 전제로 뒤쪽을 잘라 썼다. 실제 자료가 들어오니 바로 깨졌다 —
-- '서울특별시 강남구 도산대로 119' 에는 쉼표가 없어서 주소 전체가 지역이 되고,
-- 그러면 지역 상자에 100개의 서로 다른 '지역'이 들어찬다.
--
-- 주소 형식을 협회가 고쳐 쓰는 대신(그건 남의 자료를 바꾸는 것이다) 화면이 쓸
-- 값을 따로 둔다. 넣는 쪽이 무엇을 지역으로 삼을지 정하고, 읽는 쪽은 자르지 않는다.
-- ─────────────────────────────────────────────────────────────
ALTER TABLE medicheck_listing ADD COLUMN region TEXT;

UPDATE medicheck_listing
SET region = TRIM(SUBSTR(
        (SELECT address FROM member_corp c WHERE c.member_id = medicheck_listing.member_id),
        INSTR((SELECT address FROM member_corp c WHERE c.member_id = medicheck_listing.member_id), ',') + 1))
WHERE region IS NULL;
