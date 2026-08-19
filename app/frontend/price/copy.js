/**
 * 문안 — 가격 확인(정찰가).
 *
 * 대장은 [shell/copy.js](../shell/copy.js) 이고 이 파일은 그 한 칸이다 (규칙 2).
 * 영문이 원본이고 국문은 번역이 아니라 대응이다 — 같은 뜻을 한국어 말투로 다시 쓴 것.
 * **한쪽만 고치면 반드시 갈린다.** 32장이 금지한 낱말은 여기에도 없어야 한다.
 *
 * 이 화면은 **설명만 한다.** 값은 아직 하나도 없다 — 그 사실도 문구로 적는다.
 */
export const PRICE_COPY = {
  checkThePrice: { en: "Check the price", ko: "가격 확인" },

  priceLead: {
    en: "What stops most people is not the price. It is not knowing whether the price is the same one a Korean patient would be given, and whether it will still be that number after they land.",
    ko: "사람을 멈추게 하는 건 가격 자체가 아니에요. 그 값이 한국 환자가 받는 값과 같은지, 그리고 도착한 뒤에도 그 값 그대로일지를 알 수 없다는 것이에요.",
  },

  priceWhyTitle: { en: "Three things go wrong with price", ko: "가격에서 어긋나는 것 셋" },
  priceWhy1: { en: "The same procedure, a different number", ko: "같은 시술에 다른 값" },
  priceWhy1b: {
    en: "A patient from abroad has no way to tell whether the number they were given is the ordinary one. There is nothing to compare it against, so the doubt stays even when the price was fair.",
    ko: "해외에서 온 환자에게는 받은 값이 원래 값인지 알 방법이 없어요. 대조할 것이 없으니, 정당한 값을 받았을 때도 의심이 남아요.",
  },
  priceWhy2: { en: "The number grows after landing", ko: "도착한 뒤에 값이 늘어난다" },
  priceWhy2b: {
    en: "Anaesthesia, tests, medication, a second visit. Each one may be legitimate, and none of them was in the first number — which is what makes the first number feel like a trap.",
    ko: "마취, 검사, 약, 재방문. 하나하나는 정당할 수 있지만 처음 들은 값에는 없던 것들이에요. 그래서 처음 값이 덫처럼 느껴져요.",
  },
  priceWhy3: { en: "There is nobody to ask in your language", ko: "물어볼 곳이 자기 언어로 없다" },
  priceWhy3b: {
    en: "Asking what a price includes is an awkward question even in your own language. In a second language, most people stop asking and guess instead.",
    ko: "가격에 무엇이 포함되는지 묻는 건 모국어로도 어려운 질문이에요. 다른 언어로는 대개 묻기를 그만두고 짐작하게 돼요.",
  },

  priceDoesTitle: { en: "What this screen will do", ko: "이 화면이 할 일" },
  priceDoes1: {
    en: "Show the price band a hospital submitted, with the day it submitted it and the day it expires.",
    ko: "기관이 제출한 가격대를 보여 줍니다. 제출한 날과 유효기간을 함께 적어요.",
  },
  priceDoes2: {
    en: "Say what the number includes and what it does not — anaesthesia, tests, medication, follow-up.",
    ko: "그 값에 무엇이 포함되고 무엇이 빠졌는지 적어요 — 마취, 검사, 약, 경과 관찰.",
  },
  priceDoes3: {
    en: "Let you ask several hospitals at once, and let each of them reply with the exact number.",
    ko: "여러 기관에 한 번에 물을 수 있게 하고, 확정 금액은 각 기관이 직접 회신해요.",
  },
  priceDoes4: {
    en: "Record how long each reply took. That measurement becomes part of the assessment later.",
    ko: "회신까지 걸린 시간을 기록해요. 그 측정값이 나중에 심사의 한 축이 돼요.",
  },

  priceNotTitle: { en: "What it will never do", ko: "이 화면이 하지 않을 일" },
  priceNot1: {
    en: "The association does not calculate a price, and no AI here produces an estimate. Every number on this site comes from the hospital that will charge it.",
    ko: "협회는 값을 계산하지 않고, 여기의 어떤 AI도 어림값을 만들지 않아요. 이 사이트의 모든 숫자는 그 값을 받을 기관에서 나와요.",
  },
  priceNot2: {
    en: "A hospital that publishes a price is not moved up the list. Price can narrow a search; it cannot buy a position.",
    ko: "가격을 공개한 기관이 목록에서 위로 올라가지 않아요. 가격으로 거를 수는 있어도 자리를 살 수는 없어요.",
  },
  priceNot3: {
    en: "We do not advertise discounts. What a hospital charges a particular patient is between the two of them.",
    ko: "할인을 광고하지 않아요. 어느 환자에게 얼마를 받을지는 기관과 환자 사이의 일이에요.",
  },

  priceHowTitle: { en: "How it will work", ko: "어떻게 되나요" },
  priceStep1: { en: "Pick a procedure", ko: "시술을 고른다" },
  priceStep1b: {
    en: "Laser eye surgery, veneers, a health screening — the procedures hospitals here have submitted a price for.",
    ko: "시력교정, 라미네이트, 건강검진 — 기관이 가격을 제출한 시술이에요.",
  },
  priceStep2: { en: "Compare the bands", ko: "가격대를 나란히 본다" },
  priceStep2b: {
    en: "Side by side, each with the date it was submitted and what it covers. Same layout for every hospital, as the cards are.",
    ko: "제출일과 포함 범위를 붙여 나란히 보여 줘요. 카드와 마찬가지로 기관마다 같은 모양이에요.",
  },
  priceStep3: { en: "Ask, and the hospital replies with the number", ko: "물으면 기관이 확정 금액을 회신한다" },
  priceStep3b: {
    en: "One inquiry can go to more than one hospital. The exact number, and any discount, comes from the hospital — not from us.",
    ko: "한 번의 문의가 여러 기관에 갈 수 있어요. 확정 금액도 할인도 기관이 회신해요 — 협회가 아니라요.",
  },

  priceOpenTitle: { en: "Not decided yet", ko: "아직 정하지 않은 것" },
  priceOpen1: {
    en: "What a submitted price must include, so that two hospitals' numbers mean the same thing.",
    ko: "제출한 가격에 무엇까지 포함되어야 하는지 — 두 기관의 숫자가 같은 것을 뜻하게 하려면 필요해요.",
  },
  priceOpen2: {
    en: "How long a price stays valid, which currency it is stated in, and what happens when the exchange rate moves.",
    ko: "가격이 얼마 동안 유효한지, 어느 통화로 적는지, 환율이 움직이면 어떻게 되는지.",
  },
  priceOpen3: {
    en: "Whether discounts can appear here at all. Korean advertising rules treat this carefully, and so should we.",
    ko: "할인을 여기에 적을 수 있는지. 한국의 의료광고 규정이 이 부분을 조심스럽게 다루고, 협회도 그래야 해요.",
  },
  priceOpen4: {
    en: "How to prove that two patients in the same situation were quoted the same number. A fixed price that nobody can check is not a fixed price.",
    ko: "같은 조건의 두 환자가 같은 값을 받았다는 것을 어떻게 확인할지. 확인할 수 없는 정찰가는 정찰가가 아니에요.",
  },

  priceNoneTitle: { en: "No hospital has submitted a price yet", ko: "아직 가격을 제출한 기관이 없어요" },
  priceNoneBody: {
    en: "{count} hospitals have published a price here. This screen explains what is being built and why; the prices themselves come after the questions above are settled.",
    ko: "여기에 가격을 공개한 기관은 {count}곳이에요. 이 화면은 무엇을 왜 만드는지를 설명하는 자리이고, 가격 자체는 위의 물음이 정해진 뒤에 올라와요.",
  },
};
