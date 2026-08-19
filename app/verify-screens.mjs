import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

/**
 * 여섯 화면을 실제 브라우저로 열어 확인한다.
 *
 * 사람이 눈으로 보기 전에 기계가 먼저 걸러야 하는 것이 셋 있다 —
 * 콘솔 오류 · 가로 스크롤 · 죽은 경로. 셋 다 조용히 생기고, 스크린샷만 보면
 * 앞의 둘은 보이지도 않는다.
 *
 * 가로 스크롤을 좁은 폭에서 재는 이유는 그게 이 화면의 실제 실패 지점이기 때문이다.
 * 첫 판에서 375px 내비가 잘려 링크를 못 누르는 상태였는데, 1440px 스크린샷만
 * 봤다면 못 찾았다.
 *
 *   npm run verify              8081 을 본다
 *   npm run verify -- 9000      다른 포트
 */

const port = process.argv[2] ?? process.env.MEDICHECK_PORT ?? "8081";
const base = `http://127.0.0.1:${port}`;
const outDir = "build/screens";

// SpaWebConfig.java · frontend/shell/menu.js 와 같은 표다. 화면이 늘면 여기도 는다.
//
// 기관 상세만 id 가 필요하다. 여기에 특정 id 를 적어 두면 그 기관이 목록에서
// 내려가는 날 검증이 통째로 빨간불이 된다 — 화면이 아니라 검증기가 낡아서.
// 그래서 목록에서 첫 기관을 받아 쓴다.
const SCREENS = (id) => [
  { name: "home", path: "/" },
  { name: "find-a-hospital", path: "/find-a-hospital" },
  { name: "hospital-detail", path: `/find-a-hospital/${id}` },
  { name: "about-certification", path: "/about-certification" },
  { name: "patient-journey", path: "/patient-journey" },
  { name: "online-consultation", path: "/online-consultation" },
  { name: "send-an-inquiry", path: "/send-an-inquiry" },
];

// 좁은 쪽 셋은 실제 기기 폭이다. 1440 은 기획서 목업이 그려진 폭.
const WIDTHS = [320, 375, 768, 1440];

async function main() {
  await mkdir(outDir, { recursive: true });

  const response = await fetch(`${base}/api/home`).catch(() => null);
  if (!response?.ok) {
    console.error(`서버가 ${base} 에 없다. start-server.bat 을 먼저 띄운다.`);
    process.exit(1);
  }

  const list = await (await fetch(`${base}/api/hospitals`)).json();
  if (!list.hospitals.length) {
    console.error("등재된 기관이 0곳이다. 기관 상세를 열어 볼 수가 없다.");
    process.exit(1);
  }
  const screens = SCREENS(list.hospitals[0].id);

  // 기본 launch() 는 chrome-headless-shell 을 띄운다 — 풀 크로미움보다 훨씬 빨리 뜬다.
  const browser = await chromium.launch();
  const failures = [];

  for (const screen of screens) {
    for (const width of WIDTHS) {
      const page = await browser.newPage({
        viewport: { width, height: 900 },
        deviceScaleFactor: width === 1440 ? 2 : 1,
      });

      const noise = [];
      page.on("pageerror", (error) => noise.push(`pageerror: ${error}`));
      page.on("console", (message) => {
        if (message.type() === "error") {
          noise.push(`console: ${message.text()}`);
        }
      });
      page.on("response", (res) => {
        if (res.status() >= 400) {
          noise.push(`${res.status()} ${res.url()}`);
        }
      });

      await page.goto(base + screen.path, { waitUntil: "networkidle" });

      // 화면 밖으로 나간 것.
      //
      // scrollWidth 로 재면 안 된다. 이 화면은 html 에 overflow-x: clip 을 걸어 두었고,
      // 그러면 넘친 만큼 scrollWidth 가 자라지 않는다 — 즉 그 검사는 무엇을 해도
      // 통과한다. 첫 판이 그렇게 24개 전부 초록이었다.
      //
      // 대신 요소의 오른쪽 끝을 직접 본다. 가로로 구르라고 만든 상자
      // (.scroll-x · .table-wrap · .nav__links) 안쪽은 넘치는 것이 정상이므로 뺀다.
      const spills = await page.evaluate(() => {
        const limit = document.documentElement.clientWidth;
        const insideScroller = (node) => {
          for (let n = node.parentElement; n && n !== document.body; n = n.parentElement) {
            const overflowX = getComputedStyle(n).overflowX;
            if (overflowX === "auto" || overflowX === "scroll" || overflowX === "hidden") {
              return true;
            }
          }
          return false;
        };
        return [...document.body.querySelectorAll("*")]
          .filter((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 && rect.height === 0) return false;
            return rect.right > limit + 1 && !insideScroller(el);
          })
          .slice(0, 4)
          .map((el) => {
            const cls = String(el.className || "").split(" ")[0];
            return cls ? `${el.tagName.toLowerCase()}.${cls}` : el.tagName.toLowerCase();
          });
      });

      // 두 줄로 접힌 버튼·링크. 좁은 폭에서 누를 수 없게 되는 자리다.
      //
      // 상자 높이로 재면 안 된다 — .btn 은 높이 44px 고정에 줄높이가 24px 이라
      // 한 줄짜리도 전부 걸린다. 첫 판이 그렇게 24건을 거짓으로 잡았다.
      // 텍스트가 실제로 몇 개의 줄 상자를 차지하는지를 센다.
      const wrapped = await page.evaluate(() =>
        [...document.querySelectorAll("a.btn, button.btn, .nav__link, .bento__more")]
          .filter((el) => {
            const range = document.createRange();
            range.selectNodeContents(el);
            const tops = new Set(
              [...range.getClientRects()]
                .filter((rect) => rect.width > 0 && rect.height > 0)
                .map((rect) => Math.round(rect.top)),
            );
            return tops.size > 1;
          })
          .map((el) => el.textContent.trim().slice(0, 30)),
      );

      if (width === 1440) {
        await page.screenshot({ path: `${outDir}/${screen.name}.png` });
      }

      const problems = [
        ...noise,
        spills.length ? `화면 밖으로 나감: ${spills.join(" / ")}` : null,
        wrapped.length ? `두 줄로 접힌 클릭 대상: ${wrapped.join(" / ")}` : null,
      ].filter(Boolean);

      if (problems.length) {
        failures.push(`${screen.name} @${width}px — ${problems.join(" · ")}`);
      }
      console.log(
        `${problems.length ? "✗" : "·"} ${screen.name.padEnd(20)} ${String(width).padStart(4)}px`,
      );
      await page.close();
    }
  }

  await browser.close();

  if (failures.length) {
    console.error(`\n${failures.length}건:`);
    for (const failure of failures) {
      console.error(`  ${failure}`);
    }
    process.exit(1);
  }
  console.log(`\n${screens.length}화면 × ${WIDTHS.length}폭 통과. 그림은 ${outDir}/ 에.`);
}

await main();
