import { test } from '@playwright/test';

test('Check env ', async ({ page }) => {
  const projectName = process.env.PROJECT_NAME;

  const url = process.env.BASE_URL;

  const password = process.env.ADMIN_PASSWORD;

  console.log(`PROJECT ĐANG TEST ${projectName}`);

  console.log(`URL ĐANG TEST ${url}`);

  console.log(`MẬT KHẨU ĐANG DÙNG ${password}`);

  if (url) await page.goto(url);
});
