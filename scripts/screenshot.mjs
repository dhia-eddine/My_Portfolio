// Dev-only visual QA: capture desktop + mobile screenshots of every section.
import puppeteer from "puppeteer-core";
import fs from "fs";

const BASE = "http://localhost:5173/My_Portfolio/";
const OUT = "screenshots";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function captureFlow(browser, { name, width, height, mobile }) {
  const page = await browser.newPage();
  await page.setViewport({
    width,
    height,
    isMobile: mobile,
    hasTouch: mobile,
    deviceScaleFactor: 1,
  });
  await page.goto(BASE, { waitUntil: "networkidle2" });
  await sleep(3600); // let the preloader finish + hero reveal

  const sections = ["hero", "about", "experience", "stack", "work", "contact"];
  for (const id of sections) {
    if (id !== "hero") {
      await page.evaluate((sectionId) => {
        const el = document.getElementById(sectionId);
        if (el) window.scrollTo(0, el.offsetTop - 40);
      }, id);
      await sleep(1600);
    }
    await page.screenshot({ path: `${OUT}/${name}-${id}.png` });
  }

  // Project detail page
  await page.goto(`${BASE}#/project/iron-school`, { waitUntil: "networkidle2" });
  await sleep(1800);
  await page.screenshot({ path: `${OUT}/${name}-detail.png` });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.45));
  await sleep(1400);
  await page.screenshot({ path: `${OUT}/${name}-detail-gallery.png` });

  await page.close();
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--enable-unsafe-swiftshader"],
});

await captureFlow(browser, { name: "desktop", width: 1440, height: 900, mobile: false });
await captureFlow(browser, { name: "mobile", width: 390, height: 844, mobile: true });

await browser.close();
console.log("done");
