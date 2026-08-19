import { Link, useApi, useApp } from "../shell/app-context.jsx";
import { Loading } from "../shell/chrome.jsx";

/**
 * 인증 설명 — 탭 둘.
 *
 * <p><b>메디체크 인증</b>이 앞이다. 협회가 실제로 심사해서 주는 것이고, 이 사이트가
 * 결국 세우려는 것이다. <b>추가 인증</b>은 지금 배지가 무엇을 근거로 붙는지 —
 * 보건복지부 등록부와 서울시 목록 — 를 설명한다. 그건 남이 확인한 것을 옮겨 적는
 * 일이라 뒤에 둔다.
 *
 * <p>탭은 주소에 남는다(<code>?tab=</code>). 남에게 보낼 수 있어야 하고,
 * 뒤로 가기가 탭을 되돌려야 한다.
 */
export function AboutCertification() {
  const { t, params, navigate } = useApp();
  const { status, data } = useApi("/api/certification");

  if (status !== "ready") {
    return <Loading />;
  }

  const tab = params.get("tab") === "grounds" ? "grounds" : "medicheck";

  return (
    <div className="page">
      <div className="container">
        <div className="tabs" role="tablist">
          {[
            ["medicheck", t("tabMedicheck")],
            ["grounds", t("tabGrounds")],
          ].map(([key, title]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              className="tabs__tab"
              onClick={() => navigate(`/about-certification?tab=${key}`)}
            >
              {title}
            </button>
          ))}
        </div>

        {tab === "medicheck" ? <MediCheck data={data} /> : <Grounds data={data} />}
      </div>
    </div>
  );
}

/* ── 메디체크 인증 ─────────────────────────────────────────────── */

const RULES = [
  ["rule1", "rule1b"],
  ["rule2", "rule2b"],
  ["rule3", "rule3b"],
  ["rule4", "rule4b"],
  ["rule5", "rule5b"],
  ["rule6", "rule6b"],
];

/* ISO 13485 인증기관의 2단계 심사를 그대로 빌려온 순서다. 순서가 곧 내용이므로
   번호를 붙인 목록으로 둔다 — 규칙 목록과 같은 모양을 쓴다 */
const STEPS = [
  ["step1", "step1b"],
  ["step2", "step2b"],
  ["step3", "step3b"],
  ["step4", "step4b"],
  ["step5", "step5b"],
  ["step6", "step6b"],
];

/* 주장 → 검증 → 타당성 확인. 셋은 나란한 것이 아니라 순서다 */
const VALIDATION = [
  ["valid1", "valid1b"],
  ["valid2", "valid2b"],
  ["valid3", "valid3b"],
];

/* 비교표. 마지막 줄이 메디체크다 — 남의 인증을 먼저 설명하고 우리 것을 끝에 둔다 */
const COMPARE = [
  ["cmp13485", "cmp13485Looks", "cmp13485Who", "cmp13485Means"],
  ["cmp9001", "cmp9001Looks", "cmp9001Who", "cmp9001Means"],
  ["cmpMohw", "cmpMohwLooks", "cmpMohwWho", "cmpMohwMeans"],
  ["cmpUs", "cmpUsLooks", "cmpUsWho", "cmpUsMeans"],
];

function MediCheck({ data }) {
  const { t, lang } = useApp();
  const pick = (row, key) => (lang === "ko" ? row[`${key}Ko`] : row[`${key}En`]);

  return (
    <>
      {/* 「아직 제도가 아니라 계획안입니다」 머리글을 뺐다. 문구는 copy.js 의
          planTitle · planBody · planGraded 에 그대로 있다 — 26장이 요구하는
          안내이므로 공개 전에 되돌린다 */}
      <div className="head">
        <h1>{t("tabMedicheck")}</h1>
      </div>

      <section className="block">
        <h2>{t("whyTitle")}</h2>
        {/* 문단은 컨테이너 폭까지 쭉 간다 */}
        <div className="cols">
          {[
            ["whyGapTitle", "whyGapBody"],
            ["whyFearTitle", "whyFearBody"],
            ["whyWhoTitle", "whyWhoBody"],
            ["whyNotTitle", "whyNotBody"],
          ].map(([head, body]) => (
            <div key={head}>
              <h3>{t(head)}</h3>
              <p>{t(body)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="block">
        <h2>{t("structureTitle")}</h2>
        <p className="block__lead">{t("structureLead")}</p>
        <ol className="rules">
          {RULES.map(([head, body], index) => (
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
        <h2>{t("axesTitle")}</h2>
        <p className="block__lead">{t("axesLead")}</p>
        <div className="axes">
          {data.axes.map((axis) => (
            <article className="axis" key={axis.code}>
              <div className="axis__head">
                <h3>{lang === "ko" ? axis.ko : axis.en}</h3>
                <span className="axis__points">
                  {t("axisPoints", { points: axis.points, floor: axis.floor })}
                </span>
              </div>
              <p className="axis__fear">“{pick(axis, "fear")}”</p>
              <dl>
                <dt>{t("axisLooks")}</dt>
                <dd>{pick(axis, "looks")}</dd>
                <dt>{t("axisEvidence")}</dt>
                <dd>{pick(axis, "evidence")}</dd>
              </dl>
            </article>
          ))}
        </div>
        <div className="callout">
          <b>{t("floorTitle")}</b>
          <p>{t("floorBody")}</p>
        </div>
      </section>

      {/* 무엇을 보는지 다음은 어떻게 보는지다. 등급은 그 결과이므로 뒤에 온다 */}
      <section className="block">
        <h2>{t("processTitle")}</h2>
        <p className="block__lead">{t("processLead")}</p>
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
        <h2>{t("validTitle")}</h2>
        <p className="block__lead">{t("validLead")}</p>
        <ol className="rules">
          {VALIDATION.map(([head, body], index) => (
            <li key={head}>
              <span className="rules__no">{index + 1}</span>
              <div>
                <b>{t(head)}</b>
                <p>{t(body)}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="callout">
          <b>{t("validCallout")}</b>
          <p>{t("validCalloutBody")}</p>
        </div>
      </section>

      <section className="block">
        <h2>{t("gradesTitle")}</h2>
        <p className="block__lead">{t("gradesLead")}</p>
        <div className="grades">
          {data.grades.map((grade) => (
            <div className="grade" key={grade.code}>
              {/* 금속색은 자료에서 온다. 화면에 박아 두면 문서와 갈린다 (25장) */}
              <span className="medal" style={{ background: grade.bg, color: grade.ink }}>
                <i style={{ background: grade.dot }} />
                {lang === "ko" ? grade.ko : grade.en}
              </span>
              <span className="grade__score">{t("gradeScore", { score: grade.scoreFrom })}</span>
              <span className="grade__ref">{t("gradeRef", { band: grade.percentile })}</span>
            </div>
          ))}
        </div>
        <div className="callout">
          <b>{t("gradeValid")}</b>
          <p>{t("gradeValidBody")}</p>
        </div>
      </section>

      <section className="block">
        <h2>{t("medalTitle")}</h2>
        <p className="block__lead">{t("medalBody")}</p>
        <p className="block__lead">{t("medalColour")}</p>
      </section>

      {/* 로고가 늘어선 벽에서 이것이 어느 질문에 답한 것인지 구별되게 한다.
          마지막 줄이 메디체크이고, 거기에만 '계획안'이 붙는다 */}
      <section className="block">
        <h2>{t("compareTitle")}</h2>
        <p className="block__lead">{t("compareLead")}</p>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>{t("colScheme")}</th>
                <th>{t("colLooks")}</th>
                <th>{t("colWho")}</th>
                <th>{t("colMeans")}</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map(([scheme, looks, who, means]) => (
                <tr key={scheme}>
                  <td>{t(scheme)}</td>
                  <td>{t(looks)}</td>
                  <td>{t(who)}</td>
                  <td>{t(means)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="callout">
          <b>{t("compareNote")}</b>
          <p>{t("compareNoteBody")}</p>
        </div>
      </section>

      <section className="block">
        <h2>{t("openTitle")}</h2>
        <ul className="open">
          <li>{t("open1")}</li>
          <li>{t("open2")}</li>
          <li>{t("open3")}</li>
          <li>{t("open4")}</li>
        </ul>
        <p className="block__lead">{t("openSource")}</p>
      </section>
    </>
  );
}

/* ── 추가 인증 — 지금 배지가 서 있는 근거 ───────────────────────── */

function Grounds({ data }) {
  const { t, lang } = useApp();
  return (
    <>
      <div className="head">
        <h1>{t("certTitle")}</h1>
        <p>{t("certLead")}</p>
      </div>

      {/* 이 표가 이 탭의 심장이다. 오른쪽 열을 숨기고 싶은 유혹이 크지만 반대다 —
          확인하지 않은 것을 먼저 밝혀 두면 나중에 무엇을 약속했는지가 문서로 남는다(28장).

          근거가 둘이므로 '확인한 것'도 둘이다. 합치면 서울시 목록을 근거로 올라온
          기관에까지 '보건복지부 등록을 확인했다'가 붙는다. */}
      <div className="scope">
        <Ground
          badge={t("groundMohw")}
          lead={t("groundMohwLead")}
          items={data.checkedByMohw}
          count={data.standingOn.MOHW}
        />
        <Ground
          badge={t("groundSeoul")}
          lead={t("groundSeoulLead")}
          items={data.checkedBySeoul}
          count={data.standingOn.SEOUL}
        />
        {/* 확인하지 않은 것은 근거와 무관하게 같다 */}
        <section className="scope__col scope__col--not">
          <h2>{t("weDidNotCheck")}</h2>
          <ul>
            {data.notChecked.map((item) => (
              <li key={item.en}>{lang === "ko" ? item.ko : item.en}</li>
            ))}
          </ul>
        </section>
      </div>

      <div className="block">
        <div className="cols">
          <div>
            <h3>{t("limitsTitle")}</h3>
            <p>{t("limitsBody")}</p>
          </div>
          <div>
            <h3>{t("endsTitle")}</h3>
            <p>{t("endsBody")}</p>
          </div>
        </div>
      </div>

      <section id="removals" style={{ marginTop: "var(--space-2xl)", scrollMarginTop: "96px" }}>
        <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 700 }}>
          {t("removalsTitle")} · {data.removals.length}
        </h2>
        {data.removals.length === 0 ? (
          /* 없는 탈락을 지어내지 않는다. 없으면 없다고 말한다 (4장) */
          <p className="scope__lead">{t("removalsNone")}</p>
        ) : (
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>{t("colHospital")}</th>
                  <th>{t("colListed")}</th>
                  <th>{t("colReason")}</th>
                </tr>
              </thead>
              <tbody>
                {data.removals.map((removal) => (
                  <tr key={`${removal.nameEn}-${removal.listedTo}`}>
                    <td>{removal.nameEn}</td>
                    <td>
                      {removal.listedFrom} — {removal.listedTo}
                    </td>
                    {/* 사유는 낱말 하나로만. 설명을 붙이면 협회가 그 기관을 평가하는
                        문장이 되고, 그건 다툼이 된다(28장) */}
                    <td>
                      <span className="reason">{t(removal.reason)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <div style={{ marginTop: "var(--space-xl)" }}>
        <Link to="/find-a-hospital" className="btn btn--ghost">
          {t("findAHospital")}
        </Link>
      </div>
    </>
  );
}

/**
 * 근거 하나. 무엇을 확인했는지와, 지금 몇 곳이 그 위에 서 있는지를 함께 적는다.
 *
 * <p>근거를 설명해 놓고 실제로는 아무도 그 위에 없다면 그 사실이 설명만큼 중요하다.
 * 숫자를 빼면 읽는 사람은 둘 다 쓰이고 있다고 짐작한다.
 */
function Ground({ badge, lead, items, count }) {
  const { t, lang } = useApp();
  return (
    <section className="scope__col scope__col--checked">
      <span className="badge">{badge}</span>
      <h2>{t("weChecked")}</h2>
      <p className="scope__lead">{lead}</p>
      <ul>
        {items.map((item) => (
          <li key={item.en}>{lang === "ko" ? item.ko : item.en}</li>
        ))}
      </ul>
      <p className="scope__standing">
        {count ? t("standingCount", { count }) : t("standingNone")}
      </p>
    </section>
  );
}
