/**
 * 문안 — 인증 설명 — 메디체크 인증과 추가 인증.
 *
 * 대장은 [shell/copy.js](../shell/copy.js) 이고 이 파일은 그 한 칸이다 (규칙 2).
 * 영문이 원본이고 국문은 번역이 아니라 대응이다 — 같은 뜻을 한국어 말투로 다시 쓴 것.
 * **한쪽만 고치면 반드시 갈린다.** 32장이 금지한 낱말은 여기에도 없어야 한다.
 */
export const CERTIFICATION_COPY = {
  // ── 인증 탭 (05 등급제 검토안 21~26장) ──
  tabMedicheck: { en: "MediCheck certification", ko: "메디체크 인증" },
  tabGrounds: { en: "Listing grounds", ko: "추가 인증" },

  planTitle: { en: "A plan, not a programme yet", ko: "아직 제도가 아니라 계획안입니다" },
  planBody: {
    en: "Nothing below is in operation. No hospital has been assessed and no hospital carries a grade. We publish the design first — the scoring, the floors, the conditions for failing — because a certification whose rules appear only after the first award is not a certification.",
    ko: "아래 내용은 아직 시행되지 않습니다. 심사를 받은 기관도, 등급이 붙은 기관도 없습니다. 배점과 최소선, 떨어지는 조건을 먼저 공개하는 이유는 — 첫 수여 뒤에야 기준이 나오는 인증은 인증이 아니기 때문입니다.",
  },
  planGraded: { en: "{count} hospitals assessed so far", ko: "지금까지 심사받은 기관 {count}곳" },

  whyTitle: { en: "Why the association runs this", ko: "왜 협회가 이 인증을 하는가" },
  whyGapTitle: { en: "The badge you see today does not discriminate", ko: "지금의 배지는 변별하지 않는다" },
  whyGapBody: {
    en: "A listing badge answers one question: does this institution meet the requirement to treat patients from abroad? It is a yes-or-no fact recorded by someone else, and our work is to copy it accurately and date it. That is worth doing. But it means every listed hospital wears the same badge, so for a patient choosing between them it carries no information at all.",
    ko: "지금의 배지가 답하는 질문은 하나입니다. 이 기관이 해외 환자를 진료할 요건을 갖췄는가. 남이 기록한 사실에 대한 예/아니오이고, 협회가 하는 일은 그것을 정확히 옮겨 적고 날짜를 붙이는 것입니다. 그 일도 필요합니다. 다만 그러면 등재된 모든 기관이 같은 배지를 답니다. 그중에서 고르는 환자에게는 아무 정보도 되지 않습니다.",
  },
  whyFearTitle: {
    en: "What patients are actually afraid of is not on any register",
    ko: "환자가 실제로 두려워하는 것은 어느 등록부에도 없다",
  },
  whyFearBody: {
    en: "Nobody hesitates because a hospital might be unregistered. They hesitate because they might write and get no reply; because they might be handed a consent form they cannot read; because they might fly home and find nobody to call. None of that appears in a register, and none of it is what a register is for. Registration certifies eligibility. It says nothing about operation.",
    ko: "등록이 안 되어 있을까 봐 망설이는 사람은 없습니다. 망설이는 이유는 다른 데 있습니다 — 문의를 보냈는데 답이 안 올까 봐, 읽지도 못하는 동의서를 받게 될까 봐, 귀국한 뒤 연락할 곳이 없을까 봐. 이 중 어느 것도 등록부에 없고, 등록부가 볼 것도 아닙니다. 등록은 자격을 증명하지 운영을 말하지 않습니다.",
  },
  whyWhoTitle: {
    en: "And the association sits where that can be seen",
    ko: "그리고 그것을 볼 수 있는 자리에 협회가 있다",
  },
  whyWhoBody: {
    en: "Two things make this possible here and in few other places. Member institutions can be asked for records the state has no reason to collect. And once inquiries pass through this site, reply time stops being a claim on a form and becomes a measurement. An association that can measure what patients fear, and declines to, has left the useful half of the job undone.",
    ko: "두 가지가 이 자리에서만 가능하게 합니다. 회원 기관에는 국가가 모을 이유가 없는 자료를 요청할 수 있습니다. 그리고 문의가 이 사이트를 거치기 시작하면, 회신까지 걸린 시간은 서류에 적힌 주장이 아니라 측정값이 됩니다. 환자가 두려워하는 것을 잴 수 있는 자리에 있으면서 재지 않는다면, 쓸모 있는 절반을 하지 않은 것입니다.",
  },
  whyNotTitle: { en: "What this is not", ko: "이것이 아닌 것" },
  whyNotBody: {
    en: "It is not a clinical quality rating. The association does not evaluate outcomes, surgical skill, or whether one hospital treats better than another, and could not do so responsibly. Every axis below concerns how an institution handles an international patient — a matter of process and record, not of medicine.",
    ko: "진료의 질을 매기는 등급이 아닙니다. 협회는 치료 결과도, 의료진의 술기도, 어느 기관이 더 잘 치료하는지도 평가하지 않으며 책임 있게 그럴 수도 없습니다. 아래 네 축은 전부 기관이 해외 환자를 어떻게 다루는가에 대한 것이고, 그것은 의술이 아니라 절차와 기록의 문제입니다.",
  },

  structureTitle: { en: "How it is kept from being bought", ko: "돈으로 사지 못하게 만드는 법" },
  structureLead: {
    en: "The association is paid by the institutions it assesses. That is the ordinary shape of certification, and it is also the shape of a conflict of interest. Saying we will resist it is not enough — the resistance has to be structural.",
    ko: "협회는 심사 대상에게서 돈을 받습니다. 인증 제도의 통상적인 모양이면서 동시에 이해충돌의 모양이기도 합니다. 그러지 않겠다는 다짐으로는 부족하고, 막는 것이 구조여야 합니다.",
  },
  rule1: { en: "The fee buys an assessment, never a result", ko: "돈은 심사를 받을 권리를 사지, 결과를 사지 않는다" },
  rule1b: {
    en: "A flat fee. A hospital that fails pays the same as one that passes.",
    ko: "정액입니다. 떨어져도 심사비는 같습니다.",
  },
  rule2: { en: "The scoring is published before the first assessment", ko: "배점표를 첫 심사 전에 공개한다" },
  rule2b: {
    en: "And it is not lowered afterwards. Lowering a published bar is how an assessment turns into a sale.",
    ko: "그리고 나중에 낮추지 않습니다. 공개한 기준을 내리는 순간 심사가 판매가 됩니다.",
  },
  rule3: { en: "The distribution and the failure count are published every year", ko: "등급 분포와 탈락 건수를 매년 공개한다" },
  rule3b: {
    en: "If most applicants come out Platinum, the bar was wrong. Publishing it is what forces the correction.",
    ko: "신청자 대부분이 플래티넘으로 나오면 그 기준이 틀린 것입니다. 공개하는 것이 그 교정을 강제합니다.",
  },
  rule4: { en: "Whoever sells does not assess", ko: "파는 사람이 심사하지 않는다" },
  rule4b: {
    en: "The same separation an ISO certification body keeps between consulting and auditing, for the same reason.",
    ko: "ISO 인증기관이 컨설팅과 심사를 겸하지 못하는 것과 같은 분리이고, 같은 이유입니다.",
  },
  rule5: { en: "A grade is optional; listing never depends on it", ko: "등급은 선택이고, 등재가 등급에 달리지 않는다" },
  rule5b: {
    en: "A hospital with no grade sits in the same list, in the same card, in the same order.",
    ko: "등급이 없는 기관도 같은 목록에, 같은 카드로, 같은 순서 안에 섭니다.",
  },
  rule6: { en: "The list is never sorted by grade", ko: "목록을 등급 순으로 정렬하지 않는다" },
  rule6b: {
    en: "Sorted by name, as it is now. A grade can narrow a search; it cannot move a hospital up.",
    ko: "지금처럼 기관명 순입니다. 등급으로 거를 수는 있어도 순서를 올릴 수는 없습니다.",
  },

  axesTitle: { en: "What is assessed", ko: "무엇을 보는가" },
  axesLead: {
    en: "Four axes, 25 points each. They were not chosen for symmetry — each one answers a specific thing patients say they are afraid of.",
    ko: "네 축, 각 25점입니다. 대칭을 맞추려고 넷으로 나눈 것이 아니라, 각 축이 환자가 두렵다고 말하는 것 하나에 대응합니다.",
  },
  axisFear: { en: "The fear it answers", ko: "답하려는 두려움" },
  axisLooks: { en: "What is looked at", ko: "무엇을 보나" },
  axisEvidence: { en: "Evidence", ko: "근거" },
  axisPoints: { en: "{points} points · floor {floor}", ko: "{points}점 · 최소선 {floor}" },
  floorTitle: { en: "A floor on every axis, not just a total", ko: "총점만이 아니라 축마다 최소선을 둔다" },
  floorBody: {
    en: "Fall below the floor on any single axis and no grade is issued, whatever the total. On totals alone a hospital could score zero on aftercare and still come out Gold — and that grade would be a lie told to the patient who needed aftercare most.",
    ko: "한 축이라도 최소선에 못 미치면 총점과 무관하게 등급을 주지 않습니다. 총점만 보면 사후관리가 0점이어도 다른 셋으로 골드가 나올 수 있고, 그 등급은 사후관리가 가장 필요했던 환자에게 하는 거짓말이 됩니다.",
  },

  gradesTitle: { en: "The four grades", ko: "네 등급" },
  gradesLead: {
    en: "Awarded on the published scale while the pool is small. Percentile bands are shown for reference only: among a few dozen institutions, a top 1% is a fraction of one hospital, and a grade that falls because another hospital improved is a grade nobody accepts.",
    ko: "모수가 작은 동안에는 공개된 점수 구간으로 줍니다. 백분위는 참고로만 적습니다 — 수십 곳에서 상위 1%는 한 곳도 되지 않고, 남이 잘해서 내 등급이 내려가면 아무도 승복하지 않습니다.",
  },
  gradeScore: { en: "{score} points and above", ko: "{score}점 이상" },
  gradeRef: { en: "reference: {band}", ko: "참고: {band}" },
  gradeValid: { en: "Valid for two years", ko: "유효기간 2년" },
  gradeValidBody: {
    en: "Long enough to be worth earning, short enough that nobody is wearing a grade awarded three years ago. The date it was given and the date it expires sit next to the badge, as every other claim on this site does.",
    ko: "받을 값어치가 있을 만큼 길고, 3년 전에 받은 플래티넘이 생기지 않을 만큼 짧습니다. 이 사이트의 다른 모든 주장처럼 받은 날과 만료일이 배지 옆에 함께 나옵니다.",
  },

  medalTitle: { en: "Medals, not stars", ko: "별이 아니라 메달" },
  medalBody: {
    en: "Stars would be read as patient reviews, which this site does not collect, or as a hotel rating. Putting a star rating on medical care is the most exposed place to stand under advertising rules, and it would state something we never measured. A medal reads as an achievement against a published bar. That difference is the defence.",
    ko: "별은 후기 별점으로 읽히거나 — 이 사이트는 후기를 받지 않습니다 — 호텔 성급으로 읽힙니다. 의료에 성급을 매기는 것은 광고 규제에서 가장 위험한 자리이고, 재지도 않은 것을 말하게 됩니다. 메달은 공개된 기준에 대한 성취로 읽힙니다. 그 차이가 방어선입니다.",
  },
  medalColour: {
    en: "The metals are desaturated on purpose, and blue stays with the listing badge — so the two layers never compete for the same colour.",
    ko: "금속색은 일부러 채도를 낮췄고, 파랑은 근거 배지 몫으로 남겼습니다 — 두 층이 같은 색을 두고 다투지 않게.",
  },

  // ── 심사 절차 · 타당성 확인 · 비교 ──
  // ISO 13485 인증기관이 의료기기 제조사를 심사하는 방식(2단계 심사 · 부적합
  // 보고서 · 사후관리 · 갱신)을 그대로 빌려온다. 보는 대상은 다르지만, 심사가
  // 방문이 되지 않게 막아 주는 것은 그 절차다.
  processTitle: { en: "How an assessment runs", ko: "심사는 어떻게 진행되는가" },
  processLead: {
    en: "Borrowed on purpose from how an ISO 13485 body audits a medical device maker: documents first, then the floor, then a written non-conformity that has to be closed before anything is issued. What is looked at is different — how an institution receives a patient from abroad, not how a factory controls a process. The two stages and the written finding are what keep an audit from becoming a visit.",
    ko: "ISO 13485 인증기관이 의료기기 제조사를 심사하는 방식을 일부러 빌려왔습니다. 서류를 먼저 보고, 그다음 현장에 가고, 부적합은 글로 적어 그것이 닫히기 전에는 아무것도 발급하지 않습니다. 보는 대상은 다릅니다 — 공장의 공정 관리가 아니라 기관이 해외 환자를 맞는 방식입니다. 다만 2단계로 나누고 발견한 것을 문서로 남기는 절차가, 심사가 방문이 되지 않게 막아 줍니다.",
  },
  step1: { en: "Stage 1 — document review", ko: "1단계 — 문서 심사" },
  step1b: {
    en: "Off-site, before anyone travels. The institution submits what it claims: the interpreter roster and the languages covered, the consent forms actually handed to patients, the procedure for handling an inquiry, the aftercare contact route, the complaint record. Stage 1 answers one question — is there a system here to audit at all? If it is not there, the on-site day is postponed rather than spent.",
    ko: "현장에 가기 전에 봅니다. 기관이 주장하는 것을 자료로 받습니다 — 통역 인력과 대응 언어, 환자에게 실제로 건네는 동의서, 문의를 처리하는 절차, 귀국 후 연락 경로, 민원 기록. 1단계가 답하는 질문은 하나입니다. 심사할 체계가 있기는 한가. 없으면 현장 심사를 미룹니다. 가서 확인할 것이 없기 때문입니다.",
  },
  step2: { en: "Stage 2 — on-site audit", ko: "2단계 — 현장 심사" },
  step2b: {
    en: "Documents say what is supposed to happen. The on-site day is where we find out whether the people who have to do it know it exists. We follow real cases end to end — an inquiry that arrived, the patient it belonged to, what went home with them — and we read records, not slides.",
    ko: "서류는 무엇이 일어나야 하는지를 말합니다. 현장은 그 일을 해야 하는 사람이 그것을 알고 있는지를 봅니다. 실제 사례 하나를 처음부터 끝까지 따라갑니다 — 들어온 문의, 그 문의의 환자, 귀국할 때 함께 나간 것. 발표 자료가 아니라 기록을 읽습니다.",
  },
  step3: { en: "Non-conformity, in writing", ko: "부적합 보고서와 시정조치" },
  step3b: {
    en: "Anything short of a requirement is written up as a non-conformity and handed over — not raised in conversation and forgotten. The institution answers with a correction and with evidence that the correction happened. Nothing is issued while one is open. An assessment that can be talked out of its findings is not an assessment.",
    ko: "요건에 못 미치는 것은 부적합 보고서로 적어 건넵니다 — 말로 하고 넘어가지 않습니다. 기관은 시정조치와 그 조치가 실제로 이루어졌다는 증거로 답합니다. 부적합이 열려 있는 동안에는 아무것도 발급하지 않습니다. 말로 무마할 수 있는 심사는 심사가 아닙니다.",
  },
  step4: { en: "Certificate issued — valid two years", ko: "인증서 발급 — 유효기간 2년" },
  step4b: {
    en: "Scored on the four axes, with the floor applied to each. An ISO certificate runs three years; this one runs two, because what it describes — who answers, in which language, how fast — changes faster than a factory process does. The certificate names the grade, the day it was awarded and the day it expires, and the same three facts sit beside the medal on this site.",
    ko: "네 축으로 점수를 매기고 축마다 최소선을 적용합니다. ISO 인증서는 3년이지만 이것은 2년입니다 — 여기서 말하는 것(누가 받는지, 어떤 언어로, 얼마나 빨리)이 공장의 공정보다 빨리 변하기 때문입니다. 인증서에는 등급과 받은 날, 만료일이 적히고, 이 사이트의 메달 옆에도 같은 세 가지가 함께 붙습니다.",
  },
  step5: { en: "Surveillance, once a year", ko: "사후관리 심사 — 해마다 한 번" },
  step5b: {
    en: "A grade awarded once and never revisited is a grade about the past. Between issue and expiry there is one lighter audit a year, aimed at what slips first: reply time, interpreter coverage, and whether the aftercare route still answers when somebody calls it.",
    ko: "한 번 받고 다시 보지 않는 등급은 과거에 대한 등급입니다. 발급과 만료 사이에 해마다 한 번, 가벼운 사후관리 심사를 둡니다. 가장 먼저 무너지는 것을 봅니다 — 회신 시간, 통역 대응, 그리고 귀국 후 연락 경로가 아직 응답하는지.",
  },
  step6: { en: "Renewal is the assessment again, not a fee", ko: "갱신은 다시 심사하는 것이지 연장이 아니다" },
  step6b: {
    en: "At expiry it starts at Stage 1 again. It is not a renewal invoice with a new date printed on it. A grade that renews by being paid for is the exact thing this whole design exists to prevent.",
    ko: "만료 시점에는 1단계부터 다시 심사합니다. 날짜만 바꿔 찍는 갱신이 아닙니다. 돈을 내면 연장되는 등급은 이 설계 전체가 막으려는 바로 그것입니다.",
  },

  validTitle: { en: "Claimed, verified, validated", ko: "주장 · 검증 · 타당성 확인" },
  validLead: {
    en: "ISO 13485 keeps apart two words that are easy to blur. Verification asks whether the thing was made to the specification. Validation asks whether the process reliably produces that result in the real world — which is why a sterile packaging line has to be validated and not merely inspected once. That distinction is what we borrow, and it is where reassurance about hospitals usually falls apart: the claim is on the form, the record exists, and the thing still does not happen at two in the morning.",
    ko: "ISO 13485 는 뭉뚱그리기 쉬운 두 낱말을 갈라 놓습니다. 검증(Verification)은 정한 대로 만들어졌는가를 묻고, 타당성 확인(Validation)은 그 공정이 현실에서 그 결과를 반복해서 내는가를 묻습니다. 멸균 포장 공정을 한 번 들여다보는 것으로 끝내지 않고 유효성 확인을 요구하는 이유가 그것입니다. 우리가 빌려오는 것은 이 구분이고, 병원에 대한 안심이 무너지는 자리도 대개 여기입니다 — 서류에 적혀 있고 기록도 있는데, 새벽 두 시에는 그 일이 일어나지 않습니다.",
  },
  valid1: { en: "The claim", ko: "주장" },
  valid1b: {
    en: "What the institution puts on the form. “Interpreters in English and Chinese, on call. Inquiries answered within 24 hours.”",
    ko: "기관이 서류에 적어 내는 것. “영어·중국어 통역 상시 대응, 문의는 24시간 안에 회신.”",
  },
  valid2: { en: "Verification — is there a record behind it?", ko: "검증 — 그 주장 뒤에 기록이 있는가" },
  valid2b: {
    en: "The roster, the shift schedule, the reply log, the signed procedure. This is the part an audit can finish in a morning, and the part a well-kept filing cabinet can satisfy on its own.",
    ko: "인력 명부, 근무표, 회신 로그, 서명된 절차서. 심사가 오전 안에 끝낼 수 있는 부분이고, 서류함만 잘 갖춰도 통과하는 부분입니다.",
  },
  valid3: { en: "Validation — does it happen when nobody is watching?", ko: "타당성 확인 — 보지 않을 때도 그렇게 되는가" },
  valid3b: {
    en: "A sample is drawn from last quarter's inquiries and the actual reply times are read off it, including the ones that arrived at night and the ones that needed an interpreter. A roster that exists while nobody answers at 2am is a process that has not been validated. Points are given for the sample, not for the roster.",
    ko: "지난 분기 문의에서 표본을 뽑아 실제 회신 시각을 읽습니다 — 밤에 들어온 건과 통역이 필요했던 건을 포함해서. 명부는 있는데 새벽 두 시에 아무도 받지 않으면 그 절차는 타당성이 확인되지 않은 것입니다. 점수는 명부가 아니라 표본에 줍니다.",
  },
  validCallout: {
    en: "Sampling is the stopgap. Measurement is the goal.",
    ko: "표본은 임시방편이고, 측정이 목표입니다.",
  },
  validCalloutBody: {
    en: "Drawing a sample once a year is what an auditor does when a process leaves no trace of its own. Inquiries sent through this site leave one. As that happens, this axis stops being an annual sample and becomes a continuous measurement — the assessment gets cheaper and harder to dress up at the same time.",
    ko: "1년에 한 번 표본을 뽑는 것은 그 절차가 스스로 흔적을 남기지 않을 때 심사자가 하는 일입니다. 이 사이트를 거쳐 간 문의는 흔적을 남깁니다. 그렇게 되는 만큼 이 축은 연 1회 표본조사에서 상시 측정으로 바뀝니다 — 심사는 더 싸지고, 동시에 꾸미기는 더 어려워집니다.",
  },

  compareTitle: { en: "How this sits next to certifications that already exist", ko: "이미 있는 인증들 옆에서 이것은 무엇인가" },
  compareLead: {
    en: "None of these is a competitor and none of them is being replaced. They answer different questions. The reason to lay them side by side is that a patient looking at a wall of logos cannot tell which question each one answered.",
    ko: "아래 어느 것도 경쟁 상대가 아니고, 무엇을 대체하지도 않습니다. 각각 다른 질문에 답합니다. 나란히 놓는 이유는, 로고가 늘어선 벽을 보는 환자는 그 하나하나가 어떤 질문에 답한 것인지 구별할 수 없기 때문입니다.",
  },
  colScheme: { en: "Certification", ko: "인증" },
  colLooks: { en: "What it looks at", ko: "무엇을 보나" },
  colWho: { en: "Who issues it", ko: "누가 주나" },
  colMeans: { en: "What it means for a patient", ko: "환자에게 무슨 뜻인가" },
  cmp13485: { en: "ISO 13485", ko: "ISO 13485" },
  cmp13485Looks: {
    en: "The quality management system of a medical device maker — design, production, installation, servicing — built on ISO 9001 with the requirements specific to devices added: regulatory compliance, contamination and environment control, risk management, traceability, labelling, validation and verification.",
    ko: "의료기기 제조사의 품질경영시스템 — 설계·생산·설치·부가서비스. ISO 9001 위에 의료기기 분야의 특성에 따른 요구사항을 더한 것입니다: 관련 법규 준수, 제조환경·오염 관리, 위험 관리, 식별 및 추적성, 라벨링, 타당성 확인과 검증.",
  },
  cmp13485Who: { en: "A third-party certification body", ko: "제3자 인증기관" },
  cmp13485Means: {
    en: "That the company making a device controls how it is made. In the EU it is also the route to a CE mark for anything above Class I under 93/42/EEC. It says nothing about how a hospital treats you.",
    ko: "기기를 만드는 회사가 그 제조를 관리하고 있다는 뜻입니다. 유럽연합에서는 93/42/EEC 에 따라 Class I 을 넘는 기기가 CE 마크를 받는 경로이기도 합니다. 어느 병원이 당신을 어떻게 대하는지는 말하지 않습니다.",
  },
  cmp9001: { en: "ISO 9001", ko: "ISO 9001" },
  cmp9001Looks: {
    en: "A quality management system in general, with no industry attached.",
    ko: "산업을 가리지 않는 일반적인 품질경영시스템.",
  },
  cmp9001Who: { en: "A third-party certification body", ko: "제3자 인증기관" },
  cmp9001Means: {
    en: "That the organisation documents and controls its own processes. A print shop and a clinic can hold the same certificate.",
    ko: "그 조직이 자기 절차를 문서화하고 관리한다는 뜻입니다. 인쇄소와 의원이 같은 인증서를 가질 수 있습니다.",
  },
  // 국가 인증제도. 2026년 11월에 기본 인증이 시행되면 중소병원에도 인증마크가 붙기
  // 시작한다 — 그 옆에서 "메디체크 인증"이 무엇인지 이 표가 먼저 말해야 한다 (38장).
  cmpKoiha: { en: "Healthcare accreditation (KOIHA)", ko: "의료기관 인증 (인증원)" },
  cmpKoihaLooks: {
    en: "Patient safety and the quality of care inside a hospital. The acute-care programme runs to more than 500 items; a lighter one for small and medium hospitals, 156 items, starts in November 2026.",
    ko: "병원 안의 환자안전과 의료 질을 봅니다. 급성기병원 인증은 항목이 500개가 넘고, 중소병원을 위한 기본 인증(156개 항목)이 2026년 11월에 시행됩니다.",
  },
  cmpKoihaWho: { en: "The state, through KOIHA", ko: "보건복지부 · 의료기관평가인증원" },
  cmpKoihaMeans: {
    en: "That the hospital met the national bar for safety and quality. Note who can apply: hospitals, not clinics. Most institutions on this site are clinics, so for them this mark is not available at all — it is not something they chose to skip.",
    ko: "그 병원이 국가가 정한 환자안전·의료 질 기준을 넘었다는 뜻입니다. 다만 신청할 수 있는 곳이 정해져 있어요 — 병원급이고, 의원은 대상이 아닙니다. 이 사이트에 실린 기관은 대부분 의원이라 이 마크를 받을 수 없어요. 안 받은 것이 아니라 받을 자리가 아닙니다.",
  },
  cmpMohw: { en: "MOHW registration · Seoul listing", ko: "보건복지부 등록 · 서울시 목록" },
  cmpMohwLooks: {
    en: "Eligibility to treat patients from abroad — the requirement, met or not met.",
    ko: "해외 환자를 진료할 자격 — 요건을 갖췄는가 아닌가.",
  },
  cmpMohwWho: { en: "The state and the city", ko: "정부와 지자체" },
  cmpMohwMeans: {
    en: "Yes or no, recorded by somebody else on a date. That is what the blue badge on this site copies, and all it copies.",
    ko: "남이 어느 날짜에 기록한 예 또는 아니오. 이 사이트의 파란 배지가 옮겨 적는 것이 그것이고, 그것이 전부입니다.",
  },
  cmpUs: { en: "MediCheck certification (planned)", ko: "메디체크 인증 (계획안)" },
  cmpUsLooks: {
    en: "How an institution receives a patient from abroad: language, the reply that comes back, what is written down, and what happens after the flight home. Process and record — never the medicine.",
    ko: "기관이 해외 환자를 맞는 방식: 언어, 돌아오는 회신, 무엇을 적어 두는지, 그리고 비행기를 타고 돌아간 뒤에 일어나는 일. 절차와 기록이며, 의술은 보지 않습니다.",
  },
  cmpUsWho: { en: "The association — assessed, not self-declared", ko: "협회 — 자체 선언이 아니라 심사" },
  cmpUsMeans: {
    en: "That the thing patients are actually afraid of was looked at, against a bar published before the first award. No institution holds it yet.",
    ko: "환자가 실제로 두려워하는 것을, 첫 수여보다 먼저 공개한 기준에 대고 확인했다는 뜻입니다. 아직 어느 기관도 받지 않았습니다.",
  },
  cmpNameTitle: {
    en: "\u2018Certification\u2019 is a word we share with the state",
    ko: "‘인증’은 국가와 나눠 쓰는 낱말입니다",
  },
  cmpNameBody: {
    en: "From November 2026 a national accreditation mark starts appearing on small and medium hospitals. Ours is a different thing, issued by a different body, looking at different work — so we put the two side by side rather than leave a patient to guess. What the association can never say is that its assessment is approved by, or equal to, the state's.",
    ko: "2026년 11월부터 국가 인증마크가 중소병원에도 붙기 시작해요. 협회 인증은 그것과 다른 기관이 다른 것을 보고 주는 것이라, 환자가 짐작하게 두는 대신 둘을 나란히 놓았어요. 협회가 절대 말할 수 없는 것은 이 심사가 국가의 승인을 받았다거나 국가 인증과 같은 것이라는 말이에요.",
  },
  compareNote: {
    en: "Why borrow this much structure from somewhere else",
    ko: "왜 남의 제도에서 이만큼 가져오는가",
  },
  compareNoteBody: {
    en: "Because the parts that make an audit hard to buy — two stages, a written non-conformity, surveillance between issues, a reassessment at renewal — were worked out over decades by people carrying the same conflict of interest we carry. Inventing a fresh procedure here would not be more rigorous. It would only be newer, and newer is easier to argue with.",
    ko: "심사를 돈으로 사기 어렵게 만드는 부분 — 2단계 심사, 글로 남기는 부적합, 발급과 발급 사이의 사후관리, 갱신 때의 재심사 — 은 우리와 같은 이해충돌을 안고 있던 사람들이 수십 년에 걸쳐 다듬은 것입니다. 여기서 새 절차를 지어낸다고 더 엄격해지지 않습니다. 더 새로울 뿐이고, 새로운 것은 반박하기 더 쉽습니다.",
  },

  openTitle: { en: "Still open", ko: "아직 정하지 않은 것" },
  open1: { en: "The score bands and floors above are a proposal, not a decision.", ko: "위 점수 구간과 최소선은 제안이며 확정이 아닙니다." },
  open2: { en: "Who assesses, and how the assessor is kept apart from whoever sells.", ko: "누가 심사하는지, 그리고 심사하는 사람을 파는 사람과 어떻게 떼어 놓을지." },
  open3: { en: "How many assessments a year the association can actually carry out.", ko: "협회가 한 해에 실제로 감당할 수 있는 심사 건수." },
  open4: {
    en: "Whether Bronze becomes a mark against a hospital rather than for it — the risk that would kill the programme.",
    ko: "브론즈가 받은 표시가 아니라 낙인이 되지 않을지 — 제도를 죽일 수 있는 위험.",
  },
  openSource: {
    en: "The full review, including the arguments for not doing this at all, is in the planning document.",
    ko: "이 제도를 하지 말아야 한다는 논리까지 담은 전체 검토는 기획서에 있습니다.",
  },

  // ── 인증 설명 (28장) ──
  certTitle: { en: "What the badge stands on", ko: "배지가 무엇을 근거로 붙나요" },
  certLead: {
    en: "A hospital gets on this site only when there is something we can point at — a public record that anyone can open and read. There are two such records, and the badge always names which one it stands on. What it never means is that we judged the care.",
    ko: "가리킬 수 있는 근거가 있을 때만 이 사이트에 올라와요 — 누구나 열어서 읽을 수 있는 공개 기록이요. 그런 기록이 둘 있고, 배지는 언제나 그중 무엇을 근거로 삼았는지를 밝혀요. 협회가 진료를 평가했다는 뜻은 어느 쪽도 아니에요.",
  },
  groundMohw: { en: "Registered with MOHW", ko: "보건복지부 등록" },
  groundMohwLead: {
    en: "Korea's Ministry of Health and Welfare keeps a register of institutions allowed to treat patients from abroad. We look the hospital up on that register ourselves.",
    ko: "한국 보건복지부는 해외 환자를 진료할 수 있는 기관의 등록부를 관리해요. 협회가 그 등록부를 직접 조회해요.",
  },
  groundSeoul: { en: "Listed by Seoul Medical Tourism", ko: "서울시 의료관광 협력기관" },
  groundSeoulLead: {
    en: "The Seoul city government publishes a directory of medical tourism partner institutions. It carries no registration number, so the badge links to the entry itself — you can open it and compare.",
    ko: "서울시는 의료관광 협력기관 목록을 공개해요. 거기에는 등록번호가 없어서, 배지가 그 항목으로 바로 이어져요 — 열어서 직접 대조하실 수 있어요.",
  },
  weChecked: { en: "What we checked", ko: "협회가 확인한 것" },
  weDidNotCheck: { en: "What we did not check", ko: "확인하지 않은 것" },
  limitsTitle: { en: "What it does not mean", ko: "이건 무슨 뜻이 아닌가요" },
  limitsBody: {
    en: "It is not a rating, and it is not a promise about your result. We did not judge prices, doctors, or whether this hospital suits you better than another one. Those are questions to ask the hospital — and the inquiry form is there for that.",
    ko: "등급이 아니고, 결과에 대한 약속도 아니에요. 가격이나 의료진, 어느 병원이 당신에게 더 맞는지를 협회가 판단하지 않았어요. 그건 병원에 물어볼 질문이고, 문의 화면이 그러라고 있는 거예요.",
  },
  endsTitle: { en: "How a hospital comes off this list", ko: "병원이 목록에서 내려가는 경우" },
  endsBody: {
    en: "If the registration lapses or is cancelled, the hospital drops off automatically — nobody has to decide. We keep the record of every removal, with the date and the reason.",
    ko: "등록이 만료되거나 취소되면 자동으로 내려가요 — 누가 판단하지 않아요. 내려간 기록은 날짜와 사유를 붙여 전부 남겨 둬요.",
  },
  standingNone: {
    en: "No hospital stands on this yet — we have not looked anyone up on the register.",
    ko: "아직 이 근거로 올라온 기관이 없어요 — 협회가 등록부를 조회한 적이 없어요.",
  },
  standingCount: { en: "{count} hospitals stand on this", ko: "{count}곳이 이 근거로 올라와 있어요" },
  removalsTitle: { en: "Removals", ko: "내려간 기록" },
  // 없는 탈락을 지어내지 않는다. 없으면 없다고 말하고, 대신 무엇을 약속하는지를 적는다 (4장)
  removalsNone: {
    en: "Nothing has come off this list yet. When a hospital does, it appears here with the date and the reason — we do not delete quietly.",
    ko: "아직 목록에서 내려간 곳이 없어요. 내려가면 날짜와 사유와 함께 여기에 나와요 — 조용히 지우지 않아요.",
  },
  colHospital: { en: "Hospital", ko: "기관명" },
  colListed: { en: "Listed", ko: "등재 기간" },
  colReason: { en: "Reason", ko: "사유" },
  REGISTRATION_EXPIRED: { en: "Registration expired", ko: "등록 만료" },
  REGISTRATION_CANCELLED: { en: "Registration cancelled", ko: "등록 취소" },
  NOT_MAINTAINED: { en: "Not maintained", ko: "갱신 방치" },
  WITHDRAWN: { en: "Withdrawn", ko: "기관 요청" },
};
