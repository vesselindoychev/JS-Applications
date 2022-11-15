const { chromium } = require('playwright-chromium');
(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://google.com/');
    await page.screenshot({ path: 'example.png'});
    await browser.close();
})();