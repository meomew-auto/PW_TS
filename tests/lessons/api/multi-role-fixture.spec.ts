import { test, expect } from './fixtures/role.fixture';

test('TC01. Admin can see the customers, Staff CANNOT', async ({ asRole }) => {
  const adminPage = await asRole('admin');
  const staffPage = await asRole('staff');

  await adminPage.goto('/admin/users');
  await adminPage.waitForLoadState('domcontentloaded');

  await staffPage.goto('/admin/users');
  await staffPage.waitForLoadState('domcontentloaded');

  await adminPage.pause();
  await staffPage.pause();
});

test('TC02. Admin và manager chat realtime với nhau', async ({ asRole }) => {
  const adminPage = await asRole('admin');
  const staffPage = await asRole('staff');

  await Promise.all([adminPage.goto('/chat'), staffPage.goto('/chat')]);

  await Promise.all([
    adminPage.waitForLoadState('domcontentloaded'),
    staffPage.waitForLoadState('domcontentloaded'),
  ]);

  //admin click vào staff (id:2) để mở chat
  await adminPage.locator('[data-testid="chat-user-6"]').click();

  await expect(adminPage.locator('[data-testid="chat-input-message"]')).toBeVisible();

  //staf click vào admin (id: 1) để mở chat
  await staffPage.locator('[data-testid="chat-user-1"]').click();

  await expect(staffPage.locator('[data-testid="chat-input-message"]')).toBeVisible();

  //admin gửi tin nhắn

  const adminMessage = `Hello ông từ admin đây ! ${Date.now()}`;

  await adminPage.locator('[data-testid="chat-input-message"]').fill(adminMessage);

  await adminPage.locator('[data-testid="chat-button-send"]').click();

  await expect(staffPage.locator('[data-testid="chat-messages"]')).toContainText(adminMessage);

  console.log('Staff đã nhận đc tin nahwsn từ admin');

  //staff gửi tin nhắn

  const staffReply = `Tôi nhận được rồi ! ${Date.now()}`;

  await staffPage.locator('[data-testid="chat-input-message"]').fill(staffReply);

  await staffPage.locator('[data-testid="chat-button-send"]').click();

  //verify admin nhận đc tin nhắn
  await expect(adminPage.locator('[data-testid="chat-messages"]')).toContainText(staffReply);

  await adminPage.pause();
  await staffPage.pause();
});
