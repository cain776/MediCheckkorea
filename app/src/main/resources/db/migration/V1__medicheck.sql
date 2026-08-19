-- 메디체크 코리아 — 1단계 스키마
--
-- 표 이름과 칸 이름은 기획서 6장의 설계를 그대로 따른다. 실제로는 협회 DB 에
-- member_corp 이 이미 있고 medicheck_listing 만 새로 붙지만, 시범 서버는 혼자
-- 서야 하므로 둘 다 여기서 만든다. 나중에 협회 DB 를 보게 되면 member_corp
-- CREATE 만 빼면 된다.

-- ─────────────────────────────────────────────────────────────
-- 협회에 이미 있는 것 (6장 "절반 이상이 이미 있다")
-- ─────────────────────────────────────────────────────────────
CREATE TABLE member_corp (
    member_id        TEXT PRIMARY KEY,
    org_name         TEXT NOT NULL,
    org_name_en      TEXT NOT NULL,
    -- 1층 배지의 근거. 이 칸이 비면 등재되지 않는다 (3장)
    promotion_reg_no TEXT,
    specialties      TEXT,
    address          TEXT,
    website          TEXT,
    -- 의료기관과 유치업체를 가른다
    org_type         TEXT NOT NULL
);

-- ─────────────────────────────────────────────────────────────
-- 새로 만드는 것 — 표 하나면 된다 (6장)
--
-- 회원 정보에 칸을 더하지 않고 표를 따로 둔다. 등재는 회원 자격과 별개이고(3장),
-- 한 표에 섞으면 그 구분이 코드 안에서 흐려진다.
-- ─────────────────────────────────────────────────────────────
CREATE TABLE medicheck_listing (
    member_id       TEXT PRIMARY KEY REFERENCES member_corp (member_id),
    listed          INTEGER NOT NULL DEFAULT 0,
    -- 배지 옆에 그대로 표시된다. 누가 언제 확인했는지 없는 인증은 인증이 아니다 (6장)
    verified_at     TEXT,
    verified_by     TEXT,
    reg_expires_at  TEXT,
    languages       TEXT,
    intro_ko        TEXT,
    intro_en        TEXT,
    photo           TEXT,
    updated_at      TEXT
);

-- ─────────────────────────────────────────────────────────────
-- 하차 기록 (28장)
--
-- 4장이 "탈락이 한 번도 없는 인증은 아무도 믿지 않는다"고 했다. 그 규칙이
-- 지켜지는지 밖에서 볼 방법은 내려간 목록을 공개하는 것뿐이다.
-- reason 은 네 낱말 중 하나만 — 문장으로 쓰면 협회의 평가가 되고 다툼이 된다.
-- ─────────────────────────────────────────────────────────────
CREATE TABLE medicheck_removal (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    org_name_en TEXT NOT NULL,
    listed_from TEXT NOT NULL,
    listed_to   TEXT NOT NULL,
    reason      TEXT NOT NULL CHECK (reason IN ('REGISTRATION_EXPIRED', 'REGISTRATION_CANCELLED', 'NOT_MAINTAINED', 'WITHDRAWN'))
);

-- ─────────────────────────────────────────────────────────────
-- 상담 표 (5장)
--
-- 협회에 이미 있는 표다. 새 표를 만들지 않는다 — 나누면 사무국이 화면 두 곳을
-- 봐야 하고, 그러면 반드시 한쪽을 놓친다. 실제 시스템에서는 아래 다섯 칸을
-- ALTER TABLE 로 더하는 일이 된다.
-- ─────────────────────────────────────────────────────────────
CREATE TABLE consultation (
    id                 INTEGER PRIMARY KEY AUTOINCREMENT,
    name               TEXT NOT NULL,
    email              TEXT NOT NULL,
    phone              TEXT,
    country            TEXT,
    specialty          TEXT,
    message            TEXT NOT NULL,
    -- 날짜가 아니라 달로 받는다. 달력 위젯을 두는 것 자체가 거짓말이다 (27장)
    preferred_month    TEXT,
    has_records        INTEGER,
    consent_privacy    INTEGER NOT NULL DEFAULT 0,
    created_at         TEXT NOT NULL,

    -- ── 5장 "다만 칸 하나가 없다" — 없다고 적어 둔 다섯 칸 ──
    hospital_member_id TEXT REFERENCES member_corp (member_id),
    source_site        TEXT NOT NULL DEFAULT 'medicheck',
    language           TEXT NOT NULL DEFAULT 'en',
    -- 전달이 늦은 것과 회신이 늦은 것을 못 가르면 누구를 관리할지 모른다
    forwarded_at       TEXT,
    -- 이 사이트가 일한다는 유일한 증거다. 없으면 미회신 기관을 못 찾는다
    replied_at         TEXT,
    -- 기관에 보내는 메일의 [회신했습니다] 링크에 실린다. 이게 없으면 누구든
    -- 남의 문의를 회신 완료로 바꿀 수 있고, 그러면 미회신 통계가 거짓이 된다.
    reply_token        TEXT NOT NULL
);

CREATE INDEX idx_consultation_hospital ON consultation (hospital_member_id);
CREATE INDEX idx_consultation_replied ON consultation (replied_at);

-- ─────────────────────────────────────────────────────────────
-- 환자 여정 여섯 단계 (29장 · MHTC 레퍼런스 3절 재정의안)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE journey_step (
    step_no  INTEGER PRIMARY KEY,
    title_en TEXT NOT NULL,
    lead_en  TEXT NOT NULL,
    body_en  TEXT NOT NULL,
    ask_ko   TEXT NOT NULL,
    ask_en   TEXT NOT NULL
);

-- ─────────────────────────────────────────────────────────────
-- 확인한 것과 확인하지 않은 것 (28장 — 인증 설명 페이지의 심장)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE certification_scope (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    kind     TEXT NOT NULL CHECK (kind IN ('CHECKED', 'NOT_CHECKED')),
    item_en  TEXT NOT NULL,
    item_ko  TEXT NOT NULL,
    sort_no  INTEGER NOT NULL
);
