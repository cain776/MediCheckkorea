import { useState } from "react";
import { Link, useApi, useApp } from "../shell/app-context.jsx";
import { Loading } from "../shell/chrome.jsx";

/**
 * 온라인 상담 — 협회 사무국에 묻고, 물음과 답이 목록으로 남는 자리.
 *
 * <p>「Send an inquiry」와 다르다. 문의는 <b>한 기관에게</b> 보내고 회신은 협회를 거치지
 * 않는다(5장). 여기는 기관을 아직 고르지 못한 사람이 <b>협회에게</b> 묻는 자리이고,
 * 답이 공개로 남아 다음 사람이 같은 질문을 다시 하지 않아도 된다.
 *
 * <p><b>언어가 이 화면의 축이다.</b> 물음이 온 언어로 답이 나간다 — 한국어 답을 자동으로
 * 번역해 붙이지 않는다. 목록에서 언어로 거를 수 있게 두고, 글 하나를 펴면 물음과 답이
 * 같은 언어로 나란히 선다.
 */
export function OnlineConsultation() {
  const { t, label } = useApp();
  const { status, data } = useApi("/api/consultations");
  const [lang, setLang] = useState("");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(null);

  if (status !== "ready") {
    return <Loading />;
  }

  // 거르기 값은 자료에 실제로 있는 언어만. 없는 언어를 보여 주면 0건이 나온다
  const languages = [...new Set(data.posts.map((post) => post.lang))].sort();
  const posts = data.posts.filter((post) => {
    if (lang && post.lang !== lang) return false;
    if (!query.trim()) return true;
    const text = `${post.title} ${post.question} ${post.answer ?? ""}`.toLowerCase();
    return text.includes(query.trim().toLowerCase());
  });

  return (
    <div className="page">
      <div className="container">
        <div className="head">
          <h1>{t("onlineConsultation")}</h1>
          <p>{t("consultLead")}</p>
        </div>

        {/* 「여기 글은 샘플이에요」 안내를 뺐다 (샘플 사이트라 화면에서만 뺀다).
            문구는 copy.js 의 consultSampleTitle · consultSampleBody 에, 건수는
            /api/consultations 의 sample 에 그대로 있다 — 공개 전에 되돌린다 */}

        <div className="board__bar">
          <p className="board__count">
            {t("consultTotal", { total: data.total })}
            <span>
              {t("consultAnswered", { count: data.answered })} · {t("consultWaiting", { count: data.waiting })}
            </span>
          </p>

          <div className="board__tools">
            <div className="chips">
              <button
                type="button"
                className={`chip chip--button${lang === "" ? " is-on" : ""}`}
                onClick={() => setLang("")}
              >
                {t("allLanguages")}
              </button>
              {languages.map((code) => (
                <button
                  key={code}
                  type="button"
                  className={`chip chip--button${lang === code ? " is-on" : ""}`}
                  onClick={() => setLang(code)}
                >
                  {label("LANGUAGE", code)}
                </button>
              ))}
            </div>
            <input
              type="search"
              className="board__search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("consultSearch")}
              aria-label={t("consultSearch")}
            />
          </div>
        </div>

        <div className="board">
          <div className="board__head" aria-hidden="true">
            <span>{t("colNo")}</span>
            <span>{t("colLang")}</span>
            <span>{t("colTitle")}</span>
            <span>{t("colAuthor")}</span>
            <span>{t("colAnswered")}</span>
            <span>{t("colWrittenOn")}</span>
          </div>

          {posts.length === 0 ? (
            <div className="empty">
              <h2>{t("consultNoneTitle")}</h2>
              <p>{t("consultNoneLead")}</p>
            </div>
          ) : null}

          {posts.map((post) => (
            <article className="board__row" key={post.no}>
              <button
                type="button"
                className="board__line"
                aria-expanded={open === post.no}
                onClick={() => setOpen(open === post.no ? null : post.no)}
              >
                <span className="board__no">{post.no}</span>
                <span className="board__lang">{label("LANGUAGE", post.lang)}</span>
                <span className="board__title">{post.title}</span>
                <span className="board__author">{post.author}</span>
                <span className={`board__state${post.answer ? " is-done" : ""}`}>
                  {post.answer ? t("stateAnswered") : t("stateWaiting")}
                </span>
                <span className="board__date">{post.createdAt}</span>
              </button>

              {open === post.no ? <Thread post={post} /> : null}
            </article>
          ))}
        </div>

        {/* 이 게시판이 답할 수 없는 것이 있다. 그 자리에서 갈 곳을 알려 준다 */}
        <div className="callout">
          <b>{t("consultNotHereTitle")}</b>
          <p>{t("consultNotHereBody")}</p>
        </div>

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

/**
 * 물음과 답 한 쌍.
 *
 * <p>물음이 온 언어로 답이 나간다. 답이 아직 없으면 <b>비워 두지 않고 언제까지 답하는지를
 * 적는다</b> — 빈 칸은 잊힌 것처럼 보이고, 그것이 게시판이 죽는 방식이다.
 */
function Thread({ post }) {
  const { t } = useApp();
  return (
    <div className="thread">
      <div className="thread__turn">
        <span className="thread__who">{t("threadQuestion")}</span>
        <p>{post.question}</p>
        <span className="thread__meta">
          {post.author} · {post.createdAt}
        </span>
      </div>

      {post.answer ? (
        <div className="thread__turn thread__turn--answer">
          <span className="thread__who">{t("threadAnswer")}</span>
          <p>{post.answer}</p>
          <span className="thread__meta">
            {post.answeredBy} · {post.answeredAt}
          </span>
        </div>
      ) : (
        <div className="thread__turn thread__turn--waiting">
          <span className="thread__who">{t("stateWaiting")}</span>
          <p>{t("threadWaitingBody")}</p>
        </div>
      )}
    </div>
  );
}
