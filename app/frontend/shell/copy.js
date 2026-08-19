/**
 * 문안 대장 (32장).
 *
 * 영문이 원본이고 국문은 번역이 아니라 대응이다 — 같은 뜻을 한국어 말투로 다시 쓴 것.
 * 새 문구가 생기면 여기 두 줄로 함께 넣는다. **한쪽만 고치면 반드시 갈린다.**
 *
 * 32장이 금지한 낱말은 이 파일에 없어야 한다 —
 * best · top · leading · No.1 · guarantee · ensure · promise · safe · risk-free ·
 * world-class · premium · trusted · reliable · government-approved · accredited ·
 * 그리고 1층에 쓰는 'certified'.
 */
import { CERTIFICATION_COPY } from "../certification/copy.js";
import { CONSULTATION_COPY } from "../consultation/copy.js";
import { CONTENT_COPY } from "../content/copy.js";
import { HOME_COPY } from "../home/copy.js";
import { HOSPITAL_COPY } from "../hospital/copy.js";
import { INQUIRY_COPY } from "../inquiry/copy.js";
import { JOURNEY_COPY } from "../journey/copy.js";
import { PRICE_COPY } from "../price/copy.js";

/**
 * 화면마다 흩어진 문안을 한 덩어리로 모은다. 화면은 지금까지처럼 t("key") 하나만 쓴다 —
 * 어느 파일에 있는지 알 필요가 없다.
 *
 * <b>열쇠가 겹치면 그 자리에서 멈춘다.</b> 겹친 채로 합치면 한쪽이 조용히 지워지고,
 * 화면에는 다른 화면의 문구가 나온다 — 찾기 가장 어려운 종류의 버그다.
 */
function ledger(...parts) {
  const all = {};
  for (const part of parts) {
    for (const [key, value] of Object.entries(part)) {
      if (key in all) {
        throw new Error(`문안 열쇠가 겹친다: ${key}`);
      }
      all[key] = value;
    }
  }
  return all;
}

/* 사이트 틀이 쓰는 문안 — 브랜드 · 메뉴 이름 · 배지 · 푸터. 화면 하나에 매이지 않는다 */
const SHELL_COPY = {
  brand: { en: "MediCheck Korea", ko: "메디체크 코리아" },

  findAHospital: { en: "Find a hospital", ko: "기관 찾기" },
  aboutCertification: { en: "About certification", ko: "인증 설명" },
  content: { en: "Content", ko: "컨텐츠" },
  patientJourney: { en: "Patient journey", ko: "환자 여정" },
  onlineConsultation: { en: "Online consultation", ko: "온라인 상담" },
  sendAnInquiry: { en: "Send an inquiry", ko: "문의 보내기" },

  // ── 배지 (32장 대장) ──
  // 배지 문구는 근거마다 다르다. 무엇을 보고 붙였는지를 배지가 이름으로 말한다 —
  // 'Verified' 한 낱말로 뭉뚱그리면 두 근거가 같은 것처럼 읽힌다.
  registered: { en: "Registered with MOHW", ko: "보건복지부 등록" },
  badgeSEOUL: { en: "Listed by Seoul Medical Tourism", ko: "서울시 의료관광 협력기관" },
  checkedOn: { en: "Checked by KMTPA on {date}", ko: "협회가 {date}에 확인" },
  seeSource: { en: "See the source", ko: "원문 보기" },
  verifiedOn: { en: "Verified by KMTPA on {date}", ko: "협회가 {date}에 확인" },
  regNo: { en: "Reg. no. {no}", ko: "등록번호 {no}" },
  updatedOn: { en: "Updated {date}", ko: "{date} 갱신" },
  updatedLabel: { en: "Last updated", ko: "마지막 갱신" },
  whatDoesThisMean: { en: "What does this mean?", ko: "이게 무슨 뜻인가요?" },

  // ── 푸터 ──
  footerSay: {
    en: "MediCheck Korea is run by the Korea Medical Tourism Promotion Association. We check the public record a hospital stands on, and publish what we checked, when, and what we did not check.",
    ko: "메디체크 코리아는 한국의료관광진흥협회가 운영해요. 기관이 근거로 삼는 공개 기록을 확인하고, 무엇을 언제 확인했는지와 확인하지 않은 것을 함께 공개해요.",
  },

  loading: { en: "Loading…", ko: "불러오는 중…" },
  none: { en: "—", ko: "—" },
};

export const COPY = ledger(
  SHELL_COPY,
  CERTIFICATION_COPY,
  CONSULTATION_COPY,
  CONTENT_COPY,
  HOME_COPY,
  HOSPITAL_COPY,
  INQUIRY_COPY,
  JOURNEY_COPY,
  PRICE_COPY,
);


export function line(key, lang, values) {
  const entry = COPY[key];
  if (!entry) {
    return key;
  }
  let text = entry[lang] ?? entry.en;
  if (values) {
    for (const [name, value] of Object.entries(values)) {
      text = text.replaceAll(`{${name}}`, String(value));
    }
  }
  return text;
}
