const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../../.env') });

const { chromium } = require('playwright');

jest.setTimeout(180000);

describe('pools page functionality', () => {

	it('should open the pools page correctly', async () => {

		await page.goto('http://localhost:3000/en/pools');

		await expect(page).toHaveSelector('.text-dark-200', { timeout: 180000 });

		await page.screenshot({ path: `screenshots/pools/pools-${browserName}.png`, fullPage: true });

	});

	it('opening the modal and executing metamask', async () => {

		if (browserName === 'firefox') {
			return expect(browserName).toBe('firefox');
		} else if(browserName === 'webkit') {
			return expect(browserName).toBe('webkit');
		}

		const pathToExtension = require('path').join('~/.config/google-chrome/Default/Extensions', 'nkbihfbeogaeaoehlefnkodbefgpgknn/10.1.1_0');

		const userDataDir = '~/.config/google-chrome/Default';
		const browserContext = await chromium.launchPersistentContext(userDataDir,{
			headless: false,
			executablePath: "/usr/bin/google-chrome",
			args: [
			  `--disable-extensions-except=${pathToExtension}`		]
		  });

		  const page = await browserContext.newPage();
		  await page.waitForTimeout(2000);

		
		await page.goto('http://localhost:3000/en/pools');
		await page.waitForLoadState('load');
		await page.waitForTimeout(2000);
		await page.screenshot({ path: `screenshots/pools/pools-metamask-${browserName}-close.png`, fullPage: true });
		await page.waitForTimeout(3000);

		page.$eval(".grid > :nth-child(1) .block", (element) => element.click());

		const [overviewPage] = await Promise.all([
			browserContext.waitForEvent('page')
		]);
		await overviewPage.waitForLoadState();
		await overviewPage.screenshot({ path: `screenshots/pools/pools-metamask-${browserName}-open.png`, fullPage: true });

		await overviewPage.fill('input', process.env.VITE_PASS_METAMASK);
		overviewPage.$eval("button", (element) => element.click());

		await page.waitForTimeout(2000);
		await page.screenshot({ path: `screenshots/pools/pools-metamask-${browserName}-closeApprove.png`, fullPage: true });

		page.$eval(".grid > :nth-child(1) .block", (element) => element.click());

		const [overviewPageCompleted] = await Promise.all([
			browserContext.waitForEvent('page')
		]);
		await overviewPageCompleted.waitForLoadState();
		await page.waitForTimeout(2000);
		await overviewPageCompleted.screenshot({ path: `screenshots/pools/pools-metamask-${browserName}-openWithValues.png`, fullPage: true });

	});
    
});