import { Link, useApi, useApp } from "../shell/app-context.jsx";
import { Loading } from "../shell/chrome.jsx";

/**
 * "Check the price" — 정찰가가 무엇이고 왜 필요한지 설명하는 화면.
 *
 * <p><b>아직 가격은 하나도 없다.</b> 이 화면은 값을 보여 주는 자리가 아니라
 * 무엇을 만들고 있고 무엇은 하지 않을지를 먼저 적어 두는 자리다 — 인증이
 * 첫 수여 전에 배점표를 공개하는 것과 같은 순서다(23장).
 *
 * <p>가격은 이 사이트에서 가장 위험한 값이다. 화면에 적히는 순간 약속이 되고,
 * 도착한 뒤 값이 달라지면 환자가 항의할 곳이 기관이 아니라 협회가 된다.
 * 그래서 <b>하는 일보다 하지 않을 일을 먼저 못박는다.</b>
 */
const WHY = [
  ["priceWhy1", "priceWhy1b"],
  ["priceWhy2", "priceWhy2b"],
  ["priceWhy3", "priceWhy3b"],
];

const DOES = ["priceDoes1", "priceDoes2", "priceDoes3", "priceDoes4"];
const NOT = ["priceNot1", "priceNot2", "priceNot3"];

const STEPS = [
  ["priceStep1", "priceStep1b"],
  ["priceStep2", "priceStep2b"],
  ["priceStep3", "priceStep3b"],
];

const OPEN = ["priceOpen1", "priceOpen2", "priceOpen3", "priceOpen4"];

export function CheckThePrice() {
  const { t } = useApp();
  const { status, data } = useApi("/api/prices");

  if (status !== "ready") {
    return <Loading />;
  }

  return (
    <div className="page">
      <div className="container">
        <div className="head">
          <h1>{t("checkThePrice")}</h1>
          <p>{t("priceLead")}</p>
        </div>

        {/* 몇 곳이 가격을 냈는지를 서버가 세어 내려 준다. 지금은 0 이고, 그 0 을 감추지
            않는다 — 화면이 스스로 판단하게 두면 언젠가 그 판단이 빠진다 */}
        <div className="callout callout--warn">
          <b>{t("priceNoneTitle")}</b>
          <p>{t("priceNoneBody", { count: data.published })}</p>
        </div>

        <section className="block">
          <h2>{t("priceWhyTitle")}</h2>
          <ol className="rules">
            {WHY.map(([head, body], index) => (
              <li key={head}>
                <span className="rules__no">{index + 1}</span>
                <div>
                  <b>{t(head)}</b>
                  <p>{t(body)}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* 할 일과 하지 않을 일을 나란히 둔다. 인증 설명 화면의 '확인한 것 / 확인하지
            않은 것'과 같은 짜임이다 — 한쪽만 적으면 나머지는 짐작이 된다(28장) */}
        <section className="block">
          <div className="price__pair">
            <div className="price__col">
              <h2>{t("priceDoesTitle")}</h2>
              <ul className="price__list">
                {DOES.map((key) => (
                  <li key={key}>{t(key)}</li>
                ))}
              </ul>
            </div>
            <div className="price__col price__col--not">
              <h2>{t("priceNotTitle")}</h2>
              <ul className="price__list">
                {NOT.map((key) => (
                  <li key={key}>{t(key)}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="block">
          <h2>{t("priceHowTitle")}</h2>
          <ol className="rules">
            {STEPS.map(([head, body], index) => (
              <li key={head}>
                <span className="rules__no">{index + 1}</span>
                <div>
                  <b>{t(head)}</b>
                  <p>{t(body)}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="block">
          <h2>{t("priceOpenTitle")}</h2>
          <ul className="open">
            {OPEN.map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ul>
        </section>

        <div className="detail__actions">
          <Link to="/find-a-hospital" className="btn btn--ghost">
            {t("findAHospital")}
          </Link>
          <Link to="/send-an-inquiry" className="btn btn--ink">
            {t("sendAnInquiry")}
          </Link>
        </div>
      </div>
    </div>
  );
}
