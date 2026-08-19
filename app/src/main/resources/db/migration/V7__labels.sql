-- 거르기 값에도 두 언어를 붙인다.
--
-- 진료과목·지역·응대 언어는 자료에 한 언어로만 들어 있었다. 진료과목과 응대 언어는
-- 영어로, 지역은 한글로. 그래서 어느 쪽 화면에서도 섞여 보였다 —
-- 한국어 화면에서 'Plastic surgery · 강남구', 영어 화면에서 'Plastic surgery · 강남구'.
-- 둘 다 반쪽만 맞다.
--
-- 32장이 문안은 두 줄로 함께 둔다고 했다. 이것도 문안이다. 다만 journey_step 과
-- certification_scope 처럼 **표에 둔다** — 새 과목이 생겼을 때 화면을 다시 빌드하지
-- 않고 자료만 넣으면 되게.
--
-- code 는 자료에 실제로 들어 있는 값이다. 자료를 고쳐 맞추지 않고, 자료가 쓰는 말을
-- 열쇠로 삼아 두 이름을 매단다.

CREATE TABLE label (
    kind    TEXT NOT NULL CHECK (kind IN ('SPECIALTY', 'REGION', 'LANGUAGE')),
    code    TEXT NOT NULL,
    name_en TEXT NOT NULL,
    name_ko TEXT NOT NULL,
    PRIMARY KEY (kind, code)
);

-- 진료과목. 국문은 서울시 목록이 쓰던 말 그대로다 — 옮겨 적으면서 잃었던 원래 낱말을
-- 되돌려 놓는 것이기도 하다.
INSERT INTO label (kind, code, name_en, name_ko) VALUES
 ('SPECIALTY','Plastic surgery','Plastic surgery','성형외과'),
 ('SPECIALTY','Ophthalmology','Ophthalmology','안과'),
 ('SPECIALTY','Dermatology','Dermatology','피부과'),
 ('SPECIALTY','Dentistry','Dentistry','치과'),
 ('SPECIALTY','Korean medicine','Korean medicine','한의과'),
 ('SPECIALTY','Health screening','Health screening','건강검진센터'),
 ('SPECIALTY','Orthopedics','Orthopedics','척추관절'),
 ('SPECIALTY','General hospital','General hospital','종합병원'),
 ('SPECIALTY','Tertiary hospital','Tertiary hospital','상급종합병원'),
 ('SPECIALTY','Hospital','Hospital','병원'),
 ('SPECIALTY','Other','Other specialties','기타진료과목');

-- 자치구. 영문은 서울시가 쓰는 공식 표기다 — 협회가 지어낸 이름이 아니다.
INSERT INTO label (kind, code, name_en, name_ko) VALUES
 ('REGION','강남구','Gangnam-gu','강남구'),
 ('REGION','강동구','Gangdong-gu','강동구'),
 ('REGION','강서구','Gangseo-gu','강서구'),
 ('REGION','관악구','Gwanak-gu','관악구'),
 ('REGION','광진구','Gwangjin-gu','광진구'),
 ('REGION','노원구','Nowon-gu','노원구'),
 ('REGION','도봉구','Dobong-gu','도봉구'),
 ('REGION','동대문구','Dongdaemun-gu','동대문구'),
 ('REGION','동작구','Dongjak-gu','동작구'),
 ('REGION','서대문구','Seodaemun-gu','서대문구'),
 ('REGION','서초구','Seocho-gu','서초구'),
 ('REGION','성동구','Seongdong-gu','성동구'),
 ('REGION','성북구','Seongbuk-gu','성북구'),
 ('REGION','송파구','Songpa-gu','송파구'),
 ('REGION','영등포구','Yeongdeungpo-gu','영등포구'),
 ('REGION','용산구','Yongsan-gu','용산구'),
 ('REGION','은평구','Eunpyeong-gu','은평구'),
 ('REGION','종로구','Jongno-gu','종로구'),
 ('REGION','중구','Jung-gu','중구'),
 ('REGION','금천구','Geumcheon-gu','금천구'),
 ('REGION','구로구','Guro-gu','구로구'),
 ('REGION','마포구','Mapo-gu','마포구'),
 ('REGION','양천구','Yangcheon-gu','양천구'),
 ('REGION','중랑구','Jungnang-gu','중랑구'),
 ('REGION','강북구','Gangbuk-gu','강북구');

-- 응대 언어.
INSERT INTO label (kind, code, name_en, name_ko) VALUES
 ('LANGUAGE','English','English','영어'),
 ('LANGUAGE','Chinese','Chinese','중국어'),
 ('LANGUAGE','Japanese','Japanese','일본어'),
 ('LANGUAGE','Russian','Russian','러시아어'),
 ('LANGUAGE','Mongolian','Mongolian','몽골어'),
 ('LANGUAGE','Vietnamese','Vietnamese','베트남어'),
 ('LANGUAGE','Arabic','Arabic','아랍어'),
 ('LANGUAGE','Indonesian','Indonesian','인도네시아어'),
 ('LANGUAGE','Thai','Thai','태국어'),
 ('LANGUAGE','French','French','프랑스어'),
 ('LANGUAGE','Uzbek','Uzbek','우즈베크어'),
 ('LANGUAGE','Khmer','Khmer','캄보디아어'),
 ('LANGUAGE','Malay','Malay','말레이시아어'),
 ('LANGUAGE','Burmese','Burmese','미얀마어'),
 ('LANGUAGE','Korean','Korean','한국어'),
 ('LANGUAGE','German','German','독일어');
