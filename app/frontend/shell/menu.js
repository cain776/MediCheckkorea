/**
 * 메뉴 · 경로 · API 를 한 곳에서 정한다.
 *
 * 자바 쪽 SpaWebConfig 의 표와 같은 것을 말하고 있다. 두 곳에 있는 것이 마음에 들지
 * 않지만, 서버는 어떤 경로를 index.html 로 넘길지 알아야 하고 화면은 그 경로에 무엇을
 * 그릴지 알아야 한다 — 둘 다 없앨 수는 없다. 대신 **줄 순서와 낱말을 똑같이** 둬서
 * 한쪽만 고치면 눈에 띄게 했다.
 *
 * 메뉴 이름은 영문이 원본이다(14장). 경로는 그 이름을 소문자·하이픈으로 옮긴 것이다.
 */
export const MENU = [
  { key: "findAHospital", path: "/find-a-hospital", api: "/api/hospitals" },
  { key: "aboutCertification", path: "/about-certification", api: "/api/certification" },
  { key: "checkThePrice", path: "/check-the-price", api: "/api/prices" },
  { key: "content", path: "/content", api: "/api/content" },
  { key: "patientJourney", path: "/patient-journey", api: "/api/journey" },
  { key: "onlineConsultation", path: "/online-consultation", api: "/api/consultations" },
];

export const INQUIRY = { key: "sendAnInquiry", path: "/send-an-inquiry", api: "/api/inquiries" };

export const HOME = { path: "/", api: "/api/home" };
