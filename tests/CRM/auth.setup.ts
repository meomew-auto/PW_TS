import { test } from '@playwright/test';
import path from 'node:path';
import { mkdirSync, existsSync } from 'node:fs';
import { CRMLoginPage } from './pom/CRMLoginPage';
import { EnvManager } from '../utils/EnvManager';
test('auth setup - create admin storage state', async ({ page }) => {
  // ────────────────────────────────────────────────────────────────────
  // BƯỚC 1: KIỂM TRA FILE STATE ĐÃ TỒN TẠI CHƯA
  // ────────────────────────────────────────────────────────────────────
  // Nếu file state đã tồn tại → Bỏ qua login để tiết kiệm thời gian
  // Playwright sẽ tự load state từ file này cho các test sau
  if (existsSync(EnvManager.get('STORAGE_STATE_PATH'))) {
    return;
  }

  // ────────────────────────────────────────────────────────────────────
  // BƯỚC 2: TẠO THƯ MỤC CHA (NẾU CHƯA TỒN TẠI)
  // ────────────────────────────────────────────────────────────────────
  //
  // TẠI SAO CẦN mkdirSync?
  //
  // Giả sử STORAGE_STATE_PATH = '.auth/user.json'
  //
  // Khi Playwright chạy lần đầu:
  //   1. Thư mục '.auth/' CHƯA TỒN TẠI
  //   2. Nếu ta gọi ngay: page.context().storageState({ path: '.auth/user.json' })
  //   3. → LỖI! "ENOENT: no such file or directory, open '.auth/user.json'"
  //   4. Playwright KHÔNG tự động tạo thư mục cha cho bạn
  //
  // GIẢI PHÁP: Tạo thư mục trước khi lưu file
  //
  //   path.dirname('.auth/user.json') → '.auth'
  //   mkdirSync('.auth', { recursive: true }) → Tạo thư mục '.auth/'
  //
  // { recursive: true } có ý nghĩa gì?
  //   - Nếu thư mục đã tồn tại → Không làm gì (không lỗi)
  //   - Nếu cần tạo nhiều cấp (vd: '.auth/admin/states/') → Tạo hết
  //   - Tương tự lệnh: mkdir -p .auth/admin/states
  //
  // ────────────────────────────────────────────────────────────────────
  mkdirSync(path.dirname(EnvManager.get('STORAGE_STATE_PATH')!), { recursive: true });

  const loginPage = new CRMLoginPage(page);
  await loginPage.goto();
  await loginPage.login(EnvManager.get('CRM_ADMIN_EMAIL')!, EnvManager.get('CRM_ADMIN_PASSWORD')!);
  await loginPage.expectLoggedIn();

  if (page.url().includes('/authentication')) {
    throw new Error('Login failed: Still redirected to login page after navigation to /admin/');
  }

  await page.waitForTimeout(1000);

  await page.context().storageState({ path: EnvManager.get('STORAGE_STATE_PATH') });
});
