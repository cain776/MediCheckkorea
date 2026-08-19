import { useState } from "react";
import { Link, useApi, useApp } from "../shell/app-context.jsx";
import { Loading } from "../shell/chrome.jsx";
import { HOME, MENU } from "../shell/menu.js";
import { AllMark, SPECIALTY_ICONS } from "../shell/icons.jsx";

/**
 * 도입 영상. **서울관광재단(VisitSeoul TV)의 것이고 우리 것이 아니다.**
 * sitmmt.org 의 미디어 글 126번이 같은 영상을 같은 방식(유튜브 임베드)으로 걸고 있어
 * 그 자리를 그대로 참고했다. 임베드는 파일을 베끼지 않으므로 이대로는 문제가 없지만,
 * 실서비스로 넘길 때는 권리 확인이 먼저다 — 화면의 출처 표기를 지우지 않는다.
 */
const INTRO_VIDEO = "B4ZarHnHTB0";

/** 움직임을 줄여 달라고 한 사람에게는 자동 재생을 하지 않고 조작 막대를 준다. */
const REDUCE_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const INTRO_PARAMS = new URLSearchParams({
  autoplay: REDUCE_MOTION ? "0" : "1",
  mute: "1",
  controls: REDUCE_MOTION ? "1" : "0",
  loop: "1",
  playlist: INTRO_VIDEO, // loop 는 playlist 가 있어야 먹는다
  playsinline: "1",
  modestbranding: "1",
  rel: "0",
  disablekb: "1",
  start: "24", // 원본 글이 걸어 둔 시작 지점
}).toString();

/** 2026-08-02 → August 2026 / 2026년 8월. 통계 줄이 달까지만 쓴다(30장). */
function month(date, lang) {
  if (!date) {
    return "";
  }
  const [year, mon] = date.split("-");
  if (lang === "ko") {
    return `${year}년 ${Number(mon)}월`;
  }
  const names = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${names[Number(mon) - 1]} ${year}`;
}

export function Home() {
  const { t, lang, label, navigate } = useApp();
  const { status, data } = useApi(HOME.api);
  const [query, setQuery] = useState("");

  if (status !== "ready") {
    return <Loading />;
  }

  const submit = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? `/find-a-hospital?q=${encodeURIComponent(trimmed)}` : "/find-a-hospital");
  };

  const when = month(data.lastVerifiedAt, lang);
  // 숫자가 작으면 숫자를 쓰지 않는다. 판단은 서버가 이미 했다 (30장)
  const stat = data.showCount
    ? t("statWithCount", { count: data.listedCount, month: when })
    : t("statWithoutCount", { month: when });

  return (
    <div className="page page--home">
      {/* ── 도입 영상 — 외주 전달용 샘플 ─────────────────────────────────
          20장은 첫 화면 이 자리에 캠페인 배너를 두는 것을 **금지한다.** 이 절은 그
          금지와 정면으로 부딪힌다. 업체에 "이런 느낌"을 보여 주려고 일부러 넣은 것이고,
          실서비스로 넘기기 전에 20장과 함께 다시 판단해야 한다. 지우는 쪽이 기본값이다.
          영상 위에 아무 주장도 얹지 않는다 — 문구는 아래에 진짜 화면이 있다는 것만 말한다.
          ──────────────────────────────────────────────────────────── */}
      <section className="intro">
        <div className="intro__frame">
          {/* allow 에 compute-pressure 가 들어 있는 이유: 유튜브 플레이어가 그 권한을
              요청하는데 목록에 없으면 브라우저가 콘솔에 권한 위반을 찍고, 화면 검증기가
              그것을 오류로 잡는다. 기능이 아니라 잡음이라 목록에 넣어 조용히 시킨다 */}
          <iframe
            src={`https://www.youtube.com/embed/${INTRO_VIDEO}?${INTRO_PARAMS}`}
            title={t("introLine")}
            allow="autoplay; encrypted-media; picture-in-picture; compute-pressure"
            allowFullScreen
          />
        </div>
        <div className="intro__scrim" />

        <div className="intro__body">
          <p className="intro__line">{t("introLine")}</p>
          <button
            type="button"
            className="intro__cue"
            onClick={() => {
              // scrollIntoView 로는 안 된다. 내비가 sticky 라 검색 화면 첫 줄이 그 밑에
              // 깔린다. --nav-height 는 한 줄 기준이고 좁은 화면에서는 두 줄로 접혀
              // 102px 가 되므로, 숫자를 적어 두지 않고 그때그때 잰다.
              const find = document.getElementById("find");
              const nav = document.querySelector(".nav");
              if (!find) {
                return;
              }
              window.scrollTo({
                top: find.getBoundingClientRect().top + window.scrollY - (nav?.offsetHeight ?? 0),
                behavior: REDUCE_MOTION ? "auto" : "smooth",
              });
            }}
          >
            {t("introScroll")}
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path d="M4 6.5 8 10.5 12 6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p className="intro__source">{t("introSource")}</p>
        </div>
      </section>

      <div className="container">
        <section className="hero" id="find">
          {/* 통계 줄이 제목 위에 온다. 숫자를 먼저 보여 주고 그 숫자가 무엇인지를
              제목이 받는다 — 숫자가 작으면 서버가 이미 빼고 준다 (30장) */}
          <p className="stat-pill">
            <i aria-hidden="true" />
            {stat}
          </p>
          <h1 className="hero__title">{t("heroTitle")}</h1>
          <p className="hero__lead">{t("heroLead")}</p>

          <form className="search" onSubmit={submit} role="search">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("searchPlaceholder")}
              aria-label={t("searchPlaceholder")}
            />
            {/* 버튼은 잉크다. 파랑은 배지 몫이다 (17장) */}
            <button type="submit" className="btn btn--ink">
              {t("search")}
            </button>
          </form>

        </section>
      </div>

      {/* 아이콘은 분류를 가리키는 그림이지 기관을 꾸미는 것이 아니다.
          기관에는 여전히 어떤 색도 붙지 않는다 (17장).
          띠는 컨테이너 밖으로 나가 전폭으로 선다 — 위아래 실선이 화면을 가른다 */}
      <div className="rail">
        <div className="rail__inner">
          {/* 전체 보기가 맨 앞. 고른 것이 없을 때 돌아올 자리를 먼저 보여 준다 */}
          <Link to="/find-a-hospital" className="tile tile--all">
            <i aria-hidden="true">{AllMark}</i>
            <span>{t("seeAll")}</span>
          </Link>
          {data.specialties.map((name) => (
            <Link
              key={name}
              to={`/find-a-hospital?specialty=${encodeURIComponent(name)}`}
              className="tile"
            >
              <i aria-hidden="true">{SPECIALTY_ICONS[name] ?? SPECIALTY_ICONS.Other}</i>
              <span>{label("SPECIALTY", name)}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="container">
        <section className="bento">
          {/* 20장이 캠페인 배너를 금지하며 "그 자리에 인증이 무엇인지 설명하는 카드를
              둔다"고 했다. 레퍼런스에서 파랑이 넓게 깔리던 자리가 그대로 여기다. */}
          <div className="bento__feature">
            <span className="bento__chip">{t("featureChip")}</span>
            <h2>{t("featureTitle")}</h2>
            <p>{t("featureLead")}</p>
            <div className="bento__actions">
              <Link to="/about-certification" className="btn btn--onblue">
                {t("readWhatWeCheck")}
              </Link>
              <Link to="/about-certification?tab=grounds#removals" className="btn btn--onblue-ghost">
                {t("readRemovals")}
              </Link>
            </div>
          </div>

          {/* 카드 넷을 흩어 놓는 대신 번호가 붙은 한 장부로 세운다 — 01부터 04까지
              읽는 차례가 정해져 있고, 마지막 줄(정렬 기준)은 링크가 아니라 밝히는 문장이다 */}
          <div className="ledger">
            <Link to={MENU[0].path} className="ledger__row">
              <span className="ledger__no">01</span>
              <span className="ledger__body">
                <b>{t("findAHospital")}</b>
                <span>{t("cardFindLead")}</span>
              </span>
              <span className="ledger__more">{t("open")} →</span>
            </Link>

            <Link to={MENU[3].path} className="ledger__row">
              <span className="ledger__no">02</span>
              <span className="ledger__body">
                <b>{t("patientJourney")}</b>
                <span>{t("cardJourneyLead")}</span>
              </span>
              <span className="ledger__more">{t("open")} →</span>
            </Link>

            <Link to="/about-certification?tab=grounds#removals" className="ledger__row">
              <span className="ledger__no">03</span>
              <span className="ledger__body">
                <b>
                  {t("cardRemovalsTitle")} · {data.removalCount}
                </b>
                <span>{t("cardRemovalsLead")}</span>
              </span>
              <span className="ledger__more">{t("open")} →</span>
            </Link>

            {/* 4장 — 정렬 기준을 공개한다. 화면에 적어 두는 것이 그 공개다.
                누를 곳이 아니므로 링크로 만들지 않는다 */}
            <div className="ledger__row ledger__row--note">
              <span className="ledger__no">04</span>
              <span className="ledger__body">
                <b>{t("cardOrderTitle")}</b>
                <span>{t("cardOrderLead")}</span>
              </span>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}
