-- 시범용 자료.
--
-- 기관명은 기획서 목업과 같은 'OO' 자리표시다. 실제 기관을 쓰지 않는다 —
-- 화면을 보여 주려고 실재하는 병원 이름을 인증된 것처럼 늘어놓으면 그 자체가
-- 4장이 막으려는 일이다.
--
-- 일부러 섞어 둔 것들:
--   · 등록번호가 없는 회원 3곳       → 회원 ≠ 등재 (3장)
--   · 갱신이 1년 넘게 멈춘 기관 1곳  → 낡은 날짜를 숨기지 않는다 (7장 · 31장)
--   · 소개문이 빈 기관 1곳           → 협회가 대신 쓰지 않는다 (31장)
--   · 하차 기록 4건                  → 탈락 없는 인증은 아무도 안 믿는다 (4장 · 28장)

INSERT INTO member_corp (member_id, org_name, org_name_en, promotion_reg_no, specialties, address, website, org_type) VALUES
 ('M001','OO의료원','OO Medical Center','11-2026-0001','Plastic surgery, Dermatology','Gangnam-gu, Seoul','www.example.kr','HOSPITAL'),
 ('M002','OO대학교병원','OO University Hospital','26-2026-0002','Oncology, Health screening','Haeundae-gu, Busan','www.example.kr','HOSPITAL'),
 ('M003','OO정형외과의원','OO Orthopedic Clinic','28-2026-0003','Orthopedics','Yeonsu-gu, Incheon','www.example.kr','CLINIC'),
 ('M004','OO안과','OO Eye Center','11-2026-0004','Ophthalmology','Seocho-gu, Seoul','www.example.kr','CLINIC'),
 ('M005','OO성형외과','OO Plastic Surgery Clinic','11-2026-0005','Plastic surgery','Gangnam-gu, Seoul','www.example.kr','CLINIC'),
 ('M006','OO치과병원','OO Dental Hospital','27-2026-0006','Dentistry','Jung-gu, Daegu','www.example.kr','HOSPITAL'),
 ('M007','OO피부과의원','OO Dermatology Clinic','11-2026-0007','Dermatology','Mapo-gu, Seoul','www.example.kr','CLINIC'),
 ('M008','OO건강검진센터','OO Health Screening Center','41-2026-0008','Health screening','Bundang-gu, Gyeonggi','www.example.kr','HOSPITAL'),
 ('M009','OO암센터','OO Cancer Center','30-2026-0009','Oncology','Seo-gu, Daejeon','www.example.kr','HOSPITAL'),
 ('M010','OO척추병원','OO Spine Hospital','11-2026-0010','Orthopedics, Neurosurgery','Songpa-gu, Seoul','www.example.kr','HOSPITAL'),
 ('M011','OO여성의원','OO Women''s Clinic','26-2026-0011','Obstetrics','Suyeong-gu, Busan','www.example.kr','CLINIC'),
 ('M012','OO이비인후과','OO ENT Clinic','29-2026-0012','Otolaryngology','Buk-gu, Gwangju','www.example.kr','CLINIC'),
 ('M013','OO한방병원','OO Korean Medicine Hospital','11-2026-0013','Korean medicine','Jongno-gu, Seoul','www.example.kr','HOSPITAL'),
 ('M014','OO재활의학과','OO Rehabilitation Clinic','41-2026-0014','Rehabilitation','Suwon-si, Gyeonggi','www.example.kr','CLINIC'),
 ('M015','OO안과병원','OO Vision Hospital','26-2026-0015','Ophthalmology','Busanjin-gu, Busan','www.example.kr','HOSPITAL'),
 ('M016','OO미용성형','OO Aesthetic Clinic','11-2026-0016','Plastic surgery, Dermatology','Gangnam-gu, Seoul','www.example.kr','CLINIC'),
 ('M017','OO소아청소년과','OO Children''s Clinic','28-2026-0017','Pediatrics','Bupyeong-gu, Incheon','www.example.kr','CLINIC'),
 ('M018','OO관절병원','OO Joint Hospital','27-2026-0018','Orthopedics','Suseong-gu, Daegu','www.example.kr','HOSPITAL'),
 ('M019','OO내과의원','OO Internal Medicine Clinic','11-2026-0019','Internal medicine, Health screening','Yongsan-gu, Seoul','www.example.kr','CLINIC'),
 ('M020','OO제주병원','OO Jeju Hospital','50-2026-0020','Health screening, Internal medicine','Jeju-si, Jeju','www.example.kr','HOSPITAL'),
 ('M021','OO신경외과','OO Neurosurgery Clinic','41-2026-0021','Neurosurgery','Goyang-si, Gyeonggi','www.example.kr','CLINIC'),
 ('M022','OO치과의원','OO Dental Clinic','11-2026-0022','Dentistry','Gangdong-gu, Seoul','www.example.kr','CLINIC'),
 ('M023','OO종합병원','OO General Hospital','30-2026-0023','Internal medicine, Oncology, Health screening','Yuseong-gu, Daejeon','www.example.kr','HOSPITAL'),
 ('M024','OO모발이식','OO Hair Transplant Clinic','11-2026-0024','Dermatology, Plastic surgery','Gangnam-gu, Seoul','www.example.kr','CLINIC'),
 -- 회원이지만 등록번호가 없다. 회비를 냈어도 못 올라간다 (3장)
 ('M101','OO의원','OO Family Clinic',NULL,'Internal medicine','Nowon-gu, Seoul','www.example.kr','CLINIC'),
 ('M102','OO한의원','OO Korean Medicine Clinic',NULL,'Korean medicine','Dong-gu, Daegu','www.example.kr','CLINIC'),
 -- 유치업체다. 의료기관이 아니라 목록에 오르지 않는다 (6장 org_type)
 ('M103','OO메디투어','OO Medi Tour','11-2026-9001','—','Jung-gu, Seoul','www.example.kr','AGENCY');

INSERT INTO medicheck_listing (member_id, listed, verified_at, verified_by, reg_expires_at, languages, intro_ko, intro_en, photo, updated_at) VALUES
 ('M001',1,'2026-08-02','KMTPA','2027-11-30','English, Chinese, Russian','2004년 개원. 성형외과 전문의 6명. 평일 영어·중국어 통역 상주.','Opened in 2004. Six plastic surgery specialists. English and Chinese interpreters on site on weekdays.',NULL,'2026-08-11'),
 ('M002',1,'2026-07-19','KMTPA','2028-03-31','English, Chinese','종합병원. 종양내과·건강검진센터 운영. 국제진료센터 별도 창구.','A general hospital with an oncology department and a screening centre. International patients are handled at a separate desk.',NULL,'2026-06-30'),
 ('M003',1,'2026-06-30','KMTPA','2027-06-30','English','정형외과 단일과 의원. 관절경 수술 중심.','A single-specialty orthopedic clinic. Mostly arthroscopic procedures.',NULL,'2026-06-30'),
 ('M004',1,'2026-08-02','KMTPA','2027-12-31','English, Chinese, Japanese','시력교정과 백내장 진료. 검사 장비 2026년 교체.','Vision correction and cataract care. Diagnostic equipment replaced in 2026.',NULL,'2026-08-14'),
 ('M005',1,'2026-08-02','KMTPA','2027-09-30','English, Chinese','성형외과 전문의 4명. 수술 후 경과 관찰은 화상으로도 가능.','Four plastic surgery specialists. Follow-up can be done by video call after you fly home.',NULL,'2026-08-09'),
 ('M006',1,'2026-07-19','KMTPA','2028-01-31','English','치과병원. 임플란트·교정 진료.','A dental hospital. Implants and orthodontics.',NULL,'2026-07-22'),
 ('M007',1,'2026-07-19','KMTPA','2027-08-31','English, Chinese','피부과 의원. 레이저 시술 중심.','A dermatology clinic. Mainly laser procedures.',NULL,'2026-07-30'),
 ('M008',1,'2026-08-02','KMTPA','2028-02-29','English, Chinese, Russian','건강검진 전문. 반나절·하루 과정 운영.','A screening-only centre. Half-day and full-day programmes.',NULL,'2026-08-05'),
 ('M009',1,'2026-06-30','KMTPA','2027-10-31','English','암 진단과 치료. 다학제 진료 운영.','Cancer diagnosis and treatment, with multidisciplinary case review.',NULL,'2026-07-02'),
 ('M010',1,'2026-08-02','KMTPA','2027-07-31','English, Chinese','척추·관절 진료. 비수술 치료와 수술 모두 시행.','Spine and joint care, both surgical and non-surgical.',NULL,'2026-08-12'),
 ('M011',1,'2026-07-19','KMTPA','2027-05-31','English','산부인과 의원.','An obstetrics and gynaecology clinic.',NULL,'2026-07-19'),
 ('M012',1,'2026-06-30','KMTPA','2027-04-30','English','이비인후과 의원. 코 성형과 수면무호흡 진료.','An ENT clinic. Rhinoplasty and sleep apnoea care.',NULL,'2026-06-30'),
 -- 갱신이 1년 넘게 멈춘 곳. 날짜를 그대로 보여 준다 — 경고 딱지는 붙이지 않는다 (31장)
 ('M013',1,'2026-06-30','KMTPA','2027-03-31','English','한방병원. 침구·한약 진료.','A Korean medicine hospital. Acupuncture and herbal treatment.',NULL,'2025-03-04'),
 ('M014',1,'2026-07-19','KMTPA','2027-12-31','English, Japanese','재활의학과. 수술 후 재활 프로그램 운영.','Rehabilitation medicine, including post-operative programmes.',NULL,'2026-07-25'),
 ('M015',1,'2026-08-02','KMTPA','2028-04-30','English, Chinese','안과병원. 망막·녹내장 진료.','An eye hospital. Retina and glaucoma care.',NULL,'2026-08-06'),
 -- 소개문이 비어 있다. 사무국이 대신 쓰지 않는다 (31장)
 ('M016',1,'2026-08-02','KMTPA','2027-11-30','English, Chinese',NULL,NULL,NULL,'2026-08-02'),
 ('M017',1,'2026-06-30','KMTPA','2027-06-30','English','소아청소년과 의원.','A paediatric clinic.',NULL,'2026-07-01'),
 ('M018',1,'2026-07-19','KMTPA','2027-09-30','English, Chinese','관절 전문 병원. 인공관절 수술 시행.','A joint-specialty hospital, including joint replacement.',NULL,'2026-07-28'),
 ('M019',1,'2026-08-02','KMTPA','2027-08-31','English','내과 의원. 검진과 만성질환 관리.','An internal medicine clinic. Screening and chronic disease care.',NULL,'2026-08-08'),
 ('M020',1,'2026-07-19','KMTPA','2028-05-31','English, Chinese','제주 소재 병원. 검진과 내과 진료.','A hospital on Jeju Island. Screening and internal medicine.',NULL,'2026-07-20'),
 ('M021',1,'2026-06-30','KMTPA','2027-02-28','English','신경외과 의원.','A neurosurgery clinic.',NULL,'2026-06-30'),
 ('M022',1,'2026-08-02','KMTPA','2027-10-31','English, Japanese','치과 의원. 임플란트 중심.','A dental clinic. Mainly implants.',NULL,'2026-08-04'),
 ('M023',1,'2026-07-19','KMTPA','2028-06-30','English, Chinese, Russian','종합병원. 국제진료센터에서 통역과 수속을 함께 맡는다.','A general hospital. Its international office handles interpretation and paperwork together.',NULL,'2026-08-01'),
 ('M024',1,'2026-08-02','KMTPA','2027-07-31','English, Chinese','모발이식 의원.','A hair transplant clinic.',NULL,'2026-08-10'),
 -- 등록번호가 없어 등재되지 않는다. 표에는 남되 listed = 0 이다 (3장 · 6장)
 ('M101',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-05-02'),
 ('M102',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-04-18');

INSERT INTO medicheck_removal (org_name_en, listed_from, listed_to, reason) VALUES
 ('OO Skin Clinic','2026-02-11','2026-05-31','REGISTRATION_EXPIRED'),
 ('OO Care Hospital','2026-02-11','2026-06-24','REGISTRATION_CANCELLED'),
 ('OO Beauty Clinic','2026-02-11','2026-07-15','NOT_MAINTAINED'),
 ('OO Dermatology Center','2026-03-02','2026-07-31','WITHDRAWN');

INSERT INTO journey_step (step_no, title_en, lead_en, body_en, ask_ko, ask_en) VALUES
 (1,'Before you come','Choosing a hospital is step one, not step zero.','Pick a few, send inquiries, compare what comes back. Ask about the medical visa early — which one you need depends on what you are having done.','이 시술을 해 본 적이 있나요? 전부 며칠쯤 걸리나요?','Have you done this procedure before? Roughly how many days will all of it take?'),
 (2,'Getting here','Arrival, and the trip from the airport to the hospital.','Ask who meets you and in what language. This is arranged by the hospital, not by us.','공항에서 누가 맞아 주나요? 통역이 붙나요?','Who meets me at the airport? Will an interpreter be there?'),
 (3,'First visit','This is where the price becomes real.','Examination, consultation, then a treatment plan with a cost attached. Anything quoted before this is an estimate.','이 금액에 안 들어간 것은 무엇인가요?','What is not included in this price?'),
 (4,'Treatment','The procedure and any hospital stay.','Consent should happen in a language you actually read. If you are handed a Korean form and no translation, stop and ask.','동의서를 제 언어로 볼 수 있나요?','Can I read the consent form in my own language?'),
 (5,'Recovery here','You usually stay in Korea for a while after treatment.','How long is a medical decision, not a travel one — ask before you book the flight home.','언제부터 비행기를 타도 되나요?','When am I allowed to fly?'),
 (6,'After you go home','The part people worry about most.','Who do you contact if something goes wrong six time zones away? And will your own doctor be able to read your records?','진료 기록을 제 나라 의사에게 보내 주나요?','Will you send my records to my doctor at home?');

INSERT INTO certification_scope (kind, item_en, item_ko, sort_no) VALUES
 ('CHECKED','That the MOHW registration is valid right now','보건복지부 등록이 지금 유효한가',1),
 ('CHECKED','That the registration number belongs to this hospital','그 등록번호가 이 기관의 것인가',2),
 ('CHECKED','When the registration expires','등록 만료일이 언제인가',3),
 ('CHECKED','When the hospital last edited its own information','기관이 올린 정보를 언제 고쳤는가',4),
 ('NOT_CHECKED','Whether your treatment will succeed','치료가 성공하는가',1),
 ('NOT_CHECKED','How skilled any individual doctor is','의료진 개인의 실력',2),
 ('NOT_CHECKED','Whether the price is reasonable','가격이 적정한가',3),
 ('NOT_CHECKED','Whether this hospital is better than another','다른 기관보다 나은가',4);
