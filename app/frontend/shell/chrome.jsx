import { useEffect, useState } from "react";
import { Link, useApp } from "./app-context.jsx";
import { MENU } from "./menu.js";

/**
 * 확인 배지. 화면에서 파랑이 나타나는 거의 유일한 자리다 (17장).
 *
 * <p>무엇을 근거로 붙었는지를 배지가 말한다. 근거가 둘이므로 문구도 둘이다 —
 * 하나로 뭉뚱그리면 보건복지부 등록과 서울시 협력기관이 같은 것처럼 읽힌다.
 */
export function Badge({ source, children }) {
  const { t } = useApp();
  const label = children ?? (source === "SEOUL" ? t("badgeSEOUL") : t("registered"));
  return <span className="badge">{label}</span>;
}

/**
 * 등급 메달.
 *
 * <p><b>지금 값은 화면 확인용이다.</b> 어느 기관에도 등급이 붙어 있지 않다 —
 * V9 마이그레이션이 등급의 정의만 넣고 `medicheck_listing` 에 grade 칸을 만들지
 * 않았고, 기획서 <a href="../../../docs/05-등급제-검토안.html#s26">26장</a>이
 * "1단계에서는 등급을 넣지 않는다"고 했다. 심사 자료가 생기면 `hospital.grade` 를
 * 받아 그리고 없으면 아무것도 그리지 않게 바꾼다 — 그때 PREVIEW_GRADE 는 지운다.
 */
const PREVIEW_GRADE = {
  code: "PLATINUM",
  en: "Platinum",
  ko: "플래티넘",
  // 25장의 색을 그대로 쓴다. V9 의 medicheck_grade 행과 같은 값이다.
  dot: "#8B98AB",
  bg: "#EEF1F6",
  ink: "#3F4A5A",
};

export function Medal({ grade = PREVIEW_GRADE }) {
  const { lang } = useApp();
  if (!grade) return null;
  return (
    <span className="medal medal--card" style={{ background: grade.bg, color: grade.ink }}>
      <i style={{ background: grade.dot }} />
      {lang === "ko" ? grade.ko : grade.en}
    </span>
  );
}

/**
 * 배지 밑에 늘 함께 붙는 두 줄.
 *
 * "인증됨"만 쓰면 아무 뜻이 없다 — 등록번호 · 확인한 날짜 · 근거 한 줄이 같이 보여야
 * 배지가 일한다(3장). 그래서 배지와 이 줄을 한 컴포넌트로 묶어 따로 쓸 수 없게 했다.
 */
export function Stamp({ hospital, showRegNo = false }) {
  const { t } = useApp();
  const parts = [];
  if (showRegNo && hospital.registrationNo) {
    parts.push(t("regNo", { no: hospital.registrationNo }));
  }
  if (hospital.verifiedAt) {
    // MOHW 는 '확인'이 등록부 조회이고, SEOUL 은 목록 조회다. 한 낱말로 뭉치지 않는다.
    const key = hospital.source === "SEOUL" ? "checkedOn" : "verifiedOn";
    parts.push(t(key, { date: hospital.verifiedAt }));
  }
  if (hospital.updatedAt) {
    parts.push(t("updatedOn", { date: hospital.updatedAt }));
  }
  return <div className="stamp">{parts.join(" · ")}</div>;
}

function Mark() {
  return (
    <span className="nav__mark" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none">
        <path
          d="M3 8.6l3.2 3.2L13 5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Nav() {
  const { pathname, t, lang, setLang } = useApp();

  // 첫 화면 도입 영상 위에서는 막대가 비치고 글자가 희다. 영상이 지나가면 흰 막대가 된다.
  // 경계는 "영상 절의 아래끝이 아직 막대 아래에 있는가" 하나뿐이다 — 스크롤 값을 숫자로
  // 적어 두면 영상 절 높이가 바뀌는 날 조용히 틀린다.
  const [overIntro, setOverIntro] = useState(false);

  useEffect(() => {
    const read = () => {
      const intro = document.querySelector(".intro");
      const nav = document.querySelector(".nav");
      setOverIntro(Boolean(intro) && intro.getBoundingClientRect().bottom > (nav?.offsetHeight ?? 0));
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);

    // 첫 화면은 API 를 기다리는 동안 로딩만 그린다. 그래서 이 효과가 처음 돌 때 영상 절은
    // 아직 DOM 에 없고, 맨 위에서는 스크롤도 일어나지 않는다 — 손대기 전까지 흰 막대로
    // 남아 있었다. 절이 나타나는 순간을 잡으려면 DOM 이 바뀔 때 다시 재는 수밖에 없다.
    // 값이 그대로면 React 가 다시 그리지 않으므로 이 관찰이 저를 다시 부르지는 않는다.
    const watch = new MutationObserver(read);
    watch.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
      watch.disconnect();
    };
  }, [pathname]); // 다른 화면으로 가면 영상 절이 없어진다. 그때 흰 막대로 돌아와야 한다

  return (
    <header className={overIntro ? "nav nav--over" : "nav"}>
      <div className="container nav__inner">
        <Link to="/" className="nav__brand">
          <Mark />
          <span className="nav__word">{t("brand")}</span>
        </Link>
        <nav className="nav__links" aria-label={t("brand")}>
          {MENU.map((item) => (
            <Link
              key={item.key}
              to={item.path}
              className="nav__link"
              aria-current={pathname === item.path ? "page" : undefined}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
        <div className="nav__end">
          {/* 두 언어뿐이다. 응대할 사람이 없는 언어는 안 하느니만 못하다 (14장) */}
          <div className="lang">
            <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>
              EN
            </button>
            <button type="button" aria-pressed={lang === "ko"} onClick={() => setLang("ko")}>
              KO
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const { t } = useApp();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__say">
          <b>{t("brand")}</b>
          {t("footerSay")}
        </p>
        <div className="footer__links">
          {MENU.map((item) => (
            <Link key={item.key} to={item.path}>
              {t(item.key)}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

export function Loading() {
  const { t } = useApp();
  return <p className="loading">{t("loading")}</p>;
}
