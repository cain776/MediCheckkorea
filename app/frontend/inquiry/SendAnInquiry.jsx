import { useState } from "react";
import { STATIC } from "../shell/api.js";
import { Link, useApi, useApp } from "../shell/app-context.jsx";
import { Loading } from "../shell/chrome.jsx";

/** 앞으로 열두 달. 날짜가 아니라 달로 받는다 — 아직 날짜를 잡아 줄 수 있는 사람이 없다(27장). */
function months(lang) {
  const now = new Date();
  const out = [];
  for (let i = 0; i < 12; i += 1) {
    const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const year = date.getFullYear();
    const mon = date.getMonth() + 1;
    out.push({
      value: `${year}-${String(mon).padStart(2, "0")}`,
      label:
        lang === "ko"
          ? `${year}년 ${mon}월`
          : date.toLocaleString("en", { month: "long", year: "numeric" }),
    });
  }
  return out;
}

export function SendAnInquiry() {
  const { t, lang, label, params } = useApp();
  const { status, data } = useApi("/api/hospitals?sort=name");

  const [form, setForm] = useState(() => ({
    hospitalId: params.get("hospital") ?? "",
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
    preferredMonth: "",
    language: "en",
    hasRecords: false,
    consentPrivacy: false,
  }));
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(null);

  if (status !== "ready") {
    return <Loading />;
  }

  const set = (key) => (event) => {
    const target = event.target;
    setForm((current) => ({
      ...current,
      [key]: target.type === "checkbox" ? target.checked : target.value,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    // 서버 없이 화면만 올린 판. 보낼 데가 없으므로 보내는 시늉도 하지 않는다 —
    // 「보냈습니다」를 띄우면 그건 거짓말이고, 이 사이트가 파는 것이 신뢰다(4장).
    // 아래 안내가 이미 화면에 떠 있고 보내기 단추도 잠겨 있다. 여기는 엔터키 같은
    // 다른 길로 들어오는 것을 막는 자리라 따로 말을 얹지 않는다.
    if (STATIC) {
      return;
    }
    setSending(true);
    setError(null);
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const body = await response.json();
      if (!response.ok) {
        throw new Error(body.detail ?? body.message ?? `${response.status}`);
      }
      setSent(body);
    } catch (caught) {
      setError(caught.message);
    } finally {
      setSending(false);
    }
  };

  // 보낸 다음 화면. 어디로 갔는지 · 누가 답하는지 · 안 오면 어떻게 하는지 셋이 다 들어간다(27장)
  if (sent) {
    return (
      <div className="page">
        <div className="container">
          <div className="sent">
            <h1>{t("sentTitle", { hospital: sent.hospitalName })}</h1>
            <p>{t("sentLead", { days: sent.replyBusinessDays })}</p>
            <p>{t("sentChase")}</p>
            <div className="sent__actions">
              <Link to="/find-a-hospital" className="btn btn--ink">
                {t("findAnother")}
              </Link>
              <Link to="/patient-journey" className="btn btn--ghost">
                {t("patientJourney")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const ready = form.hospitalId && form.name.trim() && form.email.trim() && form.message.trim() && form.consentPrivacy;

  return (
    <div className="page">
      <div className="container">
        <div className="head">
          <h1>{t("inquiryTitle")}</h1>
          <p>{t("inquiryLead")}</p>
        </div>

        <form className="form" onSubmit={submit}>
          <div className="form__fields">
            <label className="input">
              <span>{t("fHospital")}</span>
              <select value={form.hospitalId} onChange={set("hospitalId")} required>
                <option value="">{t("choose")}</option>
                {data.hospitals.map((hospital) => (
                  <option key={hospital.id} value={hospital.id}>
                    {(lang === "ko" ? hospital.nameKo : hospital.nameEn) || hospital.nameKo} ·{" "}
                    {label("REGION", hospital.region)}
                  </option>
                ))}
              </select>
            </label>

            <div className="input-pair">
              <label className="input">
                <span>{t("fName")}</span>
                <input value={form.name} onChange={set("name")} required autoComplete="name" />
              </label>
              <label className="input">
                <span>{t("fEmail")}</span>
                <input type="email" value={form.email} onChange={set("email")} required autoComplete="email" />
              </label>
            </div>

            <label className="input">
              <span>{t("fNeed")}</span>
              <textarea value={form.message} onChange={set("message")} required />
              <small>{t("fNeedHint")}</small>
            </label>

            <div className="input-pair">
              <label className="input">
                <span>
                  {t("fCountry")} <em>· {t("optional")}</em>
                </span>
                <input value={form.country} onChange={set("country")} autoComplete="country-name" />
              </label>
              <label className="input">
                <span>
                  {t("fPhone")} <em>· {t("optional")}</em>
                </span>
                <input value={form.phone} onChange={set("phone")} autoComplete="tel" />
              </label>
            </div>

            <div className="input-pair">
              <label className="input">
                <span>
                  {t("fWhen")} <em>· {t("optional")}</em>
                </span>
                {/* 달력 위젯을 두지 않는다 (27장) */}
                <select value={form.preferredMonth} onChange={set("preferredMonth")}>
                  <option value="">{t("none")}</option>
                  {months(lang).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <small>{t("fWhenHint")}</small>
              </label>
              <label className="input">
                <span>{t("fAnswerIn")}</span>
                {/* 목록에 없는 언어는 안 받는다 (14장) */}
                <select value={form.language} onChange={set("language")}>
                  <option value="en">English</option>
                  <option value="ko">한국어</option>
                </select>
              </label>
            </div>

            <label className="consent">
              <input type="checkbox" checked={form.hasRecords} onChange={set("hasRecords")} />
              <span>
                {t("fRecords")}
                <br />
                <small style={{ color: "var(--color-muted-2)" }}>{t("fRecordsHint")}</small>
              </span>
            </label>

            {/* "동의합니다"가 아니라 무엇에 동의하는지를 쓴다 (27장) */}
            <label className="consent">
              <input type="checkbox" checked={form.consentPrivacy} onChange={set("consentPrivacy")} required />
              <span>{t("consent")}</span>
            </label>

            {STATIC ? (
              <p className="notice">
                <b>{t("sampleOnlyTitle")}</b> {t("sampleOnlyBody")}
              </p>
            ) : null}
            {error ? <p className="notice">{error}</p> : null}

            <div>
              <button type="submit" className="btn btn--ink btn--block" disabled={!ready || sending || STATIC}>
                {sending ? t("submitting") : t("submit")}
              </button>
            </div>
          </div>

          <aside className="aside">
            <h2>{t("notAskTitle")}</h2>
            <ul>
              <li>{t("notAsk1")}</li>
              <li>{t("notAsk2")}</li>
              <li>{t("notAsk3")}</li>
              <li>{t("notAsk4")}</li>
            </ul>
            <p>{t("notAskWhy")}</p>
          </aside>
        </form>
      </div>
    </div>
  );
}
