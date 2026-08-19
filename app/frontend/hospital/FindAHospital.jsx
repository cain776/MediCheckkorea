import { useEffect, useState } from "react";
import { Link, useApi, useApp } from "../shell/app-context.jsx";
import { Badge, Loading, Medal, Stamp } from "../shell/chrome.jsx";

const FILTER_KEYS = ["specialty", "region", "language"];

export function FindAHospital() {
  const { t, lang, label, params, navigate } = useApp();

  const [query, setQuery] = useState(params.get("q") ?? "");
  useEffect(() => setQuery(params.get("q") ?? ""), [params]);

  const search = new URLSearchParams();
  for (const key of ["q", ...FILTER_KEYS, "sort"]) {
    const value = params.get(key);
    if (value) {
      search.set(key, value);
    }
  }
  const { status, data } = useApi(`/api/hospitals?${search.toString()}`);

  const setParam = (key, value) => {
    const next = new URLSearchParams(search.toString());
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    navigate(`/find-a-hospital${next.toString() ? `?${next}` : ""}`);
  };

  if (status !== "ready") {
    return <Loading />;
  }

  const sortLabel = data.sortedBy === "updated" ? t("sortedByUpdated") : t("sortedByName");

  return (
    <div className="page">
      <div className="container">
        <div className="head">
          <h1>{t("findAHospital")}</h1>
          <p>{t("findLead")}</p>
        </div>

        <form
          className="filters"
          onSubmit={(event) => {
            event.preventDefault();
            setParam("q", query.trim());
          }}
        >
          <label className="field field--search">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("searchPlaceholder")}
              aria-label={t("searchPlaceholder")}
            />
          </label>

          <Facet kind="SPECIALTY" name="specialty" label={t("specialty")} options={data.facets.specialties} onPick={setParam} />
          <Facet kind="REGION" name="region" label={t("region")} options={data.facets.regions} onPick={setParam} />
          <Facet kind="LANGUAGE" name="language" label={t("language")} options={data.facets.languages} onPick={setParam} />

          <div className="field">
            <label htmlFor="sort">{t("sort")}</label>
            <select
              id="sort"
              value={params.get("sort") ?? "name"}
              onChange={(event) => setParam("sort", event.target.value === "name" ? "" : event.target.value)}
            >
              <option value="name">{t("sortByName")}</option>
              <option value="updated">{t("sortByUpdated")}</option>
            </select>
          </div>

          {/* 4장 — 정렬 기준을 공개한다. 서버가 실제로 쓴 값을 그대로 적는다. */}
          <p className="filters__meta">{t("countSorted", { count: data.total, sort: sortLabel })}</p>
        </form>

        {data.total === 0 ? <Empty params={params} onRelease={setParam} /> : null}

        <div className="cards">
          {data.hospitals.map((hospital) => (
            <Link key={hospital.id} to={`/find-a-hospital/${hospital.id}`} className="card">
              {/* 사진이 없는 기관에도 같은 크기의 회색 면을 둔다 — 작게 만들거나
                  뒤로 밀지 않는다. 그 차이가 곧 등급으로 읽힌다 (19장) */}
              <div className="card__figure">
                <div
                  className="card__photo"
                  style={hospital.photo ? { backgroundImage: `url(${hospital.photo})` } : undefined}
                  aria-hidden="true"
                />
                {/* 사진 위 메달. 지금 값은 화면 확인용이다 — chrome.jsx 의 주석을 본다 */}
                <Medal />
              </div>
              <div className="card__body">
                <span className="card__name">
                  {/* 영문명이 없는 기관이 있다. 협회가 로마자로 지어 적지 않으므로
                      국문명을 그대로 보여 준다 (7장) */}
                  {(lang === "ko" ? hospital.nameKo : hospital.nameEn) || hospital.nameKo}
                </span>
                <span className="card__meta">
                  {[
                    hospital.specialties.map((code) => label("SPECIALTY", code)).join(", "),
                    label("REGION", hospital.region),
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
                <span className="card__badge">
                  <Badge source={hospital.source} />
                </span>
                <span className="card__stamp">
                  <Stamp hospital={hospital} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * 거르기 상자 하나.
 *
 * <p>값(value)은 자료가 쓰는 말 그대로 보내고, 보이는 글자만 지금 언어로 바꾼다.
 * 보이는 글자를 그대로 보내면 언어를 바꾸는 순간 거르기가 0건이 된다.
 */
function Facet({ kind, name, label: title, options, onPick }) {
  const { params, t, label } = useApp();
  return (
    <div className="field">
      <label htmlFor={name}>{title}</label>
      <select id={name} value={params.get(name) ?? ""} onChange={(event) => onPick(name, event.target.value)}>
        <option value="">{t("all")}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {label(kind, option)}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * 빈 결과 (31장).
 *
 * "결과가 없습니다"로 끝내면 사람이 나간다. 어느 조건이 문제인지 우리는 알고 있으므로
 * 마지막으로 건 조건을 짚어 그것부터 풀어 준다.
 */
function Empty({ params, onRelease }) {
  const { t, navigate } = useApp();
  const applied = FILTER_KEYS.filter((key) => params.get(key));
  const narrowest = applied.length ? params.get(applied[applied.length - 1]) : null;

  return (
    <div className="empty">
      <h2>{t("emptyTitle")}</h2>
      {narrowest ? <p>{t("emptyLead", { filter: narrowest })}</p> : null}
      <div className="empty__actions">
        {narrowest ? (
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => onRelease(applied[applied.length - 1], "")}
          >
            {t("emptyRelease", { filter: narrowest })}
          </button>
        ) : null}
        <button type="button" className="btn btn--ink" onClick={() => navigate("/find-a-hospital")}>
          {t("emptyAll")}
        </button>
      </div>
    </div>
  );
}
