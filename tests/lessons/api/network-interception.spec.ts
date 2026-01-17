import { test, expect } from '@playwright/test';
import { error } from 'console';

//viết 1 cái file test. trả về thông tin đăng nhập thành công
// mà ko cần gọi xuống BE
// ví dụ mình sẽ dùng user test3

///pattern intercep thì sẽ thường dùng ** để match bất kì phần nào của URL
const API_REGISTER = '**/auth/register';
// => match https://api-neko-coffee.autoneko.com/auth/register'
// match https://api2222-neko-coffee.autoneko.com/auth/register'
// https://api-neko-coffee.autoneko.com/auth/register
test('TC_01: Mock success - Đăng ký thành công', async ({ page }) => {
  //intercep bao giờ cũng đặt đầu tiên ở trong file test.
  //khai báo trước khi thưucj hiện hành động của FE
  await page.route(API_REGISTER, async (route) => {
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({
        messeage: 'Đăng ký thành công',
        user: {
          id: 999,
          email: 'test@example.com',
          username: 'test3',
        },
      }),
    });
  });

  await page.goto('https://coffee.autoneko.com/register');
  await page.getByRole('textbox', { name: 'Tên đăng nhập' }).fill('test3');
  await page.getByRole('textbox', { name: 'Địa chỉ Email' }).fill('test@example.com');
  await page.getByPlaceholder('Nhập mật khẩu').fill('12345678');
  await page.getByPlaceholder('Nhập lại mật khẩu').fill('12345678');
  await page.locator("input[type='checkbox']").click();

  await page.getByRole('button', { name: 'Đăng ký ngay' }).click();

  await expect(page.getByRole('heading', { name: 'Thành công' })).toBeVisible();
});

test('TC_02: Mock Error 500 - Server Error', async ({ page }) => {
  //intercep bao giờ cũng đặt đầu tiên ở trong file test.
  //khai báo trước khi thưucj hiện hành động của FE
  await page.route(API_REGISTER, async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({
        error: 'Server đang lỗi ông ạ!!!',
      }),
    });
  });

  await page.goto('https://coffee.autoneko.com/register');
  await page.getByRole('textbox', { name: 'Tên đăng nhập' }).fill('test3');
  await page.getByRole('textbox', { name: 'Địa chỉ Email' }).fill('test@example.com');
  await page.getByPlaceholder('Nhập mật khẩu').fill('12345678');
  await page.getByPlaceholder('Nhập lại mật khẩu').fill('12345678');
  await page.locator("input[type='checkbox']").click();

  await page.getByRole('button', { name: 'Đăng ký ngay' }).click();

  //   await page.pause();
  await expect(page.getByRole('heading', { name: 'Đăng ký thất bại' })).toBeVisible();
});

test('TC_03: Mock Error 400 - Validation Error', async ({ page }) => {
  //intercep bao giờ cũng đặt đầu tiên ở trong file test.
  //khai báo trước khi thưucj hiện hành động của FE
  await page.route(API_REGISTER, async (route) => {
    await route.fulfill({
      status: 400,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Dữ liệu ko hợp lệ ông ơi!!!!',
      }),
    });
  });

  await page.goto('https://coffee.autoneko.com/register');
  await page.getByRole('textbox', { name: 'Tên đăng nhập' }).fill('test3');
  await page.getByRole('textbox', { name: 'Địa chỉ Email' }).fill('test@example.com');
  await page.getByPlaceholder('Nhập mật khẩu').fill('12345678');
  await page.getByPlaceholder('Nhập lại mật khẩu').fill('12345678');
  await page.locator("input[type='checkbox']").click();

  await page.getByRole('button', { name: 'Đăng ký ngay' }).click();

  await page.pause();
  //   await expect(page.getByRole('heading', { name: 'Đăng ký thất bại' })).toBeVisible();
});

test('TC_04: Mock delay - Test Loading state', async ({ page }) => {
  //intercep bao giờ cũng đặt đầu tiên ở trong file test.
  //khai báo trước khi thưucj hiện hành động của FE
  await page.route(API_REGISTER, async (route) => {
    console.log('ROUTE TRIGGED');

    //delay 10s
    await new Promise((resolve) => setTimeout(resolve, 10000));

    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({
        messeage: 'Đăng ký thành công',
        user: {
          id: 999,
          email: 'test@example.com',
          username: 'test3',
        },
      }),
    });
  });

  await page.goto('https://coffee.autoneko.com/register');
  await page.getByRole('textbox', { name: 'Tên đăng nhập' }).fill('test3');
  await page.getByRole('textbox', { name: 'Địa chỉ Email' }).fill('test@example.com');
  await page.getByPlaceholder('Nhập mật khẩu').fill('12345678');
  await page.getByPlaceholder('Nhập lại mật khẩu').fill('12345678');
  await page.locator("input[type='checkbox']").click();

  await page.getByRole('button', { name: 'Đăng ký ngay' }).click();

  await expect(page.getByRole('heading', { name: 'Thành công' })).toBeVisible({ timeout: 15000 });
});
