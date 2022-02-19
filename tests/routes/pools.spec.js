import { test, expect } from '@playwright/test';

test.describe('pools page functionality', () => {
    test('should open the pools page', async ({ page, browserName }) => {
        await page.goto('http://127.0.0.1:3000/en/pools', { timeout: 180000 });
        await page.waitForSelector('.flex > .sm\\:mr-3 > .hidden > .flex > .pl-2')

        const title = page.locator('h1');
        await expect(title).toHaveText('Pools');

        await page.screenshot({ path: `tests/screenshots/pools/pools-${browserName}.png`, fullPage: true });
    });
  
    test('pressing the unlock button and opening metamask modal - pools', async ({ page, browserName }) => {
        await page.goto('http://127.0.0.1:3000/en/pools');
        await page.waitForSelector('.flex > .sm\\:mr-3 > .hidden > .flex > .pl-2')

        const locator = page.locator('.flex > .self-start:nth-child(1) > .py-4 > .flex > .bg-green-500');
        await locator.click();
        await page.waitForTimeout(500);
        await page.screenshot({ path: `tests/screenshots/pools/pools-metamask-${browserName}.png` });
    });
});