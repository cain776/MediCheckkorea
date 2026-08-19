# medicheck/app — 1단계 화면

기획서 [01](../docs/01-기획서.html)~[07](../docs/07-화면-설계.html) 의 1단계를 실제로 돌려 보는 것.
**검색 · 신뢰 확인 · 문의**까지만 한다. 예약 버튼은 없다 — 누르면 답이 없는 버튼은
한 번으로 신뢰를 잃는다([10장](../docs/03-단계와-수익.html#s10)).

## 돌리기

바로 위 폴더의 **[`start-server.bat`](../start-server.bat)** 을 실행한다. 협회 저장소의
`start-server.bat` 과 같은 자리·같은 꼴이다.

```
start-server.bat                 홈
start-server.bat find            Find a hospital
start-server.bat certification   About certification
start-server.bat journey         Patient journey
start-server.bat inquiry         Send an inquiry
start-server.bat --no-browser    브라우저를 열지 않는다
start-server.bat --no-build      프런트 번들 단계를 건너뛴다
```

한 번에 이만큼 한다 — 필요한 파일과 Java 21 확인 → (처음이면) `npm install` →
프런트 번들 → **8081 을 쥐고 있는 이전 서버 정리** → `gradlew bootRun` →
포트가 열리면 브라우저.

**8080·5500 은 건드리지 않는다.** 거긴 협회 서버 자리이고, 여기서 죽이면
이 프로젝트와 상관없는 서비스가 멈춘다.

손으로 하려면:

```bash
npm install
npm run build          # frontend/ → src/main/resources/static/assets/
./gradlew bootRun      # http://localhost:8081
```

화면을 고치는 중이라면 `npm run watch` 를 따로 띄워 둔다. 서버를 다시 띄울 필요는
없다 — `application.properties` 가 정적 파일을 `src` 에서 먼저 찾게 해 두었다.
그 줄이 없으면 `bootRun` 은 build 폴더로 복사된 사본을 계속 주고, **새로고침해도
화면이 안 바뀌면서 왜 안 바뀌는지는 아무 데도 안 나온다.**

## 화면 검증

```bash
npm run verify          # 서버가 떠 있어야 한다
```

여섯 화면을 **320 · 375 · 768 · 1440px** 로 실제 브라우저에서 열어 본다. 한 번에
24개 조합이고 20초쯤 걸린다. 무엇을 보나:

| 검사 | 왜 |
| --- | --- |
| 콘솔 오류 · pageerror | 화면은 멀쩡해 보이면서 기능만 죽는 경우 |
| 4xx/5xx 응답 | 번들이나 API 가 빠진 것 |
| 화면 밖으로 나간 요소 | 좁은 폭에서 손이 안 닿는 자리 |
| 두 줄로 접힌 버튼·링크 | 좁은 폭에서 누를 수 없게 되는 자리 |

1440px 그림은 `build/screens/` 에 남는다.

**`scrollWidth` 로 가로 넘침을 재지 않는다.** 이 화면은 `html` 에
`overflow-x: clip` 을 걸어 두었고, 그러면 넘친 만큼 `scrollWidth` 가 자라지 않는다 —
그 방식으로 재면 무엇을 해도 통과한다. 처음에 그렇게 짰다가 일부러 레이아웃을
깨뜨려 보고서야 알았다. 지금은 요소의 오른쪽 끝을 직접 보고, 가로로 구르라고 만든
상자(`.scroll-x` · `.table-wrap` · `.nav__links`) 안쪽은 뺀다.

Playwright 는 **1.62.1 로 고정**한다. 이 버전이 chromium 1234 를 쓴다 —
버전을 낮추면 1223 을 보게 되고, 그러면 1234 는 아무도 참조하지 않아
다음 `playwright install` 때 정리된다.

| 환경 변수 | 기본값 | 무엇 |
| --- | --- | --- |
| `MEDICHECK_PORT` | `8081` | 협회 백엔드(8080)와 겹치지 않게 |
| `MEDICHECK_DB` | `app/data/medicheck.db` | 없으면 폴더째 만든다. `.bat` 은 **절대경로**로 넘긴다 — 상대경로면 어느 폴더에서 실행했느냐에 따라 DB 파일이 갈린다 |

## 메뉴 · 경로 · 패키지 · API 를 하나로 맞춘다

같은 것을 세 군데서 다르게 부르면 어느 이름이 진짜인지 아무도 모르게 된다.
메뉴 이름은 영문이 원본이고([14장](../docs/03-단계와-수익.html#s14)), 경로는 그 이름을
소문자·하이픈으로 옮긴 것이며, 자바 패키지는 그 경로의 핵심 낱말이다.

| 메뉴 (영문 원본) | 경로 | 패키지 | API |
| --- | --- | --- | --- |
| — (첫 화면) | `/` | `medicheck.home` | `GET /api/home` |
| Find a hospital | `/find-a-hospital` | `medicheck.hospital` | `GET /api/hospitals` |
| ↳ 기관 상세 | `/find-a-hospital/{id}` | 〃 | `GET /api/hospitals/{id}` |
| About certification | `/about-certification` | `medicheck.certification` | `GET /api/certification` |
| Check the price | `/check-the-price` | `medicheck.price` | `GET /api/prices` |
| Content | `/content` | `medicheck.content` | `GET /api/content` |
| Patient journey | `/patient-journey` | `medicheck.journey` | `GET /api/journey` |
| Online consultation | `/online-consultation` | `medicheck.consultation` | `GET /api/consultations` |
| Send an inquiry | `/send-an-inquiry` | `medicheck.inquiry` | `POST /api/inquiries` |

이 표는 세 곳에 같은 순서로 있다 — [`SpaWebConfig`](src/main/java/kr/or/kmtpa/medicheck/config/SpaWebConfig.java),
[`frontend/shell/menu.js`](frontend/shell/menu.js), 그리고 여기. 한쪽만 고치면 눈에 띈다.

## index.html 은 하나뿐이다

화면이 일곱이지만 HTML 파일은
[`src/main/resources/static/index.html`](src/main/resources/static/index.html) 하나다.
경로는 `SpaWebConfig` 가 그리로 넘기고, 무엇을 그릴지는 `frontend/main.jsx` 가 정한다.

**Vite 를 쓰지 않는다.** Vite 는 제 `index.html` 을 입력으로 받아 산출물로 또 하나를
내놓는다 — 그러면 저장소에 index.html 이 둘이 된다. esbuild 는 JS 진입점만 받으므로
HTML 을 만들지 않는다.

## 화면이 지키고 있는 규칙

문서에 적어 둔 것이 코드에서 어디에 있는지.

| 규칙 | 어디 |
| --- | --- |
| 회원 ≠ 등재. 등록번호가 없으면 못 올라간다 ([3장](../docs/01-기획서.html#s3)) | `HospitalRepository.LISTED` — 조건을 한 곳에서만 판단한다 |
| 순서를 팔지 않는다 ([4장](../docs/01-기획서.html#s4)) | 정렬은 이름/갱신일 둘뿐. 손으로 올리는 길이 없다 |
| 정렬 기준을 공개한다 | `sortedBy` 를 API 가 내려 주고 화면이 그대로 적는다 |
| 배지에 등록번호·확인일이 늘 함께 ([3장](../docs/01-기획서.html#s3)) | `Badge` + `Stamp` 를 한 파일에 묶어 따로 못 쓰게 |
| **근거 없이는 안 올라간다** ([3장](../docs/01-기획서.html#s3)) | `LISTED` 가 근거 둘 중 하나를 요구한다 — MOHW 는 등록번호, SEOUL 은 원문 주소 |
| **배지가 근거를 이름으로 말한다** | `Badge source=…` · 문구는 [copy.js](frontend/shell/copy.js) 대장에 두 줄로 |
| **거르기 값도 두 언어로** | `label` 표 + `/api/labels`. 화면은 `label(kind, code)` 로 읽고, **보내는 값은 자료의 말 그대로** |
| 지도는 확인한 것이 아니다 | 지도 밑에 "주소로 그린 것이고 현장 확인은 아니다" 를 붙인다 |
| 남의 그림을 가져오지 않는다 | 진료과목 아이콘은 [icons.jsx](frontend/shell/icons.jsx) 에서 직접 그린다 — 서울시 스프라이트는 저작권 표시가 없어 쓰지 않았다 |
| 파랑은 인증에만 ([17장](../docs/04-화면과-디자인.html#s17)) | `--color-verified` 는 배지·인증 링크·인증 카드에만. 버튼은 `--color-action` |
| 카드는 전부 똑같이 ([19장](../docs/04-화면과-디자인.html#s19)) | 사진 없는 기관도 같은 크기 회색 면 |
| 숫자가 작으면 숫자를 쓰지 않는다 ([30장](../docs/07-화면-설계.html#s30)) | `HomeController.showCount` — 판단을 서버가 한다 |
| 날짜는 묻고 시각은 안 묻는다 ([27장](../docs/07-화면-설계.html#s27)) | 문의 화면에 달력이 없다. 달 단위 선택뿐 |
| 협회는 회신 내용을 보지 않는다 ([5장](../docs/01-기획서.html#s5)) | `consultation` 에 회신 본문 칸이 없다. 시각 둘만 |
| 내려간 기록을 남긴다 ([4장](../docs/01-기획서.html#s4)) | `medicheck_removal` + 인증 설명 화면의 표 |
| 하차 사유는 낱말 하나 ([28장](../docs/07-화면-설계.html#s28)) | 표의 `CHECK` 로 네 낱말만 |
| **확인한 것과 옮겨 적은 것을 한 표에 섞지 않는다** ([36장](../docs/07-화면-설계.html#s36)) | 기관 상세가 두 층이다. 위층은 배지와 그 옆 두 줄(협회가 확인한 것), 아래층은 진료 시간·연락처·병상 수(기관이 서울시에 제출한 것)이고 표 **위에** 출처와 읽은 날을 먼저 적는다 |
| **시행 전 제도를 있는 것처럼 말하지 않는다** ([26장](../docs/05-등급제-검토안.html#s26)) | `medicheck_grade`·`medicheck_axis` 에 정의만 두고 `grade` 칸을 만들지 않았다. 화면은 '계획안'을 맨 위에 적고 심사받은 기관 0곳을 그대로 보여 준다 |

## 공개 전에 되돌릴 것

**지금 이 저장소는 샘플 사이트다.** 보여 주기 위해 일부러 넣은 것과, 보여 주기 위해
일부러 뺀 것이 섞여 있다. 흩어져 있으면 공개하는 날 하나가 남으므로 여기 모아 둔다.
줄마다 **어디를 고치는지**가 적혀 있다.

### 넣은 것 — 지운다

| 무엇 | 어디 | 지우는 법 |
| --- | --- | --- |
| **등급 메달(플래티넘)이 100곳 전부에 붙어 있다.** 심사받은 기관은 0곳이다 ([26장](../docs/05-등급제-검토안.html#s26)) | `PREVIEW_GRADE` — [chrome.jsx](frontend/shell/chrome.jsx) | 상수를 지우고 `Medal` 이 `hospital.grade` 를 받게 한다. 값이 없으면 아무것도 그리지 않는다 |
| **온라인 상담 샘플 문답 12건.** 실제 상담이 아니다 ([37장](../docs/07-화면-설계.html#s37)) | `consultation_post` — [V12](src/main/resources/db/migration/V12__consultation_board.sql) | `DELETE FROM consultation_post WHERE is_sample = 1;` |
| **첫 화면 도입 영상.** [20장](../docs/04-화면과-디자인.html#s20)이 이 자리의 배너를 금지한다. 외주 전달용으로 넣었다 | `.intro` 절 — [Home.jsx](frontend/home/Home.jsx) | 절을 통째로 뺀다. 지우는 쪽이 기본값이라고 그 자리 주석에 적어 뒀다 |

### 뺀 것 — 되돌린다

화면이 안내 문구로 덮이지 않게 **화면에서만** 뺐다. 문구는 [copy.js](frontend/shell/copy.js) 에
그대로 있고, 뺀 자리마다 어느 키였는지 주석이 있다.

| 무엇 | 어디 | 근거 |
| --- | --- | --- |
| 「서울시 목록에서 옮겨 적음 · 협회가 확인하지는 않았다」 | [detail-tabs.jsx](frontend/hospital/detail-tabs.jsx) `BasicInfo` | [36장](../docs/07-화면-설계.html#s36) — 출처 쪽지는 표 **위에** 있어야 한다 |
| 「아직 제도가 아니라 계획안입니다」 + 심사받은 기관 0곳 | [AboutCertification.jsx](frontend/certification/AboutCertification.jsx) `MediCheck` | [26장](../docs/05-등급제-검토안.html#s26) |
| 「이 기관은 아직 심사받지 않았어요」 | [detail-tabs.jsx](frontend/hospital/detail-tabs.jsx) `CertificationInfo` | 같은 26장 |
| 「협회가 받은 후기가 아니에요」 | [detail-tabs.jsx](frontend/hospital/detail-tabs.jsx) `Reviews` | [25장](../docs/05-등급제-검토안.html#s25) — 이 사이트는 후기를 받지 않는다 |
| 「지도는 주소로 그린 것이고 현장 확인은 아니다」 | [detail-tabs.jsx](frontend/hospital/detail-tabs.jsx) `Map` | 배지가 말하는 범위 밖이라는 표시 |

### 협회가 정해야 하는 것

코드로 고칠 수 없고 결정이 필요한 것들이다.

- **연락처 공개.** [V10](src/main/resources/db/migration/V10__detail.sql) 이 서울시 상세
  페이지에서 이메일·전화를 받아 왔고 그중 일부는 **개인 휴대전화 번호**로 보인다.
  공개된 목록에 실려 있어도, 협회 사이트가 다시 싣는 것은 별개의 판단이다 ([36장](../docs/07-화면-설계.html#s36))
- **영문 화면의 한국어.** 소개문·운영시간·특화진료가 영문 화면에서도 한국어 그대로 나온다.
  원문에 영문이 없고, 협회가 옮기면 그 번역의 책임을 협회가 진다 ([7장](../docs/02-데이터와-운영.html#s7))
- **후기 정책.** 고객평가 탭에 구글 리뷰를 실제로 붙일지. 붙인다면
  [25장](../docs/05-등급제-검토안.html#s25)의 "후기를 받지 않는다"를
  "남의 후기를 옮길 뿐 우리가 매기지 않는다"로 고쳐야 한다
- **ISO·CE 표기.** [35장](../docs/05-등급제-검토안.html#s35)의 비교표가 93/42/EEC 를 쓴다.
  EU MDR(2017/745)로 대체되는 중이므로 원문 표기를 둘지 최신 규정을 병기할지
- **온라인 상담 운영.** 누가 며칠 안에 답하나, 비공개 글을 받나, 글쓰기를 열 때
  무엇을 받나 ([37장](../docs/07-화면-설계.html#s37))

---

## 자료

기관 100곳은 **서울시 「의료관광 협력기관 · 병·의원」 목록**에서 2026-08-18 에 받았다
([V4](src/main/resources/db/migration/V4__visitseoul_100.sql)). 실재하는 기관이므로
없는 등록번호를 지어 넣지 않았다 — `promotion_reg_no` 는 전부 NULL 이고 배지는
`source = 'SEOUL'` 로 붙으며, `source_url` 로 누구나 원문을 눌러 대조할 수 있다.

기관 상세에 실리는 **운영시간 · 특화진료 · 시설 · 연락처 · 찾아오는 길**은 같은 목록의
상세 페이지에서 2026-08-19 에 받았다
([V10](src/main/resources/db/migration/V10__detail.sql) ·
[V11](src/main/resources/db/migration/V11__detail_features.sql), 받은 스크립트는
[scrape-detail.mjs](scrape-detail.mjs)). V4 는 이메일·전화번호를 일부러 두고 왔는데
화면이 그것을 쓰게 되어 이번에 받았다 — 그 뒤집은 결정과 그 대가는
[36장](../docs/07-화면-설계.html#s36)에 적어 뒀다. **협회가 확인한 값이 아니다.**

사진은 **목록 페이지에서 기관마다 한 장씩** 받아 `src/main/resources/static/photos/` 에
두었다 (99장 · [V8](src/main/resources/db/migration/V8__photos.sql)). 상세 페이지에는
기관마다 1~12장이 더 있지만 받지 않았다 — 100곳어치면 저장소가 사진으로 불어나고,
사진은 원래 기관이 올릴 것이다 ([7장](../docs/02-데이터와-운영.html#s7)).

**지금 있는 99장도 공개 전에 정리 대상이다.** V8 머리말이 정한 대로 기관이 회원 포털에서
직접 올리거나 협회가 게재 허락을 확인해야 하고, 어느 쪽도 아니면 `photo` 를 비운다.
비면 화면은 19장대로 같은 크기의 회색 면을 보여 주므로 카드가 흐트러지지 않는다.

**지어낸 자료는 전부 뺐다**([V6](src/main/resources/db/migration/V6__drop_placeholders.sql)).
`OO ...` 24곳과 하차 기록 4건. 첫 화면이 "124 hospitals listed"라고 적는데 그중 24가
지어낸 것이면 그 숫자가 거짓이고, `OO Skin Clinic 이 등록 만료로 내려갔다`도 사실이
아니다. 지금 등재는 **100곳, 하차 0건, 보건복지부 근거 0곳**이다.

긁는 스크립트는 저장소에 없다. 결과인 V4 만 두어, 다시 받으면 **파일 차이로 무엇이
달라졌는지** 보이게 했다.

## 아직 없는 것

- **메일 발송.** 접수하면 `forwarded_at` 은 남지만 실제 메일은 안 나간다.
  붙일 자리는 `InquiryService.create` 안에 주석으로 표시해 두었다.
- **사무국 화면.** 미회신 목록을 볼 곳. 1단계 화면 여섯에 들어가지 않아 뺐다.
- **협회 DB 연결.** 지금은 제 SQLite 를 쓴다. 표·칸 이름을 6장 설계와 같게 두었으므로
  datasource 만 갈아 끼우면 된다([8장](../docs/02-데이터와-운영.html#s8) "사이트는 둘, DB 는 하나").
- **2층 등급.** [05 등급제](../docs/05-등급제-검토안.html)는 검토안이고 1단계에 넣지 않기로 했다.
- **보건복지부 등록 자료.** 근거 자체는 표·화면·문안에 다 살아 있는데 그 위에 선 기관이
  0곳이다. [data.go.kr](https://www.data.go.kr) 의 유치기관 등록 현황은 로그인과
  활용신청이 필요해 받지 못했다. 협회 계정으로 받으면 그대로 켜진다.
- **영문 기관명.** 서울시 목록에 없다. 협회가 로마자로 지어 적지 않으므로,
  기관이 회원 포털에서 직접 넣어야 채워진다([7장](../docs/02-데이터와-운영.html#s7)).
