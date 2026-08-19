/**
 * 문안 — 기관 찾기와 기관 상세 — 목록 · 거르기 · 탭 셋.
 *
 * 대장은 [shell/copy.js](../shell/copy.js) 이고 이 파일은 그 한 칸이다 (규칙 2).
 * 영문이 원본이고 국문은 번역이 아니라 대응이다 — 같은 뜻을 한국어 말투로 다시 쓴 것.
 * **한쪽만 고치면 반드시 갈린다.** 32장이 금지한 낱말은 여기에도 없어야 한다.
 */
export const HOSPITAL_COPY = {
  // ── 기관 찾기 ──
  findLead: {
    en: "Each badge names what it stands on — the government register, or Seoul's medical tourism directory — with the date we checked it. Open a hospital to see the source itself.",
    ko: "배지마다 무엇을 근거로 붙었는지가 적혀 있어요 — 정부 등록부이거나, 서울시 의료관광 협력기관 목록이에요. 확인한 날짜가 함께 나오고, 기관을 열면 근거를 직접 볼 수 있어요.",
  },
  specialty: { en: "Specialty", ko: "진료과목" },
  region: { en: "Region", ko: "지역" },
  language: { en: "Language", ko: "응대 언어" },
  sort: { en: "Sort", ko: "정렬" },
  sortByName: { en: "By name", ko: "기관명 순" },
  sortByUpdated: { en: "Recently updated", ko: "최근 갱신 순" },
  all: { en: "All", ko: "전체" },
  // 거르기 줄에 그대로 붙는 문구. 고르는 상자의 짧은 라벨과 따로 둔다 —
  // 하나로 쓰면 "sorted by By name" 처럼 겹친다.
  sortedByName: { en: "sorted by name", ko: "기관명 순" },
  sortedByUpdated: { en: "sorted by most recently updated", ko: "최근 갱신 순" },
  countSorted: {
    en: "{count} hospitals · {sort}",
    ko: "{count}곳 · {sort}",
  },
  seeAll: { en: "See all", ko: "전체 보기" },

  emptyTitle: { en: "No hospital matches all of these filters.", ko: "이 조건을 모두 만족하는 기관이 없어요." },
  emptyLead: {
    en: "The narrowest one here is {filter} — try releasing that first.",
    ko: "가장 좁은 조건은 {filter} 예요. 그것부터 풀어 보세요.",
  },
  emptyRelease: { en: "Release {filter}", ko: "{filter} 풀기" },
  emptyAll: { en: "Show every hospital", ko: "전체 목록 보기" },

  // ── 기관 상세 ──
  specialties: { en: "Specialties", ko: "진료과목" },
  languages: { en: "Languages", ko: "응대 언어" },
  address: { en: "Address", ko: "주소" },
  website: { en: "Website", ko: "홈페이지" },
  about: { en: "About", ko: "소개" },
  registrationExpires: { en: "Registration valid to", ko: "등록 만료" },
  visitWebsite: { en: "Visit website", ko: "홈페이지 열기" },
  whereItIs: { en: "Where it is", ko: "위치" },
  openInMaps: { en: "Open in Google Maps", ko: "구글 지도에서 열기" },
  // 지도는 주소를 그린 것이지 협회가 확인한 것이 아니다. 배지가 말하는 범위 밖이다.
  mapNote: {
    en: "The map is drawn from the address above. We did not verify the location on the ground.",
    ko: "지도는 위 주소로 그린 거예요. 협회가 현장에서 위치를 확인한 것은 아니에요.",
  },

  // ── 기관 상세의 탭 셋 ──
  // 탭을 가르는 선은 출처의 선이다 — 기관이 낸 것 · 협회가 줄 것 · 남이 쓴 것.
  tabBasic: { en: "Basic information", ko: "기본정보" },
  tabCertification: { en: "Certification", ko: "인증 정보" },
  tabReviews: { en: "Reviews", ko: "고객평가" },

  whyThisMedal: { en: "Why this medal", ko: "이 메달을 왜 받았나" },
  whyThisMedalLead: {
    en: "A grade is given on four axes, 25 points each, with a floor on every one. Miss the floor on a single axis and no grade is issued, whatever the total.",
    ko: "등급은 네 축으로 줍니다. 각 25점이고 축마다 최소선이 있어요. 한 축이라도 최소선에 못 미치면 총점과 무관하게 등급을 주지 않아요.",
  },
  notAssessedTitle: { en: "This hospital has not been assessed", ko: "이 기관은 아직 심사받지 않았어요" },
  notAssessedBody: {
    en: "MediCheck certification is not in operation yet, so no hospital carries a grade — including {name}. The medal on the photo is there to check the screen, not to state a result. What the four axes below show is what would be looked at.",
    ko: "메디체크 인증은 아직 시행 전이라 등급이 붙은 기관이 없어요 — {name}도 마찬가지예요. 사진 위 메달은 화면을 보기 위한 것이지 결과를 말하는 것이 아니에요. 아래 네 축은 무엇을 보게 되는지를 보여 줄 뿐이에요.",
  },
  assessedOn: { en: "Assessed on", ko: "심사한 날" },
  gradeExpiresOn: { en: "Grade valid to", ko: "등급 만료" },
  howAssessed: { en: "How an assessment runs", ko: "심사는 어떻게 진행되나" },

  reviewsNotOurs: { en: "These are not our reviews", ko: "협회가 받은 후기가 아니에요" },
  reviewsNotOursBody: {
    en: "The association does not collect reviews and does not rate care. What belongs here is what other people wrote on Google — we neither check it nor choose which ones to show.",
    ko: "협회는 후기를 받지 않고 진료를 평가하지도 않아요. 여기 들어올 것은 다른 사람들이 구글에 쓴 글이고, 협회는 그것을 확인하지도 고르지도 않아요.",
  },
  reviewsEmpty: { en: "No reviews here yet.", ko: "아직 여기에 후기가 없어요." },
  reviewsEmptyLead: {
    en: "Google reviews are not connected yet. Until they are, we do not put anything in this space — an empty tab is honest, and a made-up one is not.",
    ko: "구글 후기는 아직 연결되지 않았어요. 연결되기 전까지 이 자리를 채우지 않아요 — 비어 있는 것은 사실이고, 채워 넣은 것은 사실이 아니니까요.",
  },
  reviewsOnGoogle: { en: "See {name} on Google", ko: "구글에서 {name} 보기" },

  // 아래 여섯은 **서울시 상세 페이지에서 옮겨 적은 것**이다 (V10).
  // 협회가 확인한 것이 아니므로 화면에서도 배지와 섞지 않고 한 묶음으로 세운다.
  fromSeoul: { en: "From the Seoul directory", ko: "서울시 목록에서 옮겨 적음" },
  fromSeoulBody: {
    en: "The hospital gave these to the city, and we copied them on {date} without checking them. What the association checked is the two lines beside the badge — nothing here.",
    ko: "기관이 서울시에 제출한 내용을 {date}에 그대로 옮겨 적었고, 협회가 확인하지는 않았어요. 협회가 확인한 것은 배지 옆 두 줄뿐이에요.",
  },
  focusTreatments: { en: "Focus treatments", ko: "특화진료" },
  facility: { en: "Facility", ko: "시설" },
  facilityDoctors: { en: "{count} doctors", ko: "의료진 {count}명" },
  facilityBeds: { en: "{count} beds", ko: "병상 {count}개" },
  openingHours: { en: "Opening hours", ko: "운영시간" },
  phone: { en: "Phone", ko: "연락처" },
  email: { en: "Email", ko: "이메일" },
  gettingThere: { en: "Getting there", ko: "찾아오는 길" },

  backToList: { en: "Back to the list", ko: "목록으로" },
  notFoundTitle: { en: "This hospital is not listed.", ko: "이 기관은 목록에 없어요." },
  notFoundLead: {
    en: "It may never have been listed, or it may have come off the list. Removals are published with the date and the reason.",
    ko: "처음부터 등재된 적이 없거나, 목록에서 내려간 곳일 수 있어요. 내려간 기록은 날짜와 사유와 함께 공개돼요.",
  },
};
