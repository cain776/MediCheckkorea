/**
 * 문안 — 온라인 상담.
 *
 * 대장은 [shell/copy.js](../shell/copy.js) 이고 이 파일은 그 한 칸이다 (규칙 2).
 * 영문이 원본이고 국문은 번역이 아니라 대응이다 — 같은 뜻을 한국어 말투로 다시 쓴 것.
 * **한쪽만 고치면 반드시 갈린다.** 32장이 금지한 낱말은 여기에도 없어야 한다.
 */
export const CONSULTATION_COPY = {
  // ── 온라인 상담 (게시판) ──
  // 문의(Send an inquiry)와 다른 자리다. 문의는 한 기관에게 보내고 회신은 협회를
  // 거치지 않는다(5장). 여기는 협회에게 묻고, 물음과 답이 목록으로 남는다.
  consultLead: {
    en: "Nothing here is a medical opinion — for anything about your own treatment, write to the hospital.",
    ko: "여기 있는 답은 의학적 판단이 아니에요 — 본인의 치료에 관한 것은 병원에 직접 물어보세요.",
  },
  consultSampleTitle: { en: "These are sample posts", ko: "여기 글은 샘플이에요" },
  consultSampleBody: {
    en: "All {count} posts below were written to show what this board looks like in several languages. They are not real consultations, and they come out before the site opens.",
    ko: "아래 {count}건은 이 게시판이 여러 언어에서 어떻게 보이는지 확인하려고 지어 넣은 글이에요. 실제 상담이 아니고, 공개 전에 지웁니다.",
  },
  consultTotal: { en: "{total} posts", ko: "총 {total}건" },
  consultAnswered: { en: "{count} answered", ko: "답변완료 {count}" },
  consultWaiting: { en: "{count} waiting", ko: "대기중 {count}" },
  consultSearch: { en: "Search the questions", ko: "질문 검색" },
  allLanguages: { en: "All languages", ko: "전체 언어" },
  colNo: { en: "No.", ko: "번호" },
  colLang: { en: "Language", ko: "언어" },
  colTitle: { en: "Title", ko: "제목" },
  colAuthor: { en: "Written by", ko: "작성자" },
  colAnswered: { en: "Answer", ko: "답변여부" },
  colWrittenOn: { en: "Date", ko: "작성일" },
  stateAnswered: { en: "Answered", ko: "답변완료" },
  stateWaiting: { en: "Waiting", ko: "대기중" },
  threadQuestion: { en: "Question", ko: "질문" },
  threadAnswer: { en: "Answer from the association", ko: "협회 답변" },
  threadWaitingBody: {
    en: "Not answered yet. The association answers in the language the question arrived in, which sometimes takes longer than a day — the date it was written stays above so nobody has to guess how long it has been waiting.",
    ko: "아직 답이 달리지 않았어요. 협회는 물음이 온 언어로 답하기 때문에 하루를 넘길 때가 있어요. 얼마나 기다렸는지 짐작하지 않아도 되도록 작성일을 그대로 두었어요.",
  },
  consultNoneTitle: { en: "No question matches.", ko: "해당하는 글이 없어요." },
  consultNoneLead: {
    en: "Try another language, or clear the search.",
    ko: "다른 언어를 고르거나 검색어를 지워 보세요.",
  },
  consultNotHereTitle: {
    en: "What this board cannot answer",
    ko: "이 게시판이 답할 수 없는 것",
  },
  consultNotHereBody: {
    en: "Prices, waiting times, and whether a treatment suits you are decided by the hospital, not by the association. Those go to the hospital through an inquiry — the reply comes back from the hospital itself.",
    ko: "가격과 대기 기간, 그 치료가 본인에게 맞는지는 병원이 정하는 것이지 협회가 정하는 것이 아니에요. 그런 물음은 문의로 병원에 바로 가고, 답도 병원이 직접 해요.",
  },
};
