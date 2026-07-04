// Dev-only visual QA: exercise interactive states (mobile menu, accordion, lightbox).
import puppeteer from "puppeteer-core";
import fs from "fs";

const BASE = "http://localhost:5173/My_Portfolio/";
const OUT = "screenshots";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--enable-unsafe-swiftshader"],
});

// 1. Mobile menu open
const m = await browser.newPage();
await m.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await m.goto(BASE, { waitUntil: "networkidle2" });
await sleep(3600);
await m.tap("button[aria-expanded]");
await sleep(1200);
await m.screenshot({ path: `${OUT}/mobile-menu.png` });
await m.close();

// 2. Desktop: expand second experience row + open lightbox on detail page
const d = await browser.newPage();
await d.setViewport({ width: 1440, height: 900 });
await d.goto(BASE, { waitUntil: "networkidle2" });
await sleep(3600);
await d.evaluate(() => {
  const el = document.getElementById("experience");
  if (el) window.scrollTo(0, el.offsetTop + 260);
});
await sleep(1500);
const rows = await d.$$("button[aria-controls^='experience-panel']");
if (rows[1]) await rows[1].click();
await sleep(1200);
await d.screenshot({ path: `${OUT}/desktop-experience-open.png` });

await d.goto(`${BASE}#/project/enova-robotics-cobot`, { waitUntil: "networkidle2" });
await sleep(2000);
await d.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.5));
await sleep(1500);
const shots = await d.$$("button[data-cursor='view']");
if (shots[2]) await shots[2].click();
await sleep(1200);
await d.screenshot({ path: `${OUT}/desktop-lightbox.png` });
await d.close();

await browser.close();
console.log("done");
