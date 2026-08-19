/**
 * 서울시 「의료관광 협력기관」 상세 페이지에서 기관 정보를 받는다.
 *
 * V4 가 목록에서 받아 온 100곳의 member_id 는 그대로 상세 페이지 번호다 (VS2303 → /2303).
 * 결과는 JSON 한 덩어리로 stdout 이 아니라 파일에 쓴다 — 이 스크립트는 저장소에 남지만
 * 결과는 마이그레이션으로 옮겨 적는다 (V4 와 같은 방식).
 *
 *   node scrape-detail.mjs <out.json> [id ...]
 */
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";

const out = process.argv[2];
const ids = process.argv.slice(3);
if (!out || ids.length === 0) {
  console.error("usage: node scrape-detail.mjs <out.json> <id ...>");
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
const rows = [];

for (const [index, id] of ids.entries()) {
  try {
    await page.goto(`https://medical.visitseoul.net/organization/hospital/hospitalDetail/${id}`, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });
    await page.waitForSelector("dl dt", { timeout: 15000 });
    const row = await page.evaluate(() => {
      const clean = (s) => (s || "").replace(/\s+/g, " ").trim();
      const data = {};
      data.name = clean(document.querySelector("p.tit")?.textContent);

      // dt/dd 짝. 라벨은 한국어 원문 그대로 키로 쓴다 — 옮기면 무엇에서 왔는지 흐려진다
      const pairs = {};
      const lists = {};
      for (const dt of document.querySelectorAll("dl dt")) {
        const label = clean(dt.textContent);
        if (!label) continue;
        const dd = dt.nextElementSibling;
        if (!dd || dd.tagName !== "DD") continue;
        if (pairs[label]) continue;
        pairs[label] = clean(dd.innerText);
        // 특화진료·상담가능언어는 낱말 하나가 <span> 하나다. 붙은 글자열을 공백으로
        // 다시 나누면 '화상성형 및 재건'이 셋으로 쪼개진다 — 태그 그대로 받는다.
        const spans = [...dd.querySelectorAll("span")].map((s) => clean(s.textContent)).filter(Boolean);
        if (spans.length) lists[label] = spans;
      }
      data.pairs = pairs;
      data.lists = lists;

      // 이름 밑 한 줄(지하철)과 소개문. 상세 페이지의 첫 블록 안에만 있다
      const body = document.body.innerText.split("\n").map(clean).filter(Boolean);
      const nameAt = body.indexOf(data.name);
      data.head = nameAt >= 0 ? body.slice(nameAt + 1, nameAt + 8) : [];

      // 갤러리 사진은 base64 로 페이지 안에 박혀 있다. **본문은 가져오지 않는다** —
      // 100곳 × 여러 장이면 저장소가 사진으로 불어나고, 사진은 원래 기관이 올릴 것이다(7장).
      // 몇 장이 있는지만 세어 둔다.
      data.photoCount = [...document.querySelectorAll("img")]
        .filter((i) => (i.getAttribute("src") || "").startsWith("data:image")).length;
      return data;
    });
    row.id = id;
    rows.push(row);
    console.log(`${index + 1}/${ids.length} ${id} ${row.name} (photos ${row.photoCount})`);
  } catch (error) {
    console.log(`${index + 1}/${ids.length} ${id} FAILED ${error.message.split("\n")[0]}`);
    rows.push({ id, failed: String(error.message).split("\n")[0] });
  }
}

await browser.close();
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(rows, null, 1), "utf8");
console.log("wrote", out, rows.length, "rows");
