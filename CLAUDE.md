# 메디체크 코리아

해외 환자에게 협회 확인 기관을 보여 주는 사이트. 기획서는 [docs/](docs/), 1단계 앱은 [app/](app/) 에 있다.
무엇을 왜 만드는지는 [docs/README.md](docs/README.md) 에서 시작한다. 아래 셋은 **코드에 손을 댈 때마다 지키는 규칙**이다 — 이름을 하나로 맞추고, 파일을 600줄 안에 두고, 글자는 정해진 단 안에서만 쓴다.

---

## 규칙 1 — 메뉴 · 경로 · 패키지 · API 를 하나로 맞춘다

같은 것을 세 군데서 다르게 부르면 어느 이름이 진짜인지 아무도 모르게 된다.

| 메뉴 (영문 원본) | 경로 | 패키지 | API |
| --- | --- | --- | --- |
| (첫 화면) | `/` | `home` | `/api/home` |
| Find a hospital | `/find-a-hospital` | `hospital` | `/api/hospitals` |
| | `/find-a-hospital/{id}` | | `/api/hospitals/{id}` |
| About certification | `/about-certification` | `certification` | `/api/certification` |
| Patient journey | `/patient-journey` | `journey` | `/api/journey` |
| Online consultation | `/online-consultation` | `consultation` | `/api/consultations` |
| Send an inquiry | `/send-an-inquiry` | `inquiry` | `/api/inquiries` |

- **메뉴 이름은 영문이 원본이다** (기획서 [14장](docs/03-단계와-수익.html#s14)). 한국어는 번역이고 라벨 표(`label`, `/api/labels`)로만 들어간다 — 경로·패키지·클래스 이름에 한국어를 쓰지 않는다.
- **경로**는 그 영문 이름을 소문자·하이픈으로 그대로 옮긴 것이다. 줄이지 않는다 — `/find-a-hospital` 이지 `/find` 나 `/hospitals` 가 아니다.
- **패키지**는 그 경로의 핵심 낱말 하나다. 컨트롤러·서비스·리포지토리는 전부 그 패키지 안에 둔다.
- **API** 는 `/api/` + 그 낱말. 목록을 돌려주면 복수형이다.

이 표는 두 곳에 있고 **줄 순서와 낱말이 똑같아야 한다**:

- [app/src/main/java/kr/or/kmtpa/medicheck/config/SpaWebConfig.java](app/src/main/java/kr/or/kmtpa/medicheck/config/SpaWebConfig.java) — 어떤 경로를 `index.html` 로 넘길지
- [app/frontend/shell/menu.js](app/frontend/shell/menu.js) — 그 경로에 무엇을 그릴지

두 곳에 있는 것이 좋아서가 아니라, 서버와 화면이 각각 알아야 하는 것이라 없앨 수 없어서다. 대신 줄 순서와 낱말을 맞춰 **한쪽만 고치면 눈에 띄게** 해 뒀다. [start-server.bat](start-server.bat) 의 메뉴 경로도 같은 표다.

**화면을 더할 때**: 위 표에 줄을 하나 더하고 → `SpaWebConfig` 와 `menu.js` 에 같은 줄을 더하고 → 그 낱말로 패키지를 만들고 → 컨트롤러를 그 패키지에 둔다. 넷 중 하나라도 빠지면 이름이 갈라진 것이다.

화면이 없는 공용 자원은 이 표에 넣지 않는다 — `/api/labels` 는 화면 전부가 쓰므로 `config` 에 둔다. 그런 것이 둘 이상 생기면 그때 자리를 다시 본다.

`index.html` 은 이 저장소에 하나뿐이다. **화면이 늘어도 파일은 늘지 않는다** — 늘어나는 것은 위 표의 줄이다.

---

## 규칙 2 — 파일 하나는 600줄까지

600줄은 상한이지 목표가 아니다. 400줄쯤에서 이미 나눌 자리를 찾는다.

**나누는 선은 규칙 1의 선과 같다.** 도메인·화면 단위로 자른다. `utils.js` · `helpers.java` · `common.css` 처럼 **무엇에 관한 것인지 알 수 없는 이름으로 빼지 않는다** — 그렇게 빼면 600줄 한 파일이 600줄 두 파일이 될 뿐이고, 어디를 고쳐야 하는지는 더 어려워진다.

세지 않는 것:

- `app/src/main/resources/db/migration/*.sql` — 마이그레이션은 append-only 기록이다. 이미 돌아간 파일은 나누지도 고치지도 않는다
- `app/src/main/resources/static/assets/` · `app/node_modules/` · `app/build/` — 산출물
- `docs/*.html` — 코드가 아니다. 여기는 줄 수가 아니라 **장 번호**로 끊는다 (규약은 [docs/README.md](docs/README.md) 에)

확인:

```bash
find app/src/main/java app/frontend -type f \( -name '*.java' -o -name '*.js' -o -name '*.jsx' -o -name '*.css' \) \
  -exec wc -l {} + | sort -rn | awk '$1>600 && $2!="total"'
```

**넘는 파일은 지금 하나도 없다.** `app.css` 는 1600줄을 넘겼다가 화면 단위로 갈라졌고, 지금은 **`@import` 차례만 적힌 27줄**이다. 규칙은 전부 화면 폴더에 있다 — `shell/chrome.css`(사이트 틀) · `home/home.css` · `hospital/find.css` · `hospital/detail.css` · `certification/certification.css` · `journey/journey.css` · `inquiry/inquiry.css` · `consultation/consultation.css`.

**`app.css` 에 규칙을 다시 쓰지 않는다.** 거기서 한 줄 쓰기 시작하면 1600줄짜리 한 파일로 되돌아간다. 화면을 더할 때는 그 화면 폴더에 `<이름>.css` 를 만들고 `app.css` 목록 끝에 한 줄 더한다.

**`@import` 의 차례가 곧 우선순위다.** CSS 는 같은 급끼리 뒤에 온 것이 이기므로, 줄 순서를 바꾸면 눈에 안 보이는 곳에서 규칙 하나가 뒤집힌다 (실제로 나누는 중에 `.nav__word` 가 좁은 화면에서 17px 대신 19px 로 뒤집힌 적이 있다). 순서를 손대면 폭 셋(375·900·1440)에서 계산된 스타일을 나누기 전과 비교해 본다.

**문안 대장도 같은 방식으로 갈라졌다.** [copy.js](app/frontend/shell/copy.js) 는 화면별 문안(`home/copy.js` · `hospital/copy.js` · `certification/copy.js` · `journey/copy.js` · `inquiry/copy.js` · `consultation/copy.js`)을 모으는 대장이고, 화면은 지금까지처럼 `t("key")` 하나만 쓴다 — 어느 파일에 있는지 알 필요가 없다. CSS 와 달리 차례가 우선순위를 만들지 않는 대신 **열쇠가 겹치면 안 되므로**, 대장이 합칠 때 겹친 열쇠를 만나면 그 자리에서 멈춘다.

---

## 규칙 3 — 글자는 정해진 단 안에서만 쓴다

글꼴 한 벌, 크기 일곱 단, 굵기 둘, 줄간격 셋. **이 목록 밖의 값을 쓰지 않는다.**
값이 하나 늘 때마다 "어느 것을 쓸까"를 묻는 자리가 늘고, 같은 자리에 서로 다른 값이 섞인다.
한 번 그렇게 되면 화면마다 무게가 갈리고, 그 뒤로는 아무도 되돌리지 못한다.

전에 열 단(12·13·14·15·17·19·20·26·32·38)이었을 때 12·13·14·15 는 나란히 놓아도
구별되지 않으면서 골라야 할 자리만 넷이었다. 그래서 **역할 하나에 단 하나**로 줄였다.

| 무엇 | 값 | 자리 |
| --- | --- | --- |
| 글꼴 | `--font-body` — Pretendard Variable 한 벌 | 라틴·한글이 한 벌에 있다. **두 번째 글꼴을 들이지 않는다** |
| `--text-xs` | 12px | 날짜 · 출처 · 캡션 |
| `--text-sm` | 14px | 라벨 · 메타 · 표 머리 |
| `--text-body` | 16px | 본문 |
| `--text-lg` | 18px | 소제목 · 기관 이름 · 브랜드 |
| `--text-xl` | 22px | 절 제목 (h2) |
| `--text-2xl` | 28px | 화면 제목 (h1) |
| `--text-display` | 40px | 첫 화면 한 줄. **이것 하나만 크다** |
| 굵기 | `--weight-normal` 400 · `--weight-bold` 700 | 500 · 600 · 800 은 쓰지 않는다 |
| 줄간격 | `--leading-tight` 1.25 · `--leading-snug` 1.5 · `--leading-body` 1.75 | 제목 · UI · 본문 |

값은 [app/frontend/tokens.css](app/frontend/tokens.css) 에만 있고, 화면 CSS 는 **토큰 이름으로만** 부른다.
`font-size: 15px` 처럼 숫자를 직접 적지 않는다 — 지금 CSS 에는 그런 줄이 하나도 없다.

좁은 화면(640px 이하)에서는 **큰 셋만** 줄인다 (40→30 · 28→24 · 22→20).
12 · 14 · 16 은 그대로 둔다. 더 줄이면 읽히지 않는다.

확인 — 아래 둘 다 아무것도 나오지 않아야 한다:

```bash
grep -rn "font-size: [0-9]\|font-weight: [0-9]\|line-height: [0-9]" app/frontend --include='*.css'
grep -rn "text-base\|text-md\|text-display-s" app/frontend --include='*.css'
```

**새 크기가 꼭 필요해 보이면 그건 대개 자리가 잘못된 것이다.** 18px 과 22px 사이가 필요하다고
느껴지면 굵기나 색으로 갈라 보고, 그래도 안 되면 그때 이 표를 고친다 —
표를 고칠 때는 [18장](docs/04-화면과-디자인.html#s18)도 함께 고친다. 화면과 문서가 갈리면
어느 쪽이 진짜인지 아무도 모르게 된다.
