import { test, expect, Page, chromium } from '@playwright/test';

test('Đăng nhập anh test', async ({ page }, testInfo) => {
  // ============== KỊCH BẢN GIẢ LẬP =================
  // =>sẽ cộng BASE URL từ config với string ở goto
  //    => https://crm.anhtester.com/admin/authentication
  await page.goto('/admin/authentication');
  // 1. Check Ngôn ngữ (Locale)
  await page.locator('#email').fill('admin@example.com');
  // 2. Attach cục dữ liệu đó vào Report
  const screenshotBuffer = await page.screenshot();
  await testInfo.attach('Screenshot Giỏ Hàng', {
    body: screenshotBuffer,
    contentType: 'image/png',
  });
  await page.locator('#password').fill('123456');
  await page.getByRole('button', { name: 'Login' }).click({ timeout: 10000 });
  // await expect(page).toHaveTitle('Facebook');
});
