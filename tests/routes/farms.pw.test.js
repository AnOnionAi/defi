const { chromium } = require('playwright');

jest.setTimeout(180000);

describe('farms page functionality', () => {
	it('should open the farms page correctly', async () => {
		await page.goto('http://localhost:3000/en/farms');

		await expect(page).toHaveSelector('.text-dark-200', { timeout: 180000 });

		await page.screenshot({ path: `screenshots/farms/farms-${browserName}.png`, fullPage: true });
	});

	/**
	 * You need to add the metamask extension to your chrome browser. Where you run the tests
	 */
	it('pressing the unlock button and opening metamask', async () => {
		if (browserName === 'firefox') {
			return expect(browserName).toBe('firefox');
		} else if (browserName === 'webkit') {
			return expect(browserName).toBe('webkit');
		}

		const pathToExtension = require('path').join(
			'~/.config/google-chrome/Default/Extensions',
			'nkbihfbeogaeaoehlefnkodbefgpgknn/10.1.1_0'
		);

		const userDataDir = '~/.config/google-chrome/Default';
		const browserContext = await chromium.launchPersistentContext(userDataDir, {
			headless: false,
			executablePath: '/usr/bin/google-chrome',
			args: [
				`--disable-extensions-except=${pathToExtension}`,
				`--load-extension=${pathToExtension}`
			]
		});

		const page = await browserContext.newPage();
		await page.waitForTimeout(2000);

		await page.goto('http://localhost:3000/en/farms');
		await page.waitForLoadState('load');
		await page.waitForTimeout(1000);
		await page.screenshot({
			path: `screenshots/farms/farms-metamask-${browserName}-close.png`,
			fullPage: true
		});

		page.$eval('.grid > :nth-child(1) .block', (element) => element.click());

		const [overviewPage] = await Promise.all([browserContext.waitForEvent('page')]);
		await overviewPage.waitForLoadState();
		await overviewPage.screenshot({
			path: `screenshots/farms/farms-metamask-${browserName}-open.png`,
			fullPage: true
		});
	});
});
