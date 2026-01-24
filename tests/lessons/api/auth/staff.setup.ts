import { test as setup, expect } from '@playwright/test';

setup('Login as staff', async ({ page, context }) => {
  await page.goto('/login');
  await page.getByPlaceholder('Nhập email hoặc tên đăng nhập').fill('test08');
  await page.getByPlaceholder('Nhập mật khẩu').fill('12345678');
  await page.getByRole('button', { name: 'Đăng nhập' }).click();
  await expect(page.getByRole('button', { name: 'Tiếp tục' })).toBeVisible();
  await page.getByRole('button', { name: 'Tiếp tục' }).click();

  await context.storageState({ path: './auth/staff.json' });
  console.log('[SETUP] Staff saved thành công');
});
