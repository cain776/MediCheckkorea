import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import { AppProvider, useApp } from "./shell/app-context.jsx";
import { Footer, Nav } from "./shell/chrome.jsx";
import { Home } from "./home/Home.jsx";
import { FindAHospital } from "./hospital/FindAHospital.jsx";
import { HospitalDetail } from "./hospital/HospitalDetail.jsx";
import { AboutCertification } from "./certification/AboutCertification.jsx";
import { PatientJourney } from "./journey/PatientJourney.jsx";
import { OnlineConsultation } from "./consultation/OnlineConsultation.jsx";
import { CheckThePrice } from "./price/CheckThePrice.jsx";
import { Content } from "./content/Content.jsx";
import { SendAnInquiry } from "./inquiry/SendAnInquiry.jsx";

/**
 * 경로 하나에 화면 하나. 표 순서는 menu.js · SpaWebConfig 와 같다.
 *
 * 기관 상세만 매개변수를 받는다 — /find-a-hospital/{id} 는 목록의 아래 단계이므로
 * 별도 메뉴가 아니라 같은 경로 밑에 둔다.
 */
function Screen() {
  const { pathname } = useApp();

  if (pathname === "/") {
    return <Home />;
  }
  if (pathname === "/find-a-hospital") {
    return <FindAHospital />;
  }
  if (pathname.startsWith("/find-a-hospital/")) {
    return <HospitalDetail id={decodeURIComponent(pathname.slice("/find-a-hospital/".length))} />;
  }
  if (pathname === "/about-certification") {
    return <AboutCertification />;
  }
  if (pathname === "/content") {
    return <Content />;
  }
  if (pathname === "/patient-journey") {
    return <PatientJourney />;
  }
  if (pathname === "/online-consultation") {
    return <OnlineConsultation />;
  }
  if (pathname === "/check-the-price") {
    return <CheckThePrice />;
  }
  if (pathname === "/send-an-inquiry") {
    return <SendAnInquiry />;
  }
  return <Home />;
}

function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Screen />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
);
