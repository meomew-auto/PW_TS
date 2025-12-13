import { test as base, Page } from '@playwright/test';

import { CRMLoginPage } from '../pom/CRMLoginPage';

// 1. MENU CỔNG AN NINH

export type AuthFixtures = {
  loginPage: CRMLoginPage; // Trang Login (Chưa đăng nhập)

  authedPage: Page; // Trang Đã Đăng Nhập (Quan trọng!)
};

// 2. LOGIC

export const auth = base.extend<AuthFixtures>({
  // --- TẦNG 1: Trang Login thuần túy ---

  loginPage: async ({ page }, use) => {
    await use(new CRMLoginPage(page));
  },

  // --- TẦNG 2: GATEKEEPER (Người Gác Cổng) ---

  // Fixture này nhận vào 'loginPage' và trả về 'page' đã login

  authedPage: async ({ loginPage, page }, use) => {
    console.log('🔐 [Gatekeeper] Đang kiểm tra an ninh...');

    // Thực hiện hành động Login

    await loginPage.goto();

    await loginPage.login('admin@example.com', '123456');

    await loginPage.expectLoggedIn();

    console.log('✅ [Gatekeeper] Đăng nhập thành công! Mời vào.');

    // TRẢ VỀ: Cái 'page' này giờ đã có Cookies xịn

    await use(page);
  },
});
