import { test, expect, Page, chromium } from '@playwright/test';

test('GET USER INFO', async ({ page }, testInfo) => {
  console.log(`${testInfo.project.name} đang chạy`);
});
