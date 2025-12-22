import { test, expect, Page, chromium } from '@playwright/test';

test.use({
  headless: false,
  viewport: { width: 300, height: 800 },
});

test('Đăng nhập anh test', async ({ page }) => {
  // =>sẽ cộng BASE URL từ config với string ở goto
  //    => https://crm.anhtester.com/admin/authentication
  await page.goto('/admin/authentication');

  await page.locator('#email').fill('admin@example.com');
  await page.locator('#password').fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();

  console.log('DANG NHAP THANH CONG');
});
