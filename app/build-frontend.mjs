import { build, context } from "esbuild";

// 산출물은 Spring 의 정적 폴더로 바로 간다. index.html 은 거기 이미 있고
// 여기서 만들지 않는다 — 이 저장소에 index.html 은 하나뿐이다.
const options = {
  entryPoints: ["frontend/main.jsx"],
  outfile: "src/main/resources/static/assets/app.js",
  bundle: true,
  format: "iife",
  target: ["es2020"],
  jsx: "automatic",
  loader: { ".js": "jsx" },
  minify: true,
  logLevel: "info",
  define: { "process.env.NODE_ENV": '"production"' },
};

if (process.argv.includes("--watch")) {
  const ctx = await context({ ...options, minify: false });
  await ctx.watch();
  console.log("watching frontend/…");
} else {
  await build(options);
}
