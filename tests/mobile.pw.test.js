const { devices } = require('playwright');
const iPhone11 = devices['iPhone 11 Pro'];

jest.setTimeout(180000);

describe('mobile functionality', () => {

	it('should open hamburger menu correctly', async () => {

		let _page = page;

		// bypass
		// this feature is not supported in firefox
		if (browserName === 'firefox') {
			return expect(browserName).toBe('firefox');
		}

		const context = await browser.newContext({
			...iPhone11,
			locale: 'en-US',
			geolocation: { longitude: 12.492507, latitude: 41.889938 },
			permissions: ['geolocation']
		});

		_page = await context.newPage();

		await _page.goto('http://localhost:3000/en');

		await expect(_page).toHaveSelector('#btn_hamburger_navbar');

		await _page.click('#btn_hamburger_navbar');

		await _page.screenshot({ path: `screenshots/mobile/hamburger-open-${browserName}.png` });
	});
});