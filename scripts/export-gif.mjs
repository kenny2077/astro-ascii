// Turns a piece into a seamless looping GIF, dot for dot what the browser draws.
//   node scripts/export-gif.mjs [piece.html] [out.gif] [px per cell] [fps]
//   PIECE=pinwheel node scripts/export-gif.mjs art/galaxies/index.html ...   one galaxy of the galaxies page
//   PAPER=1 node scripts/export-gif.mjs ...   the light-theme print: ink dots on white, brighter light as darker ink
//   GROUND=#0d1117 node scripts/export-gif.mjs ...   a different ground colour
// Chrome draws the glyph atlas once (the same font and sizes as the page); the
// piece's frame code (between // <piece> and // </piece>, or the galaxies page's
// // <galaxy-engine> block) runs here, each cell
// is copied from the atlas, and ffmpeg makes the GIF. Needs Chrome and ffmpeg.
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { execFileSync, spawn } from "node:child_process";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const [src = "black-hole.html", out = src.replace(/\.html$/, ".gif"), cellArg = "8", fpsArg = "15"] = process.argv.slice(2);
const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const html = readFileSync(src, "utf8");
const code = html.split("// <piece>")[1]?.split("// </piece>")[0] ?? html.split("// <galaxy-engine>")[1]?.split("// </galaxy-engine>")[0];
if (!code) throw new Error(`${src} has no // <piece> or // <galaxy-engine> block`);
const piece = new Function(`${code}; return { W, H, LOOP, PALETTE, GROUND, DOTS, make: typeof piece === "function" ? piece : gargantua };`)();
const { W, H, LOOP, DOTS, make } = piece;
let { PALETTE, GROUND } = piece;
if (process.env.PAPER) {
  // Printed like an observatory plate: same hue, a little more saturated, and the
  // lightness turned over, so the brightest light is the deepest ink.
  const ink = (hex) => {
    let [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
    let h = 0, s = d ? d / (1 - Math.abs(2 * l - 1)) : 0;
    if (d) h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    const L = 0.8 - 0.6 * l, S = Math.min(1, s * 1.15 + 0.08);
    const c = (1 - Math.abs(2 * L - 1)) * S, x = c * (1 - Math.abs(((h % 2) + 2) % 2 - 1)), m = L - c / 2;
    const k = ((Math.floor(h) % 6) + 6) % 6;
    [r, g, b] = [[c, x, 0], [x, c, 0], [0, c, x], [0, x, c], [x, 0, c], [c, 0, x]][k];
    return "#" + [r, g, b].map((v) => Math.round((v + m) * 255).toString(16).padStart(2, "0")).join("");
  };
  PALETTE = PALETTE.map(ink);
  GROUND = "#ffffff";
}
if (process.env.GROUND) GROUND = process.env.GROUND; // e.g. #0d1117, GitHub's dark page, so the GIF has no visible edge
const cell = +cellArg, fps = +fpsArg;
const PW = W * cell, PH = H * cell;

// 1. the atlas: every dot in every colour, drawn by Chrome exactly as the page draws it
const dir = mkdtempSync(join(tmpdir(), "make-gif-"));
const page = join(dir, "atlas.html");
writeFileSync(page, `<!doctype html><meta charset="utf-8"><body><script>
const cell = ${cell}, P = ${JSON.stringify(PALETTE)}, DOTS = ${JSON.stringify(DOTS)};
const a = document.createElement("canvas"); a.width = cell * 4; a.height = cell * P.length;
const x = a.getContext("2d");
x.font = (cell / 0.6) + "px ui-monospace, SFMono-Regular, Menlo, monospace";
x.textAlign = "center"; x.textBaseline = "middle";
for (let p = 0; p < P.length; p++) { x.fillStyle = P[p]; for (let g = 1; g < 4; g++) {
  x.save(); x.beginPath(); x.rect(g * cell, p * cell, cell, cell); x.clip();
  x.fillText(DOTS[g], g * cell + cell / 2, p * cell + cell / 2); x.restore(); } }
document.body.textContent = "ATLAS" + a.toDataURL("image/png") + "ATLAS";
</script>`);
const dom = execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--force-device-scale-factor=1", "--dump-dom", `file://${resolve(page)}`], { maxBuffer: 1 << 28, stdio: ["ignore", "pipe", "ignore"] }).toString();
const png = Buffer.from(dom.split("ATLAS")[1].split(",")[1], "base64");
writeFileSync(join(dir, "atlas.png"), png);
const AW = cell * 4, AH = cell * PALETTE.length;
const atlas = execFileSync("ffmpeg", ["-loglevel", "error", "-i", join(dir, "atlas.png"), "-f", "rawvideo", "-pix_fmt", "rgba", "-"], { maxBuffer: 1 << 28 });
rmSync(dir, { recursive: true });
if (atlas.length !== AW * AH * 4) throw new Error("atlas came back the wrong size");

// 2. frames, one atlas cell per grid cell, over the ground
const ground = [1, 3, 5].map((i) => parseInt(GROUND.slice(i, i + 2), 16));
const frames = Math.round(LOOP * fps);
const ff = spawn("ffmpeg", [
  "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", `${PW}x${PH}`, "-r", String(fps), "-i", "-",
  "-filter_complex", "[0]split[a][b];[a]palettegen=max_colors=256:stats_mode=full[p];[b][p]paletteuse=dither=none:diff_mode=rectangle",
  "-loop", "0", out,
], { stdio: ["pipe", "inherit", "inherit"] });
const frame = make(process.env.PIECE);
const color = new Uint8Array(W * H);
const buf = Buffer.alloc(PW * PH * 3);
for (let f = 0; f < frames; f++) {
  const chars = frame((f / frames) * LOOP, color);
  for (let k = 0; k < W * H; k++) {
    const cx = (k % W) * cell, cy = Math.floor(k / W) * cell, g = chars[k], c = color[k];
    for (let y = 0; y < cell; y++) for (let x = 0; x < cell; x++) {
      const o = ((cy + y) * PW + cx + x) * 3;
      if (!g) { buf[o] = ground[0], buf[o + 1] = ground[1], buf[o + 2] = ground[2]; continue; }
      const s = ((c * cell + y) * AW + g * cell + x) * 4, al = atlas[s + 3] / 255;
      buf[o] = ground[0] + (atlas[s] - ground[0]) * al;
      buf[o + 1] = ground[1] + (atlas[s + 1] - ground[1]) * al;
      buf[o + 2] = ground[2] + (atlas[s + 2] - ground[2]) * al;
    }
  }
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
}
ff.stdin.end();
ff.on("close", (status) => {
  if (status) process.exit(status);
  console.log(`${out}: ${frames} frames, ${PW}×${PH}, ${fps} fps, loops every ${LOOP} s`);
});
