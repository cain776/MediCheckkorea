# 메디체크 코리아

해외 환자에게 **협회가 공개 기록으로 확인한** 의료기관을 보여 주는 사이트. 1단계 시범 구현이다.

- **기획서** — [docs/](docs/) (`docs/README.md` 가 목차다)
- **작업 규칙** — [CLAUDE.md](CLAUDE.md) (메뉴·경로·패키지·API 일치, 파일 600줄)
- **앱 문서** — [app/README.md](app/README.md)

## 돌려 보기

Java 21 과 Node.js 가 필요하다.

```
start-server.bat
```

프런트를 묶고 서버를 띄운 뒤 브라우저를 연다. 기본 포트는 8081.

| 화면 | 경로 |
| --- | --- |
| 첫 화면 | `/` |
| Find a hospital | `/find-a-hospital` |
| About certification | `/about-certification` |
| Patient journey | `/patient-journey` |
| Online consultation | `/online-consultation` |
| Send an inquiry | `/send-an-inquiry` |

## 서버 없이 보는 판 (Vercel)

외주 전달용으로 **화면만** 도는 판이 `web/` 에 있다. Java 도 DB 도 없이 열린다.

```
start-server.bat --no-browser     # 먼저 서버를 띄우고
cd app && npm run build:static    # 돌고 있는 API 에서 답을 받아 web/ 을 다시 만든다
npm run verify:static             # 서버를 끄지 않은 채, 정적 판이 서버와 같은 답을 내는지 대조한다
```

만드는 방식이 요점이다 — **실제 API 에서 받은 답을 JSON 으로 굳힌다.** 등재 조건(4장)이나
정렬 규칙을 스크립트에서 다시 쓰지 않는다. 거르기·정렬만 브라우저가 하고, 그 결과가 서버와
같은지는 `verify:static` 이 조건 11가지로 대조한다.

`web/` 은 만들어진 것이지만 **저장소에 그대로 커밋한다.** 이 폴더를 만들려면 Java 와 DB 가
있어야 하는데 배포하는 쪽에는 둘 다 없다.

이 판에서 **문의는 보내지지 않는다.** 보낼 데가 없으므로 보내는 시늉도 하지 않는다 —
화면에 그렇게 적고 단추를 잠근다.

## 알아 둘 것

- **등급제(docs/05)는 검토안이고 확정이 아니다.** 어느 기관에도 등급이 붙어 있지 않다.
- 첫 화면의 도입 영상은 서울관광재단 VisitSeoul TV 의 것이다. 외주 전달용 샘플로 걸어 둔 것이고, 실서비스로 넘길 때 다시 판단해야 한다 — 기획서 20장은 이 자리에 캠페인 배너를 두는 것을 금지한다.
- 온라인 상담 게시판의 글은 전부 샘플이다.
- **기관 사진은 서울시 「의료관광 협력기관」 목록(`medical.visitseoul.net`)에서 받아 온 것이다.**
  우리 사진이 아니다. 정적 판(`web/photos/`)에는 화면을 보여 주려고 넣어 뒀지만, 서버 폴더
  (`app/src/main/resources/static/photos/`)는 `.gitignore` 로 빠져 있다. **공개 전에 권리를
  확인해야 하는 항목이다.** 없어도 화면은 깨지지 않는다 — 목록 카드도 상세 화면도 사진 자리에
  같은 크기의 회색 면을 둔다(19장 「카드는 전부 똑같이」).
