import { test, expect } from '@playwright/test';

test.describe('vaults page functionality', () => {
	test('should open the vaults page', async ({ page, browserName }) => {
		await page.goto('http://127.0.0.1:3000/en/vaults', { timeout: 180000 });
		await page.waitForSelector('.flex > .sm\\:mr-3 > .hidden > .flex > .pl-2');

		const title = page.locator('h1');
		await expect(title).toHaveText('Vaults');

		await page.waitForSelector(
			'.main > .pb-3 > .mainContainer > .mb-5:nth-child(2) > .max-w-8xl'
		);

		await page.screenshot({
			path: `tests/screenshots/vaults/vaults-${browserName}.png`,
			fullPage: true
		});
	});

	test('pressing the unlock button and opening metamask modal - vaults', async ({
		page,
		browserName
	}) => {
		await page.goto('http://127.0.0.1:3000/en/vaults');
		await page.waitForSelector('.flex > .sm\\:mr-3 > .hidden > .flex > .pl-2');

		const vaultAccordeonLocator = page.locator(
			'.main > .pb-3 > .mainContainer > .mb-5:nth-child(2) > .max-w-8xl'
		);
		await vaultAccordeonLocator.click();
		const vaultAccordeonButtonLocator = page.locator(
			'.pb-3 > .mainContainer > .mb-5 > .bg-gray-200 > .block'
		);
		await vaultAccordeonButtonLocator.click();

		await page.waitForTimeout(500);
		await page.screenshot({
			path: `tests/screenshots/vaults/vaults-metamask-${browserName}.png`
		});
	});
});
