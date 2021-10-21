const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../../.env') });

const { chromium } = require('playwright');

jest.setTimeout(180000);

describe('vaults page functionality', () => {
	it('should open the vaults page correctly', async () => {
		await page.goto('http://localhost:3000/en/vaults');

		await expect(page).toHaveSelector('.relative', { timeout: 180000 });

		await page.screenshot({ path: `screenshots/vaults/vaults-${browserName}.png`, fullPage: true });
	});

	/**
	 * You need to add the metamask extension to your chrome browser. Where you run the tests
	 */
	it('Using the drop down, Putting in values and Opening metamask with those values', async () => {
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
			args: [`--disable-extensions-except=${pathToExtension}`]
		});

		const page = await browserContext.newPage();
		await page.waitForTimeout(2000);

		await page.goto('http://localhost:3000/en/vaults');
		await page.waitForLoadState('load');
		await page.waitForTimeout(2000);
		await page.screenshot({
			path: `screenshots/vaults/vaults-metamask-${browserName}-close.png`,
			fullPage: true
		});

		page.$eval('div:nth-of-type(2) .text-xl', (element) => element.click());
		await page.waitForTimeout(2000);
		page.$eval('.rounded-xl', (element) => element.click());

		const [overviewPage] = await Promise.all([browserContext.waitForEvent('page')]);
		await overviewPage.waitForLoadState();
		await overviewPage.screenshot({
			path: `screenshots/vaults/vaults-metamask-${browserName}-open.png`,
			fullPage: true
		});

		await overviewPage.fill('input', process.env.VITE_PASS_METAMASK);
		overviewPage.$eval('button', (element) => element.click());

		await page.fill(".flex-col > :nth-child(1) [placeholder='Enter Value']", '1');
		await page.screenshot({
			path: `screenshots/vaults/vaults-metamask-${browserName}-close-putValues.png`,
			fullPage: true
		});

		page.$eval('.flex-col > :nth-child(1) .bg-black', (element) => element.click());

		const [overviewPageCompleted] = await Promise.all([browserContext.waitForEvent('page')]);
		await overviewPageCompleted.waitForLoadState();
		await overviewPageCompleted.screenshot({
			path: `screenshots/vaults/vaults-metamask-${browserName}-open-withValues.png`,
			fullPage: true
		});
	});
});
