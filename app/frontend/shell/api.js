/**
 * 서버가 없는 자리에서도 화면이 돌게 하는 갈래.
 *
 * <p>이 앱의 진짜 모습은 Java 서버가 `/api/...` 를 주는 것이다. 그런데 외주 업체에
 * 「이런 느낌」을 보여 주려면 링크 하나로 열리는 곳에 올라가 있어야 하고, 그런 곳은
 * 대개 JVM 을 돌려 주지 않는다. 그래서 **읽기만 정적 JSON 으로 갈아 끼우는 갈래**를
 * 하나 둔다. 서버 코드는 한 줄도 바뀌지 않는다.
 *
 * <p><b>갈래는 여기 한 곳뿐이다.</b> 화면들은 `useApi` 만 부르고, `useApi` 는 이 파일만
 * 부른다. 화면마다 「정적이면 이렇게」를 흩뿌리면 갈래가 여섯 개가 되고, 그중 하나가
 * 반드시 뒤처진다.
 *
 * <p>정적 갈래에서 거르기·정렬은 브라우저가 한다. 100건이라 체감 차이가 없고,
 * 서버의 SQL 과 **같은 뜻**이어야 한다 — 아래 주석이 어느 SQL 을 옮긴 것인지 밝힌다.
 */

/** esbuild 가 빌드할 때 박아 넣는다. 보통 빌드는 false 라 아래 코드가 통째로 지워진다. */
export const STATIC = __MEDICHECK_STATIC__;

/** 정적 자료는 배포마다 고정이다. 같은 파일을 화면 옮길 때마다 다시 받을 이유가 없다. */
const cache = new Map();

function loadJson(path) {
  if (!cache.has(path)) {
    cache.set(
      path,
      fetch(path, { headers: { Accept: "application/json" } }).then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        return response.json();
      }),
    );
  }
  return cache.get(path);
}

/** SQLite 의 LIKE '%x%' 는 ASCII 대소문자를 가리지 않는다. 한글은 어차피 구분이 없다. */
function like(haystack, needle) {
  return String(haystack ?? "").toLowerCase().includes(needle.trim().toLowerCase());
}

/** COALESCE(org_name_en, org_name). 빈 문자열은 NULL 이 아니므로 ?? 가 맞다. */
function nameKey(hospital) {
  return hospital.nameEn ?? hospital.nameKo ?? "";
}

/**
 * SQLite 의 기본 정렬은 BINARY — 코드 순서다. localeCompare 를 쓰면 서버와 순서가
 * 달라지고, 4장이 「정렬 기준을 공개한다」고 해 둔 그 기준이 화면마다 달라진다.
 */
function byCode(a, b) {
  if (a === b) {
    return 0;
  }
  return a < b ? -1 : 1;
}

/**
 * HospitalRepository.search() 를 옮긴 것.
 *
 * <p>진료과목·응대 언어는 DB 에서 쉼표로 붙은 한 칸이고 SQL 은 그 칸에 LIKE 를 건다.
 * JSON 에서는 이미 낱개로 펴져 있으므로, 도로 붙여서 같은 뜻이 되게 한다.
 */
function searchHospitals(all, params) {
  const q = params.get("q");
  const specialty = params.get("specialty");
  const region = params.get("region");
  const language = params.get("language");
  const sort = params.get("sort") === "updated" ? "updated" : "name";

  const found = all.filter((h) => {
    const specialties = h.specialties.join(", ");
    const languages = h.languages.join(", ");
    if (q?.trim() && !(like(h.nameEn, q) || like(h.nameKo, q) || like(specialties, q))) {
      return false;
    }
    if (specialty?.trim() && !like(specialties, specialty)) {
      return false;
    }
    if (region?.trim() && h.region !== region.trim()) {
      return false;
    }
    if (language?.trim() && !like(languages, language)) {
      return false;
    }
    return true;
  });

  found.sort((a, b) =>
    sort === "updated"
      ? byCode(b.updatedAt ?? "", a.updatedAt ?? "") || byCode(nameKey(a), nameKey(b))
      : byCode(nameKey(a), nameKey(b)),
  );

  return { found, sort };
}

/**
 * `/api/...` 하나를 읽는다. 보통 빌드에서는 그냥 fetch 다.
 *
 * <p>정적 갈래에서 404 는 서버와 같은 뜻이어야 한다 — 없는 기관을 열면 화면이
 * 「없다」고 말해야지, 빈 상세를 그리면 안 된다.
 */
export async function apiGet(url) {
  if (!STATIC) {
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    return response.json();
  }

  const [path, search] = url.split("?");
  const params = new URLSearchParams(search ?? "");

  if (path === "/api/hospitals") {
    const file = await loadJson("/data/hospitals.json");
    const { found, sort } = searchHospitals(file.hospitals, params);
    return { hospitals: found, total: found.length, sortedBy: sort, facets: file.facets };
  }

  if (path.startsWith("/api/hospitals/")) {
    const id = decodeURIComponent(path.slice("/api/hospitals/".length));
    const byId = await loadJson("/data/hospitals-by-id.json");
    if (!byId[id]) {
      throw new Error("404");
    }
    return byId[id];
  }

  const files = {
    "/api/home": "/data/home.json",
    "/api/labels": "/data/labels.json",
    "/api/certification": "/data/certification.json",
    "/api/journey": "/data/journey.json",
    "/api/consultations": "/data/consultations.json",
    "/api/content": "/data/content.json",
  };
  if (!files[path]) {
    throw new Error(`정적 갈래에 없는 경로다: ${path}`);
  }
  return loadJson(files[path]);
}
