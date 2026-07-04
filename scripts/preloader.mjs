// Dev-only visual QA: capture the preloader mid-count.
import puppeteer from "puppeteer-core";

const BASE = "http://localhost:5173/My_Portfolio/";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--enable-unsafe-swiftshader"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(BASE, { waitUntil: "domcontentloaded" });
await sleep(1200);
await page.screenshot({ path: "screenshots/desktop-preloader.png" });
await browser.close();
console.log("done");
