import { Link, useApi, useApp } from "../shell/app-context.jsx";
import { Loading } from "../shell/chrome.jsx";

export function PatientJourney() {
  const { t, lang } = useApp();
  const { status, data } = useApi("/api/journey");

  if (status !== "ready") {
    return <Loading />;
  }

  return (
    <div className="page">
      <div className="container">
        <div className="head">
          <h1>{t("journeyTitle")}</h1>
          <p>{t("journeyLead")}</p>
        </div>

        <div className="journey">
          {data.steps.map((step) => (
            <article className="step" key={step.step}>
              <span className="step__no">STEP {step.step}</span>
              <h2>{step.title}</h2>
              <p className="step__lead">{step.lead}</p>
              <p className="step__body">{step.body}</p>
              {/* 우리가 대신 답하지 않고 무엇을 물어야 하는지를 알려 주는 것이
                  이 화면이 할 수 있는 가장 정직한 일이다 (29장) */}
              <p className="step__ask">
                <b>{t("askThem")}</b>
                {lang === "ko" ? step.askKo : step.askEn}
              </p>
            </article>
          ))}
        </div>

        {/* 1단계에서 이 화면의 모든 출구는 기관 찾기와 문의다. "Book now"를 두지 않는다 (10장) */}
        <div style={{ marginTop: "var(--space-xl)", display: "flex", gap: "var(--space-xs)", flexWrap: "wrap" }}>
          <Link to="/find-a-hospital" className="btn btn--ink">
            {t("findAHospital")}
          </Link>
          <Link to="/about-certification" className="btn btn--ghost">
            {t("aboutCertification")}
          </Link>
        </div>
      </div>
    </div>
  );
}
