import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

/**
 * 정적 판이 **서버 없이** 도는지 확인한다.
 *
 * <p>여기서 재는 것은 「화면이 뜨는가」가 아니라 **서버가 있을 때와 같은 것을 보여
 * 주는가**다. 거르기·정렬을 브라우저가 다시 구현했으므로, 그 결과가 Java 의 SQL 과
 * 어긋나면 화면은 멀쩡한데 목록만 조용히 다르다 — 눈으로는 못 잡는 종류다.
 *
 * <p>그래서 같은 조건을 양쪽에 물어 **건수와 첫 다섯 곳의 이름을 맞춰 본다.**
 *
 *   node verify-static.mjs            8081 의 Java 서버와 대조한다
 */

const apiBase = `http://127.0.0.1:${process.argv[2] ?? "8081"}`;
const root = "../web";
const port = 8099;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

// Vercel 의 rewrites 와 같은 규칙이다 — 파일이 있으면 파일, 없으면 index.html.
const server = createServer(async (req, res) => {
  const path = decodeURIComponent(req.url.split("?")[0]);
  const asFile = join(root, normalize(path));
  for (const candidate of [asFile, join(root, "index.html")]) {
    try {
      const body = await readFile(candidate);
      res.writeHead(200, { "Content-Type": TYPES[extname(candidate)] ?? "application/octet-stream" });
      res.end(body);
      return;
    } catch {
      // 다음 후보로
    }
  }
  res.writeHead(404).end();
});
await new Promise((done) => server.listen(port, done));
const base = `http://127.0.0.1:${port}`;

const SCREENS = [
  { name: "home", path: "/" },
  { name: "find-a-hospital", path: "/find-a-hospital" },
  { name: "about-certification", path: "/about-certification" },
  { name: "content", path: "/content" },
  { name: "patient-journey", path: "/patient-journey" },
  { name: "online-consultation", path: "/online-consultation" },
  { name: "send-an-inquiry", path: "/send-an-inquiry" },
];

// 조합은 손으로 고른다 — 빈 결과 · 한 곳만 · 여러 조건 겹침이 다 들어가야 한다.
const QUERIES = [
  "",
  "?sort=updated",
  "?q=clinic",
  "?q=서울",
  "?specialty=Plastic surgery",
  "?specialty=Dermatology&sort=updated",
  "?region=강남구",
  "?region=강남구&specialty=Plastic surgery",
  "?language=Japanese",
  "?language=Arabic&region=서초구",
  "?q=zzzz",
];

const browser = await chromium.launch();
const failures = [];

// ── 1. 여섯 화면이 서버 없이 뜨는가 ────────────────────────────────
for (const screen of SCREENS) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 120)));
  page.on("requestfailed", (r) => {
    // 유튜브는 이 확인의 대상이 아니다
    if (!/youtube|ytimg|gstatic|doubleclick/i.test(r.url())) {
      errors.push(`요청 실패 ${r.url().slice(0, 80)}`);
    }
  });
  await page.goto(base + screen.path, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);

  const state = await page.evaluate(() => ({
    loading: Boolean(document.querySelector(".loading")),
    apiCalls: performance.getEntriesByType("resource").filter((r) => r.name.includes("/api/")).length,
    text: document.body.innerText.length,
  }));
  if (state.loading) failures.push(`${screen.name}: 로딩에서 멈춤`);
  if (state.apiCalls > 0) failures.push(`${screen.name}: /api/ 를 ${state.apiCalls}번 불렀다`);
  if (state.text < 200) failures.push(`${screen.name}: 화면이 거의 비어 있다`);
  if (errors.length) failures.push(`${screen.name}: ${errors.join(" | ")}`);
  console.log(`· ${screen.name.padEnd(20)} 글자 ${String(state.text).padStart(5)} · /api/ 호출 ${state.apiCalls} · 오류 ${errors.length}`);
  await page.close();
}

// ── 2. 거르기·정렬이 Java 와 같은 답을 내는가 ──────────────────────
console.log("\n조건별 대조 (건수 · 첫 다섯 곳):");
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
for (const query of QUERIES) {
  const expected = await (await fetch(`${apiBase}/api/hospitals${query}`)).json();
  await page.goto(`${base}/find-a-hospital${query}`, { waitUntil: "networkidle" });
  await page.waitForFunction(() => !document.querySelector(".loading"), null, { timeout: 10000 });
  await page.waitForTimeout(200);

  const got = await page.evaluate(() => ({
    names: [...document.querySelectorAll(".card__name, .card h3, article h3")].slice(0, 5).map((e) => e.innerText.trim()),
    cards: document.querySelectorAll(".card").length,
  }));
  const want = expected.hospitals.slice(0, 5).map((h) => (h.nameEn ?? h.nameKo) || h.nameKo);

  const countOk = got.cards === expected.total;
  const orderOk = JSON.stringify(got.names) === JSON.stringify(want);
  if (!countOk || !orderOk) {
    failures.push(`${query || "(조건 없음)"}: 건수 ${got.cards} vs ${expected.total} · 순서 ${orderOk ? "같음" : "다름"}`);
    if (!orderOk) {
      console.log(`  받은 것: ${JSON.stringify(got.names)}`);
      console.log(`  서버   : ${JSON.stringify(want)}`);
    }
  }
  console.log(`  ${(query || "(조건 없음)").padEnd(38)} ${String(got.cards).padStart(3)}곳 ${countOk && orderOk ? "✓" : "✗"}`);
}

// ── 3. 사진이 실제로 그려지는가 ────────────────────────────────────
await page.goto(`${base}/find-a-hospital`, { waitUntil: "networkidle" });
await page.waitForTimeout(500);
const photos = await page.evaluate(() =>
  [...document.querySelectorAll(".card__photo")]
    .map((e) => getComputedStyle(e).backgroundImage)
    .filter((v) => v && v !== "none").length,
);
console.log(`\n목록 사진: ${photos}장`);
if (photos === 0) failures.push("목록에 사진이 한 장도 안 그려졌다");

// ── 4. 문의가 막혀 있는가 ──────────────────────────────────────────
await page.goto(`${base}/send-an-inquiry`, { waitUntil: "networkidle" });
await page.waitForTimeout(400);
const inquiry = await page.evaluate(() => ({
  notice: document.querySelector(".notice")?.innerText.trim().slice(0, 40) ?? null,
  disabled: document.querySelector('button[type="submit"]')?.disabled ?? null,
}));
console.log(`문의 화면: 안내 ${inquiry.notice ? "있음" : "없음"} · 보내기 단추 ${inquiry.disabled ? "잠김" : "열림"}`);
if (!inquiry.notice) failures.push("문의 화면에 안내가 없다");
if (!inquiry.disabled) failures.push("문의 보내기 단추가 잠기지 않았다");

await browser.close();
server.close();

if (failures.length) {
  console.error(`\n실패 ${failures.length}건:`);
  for (const f of failures) console.error(`  · ${f}`);
  process.exit(1);
}
console.log("\n정적 판이 서버 없이 돈다. 목록도 서버와 같다.");
