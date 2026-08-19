/**
 * 문안 — 컨텐츠 (뉴스레터).
 *
 * 대장은 [shell/copy.js](../shell/copy.js) 이고 이 파일은 그 한 칸이다 (규칙 2).
 * 영문이 원본이고 국문은 번역이 아니라 대응이다 — 같은 뜻을 한국어 말투로 다시 쓴 것.
 * **한쪽만 고치면 반드시 갈린다.** 32장이 금지한 낱말은 여기에도 없어야 한다.
 */
export const CONTENT_COPY = {
  // ── 컨텐츠 — 뉴스레터 ──
  // 협회 사이트의 communications#newsletter 를 옮겨 온 자리다. 협회 쪽 문구가
  // "매월 산업 동향·회원사 소식·정책 인사이트"인데 그대로 쓰지 않았다 — 그건 회원사에게
  // 하는 말이고, 이 사이트는 해외 환자가 보는 곳이다(2장 이용자 세 갈래).
  contentTitle: { en: "Content", ko: "컨텐츠" },
  contentLead: {
    en: "A monthly letter about what we read, what we checked, and what changed. Written for people deciding where to go — not for the industry.",
    ko: "무엇을 읽었고 무엇을 확인했고 무엇이 바뀌었는지 매월 한 통으로 정리해요. 업계가 아니라, 어디로 갈지 정하는 사람이 읽으라고 쓰는 글이에요.",
  },

  // 샘플이라는 사실을 화면이 스스로 판단하지 않는다 — 서버가 센 수를 그대로 적는다
  contentSampleTitle: { en: "These issues are placeholders", ko: "여기 호는 자리만 잡아 둔 거예요" },
  contentSampleBody: {
    en: "All {count} issues below are here to show the shape of this page. None of them has a body yet, and the first real issue has not gone out.",
    ko: "아래 {count}개 호는 이 화면이 어떻게 생겼는지 보여 주려고 둔 거예요. 아직 본문이 없고, 실제로 나간 호도 없어요.",
  },

  issueVol: { en: "Vol. {vol}", ko: "제 {vol}호" },
  issueRead: { en: "Read this issue", ko: "이 호 읽기" },
  // 본문이 없는 호. 링크를 걸어 두고 404 를 주느니 아직 없다고 말한다 (31장)
  issueComing: { en: "Not written yet", ko: "아직 안 썼어요" },

  contentEmpty: {
    en: "No issue has gone out yet. When one does, it will be here in full — you will not need an address to read it.",
    ko: "아직 나간 호가 없어요. 나오면 여기 전문이 올라와요 — 읽는 데 주소를 적지 않아도 돼요.",
  },
};
