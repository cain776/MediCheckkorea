import { useApi, useApp } from "../shell/app-context.jsx";
import { Loading } from "../shell/chrome.jsx";

/**
 * 컨텐츠 — 뉴스레터 호 목록.
 *
 * <p>협회 사이트의 {@code communications/index.html#newsletter} 를 옮겨 온 자리다.
 * 협회 쪽은 뉴스레터 · 보도자료 · 발간물이 탭 셋인데 여기는 <b>뉴스레터 하나만</b>
 * 가져왔다. 없는 것을 탭으로 세우면 눌렀을 때 빈 화면이 나온다(31장).
 *
 * <p><b>구독 신청 단추를 두지 않았다.</b> 협회 쪽에는 mailto 로 걸린 단추가 있지만,
 * 메디체크는 아직 받을 데도 보낼 사람도 정해지지 않았다. 누르면 아무 일도 일어나지
 * 않는 단추를 두느니, 나온 호를 여기서 그냥 읽게 한다 — 주소를 받지 않으면 지킬
 * 약속도 생기지 않는다.
 */
function Issue({ issue, lang, t }) {
  const title = lang === "ko" ? issue.titleKo : issue.titleEn;
  const summary = lang === "ko" ? issue.summaryKo : issue.summaryEn;

  return (
    <article className="issue">
      <div className="issue__mark">
        <span className="issue__vol">{t("issueVol", { vol: issue.vol })}</span>
        <span className="issue__date">{issue.publishedOn}</span>
      </div>
      <h2 className="issue__title">{title}</h2>
      <p className="issue__summary">{summary}</p>
      {/* 본문이 없는 호는 링크를 걸지 않는다. 걸어 두고 404 를 주느니 없다고 말한다 */}
      {issue.bodyUrl ? (
        <a className="issue__read" href={issue.bodyUrl}>
          {t("issueRead")} →
        </a>
      ) : (
        <span className="issue__waiting">{t("issueComing")}</span>
      )}
    </article>
  );
}

export function Content() {
  const { t, lang } = useApp();
  const { status, data } = useApi("/api/content");

  if (status !== "ready") {
    return <Loading />;
  }

  return (
    <div className="page">
      <div className="container">
        <div className="head">
          <h1>{t("contentTitle")}</h1>
          <p>{t("contentLead")}</p>
        </div>

        {/* 샘플이라는 사실은 목록보다 먼저 온다. 수는 서버가 센 값을 그대로 쓴다 —
            화면이 스스로 세면 언젠가 그 판단이 빠지고 샘플이 진짜처럼 열린다 */}
        {data.sample > 0 ? (
          <div className="issues__notice">
            <b>{t("contentSampleTitle")}</b> {t("contentSampleBody", { count: data.sample })}
          </div>
        ) : null}

        {data.total === 0 ? (
          <div className="empty">
            <p>{t("contentEmpty")}</p>
          </div>
        ) : (
          <div className="issues">
            {data.issues.map((issue) => (
              <Issue key={issue.vol} issue={issue} lang={lang} t={t} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
