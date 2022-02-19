import { test, expect } from '@playwright/test';
import { devices } from '@playwright/test';

const iPhone = devices['iPhone 11 Pro'];

test.describe('mobile functionality', () => {
	test('should open hamburger menu correctly', async ({ browser, browserName }) => {
		// this feature is not supported in firefox
		if (browserName === 'firefox') {
			return expect(browserName).toBe('firefox');
		}

		const context = await browser.newContext({
			...iPhone,
			permissions: ['geolocation'],
			geolocation: { longitude: 12.492507, latitude: 41.889938 },
			locale: 'en-US'
		});

		const page = await context.newPage();
		await page.goto('http://127.0.0.1:3000/en/dashboard', { timeout: 180000 });

		page.waitForLoadState();
		await page.screenshot({ path: `tests/screenshots/mobile/close-hamburguer-${browserName}.png` });

		await page.waitForSelector('.z-10 > .flex > .float-0 > #btn_hamburger_navbar > .svelte-fa');
		await page.click('.z-10 > .flex > .float-0 > #btn_hamburger_navbar > .svelte-fa');

		await page.screenshot({ path: `tests/screenshots/mobile/open-hamburguer-${browserName}.png` });
	});
});
