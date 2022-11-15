const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page;
describe('E2E tests', function () {
    this.timeout(6000);
    before(async () => {
        browser = await chromium.launch({ handless: false, slowMo: 500 });
    });
    after(async () => {
        await browser.close();
    });
    beforeEach(async () => {
        page = await browser.newPage();
    });
    afterEach(async () => {
        await page.close();
    });

    it('loads article titles', async () => {
        await page.goto('http://localhost:5500');
        await page.screenshot({path: 'page.png'});
    })
});
