/**
 * 문안 — 첫 화면 — 도입 영상 · 히어로 · 벤토.
 *
 * 대장은 [shell/copy.js](../shell/copy.js) 이고 이 파일은 그 한 칸이다 (규칙 2).
 * 영문이 원본이고 국문은 번역이 아니라 대응이다 — 같은 뜻을 한국어 말투로 다시 쓴 것.
 * **한쪽만 고치면 반드시 갈린다.** 32장이 금지한 낱말은 여기에도 없어야 한다.
 */
export const HOME_COPY = {
  // ── 첫 화면 도입 영상 (외주 전달용 샘플) ──
  // 20장은 첫 화면 이 자리에 캠페인 배너를 두는 것을 금지한다. 도입 영상은 그 금지와
  // 부딪히므로, 문구는 영상을 자랑하지 않고 "아래에 진짜 화면이 있다"만 말한다.
  introLine: {
    en: "Hospitals in Seoul, and the record behind each one.",
    ko: "서울의 병원, 그리고 그 하나하나의 근거가 된 기록.",
  },
  introScroll: { en: "Scroll down to search", ko: "아래로 내려 검색하기" },
  // 우리 영상이 아니다. 출처를 화면에서 지우면 남의 것을 제 것처럼 두는 셈이 된다 (4장).
  introSource: {
    en: "Video: VisitSeoul TV, Seoul Tourism Organization. Sample only.",
    ko: "영상: 서울관광재단 VisitSeoul TV. 샘플로만 씁니다.",
  },

  // ── 첫 화면 (30장) ──
  heroTitle: {
    en: "See hospitals certified by MediCheck Korea.",
    ko: "메디체크 코리아가 인증한 병원을 확인하세요.",
  },
  // 근거가 둘이 되면서 "모두 정부 등록부에 올라 있다"가 거짓이 됐다.
  // 지금 등재된 100곳은 전부 서울시 목록을 근거로 한다 — 정부 등록은 0곳이다.
  heroLead: {
    en: "Every hospital here stands on a public record you can open and read yourself. We show which record, and the day we read it.",
    ko: "여기 있는 병원은 모두 직접 열어서 읽을 수 있는 공개 기록을 근거로 올라와 있어요. 어느 기록인지와, 그 기록을 읽은 날짜를 같이 보여 드려요.",
  },
  searchPlaceholder: {
    en: "Search by specialty, region, or hospital name",
    ko: "진료과목 · 지역 · 기관명으로 검색",
  },
  search: { en: "Search", ko: "검색" },
  statWithCount: {
    en: "{count} hospitals listed · records re-checked in {month}",
    ko: "{count}곳 등재 · {month} 근거 재확인",
  },
  // 숫자가 작으면 숫자를 쓰지 않는다 (30장)
  statWithoutCount: {
    en: "Records re-checked in {month}",
    ko: "{month} 근거 재확인",
  },

  featureChip: { en: "The badge", ko: "배지" },
  featureTitle: {
    en: "What does “verified” mean here?",
    ko: "여기서 '확인'은 무슨 뜻인가요?",
  },
  featureLead: {
    en: "It means we opened a public record ourselves, found the hospital in it, and wrote down the day we looked. The badge names which record. It is not a rating, and it is not a promise about your result.",
    ko: "협회가 공개 기록을 직접 열어 그 병원을 찾고, 열어 본 날짜를 적어 두었다는 뜻이에요. 어느 기록인지는 배지가 밝혀요. 등급도 아니고, 결과에 대한 약속도 아니에요.",
  },
  readWhatWeCheck: { en: "What we check", ko: "무엇을 확인하나요" },
  readRemovals: { en: "See removals", ko: "내려간 목록" },

  cardFindLead: {
    en: "Filter by specialty, region, and language.",
    ko: "진료과목 · 지역 · 언어로 걸러 보세요.",
  },
  cardJourneyLead: {
    en: "From choosing a hospital to going home — and what to ask.",
    ko: "병원 고르기부터 귀국까지. 단계마다 무엇을 물어야 하는지.",
  },
  cardRemovalsTitle: { en: "Removals", ko: "하차 기록" },
  cardRemovalsLead: {
    en: "Every removal, with the date and the reason. Nothing is deleted quietly.",
    ko: "내려간 기관을 날짜와 사유와 함께. 조용히 지우지 않아요.",
  },
  cardOrderTitle: { en: "How this list is ordered", ko: "목록 순서" },
  cardOrderLead: {
    en: "Sorted by name. Position is not for sale — nobody can move a hospital up.",
    ko: "기관명 순이에요. 순서는 팔지 않고, 손으로 올릴 수도 없어요.",
  },
  open: { en: "Open", ko: "열기" },
};
