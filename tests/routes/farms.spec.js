import { test, expect } from '@playwright/test';

test.describe('farms page functionality', () => {
	test('should open the farms page', async ({ page, browserName }) => {
		await page.goto('http://127.0.0.1:3000/en/farms', { timeout: 180000 });
		await page.waitForSelector('.flex > .sm\\:mr-3 > .hidden > .flex > .pl-2');

		const title = page.locator('body > #svelte > .main > .farms > .text-dark-200');
		await expect(title).toHaveText('Farms');

		await page.screenshot({
			path: `tests/screenshots/farms/farms-${browserName}.png`,
			fullPage: true
		});
	});

	test('pressing the unlock button and opening metamask modal - farms', async ({
		page,
		browserName
	}) => {
		await page.goto('http://127.0.0.1:3000/en/farms');
		await page.waitForSelector('.flex > .sm\\:mr-3 > .hidden > .flex > .pl-2');

		const locator = page.locator('.flex > .self-start > .py-4 > .flex > .bg-green-500');
		await locator.click();
		await page.waitForTimeout(500);
		await page.screenshot({ path: `tests/screenshots/farms/farms-metamask-${browserName}.png` });
	});
});
