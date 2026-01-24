import { test, expect, BrowserContext, Page } from '@playwright/test';

test('TC01. Admin can see the customers, Staff CANNOT', async ({ browser }) => {
  const adminContext: BrowserContext = await browser.newContext({
    storageState: './auth/admin.json',
  });

  const adminPage: Page = await adminContext.newPage();

  const staffContext: BrowserContext = await browser.newContext({
    storageState: './auth/staff.json',
  });

  const staffPage: Page = await staffContext.newPage();

  await adminPage.goto('/admin/users');
  await adminPage.waitForLoadState('domcontentloaded');

  await staffPage.goto('/admin/users');
  await staffPage.waitForLoadState('domcontentloaded');

  await adminPage.pause();
  await staffPage.pause();

  await adminContext.close();
  await staffContext.close();
});
