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

## 알아 둘 것

- **등급제(docs/05)는 검토안이고 확정이 아니다.** 어느 기관에도 등급이 붙어 있지 않다.
- 첫 화면의 도입 영상은 서울관광재단 VisitSeoul TV 의 것이다. 외주 전달용 샘플로 걸어 둔 것이고, 실서비스로 넘길 때 다시 판단해야 한다 — 기획서 20장은 이 자리에 캠페인 배너를 두는 것을 금지한다.
- 온라인 상담 게시판의 글은 전부 샘플이다.
- **기관 사진은 이 저장소에 없다.** 서울시 「의료관광 협력기관」 목록(`medical.visitseoul.net`)에서
  받아 온 남의 사진이라 공개 저장소에 두지 않는다. 없어도 화면은 깨지지 않는다 — 목록 카드도
  상세 화면도 사진 자리에 같은 크기의 회색 면을 둔다(19장 「카드는 전부 똑같이」).
  받아 올 때 쓴 스크립트는 `app/scrape-detail.mjs` 에 남아 있다. 다만 그때 쓴 그대로이지
  한 번에 되돌려 주는 도구는 아니다. 파일은 `app/src/main/resources/static/photos/` 에 두면 된다.
