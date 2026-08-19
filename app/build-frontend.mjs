import { build, context } from "esbuild";
import { pathToFileURL } from "node:url";

// 산출물은 Spring 의 정적 폴더로 바로 간다. index.html 은 거기 이미 있고
// 여기서 만들지 않는다 — 이 저장소에 index.html 은 하나뿐이다.
//
// build-static.mjs 가 이 설정을 가져다 쓴다. 두 벌로 두면 한쪽만 고쳐지고,
// 그때 정적 판만 옛 설정으로 묶이는데 화면은 멀쩡해 보인다.
export const options = {
  entryPoints: ["frontend/main.jsx"],
  outfile: "src/main/resources/static/assets/app.js",
  bundle: true,
  format: "iife",
  target: ["es2020"],
  jsx: "automatic",
  loader: { ".js": "jsx" },
  minify: true,
  logLevel: "info",
  define: {
    "process.env.NODE_ENV": '"production"',
    // 서버가 있는 보통 판. false 라 shell/api.js 의 정적 갈래가 통째로 지워진다.
    __MEDICHECK_STATIC__: "false",
  },
};

// import 로 불렸을 때는 설정만 내주고 아무것도 만들지 않는다.
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.includes("--watch")) {
    const ctx = await context({ ...options, minify: false });
    await ctx.watch();
    console.log("watching frontend/…");
  } else {
    await build(options);
  }
}
