import { test, expect, Page, chromium } from '@playwright/test';

test.beforeAll(async () => {
  console.log(`TOi la beforeall`);
});
test('Kiểm tra biến môi trường', async ({ page }) => {
  // =>sẽ cộng BASE URL từ config với string ở goto
  //    => https://crm.anhtester.com/admin/authentication

  const dbURl = process.env.DB_CONNECTION_URL;
  const port = process.env.API_PORT;

  console.log(` Dang ket noi toi ${dbURl}`);
  console.log(`port hoat dong ${port}`);
});
