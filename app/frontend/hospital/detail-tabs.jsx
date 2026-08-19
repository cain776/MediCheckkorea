import { Link, useApi, useApp } from "../shell/app-context.jsx";
import { Medal } from "../shell/chrome.jsx";

/**
 * 기관 상세의 탭 셋.
 *
 * <p>한 파일에 셋을 나란히 둔다. 지금은 셋 다 짧고, 서로 무엇이 다른지가
 * 한 화면에 보이는 편이 낫기 때문이다 — <b>기본정보</b>는 기관이 서울시에 제출한 것,
 * <b>인증 정보</b>는 협회가 심사해서 줄 것, <b>고객평가</b>는 남이 쓴 것.
 * 셋의 출처가 전부 다르고, 그 차이를 말하는 것이 이 화면의 일이다.
 */

/* ── 기본정보 ─────────────────────────────────────────────────── */

export function BasicInfo({ data }) {
  const { t, label } = useApp();
  const website = data.website ? `https://${data.website.replace(/^https?:\/\//, "")}` : null;

  return (
    <div className="detail__body">
      <section className="facts">
        {/* 출처 쪽지(「서울시 목록에서 옮겨 적음」)를 뺐다 — 보는 사람이 아직 우리뿐이라
            2026-08-19 에 뺐다. 36장은 그 쪽지가 표 **위에** 있어야 한다고 적어 뒀고,
            공개 전에는 되돌려야 한다. 문구는 copy.js 의 fromSeoul · fromSeoulBody 에 그대로 있다. */}
        <dl className="rows">
          <Row label={t("languages")}>
            <Chips items={data.languages.map((code) => label("LANGUAGE", code))} />
          </Row>
          <Row label={t("focusTreatments")}>
            <Chips items={data.features} />
          </Row>
          <Row label={t("facility")}>
            {facility(t, data) /* 의료진 수와 병상 수. 없으면 그 낱말을 빼고 적는다 */}
          </Row>
          <Row label={t("openingHours")}>{data.hours}</Row>
          <Row label={t("website")}>
            {website ? (
              <a href={website} target="_blank" rel="noreferrer noopener">
                {data.website}
              </a>
            ) : null}
          </Row>
          <Row label={t("email")}>
            {data.email ? <a href={`mailto:${data.email}`}>{data.email}</a> : null}
          </Row>
          <Row label={t("phone")}>
            {/* 눌러서 걸 수 있게 한다. 화면에는 적힌 그대로 보인다 */}
            {data.phone ? <a href={`tel:${data.phone.replace(/[^0-9+]/g, "")}`}>{data.phone}</a> : null}
          </Row>
          <Row label={t("gettingThere")}>
            {data.addressDetail || data.address}
            {data.transport ? <span className="row__sub">{data.transport}</span> : null}
          </Row>
          <Row label={t("registrationExpires")}>{data.registrationExpiresAt}</Row>
          {/* 날짜는 사실이고 딱지는 판단이다. 오래됐다고 경고를 붙이지 않는다 (31장) */}
          <Row label={t("updatedLabel")}>{data.updatedAt}</Row>
        </dl>
      </section>

      <div className="detail__side">
        {data.address ? <Map address={data.address} name={data.nameKo} /> : null}
      </div>
    </div>
  );
}

/* ── 인증 정보 ───────────────────────────────────────────────── */

/**
 * 왜 이 기관이 이 메달을 받았는가.
 *
 * <p><b>지금은 받은 기관이 없다.</b> 26장이 1단계에서는 등급을 넣지 않기로 했고
 * 어느 기관에도 등급이 붙어 있지 않다. 그래서 이 탭은 <b>점수를 지어내지 않는다</b> —
 * 무엇을 보고 어떤 최소선을 넘어야 하는지(축과 배점은 자료에서 온다)를 보여 주고,
 * 이 기관이 아직 심사받지 않았다는 사실을 맨 위에 적는다.
 *
 * <p>심사가 시작되면 축마다 받은 점수와 심사한 날이 이 표에 채워진다. 그때
 * 이 컴포넌트가 바뀌는 것은 <b>표의 값이지 표의 모양이 아니다</b>.
 */
export function CertificationInfo({ data }) {
  const { t, lang } = useApp();
  const { status, data: cert } = useApi("/api/certification");

  return (
    <div className="cert-tab">
      <div className="cert-tab__head">
        <Medal />
        <div>
          <h2>{t("whyThisMedal")}</h2>
          <p>{t("whyThisMedalLead")}</p>
        </div>
      </div>

      {/* 「아직 심사받지 않았어요」 안내를 뺐다. 문구는 copy.js 의
          notAssessedTitle · notAssessedBody 에 그대로 있다 — 공개 전에 되돌린다 */}

      <dl className="rows">
        {status === "ready"
          ? cert.axes.map((axis) => (
              <Row key={axis.code} label={lang === "ko" ? axis.ko : axis.en}>
                {t("axisPoints", { points: axis.points, floor: axis.floor })}
                <span className="row__sub">{lang === "ko" ? axis.looksKo : axis.looksEn}</span>
              </Row>
            ))
          : null}
        {/* 받은 점수·심사한 날·만료일이 들어올 자리. 지금은 셋 다 없다 */}
        <Row label={t("assessedOn")}>{null}</Row>
        <Row label={t("gradeExpiresOn")}>{null}</Row>
      </dl>

      <div className="detail__actions">
        <Link to="/about-certification" className="btn btn--ghost">
          {t("howAssessed")}
        </Link>
      </div>
    </div>
  );
}

/* ── 고객평가 ────────────────────────────────────────────────── */

/**
 * 구글 리뷰가 들어올 자리.
 *
 * <p><b>협회가 후기를 받는 것이 아니다.</b> 25장이 "별점은 후기 별점으로 읽힌다"며
 * 이 사이트가 후기를 받지 않는다고 적었고, 그 선은 그대로다. 여기 붙는 것은
 * <b>구글이 모은 남의 후기</b>이고, 협회는 그것을 확인하지도 고르지도 않는다 —
 * 그 사실을 리뷰보다 <b>먼저</b> 적는다.
 *
 * <p>지금은 붙이지 않았다. 없는 후기를 지어 넣지 않으므로 이 탭은 빈 상태로 서 있고,
 * 대신 구글에서 바로 볼 수 있는 길을 준다.
 */
export function Reviews({ data }) {
  const { t, lang } = useApp();
  const name = (lang === "ko" ? data.nameKo : data.nameEn) || data.nameKo;
  const search = encodeURIComponent(`${data.nameKo} ${data.addressDetail || data.address || ""}`);

  return (
    <div className="reviews">
      {/* 「협회가 받은 후기가 아니에요」 안내를 뺐다. 문구는 copy.js 의
          reviewsNotOurs · reviewsNotOursBody 에 그대로 있다 — 구글 후기를 실제로
          붙이는 날 되돌린다 */}

      <div className="empty">
        <h2>{t("reviewsEmpty")}</h2>
        <p>{t("reviewsEmptyLead")}</p>
        <div className="empty__actions">
          <a
            className="btn btn--ghost"
            href={`https://www.google.com/maps/search/?api=1&query=${search}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            {t("reviewsOnGoogle", { name })} ↗
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── 위 셋이 함께 쓰는 것 ────────────────────────────────────── */

/** 「의료진 6명 · 병상 3개」. 한쪽만 있으면 있는 쪽만 적는다 — 없는 값을 0 으로 적지 않는다. */
function facility(t, data) {
  const parts = [
    data.doctors ? t("facilityDoctors", { count: data.doctors }) : null,
    data.beds ? t("facilityBeds", { count: data.beds }) : null,
  ].filter(Boolean);
  return parts.length ? parts.join(" · ") : null;
}

/**
 * 낱말 여럿을 알약으로.
 *
 * <p>배지의 파랑을 쓰지 않는다(17장). 이 알약들은 기관이 스스로 적어 낸 것이고
 * 배지는 협회가 확인한 것이라, 같은 색을 쓰면 둘이 같은 무게로 읽힌다.
 */
function Chips({ items }) {
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <span className="chips">
      {items.map((item) => (
        <span className="chip" key={item}>
          {item}
        </span>
      ))}
    </span>
  );
}

/**
 * 주소를 지도로 보여 준다.
 *
 * <p>키 없이 되는 임베드 주소를 쓴다. 공식 Maps Embed API 는 키를 요구하고, 키는
 * 협회가 발급해 서버 설정으로 넣어야 하는 것이라 지금 넣을 수 없다. 이 형태가 막히면
 * 아래 '구글 지도에서 열기' 링크는 그대로 살아 있으므로 화면이 죽지는 않는다.
 *
 * <p>iframe 은 구글에 주소를 보낸다. 공개된 기관 주소라 문제될 것은 없지만,
 * 환자가 무엇을 보는지 화면이 밝히도록 아래 한 줄을 붙였다.
 */
function Map({ address, name }) {
  const { t } = useApp();
  const query = encodeURIComponent(address);
  return (
    <aside className="map">
      <h2>{t("whereItIs")}</h2>
      <div className="map__frame">
        <iframe
          title={`${name} — ${t("whereItIs")}`}
          src={`https://www.google.com/maps?q=${query}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <p className="map__addr">{address}</p>
      <a
        className="btn btn--ghost"
        href={`https://www.google.com/maps/search/?api=1&query=${query}`}
        target="_blank"
        rel="noreferrer noopener"
      >
        {t("openInMaps")} ↗
      </a>
      {/* 「지도는 주소로 그린 것이고 현장 확인은 아니다」 한 줄을 뺐다.
          문구는 copy.js 의 mapNote 에 그대로 있다 */}
    </aside>
  );
}

/**
 * 한 줄. 값이 없으면 <b>줄을 지우지 않고 '—' 를 적는다</b> —
 * 없는 줄은 안 물어본 것처럼 보이고, '—' 는 물어봤는데 답이 없는 것으로 보인다(31장).
 */
function Row({ label, children }) {
  const { t } = useApp();
  const empty =
    children === null || children === undefined || children === "" || children === false;
  return (
    <div className="row">
      <dt>{label}</dt>
      <dd className={empty ? "is-empty" : undefined}>{empty ? t("none") : children}</dd>
    </div>
  );
}
