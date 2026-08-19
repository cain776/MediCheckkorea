import { useEffect, useState } from "react";
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
function Issue({ issue, lang, t, onOpen }) {
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
      {/* 본문이 없는 호는 단추를 두지 않는다. 눌러 놓고 404 를 주느니 없다고 말한다 */}
      {issue.bodyUrl ? (
        <div className="issue__actions">
          <button type="button" className="issue__read" onClick={() => onOpen(issue.bodyUrl, "web")}>
            {t("issueRead")} →
          </button>
          {/* 같은 글의 이메일 판. 편지로 받으면 어떻게 보이는지를 그대로 연다 */}
          {issue.emailUrl ? (
            <button type="button" className="issue__email" onClick={() => onOpen(issue.emailUrl, "email")}>
              {t("issueEmail")}
            </button>
          ) : null}
        </div>
      ) : (
        <span className="issue__waiting">{t("issueComing")}</span>
      )}
    </article>
  );
}

/**
 * 읽기 창.
 *
 * <p>호를 새 화면으로 넘기지 않고 이 자리에서 연다 — 목록으로 돌아오는 길이 뒤로가기
 * 하나뿐이면, 여러 호를 훑어보는 사람은 계속 화면을 오간다.
 *
 * <p><b>「새 창에서 열기」를 함께 둔다.</b> 팝업에는 주소가 없다. 읽다가 남에게
 * 보내고 싶어진 사람에게 줄 것이 없으면 그 순간 이 창은 막다른 길이 된다.
 *
 * <p>본문을 iframe 으로 부르는 이유는 두 판(웹·이메일)이 <b>제 스타일을 통째로</b>
 * 들고 있어서다. 같은 문서에 풀어 넣으면 사이트 CSS 와 섞여 둘 다 깨진다.
 */
function Reader({ url, mode, title, onClose, t }) {
  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    // 뒤에 깔린 목록이 같이 굴러가면 창을 닫았을 때 엉뚱한 자리에 서 있게 된다
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = before;
    };
  }, [onClose]);

  return (
    <div className="reader" onClick={onClose} role="presentation">
      <div
        className="reader__panel"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="reader__bar">
          <span className="reader__mode">{mode === "email" ? t("issueEmail") : t("issueRead")}</span>
          <span className="reader__title">{title}</span>
          <a className="reader__out" href={url} target="_blank" rel="noreferrer">
            {t("issueOpenNew")}
          </a>
          <button type="button" className="reader__close" onClick={onClose} aria-label={t("issueClose")}>
            ✕
          </button>
        </div>
        <iframe className="reader__frame" src={url} title={title} />
      </div>
    </div>
  );
}

export function Content() {
  const { t, lang } = useApp();
  const { status, data } = useApi("/api/content");
  const [reading, setReading] = useState(null);

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
              <Issue
                key={issue.vol}
                issue={issue}
                lang={lang}
                t={t}
                onOpen={(url, mode) => setReading({ url, mode, title: lang === "ko" ? issue.titleKo : issue.titleEn })}
              />
            ))}
          </div>
        )}
      </div>

      {reading ? (
        <Reader
          url={reading.url}
          mode={reading.mode}
          title={reading.title}
          onClose={() => setReading(null)}
          t={t}
        />
      ) : null}
    </div>
  );
}
