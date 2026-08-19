import { Link, useApi, useApp } from "../shell/app-context.jsx";
import { Badge, Loading, Medal } from "../shell/chrome.jsx";
import { BasicInfo, CertificationInfo, Reviews } from "./detail-tabs.jsx";

/**
 * 기관 하나.
 *
 * <p>맨 위는 <b>협회가 확인한 것</b>이다 — 배지와 그 옆 두 줄, 원문 링크뿐.
 * 그 아래는 탭 셋이고, <b>탭을 가르는 선은 출처의 선</b>이다:
 * 기본정보는 기관이 서울시에 제출한 것, 인증 정보는 협회가 심사해서 줄 것,
 * 고객평가는 남이 쓴 것. 한 화면에 섞어 두면 "협회가 진료 시간과 별점까지
 * 확인해 줬다"로 읽힌다(28장).
 *
 * <p>탭은 주소에 남는다(<code>?tab=</code>). 인증 설명 화면과 같은 방식이다 —
 * 남에게 보낼 수 있어야 하고, 뒤로 가기가 탭을 되돌려야 한다.
 */
const TABS = [
  ["basic", "tabBasic"],
  ["certification", "tabCertification"],
  ["reviews", "tabReviews"],
];

export function HospitalDetail({ id }) {
  const { t, lang, label, params, navigate } = useApp();
  const { status, data } = useApi(`/api/hospitals/${encodeURIComponent(id)}`);

  if (status === "loading") {
    return <Loading />;
  }

  // 등재가 아닌 주소로 들어오면 404 를 그냥 내지 않는다. 왜 없는지 말하고
  // 하차 기록으로 보낸다 — 조용히 지우면 4장의 "내려간 기록을 남긴다"가 문서에만 남는다(31장).
  if (status === "error") {
    return (
      <div className="page">
        <div className="container">
          <div className="empty">
            <h2>{t("notFoundTitle")}</h2>
            <p>{t("notFoundLead")}</p>
            <div className="empty__actions">
              <Link to="/about-certification#removals" className="btn btn--ghost">
                {t("removalsTitle")}
              </Link>
              <Link to="/find-a-hospital" className="btn btn--ink">
                {t("backToList")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const name = (lang === "ko" ? data.nameKo : data.nameEn) || data.nameKo;
  const intro = (lang === "ko" ? data.introKo : data.introEn) || data.introKo;
  const website = data.website ? `https://${data.website.replace(/^https?:\/\//, "")}` : null;

  // 모르는 탭 이름으로 들어와도 화면이 비지 않는다. 기본정보가 기본값이다.
  const requested = params.get("tab");
  const tab = TABS.some(([key]) => key === requested) ? requested : "basic";

  return (
    <div className="page">
      <div className="container">
        {/* ── 협회가 확인한 것 ─────────────────────────────────── */}
        <div className="detail__hero">
          <figure className="detail__photo">
            {/* 사진은 기관(또는 서울시)의 것이고, 공개 전에 기관이 직접 올리거나 협회가
                게재 허락을 확인해야 한다 — 어느 쪽도 아니면 photo 를 비운다
                (V8__photos.sql 의 머리말). 그날 파일이 사라져도 깨진 아이콘을 띄우지 않고
                figure 의 회색 면만 남긴다. 목록 카드는 배경 그림이라 이미 그렇게 내려앉는다(19장). */}
            {data.photo ? (
              <img
                src={data.photo}
                alt={name}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            ) : null}
            {/* 메달은 화면 확인용이다 — chrome.jsx 의 주석을 본다 */}
            <Medal />
          </figure>

          <div className="detail__head">
            <div className="chips chips--specialty">
              {data.specialties.map((code) => (
                <span className="chip" key={code}>
                  {label("SPECIALTY", code)}
                </span>
              ))}
            </div>

            <h1 className="detail__name">{name}</h1>
            {/* 이름 바로 밑은 '어떻게 찾아가나'다. 서울시 상세 페이지가 같은 자리에 둔다 */}
            {data.transport ? <p className="detail__where">{data.transport}</p> : null}

            {/* 인증 줄이 이름 바로 아래, 소개보다 위에 온다. 이 순서가 이 사이트의 주장이다 (15장) */}
            <div className="detail__cert">
              <Badge source={data.source} />
              <span className="stamp">
                {[
                  data.registrationNo ? t("regNo", { no: data.registrationNo }) : null,
                  data.verifiedAt
                    ? t(data.source === "SEOUL" ? "checkedOn" : "verifiedOn", { date: data.verifiedAt })
                    : null,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
              {/* 근거를 밖에서 대조할 수 있어야 배지가 일한다. 등록번호가 그 일을 못 하는
                  근거(SEOUL)는 원문 주소가 대신한다 (28장) */}
              {data.sourceUrl ? (
                <a
                  className="link-verified"
                  href={data.sourceUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {t("seeSource")} ↗
                </a>
              ) : null}
              <Link to="/about-certification" className="link-verified">
                {t("whatDoesThisMean")}
              </Link>
            </div>

            {/* 소개문이 비면 빈 채로 둔다. 협회가 대신 쓰면 그 문장의 책임을 협회가 진다(31장).
                받아 적을 때 문단이 ' / ' 로 붙었다. 여기서 되돌려 놓는다 */}
            {intro
              ? intro
                  .split(" / ")
                  .filter(Boolean)
                  .map((paragraph) => (
                    <p className="detail__intro" key={paragraph.slice(0, 24)}>
                      {paragraph}
                    </p>
                  ))
              : null}

            <div className="detail__actions">
              <Link
                to={`/send-an-inquiry?hospital=${encodeURIComponent(data.id)}`}
                className="btn btn--ink"
              >
                {t("sendAnInquiry")}
              </Link>
              {website ? (
                <a className="btn btn--ghost" href={website} target="_blank" rel="noreferrer noopener">
                  {t("visitWebsite")}
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {/* ── 탭 셋 ────────────────────────────────────────────── */}
        <div className="tabs" role="tablist">
          {TABS.map(([key, title]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              className="tabs__tab"
              onClick={() => navigate(`/find-a-hospital/${encodeURIComponent(data.id)}?tab=${key}`)}
            >
              {t(title)}
            </button>
          ))}
        </div>

        {tab === "certification" ? <CertificationInfo data={data} /> : null}
        {tab === "reviews" ? <Reviews data={data} /> : null}
        {tab === "basic" ? <BasicInfo data={data} /> : null}

        <div style={{ marginTop: "var(--space-xl)" }}>
          <Link to="/find-a-hospital" className="btn btn--ghost">
            ← {t("backToList")}
          </Link>
        </div>
      </div>
    </div>
  );
}
