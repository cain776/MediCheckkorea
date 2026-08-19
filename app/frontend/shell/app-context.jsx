import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { line } from "./copy.js";

/**
 * 라우터와 언어.
 *
 * react-router 를 쓰지 않는다. 경로가 다섯이고 그중 하나만 매개변수를 받는다 —
 * 그 정도에 라우터 라이브러리를 얹으면 번들만 커지고 읽을 것이 늘어난다.
 */
const AppContext = createContext(null);

function currentPath() {
  return window.location.pathname + window.location.search;
}

export function AppProvider({ children }) {
  const [path, setPath] = useState(currentPath);
  // 영어가 원본이다(14장). 그래서 기본값이 en 이다.
  const [lang, setLang] = useState(() => (document.documentElement.lang === "ko" ? "ko" : "en"));
  // 진료과목·지역·응대 언어의 두 이름. 화면마다 사전을 들고 있으면 넷이 어긋난다.
  const [labels, setLabels] = useState(null);

  useEffect(() => {
    fetch("/api/labels")
      .then((response) => response.json())
      .then(setLabels)
      .catch(() => setLabels({}));
  }, []);

  useEffect(() => {
    const onPop = () => setPath(currentPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const navigate = useCallback((to, options = {}) => {
    if (options.replace) {
      window.history.replaceState({}, "", to);
    } else {
      window.history.pushState({}, "", to);
    }
    setPath(currentPath());
    window.scrollTo({ top: 0 });
  }, []);

  const value = useMemo(() => {
    const [pathname, search] = path.split("?");
    return {
      path,
      pathname,
      params: new URLSearchParams(search ?? ""),
      navigate,
      lang,
      setLang,
      t: (key, values) => line(key, lang, values),
      /**
       * 자료에 들어 있는 값을 지금 언어의 이름으로.
       *
       * 모르는 값은 그대로 내보낸다. 자료에 새 과목이 생겼는데 이름을 아직 안 달았다면,
       * 빈칸을 보여 주는 것보다 자료가 쓰는 말을 그대로 보여 주는 편이 낫다.
       */
      label: (kind, code) => labels?.[kind]?.[code]?.[lang] ?? code,
    };
  }, [path, navigate, lang, labels]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const value = useContext(AppContext);
  if (!value) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return value;
}

/** 앵커는 진짜 <a> 로 둔다 — 가운데 클릭과 링크 복사가 살아 있어야 한다. */
export function Link({ to, children, ...rest }) {
  const { navigate } = useApp();
  return (
    <a
      href={to}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
          return;
        }
        event.preventDefault();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

/** 화면마다 되풀이되는 불러오기. 실패를 삼키지 않는다 — 화면이 조용히 비면 원인을 못 찾는다. */
export function useApi(url) {
  const [state, setState] = useState({ status: "loading", data: null, error: null });

  useEffect(() => {
    let alive = true;
    setState({ status: "loading", data: null, error: null });
    fetch(url, { headers: { Accept: "application/json" } })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        return response.json();
      })
      .then((data) => alive && setState({ status: "ready", data, error: null }))
      .catch((error) => alive && setState({ status: "error", data: null, error }));
    return () => {
      alive = false;
    };
  }, [url]);

  return state;
}
