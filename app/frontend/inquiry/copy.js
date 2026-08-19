/**
 * 문안 — 문의.
 *
 * 대장은 [shell/copy.js](../shell/copy.js) 이고 이 파일은 그 한 칸이다 (규칙 2).
 * 영문이 원본이고 국문은 번역이 아니라 대응이다 — 같은 뜻을 한국어 말투로 다시 쓴 것.
 * **한쪽만 고치면 반드시 갈린다.** 32장이 금지한 낱말은 여기에도 없어야 한다.
 */
export const INQUIRY_COPY = {
  // ── 정적 갈래에서만 보이는 안내 ──
  // 서버 없이 화면만 올린 판에서는 문의가 나갈 데가 없다. 눌러 본 뒤에 실패하게
  // 두지 않고 **적기 전에** 말한다 — 27장이 "무엇이 일어나는지 먼저 말한다"고 했다.
  sampleOnlyTitle: {
    en: "This copy cannot send inquiries",
    ko: "이 화면에서는 문의가 보내지지 않아요",
  },
  sampleOnlyBody: {
    en: "This is a sample build with no server behind it, put online to show what the screens look like. The working version passes your inquiry to the hospital and the hospital replies to you directly.",
    ko: "화면이 어떻게 생겼는지 보여 주려고 서버 없이 올린 샘플이에요. 실제 화면은 문의를 병원으로 넘기고, 병원이 직접 답을 보내요.",
  },

  // ── 문의 (27장) ──
  inquiryTitle: { en: "Send an inquiry", ko: "문의 보내기" },
  inquiryLead: {
    en: "The hospital reads this and replies to you directly. We pass it on and check that an answer went out — we do not answer on their behalf.",
    ko: "병원이 이걸 읽고 직접 답장해요. 협회는 전달하고 답이 나갔는지 확인할 뿐, 대신 답하지 않아요.",
  },
  fName: { en: "Your name", ko: "이름" },
  fEmail: { en: "Email", ko: "이메일" },
  fHospital: { en: "Hospital", ko: "기관" },
  fNeed: { en: "What do you need", ko: "문의 내용" },
  fNeedHint: {
    en: "The hospital answers this itself, so a line or two about what you are looking for gets you a useful reply.",
    ko: "병원이 직접 답하니까, 무엇을 알아보는지 한두 줄만 적어도 쓸모 있는 답이 와요.",
  },
  fCountry: { en: "Country you're coming from", ko: "출발 국가" },
  fPhone: { en: "Phone", ko: "연락처" },
  fWhen: { en: "Roughly when", ko: "희망 시기" },
  // 달력을 두지 않는다. 고른 날짜를 아무도 지켜 줄 수 없다 (27장)
  fWhenHint: { en: "A month is enough — nobody can hold a date yet.", ko: "달만 골라도 돼요 — 아직 날짜를 잡아 줄 수 있는 사람은 없어요." },
  fAnswerIn: { en: "Answer me in", ko: "회신 언어" },
  fRecords: { en: "I already have medical records for this", ko: "관련 진료 기록이 있어요" },
  fRecordsHint: {
    en: "Yes or no is all we need. Don't attach anything here — the hospital will tell you what to send, and it goes to them, not to us.",
    ko: "예/아니오만 알면 돼요. 여기에 파일을 붙이지 마세요 — 무엇을 보낼지는 병원이 알려 주고, 그건 협회가 아니라 병원에게 가요.",
  },
  optional: { en: "optional", ko: "선택" },
  consent: {
    en: "We send what you write here to the hospital you picked, and keep a copy for 2 years so we can check that they replied. Nothing else. You can ask us to delete it at any time.",
    ko: "여기 쓰신 내용은 고르신 병원으로 보내고, 회신 여부를 확인하려고 2년간 보관해요. 그 밖의 용도는 없어요. 언제든 지워 달라고 하실 수 있어요.",
  },
  submit: { en: "Send to the hospital", ko: "병원으로 보내기" },
  submitting: { en: "Sending…", ko: "보내는 중…" },
  choose: { en: "Choose a hospital", ko: "기관을 고르세요" },

  notAskTitle: { en: "What we don't ask for", ko: "묻지 않는 것" },
  notAsk1: { en: "Your diagnosis, history, test results, or photos", ko: "진단명 · 병력 · 검사 결과 · 사진" },
  notAsk2: { en: "Passport number or date of birth", ko: "여권번호 · 생년월일" },
  notAsk3: { en: "Your budget", ko: "예산" },
  notAsk4: { en: "An account — there is nothing to sign up for", ko: "회원가입 — 만들 계정이 없어요" },
  notAskWhy: {
    en: "Those belong between you and the hospital. Holding them here would only mean more for us to protect.",
    ko: "그건 환자와 병원 사이의 일이에요. 협회가 들고 있으면 지킬 것만 늘어나요.",
  },

  sentTitle: { en: "Your inquiry is on its way to {hospital}.", ko: "문의가 {hospital}(으)로 갔어요." },
  sentLead: {
    en: "The hospital replies to you directly — we do not answer on their behalf. You should hear back within {days} business days.",
    ko: "답장은 병원이 직접 보내요 — 협회가 대신 답하지 않아요. {days}영업일 안에 회신을 받게 돼요.",
  },
  sentChase: {
    en: "Nothing after that? Tell us and we will chase it.",
    ko: "그때까지 답이 없으면 알려 주세요. 저희가 확인할게요.",
  },
  findAnother: { en: "Find another hospital", ko: "다른 기관 찾기" },
};
