-- 메디체크 인증 — 등급과 평가 축.
--
-- 05 등급제 검토안(21~26장)의 값을 그대로 옮긴다. 화면이 문서와 다른 숫자를 말하면
-- 어느 쪽이 진짜인지 아무도 모르게 되므로, 배점·색·최소선을 여기 한 곳에 둔다.
--
-- **아직 시행하지 않는다.** 26장이 "1단계에서는 등급을 넣지 않는다"고 했고,
-- 심사 자료가 없는 상태에서 등급부터 만들면 결국 서류 심사가 되며 서류 심사는
-- 돈으로 사기 쉽다. 그래서 이 표에는 등급의 **정의**만 있고, 어느 기관에도
-- 등급이 붙어 있지 않다 — medicheck_listing 에 grade 칸을 만들지도 않았다.
-- 화면은 그 사실을 감추지 않고 '계획안'이라고 먼저 밝힌다.

CREATE TABLE medicheck_grade (
    code       TEXT PRIMARY KEY,
    name_en    TEXT NOT NULL,
    name_ko    TEXT NOT NULL,
    -- 초기에는 절대 기준(점수)으로 준다. 모수가 100곳을 넘으면 백분위를 병기한다(23장).
    score_from INTEGER NOT NULL,
    percentile TEXT NOT NULL,
    -- 25장 — 금속색을 쓰되 채도를 낮춘다. 파랑은 근거 배지 몫이라 침범하지 않는다.
    dot        TEXT NOT NULL,
    bg         TEXT NOT NULL,
    ink        TEXT NOT NULL,
    sort_no    INTEGER NOT NULL
);

INSERT INTO medicheck_grade (code, name_en, name_ko, score_from, percentile, dot, bg, ink, sort_no) VALUES
 ('PLATINUM','Platinum','플래티넘',85,'top 1%','#8B98AB','#EEF1F6','#3F4A5A',1),
 ('GOLD','Gold','골드',70,'top 5%','#D9A441','#FDF4E3','#8A6410',2),
 ('SILVER','Silver','실버',55,'top 15%','#A8B2BF','#F2F4F6','#5B6470',3),
 ('BRONZE','Bronze','브론즈',40,'top 35%','#B9805A','#F9EFE7','#8A5A35',4);

-- 평가 축 넷. 배점은 고르게 25점씩이고, **한 축이라도 최소선에 못 미치면 등급을 주지
-- 않는다**(24장). 총점만 보면 사후관리가 0점이어도 다른 셋으로 골드가 나오는데,
-- 그런 등급은 환자에게 거짓말이 된다.
CREATE TABLE medicheck_axis (
    code       TEXT PRIMARY KEY,
    name_en    TEXT NOT NULL,
    name_ko    TEXT NOT NULL,
    points     INTEGER NOT NULL,
    floor      INTEGER NOT NULL,
    fear_en    TEXT NOT NULL,
    fear_ko    TEXT NOT NULL,
    looks_en   TEXT NOT NULL,
    looks_ko   TEXT NOT NULL,
    evidence_en TEXT NOT NULL,
    evidence_ko TEXT NOT NULL,
    sort_no    INTEGER NOT NULL
);

INSERT INTO medicheck_axis (code, name_en, name_ko, points, floor, fear_en, fear_ko, looks_en, looks_ko, evidence_en, evidence_ko, sort_no) VALUES
 ('RESPONSE','International patient response','국제환자 응대',25,10,
  'I asked, and nobody answered.','물어봤는데 답이 없다.',
  'Interpreters and which languages · how long replies take · whether a named desk actually exists',
  '통역 인력과 언어 · 문의 응답 시간 · 담당 창구가 실제로 있는가',
  'Measured, not declared — reply times come from the record, not a form',
  '서류가 아니라 실측 — 회신까지 걸린 시간을 기록에서 읽는다',1),
 ('CONSENT','Treatment information and consent','진료 정보와 동의',25,10,
  'I signed something I could not read.','읽지도 못한 것에 서명했다.',
  'Whether the procedure and its cost are given in writing beforehand · whether risks and alternatives are stated · whether consent happens in the patient''s language',
  '시술 설명과 비용을 사전에 문서로 주는가 · 부작용과 대안을 알리는가 · 동의 절차가 환자 언어로 이뤄지는가',
  'Documents reviewed','서류 심사',2),
 ('AFTERCARE','Aftercare','사후관리',25,10,
  'I went home and could not reach anyone.','돌아왔더니 연락할 곳이 없다.',
  'How you are contacted after you fly home · what happens if a complication appears · whether records are sent to your own doctor',
  '귀국 후 연락 체계 · 합병증 발생 시 대응 · 진료 기록을 본국 의료진에게 전달하는가',
  'Documents plus case review','서류 + 사례 확인',3),
 ('TRANSPARENCY','Transparency and disputes','투명성과 분쟁',25,10,
  'The bill was not the number I was told.','들은 금액이 아니었다.',
  'Cost disclosed up front and the rule for anything added · how a dispute is handled · whether advertising stays inside the regulations',
  '비용 사전 고지와 추가금 규칙 · 분쟁 처리 절차 · 광고 표현이 규제를 지키는가',
  'Documents plus a check of the hospital''s own wording',
  '서류 + 사이트 문구 점검',4);
