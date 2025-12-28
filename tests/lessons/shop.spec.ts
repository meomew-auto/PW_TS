import { test, expect } from '@playwright/test';

// test.use({ storageState: { cookies: [], origins: [] } });

test.use({
  video: {
    mode: 'on-first-retry',
    size: { width: 1280, height: 720 },
  },
  headless: false,
  baseURL: 'https://www.saucedemo.com',
  screenshot: {
    mode: 'only-on-failure',
    fullPage: true,
  },

  // launchOptions: {
  //   args: ['--start-maximized'],
  // },
  // viewport: null,
  // deviceScaleFactor: undefined,
});

test('Mua hàng (Đã Login sẵn)', async ({ page }) => {
  console.log('🔵 [TEST] Bắt đầu test mua hàng...');

  // Vào thẳng trang chủ (Sẽ tự nhận cookie từ user.json)
  await page.goto('/inventory.html');

  // Assert: Chắc chắn là đã login rồi (Có nút Add to cart)
  await expect(page.locator('#add-to-cart-sauce-labs-backpack1')).toBeVisible({ timeout: 1000 });

  console.log('🔵 [TEST] ✅ Test mua hàng thành công!');
});

// import { test } from '@playwright/test';

// test.describe('Mô phỏng Worker Crash', () => {
//   // 1️⃣ SETUP (Chạy OK)
//   test.beforeAll(async () => {
//     console.log('🟢 [BEFORE ALL] 1. Đang tạo dữ liệu RÁC trong Database...');
//     console.log('🟢 [BEFORE ALL] 2. Dữ liệu đã được tạo xong!');
//   });

//   // 2️⃣ TEST (Chỗ này sẽ gây sập)
//   test('Test case này sẽ giết chết Worker', async ({ page }) => {
//     console.log('🔵 [TEST] Đang chạy test...');

//     // Giả vờ làm gì đó...
//     await page.waitForTimeout(1000);

//     console.log('💀 [CRASH] Giả lập lỗi Fatal Error! Worker sắp sập...');

//     // 💥 LỆNH NÀY SẼ GIẾT CHẾT TIẾN TRÌNH NGAY LẬP TỨC
//     // Giống như rút phích cắm điện, không có lời trăng trối
//     process.exit(1);
//   });

//   // 3️⃣ TEARDOWN (Hy vọng chạy dòng này để dọn rác)
//   test.afterAll(async () => {
//     // ❌ DÒNG NÀY SẼ KHÔNG BAO GIỜ HIỆN RA
//     console.log('🔴 [AFTER ALL] 🧹 Đang dọn rác... (Nếu bạn thấy dòng này thì Worker chưa chết)');
//   });
// });
