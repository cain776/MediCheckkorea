# 뉴스레터

**틀**만 여기 있다. 쓴 호는 서버가 주는 폴더에 둔다.

| 어디 | 무엇 |
| --- | --- |
| `newsletter/email-frame.html` | 이메일 틀. 채울 자리가 `[대괄호]` 로 표시돼 있다. **서비스되지 않는다** |
| `app/src/main/resources/static/newsletter/` | 쓴 호. 서버와 정적 판이 **같은 파일**을 `/newsletter/volN.html` 로 준다 |

파일 이름은 호수로 짓는다(`vol1.html`). `newsletter_issue.vol` 이 UNIQUE 키이고 아래 SQL 도 그걸로 찾기 때문이다 — 발행월로 지으면 이름과 키가 갈린다.

## 한 호 쓰기

1. `email-frame.html` 을 복사해 `app/src/main/resources/static/newsletter/volN.html` 로 둔다
2. `[대괄호]` 자리를 채운다. 문단은 `<p>` 를, 소제목 묶음은 `<tr>` 을 복사해서 늘린다
3. 안 쓰는 묶음(확인 배지·단추)은 `<tr>` 째로 지운다 — 빈 칸으로 남겨 두지 않는다
4. 다 쓴 뒤에 화면의 목록에 세운다. **그 전까지 카드는 「아직 안 썼어요」로 남는다** —
   반쯤 쓴 페이지에 링크를 걸어 두지 않는다:

```sql
UPDATE newsletter_issue SET body_url = '/newsletter/vol1.html', is_sample = 0 WHERE vol = 1;
```

5. 정적 판에도 실으려면 `cd app && npm run build:static` 을 다시 돌린다

## 쓴 사람 사진

`app/src/main/resources/static/newsletter/authors/` 에 둔다. 파일 이름은 영문 이름으로
짓는다(`esther-yoon.jpg`). 64×64 로 그려지므로 **정사각형 128px 이상**이면 넉넉하다.

메일 앱은 이미지를 기본으로 막는다. 그래서 사진이 안 떠도 이름과 직함이 글자로 남게
되어 있다 — 사진을 안 넣어도 편지는 깨지지 않는다.

지금 표에 있는 두 호는 **샘플이고 본문이 없다.** 화면이 맨 위에 그렇게 적는다. 지우려면:

```sql
DELETE FROM newsletter_issue WHERE is_sample = 1;
```

## 손대기 전에 알아 둘 것

- **폭은 600px 고정.** 그보다 넓으면 Outlook 미리보기 창에서 가로로 잘린다
- **표(table)와 인라인 스타일로만 짠다.** Outlook 은 flex·grid 를 모르고 Gmail 은 `<style>` 을 지울 때가 있다
- **파랑(`#2563eb`)은 확인 배지 자리에만.** 제목·단추·링크에 쓰지 않는다 ([17장](../docs/04-화면과-디자인.html#s17))
- 색은 사이트 토큰을 값으로 옮겨 적은 것이다. `app/frontend/tokens.css` 가 바뀌면 여기도 같이 고친다 — 이메일에서는 CSS 변수를 못 쓴다
- [32장](../docs/07-화면-설계.html#s32)이 금지한 낱말은 여기에도 없어야 한다

## 협회 뉴스레터와의 관계

협회에도 뉴스레터가 있다(`협회/homepage/communications/index.html#newsletter`, Vol. 25까지). **이건 그것과 다른 편지다.** 협회 것은 회원사에게 산업 동향을 보내고, 이건 어디로 갈지 정하는 사람에게 보낸다. 그래서 호수도 1호부터 새로 센다 — 25호부터 시작한 척하면 그게 [4장](../docs/01-기획서.html#s4) 위반이다.

디자인도 가져오지 않았다. 협회 뉴스레터는 주황(`#FF5A1F`) 액센트의 Bold Startup 계열인데, 메디체크는 색 체계가 다르고 파랑을 배지에만 쓴다.
