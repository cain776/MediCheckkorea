# 뉴스레터

메일로 보내는 편지의 **틀**만 여기 있다. 본문은 호마다 따로 쓴다.

- [email-frame.html](email-frame.html) — 이메일 프레임. 채울 자리가 `[대괄호]` 로 표시돼 있다

## 한 호 만들기

1. `email-frame.html` 을 복사해서 `2026-08.html` 처럼 발행월 이름으로 둔다
2. `[대괄호]` 자리를 채운다. 본문 문단은 `<p>` 를, 소제목 묶음은 `<tr>` 을 복사해서 늘린다
3. 안 쓰는 묶음(확인 배지·단추)은 `<tr>` 째로 지운다 — 빈 칸으로 남겨 두지 않는다
4. 화면의 목록에 세우려면 `newsletter_issue` 에 줄을 더한다:

```sql
UPDATE newsletter_issue SET body_url = '/newsletter/2026-08.html', is_sample = 0 WHERE vol = 1;
```

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
