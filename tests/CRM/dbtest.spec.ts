import { test } from './fixture/database.fixture';
import { expect } from '@playwright/test';

//Test1 : chay dau tien
//file test là độc lập với nhau tránh sự phụ thuộc.

test('TestA: Kiểm tra số lượng user', async ({ addAdminUser }) => {
  // Lúc này database đang có ['Admin']
  console.log('Test A chay....');
  //   expect(addAdminUser.length).toBe(1);
  expect(1).toBe(100);
});

test('TestB: Kiểm tra user mới', async ({ addAdminUser }) => {
  //Database lúc này đáng lẽ chỉ nên có 1 user (của TestB đã tạo ra)
  //Nhưng thực tế đang có ['Admin', 'Admin'] (1 cái cũ cuả Test A + 1 cái mới của Test B)

  console.log('Test B dang chay');
  console.log('Hien tai DB co', addAdminUser);

  expect(addAdminUser.length).toBe(1);
});

//fixture chaining... hiệu ứng domino
