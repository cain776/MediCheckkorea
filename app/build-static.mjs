import { build } from "esbuild";
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { options } from "./build-frontend.mjs";

/**
 * 서버 없이 열리는 판을 만든다 — 외주 전달용.
 *
 * <p>이 앱은 Java 서버가 있어야 돈다. 그런데 링크 하나로 열리는 무료 호스팅은 대개
 * JVM 을 안 돌려 준다. 그래서 **돌고 있는 서버에서 답을 받아 JSON 으로 굳히고**,
 * 프런트는 그 JSON 을 읽는 갈래(frontend/shell/api.js)로 묶어 낸다.
 *
 * <p>답을 손으로 다시 만들지 않고 실제 API 에서 받아 오는 것이 요점이다. 서버의
 * 규칙 — 등재 조건(4장) · 정렬 · 거르기 상자 — 을 여기서 다시 쓰면 두 벌이 되고,
 * 그때부터 화면이 조용히 갈린다.
 *
 * <p><b>산출물은 저장소에 그대로 커밋한다.</b> 이 폴더를 만들려면 Java 와 DB 가
 * 있어야 하는데 배포하는 쪽에는 둘 다 없다. 그래서 만드는 것은 여기서, 올리는 것은
 * 저장소에서 한다.
 *
 *   node build-static.mjs           8081 에 떠 있는 서버를 본다
 *   node build-static.mjs 9000      다른 포트
 */

const port = process.argv[2] ?? process.env.MEDICHECK_PORT ?? "8081";
const base = `http://127.0.0.1:${port}`;
const out = "../web";

async function api(path) {
  const response = await fetch(`${base}${path}`, { headers: { Accept: "application/json" } });
  if (!response.ok) {
    throw new Error(`${path} → ${response.status}`);
  }
  return response.json();
}

async function save(name, value) {
  await writeFile(`${out}/data/${name}`, JSON.stringify(value), "utf8");
}

const alive = await fetch(`${base}/api/home`).catch(() => null);
if (!alive?.ok) {
  console.error(`서버가 ${base} 에 없다. start-server.bat 을 먼저 띄운다.`);
  process.exit(1);
}

await rm(out, { recursive: true, force: true });
await mkdir(`${out}/data`, { recursive: true });

// 화면이 부르는 여섯 곳. SpaWebConfig 의 표와 같은 줄이다 — 화면이 늘면 여기도 는다.
const [home, labels, certification, journey, consultations, content] = await Promise.all([
  api("/api/home"),
  api("/api/labels"),
  api("/api/certification"),
  api("/api/journey"),
  api("/api/consultations"),
  api("/api/content"),
]);

// 목록은 정렬 없는 판 하나만 굳힌다. 거르기·정렬은 브라우저가 한다 —
// 조합마다 파일을 만들면 (검색어 × 과목 × 지역 × 언어 × 정렬) 이 끝없이 늘어난다.
const hospitals = await api("/api/hospitals?sort=name");

// 상세는 한 덩어리로 묶는다. 100건이라 파일 100개를 만들 이유가 없고,
// 첫 상세를 열 때 한 번만 받으면 그다음은 즉시 열린다.
const byId = {};
for (const hospital of hospitals.hospitals) {
  byId[hospital.id] = await api(`/api/hospitals/${encodeURIComponent(hospital.id)}`);
}

await save("home.json", home);
await save("labels.json", labels);
await save("certification.json", certification);
await save("journey.json", journey);
await save("consultations.json", consultations);
await save("content.json", content);
await save("hospitals.json", hospitals);
await save("hospitals-by-id.json", byId);

// 정적 갈래를 켜서 묶는다. app.css 는 esbuild 가 app.js 옆에 같이 내놓는다.
await build({
  ...options,
  outfile: `${out}/assets/app.js`,
  define: { ...options.define, __MEDICHECK_STATIC__: "true" },
});

// index.html 은 이 저장소에 하나뿐이다. 정적 판에서도 같은 파일을 쓴다.
await cp("src/main/resources/static/index.html", `${out}/index.html`);
// 사진은 gitignore 로 서버 폴더에서 빠져 있지만, 정적 판은 이 폴더째로 올라간다.
await cp("src/main/resources/static/photos", `${out}/photos`, { recursive: true });

console.log(`\n${out}/ 에 만들었다 — 기관 ${hospitals.total}곳 · 상담 ${consultations.total}건.`);
console.log("서버 없이 확인: npx serve ../web  (또는 그냥 Vercel 에 밀기)");
