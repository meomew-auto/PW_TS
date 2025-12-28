import { test, expect, Page, chromium } from '@playwright/test';
//day la file test lien quan den dang nhap

// // test.skip(true, 'file test dang bao tri');
// test.describe('Nhóm thanh toán', () => {
//   test.skip(true, 'nhom file test dang bao tri');
//   // testInfo()
//   test('thanh toan the', async () => {});
//   test('thanh toan credit', async () => {});
// });
// // ko có phạm vi global testInfo()
// test('Đăng nhập anh test', async ({ page, browserName }, testInfo) => {
//   testInfo.skip();
//   test.skip();
//   testInfo.annotations.push({
//     type: 'task',
//     description: 'link jira ....',
//   });
//   // ============== KỊCH BẢN GIẢ LẬP =================
//   // =>sẽ cộng BASE URL từ config với string ở goto
//   //    => https://crm.anhtester.com/admin/authentication
//   await page.goto('/admin/authentication');
//   // 1. Check Ngôn ngữ (Locale)
//   await page.locator('#email').fill('admin@example.com');
//   // 2. Attach cục dữ liệu đó vào Report
//   const screenshotBuffer = await page.screenshot();
//   await testInfo.attach('Screenshot Giỏ Hàng', {
//     body: screenshotBuffer,
//     contentType: 'image/png',
//   });
//   await page.locator('#password').fill('123456');
//   await page.getByRole('button', { name: 'Login' }).click({ timeout: 10000 });
//   // await expect(page).toHaveTitle('Facebook');
// });
//tầng này đã ghi dề config 30s mặc định rồi
// test.setTimeout(60000);

// test.describe('Nhom upload sieu nang', () => {
//   // tầng này lại ghi đè lại 60s ở bên trên ở cấp global
//   test.setTimeout(90000);
//   test('Cuộc chiến vương quyền', async ({ page }, testInfo) => {
//     ///cấp hàm test. ghi đè 90s của cấp group
//     test.setTimeout(120000);
//     if (true) {
//       // tầng 1 runtime (cap nhất)
//       testInfo.setTimeout(5000);
//       console.log('Time out o day la cao nhat');
//     }

//     await page.waitForTimeout(10000);
//   });
// });

// test.afterEach(async ({}, testInfo) => {
//   console.log(`[KẾT THÚC CHẠY FILE TEST] Trạng thái: ${testInfo.status}`);
//   console.log(`[KẾT THÚC CHẠY FILE TEST] Thời gian chạy: ${testInfo.duration}`);
// });

// test('DEMO testInfo', async ({ page }, testInfo) => {
//   console.log('Thông tin cơ bản về test');
//   console.log(`Tên bài test: ${testInfo.title}`);
//   console.log(`File bài test: ${testInfo.file}`);

//   console.log(`Project ${testInfo.project.name}`);
//   console.log(`Timeout ${testInfo.timeout}`);

//   console.log(`Đây là lần chạy thứ ${testInfo.retry + 1} (retry index ${testInfo.retry})`);
//   console.log(`Worker index ${testInfo.workerIndex}`);

//   if (testInfo.project.name.includes('Mobile')) {
//     console.log('Mobile chưa hỗ trợ test này, ->skip');
//     testInfo.skip();
//   }
//   await page.goto('/admin/authentication');

//   testInfo.annotations.push({
//     type: 'JIRA Ticket',
//     description: 'http://jira.com.vn',
//   });

//   //chụp ảnh thủ công và đính kèm vào report
//   const screenshot = await page.screenshot();
// await testInfo.attach('1. Ảnh đăng nhập thành công', {
//   body: screenshot,
//   contentType: 'image/png',
// });
//   const productData = {
//     id: 'iphone 17promax',
//     price: 1200,
//   };
//   await testInfo.attach('2. Dữ liệu sản phẩm (API)', {
//     body: JSON.stringify(productData, null, 2),
//     contentType: 'application/json',
//   });

//   await testInfo.attach('3. System log', {
//     body: `User da click vao button`,
//     contentType: 'text/plain',
//   });
// });

// test('Đăng nhập thành công @smoke', async () => {
//   console.log(`Test dang nhap @smoke`);
// });

// test(
//   'Thêm vào giỏ hàng',
//   {
//     tag: '@regression',
//   },
//   async () => {
//     console.log(`Test gio hang (@regression)`);
//   }
// );

// test(
//   'Thanh toán thẻ Visa debit',
//   {
//     tag: ['@smoke', '@slow'],
//   },
//   async () => {
//     console.log(`Test thanh toan the (@smoke + @slow)`);
//   }
// );

// test.describe('Nhóm quản lý các user', { tag: '@authen' }, () => {
//   test('Đổi mật khẩu', async () => {
//     console.log(`Test doi mat khau (@authen)`);
//   });
// });

// test('Test tính năng debug', { tag: ['@debug', '@api'] }, async ({}, testInfo) => {
//   // 1 logic xử lý tag @debug
//   if (testInfo.tags.includes('@debug')) {
//     console.log('DEBUG MODE');
//     test.setTimeout(12000);
//   }
//   if (testInfo.tags.includes('@api')) {
//     console.log('API MODE');
//   }
// });
