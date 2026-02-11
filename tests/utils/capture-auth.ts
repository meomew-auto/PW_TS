/**
 * CAPTURE AUTH STATE - Công cụ lưu trạng thái đăng nhập từ Chrome Debug Mode
 *
 * Tại sao cần công cụ này?
 * ------------------------
 * Khi website có Cloudflare Turnstile hoặc CAPTCHA, Playwright không thể tự động đăng nhập
 * vì bị phát hiện là bot. Giải pháp: đăng nhập bằng tay trên Chrome thật, rồi "capture" lại
 * cookies và localStorage để Playwright dùng lại trong các test sau.
 *
 * Chrome Debug Mode là gì?
 * ------------------------
 * Chrome có thể mở ở chế độ "debug" với flag --remote-debugging-port=PORT.
 * Khi đó, các công cụ như Playwright có thể kết nối vào Chrome qua giao thức CDP
 * (Chrome DevTools Protocol) để đọc/ghi dữ liệu mà không cần điều khiển trực tiếp.
 *
 * Cách sử dụng:
 * -------------
 * Bước 1: Tắt tất cả Chrome đang chạy (quan trọng - tránh xung đột port)
 *
 * Bước 2: Mở Chrome ở chế độ debug
 *   Windows:
 *     & "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9229 --user-data-dir="C:\temp\chrome_$(Get-Date --Format 'yyyyMMdd_HHmmss')"
 *   macOS:
 *     /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9223 --user-data-dir="/tmp/chrome_dev"
 *   Linux:
 *     google-chrome --remote-debugging-port=9223 --user-data-dir="/tmp/chrome_dev"
 *
 *   Giải thích các flag:
 *   - --remote-debugging-port=9223: Mở port 9223 cho CDP kết nối
 *   - --user-data-dir="...": Dùng profile riêng, tránh ảnh hưởng Chrome chính
 *prompt enninering 
Input:  "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9229 --user-data-dir="C:\temp\chrome_$(Get-Date --Format 'yyyyMMdd_HHmmss')"
Ouput: Get-Date: Cannot bind parameter 'Date'. Cannot convert value "--Format" to type "System.DateTime". Error: "String '--Format' was not recognized as a valid DateTime."
Expected: Tôi muốn fix được lỗi trên ở output
 * Bước 3: Trên Chrome vừa mở, vào https://coffee.autoneko.com/login và đăng nhập bình thường
 *
 * Bước 4: Chạy script này: npx tsx tests/utils/capture-auth.ts
 *
 * Kết quả:
 * --------
 * - auth/admin.json: File storage state chứa cookies + localStorage (cho UI tests)
 * - auth/neko-token.json: File chứa access token (cho API tests)
 */

import { chromium } from '@playwright/test';
import fs from 'fs';
import { AUTH_CONFIG, getStorageStatePath, saveTokenFile } from './auth.utils';

// Role mặc định để lưu state
const ROLE = 'admin' as const;

// Port mà Chrome debug đang listen - phải khớp với flag --remote-debugging-port khi mở Chrome
const CDP_PORT = 9229;

async function captureAuth() {
  console.log(`Đang kết nối tới Chrome (Port ${CDP_PORT})...`);

  // ==========================================================================
  // BƯỚC 1: Kết nối vào Chrome qua CDP (Chrome DevTools Protocol)
  // ==========================================================================
  // chromium.connectOverCDP() cho phép Playwright kết nối vào Chrome đang chạy sẵn,
  // thay vì tự mở Chrome mới. Điều này cho phép ta "nhìn thấy" session đã đăng nhập.
  const browser = await chromium.connectOverCDP(`http://localhost:${CDP_PORT}`);
  const context = browser.contexts()[0];

  // ==========================================================================
  // BƯỚC 2: Tìm tab đang mở website cần capture
  // ==========================================================================
  const appPage = context.pages().find((p) => p.url().includes('coffee.autoneko.com'));

  if (!appPage) {
    console.error('LỖI: Không tìm thấy tab coffee.autoneko.com!');
    console.error('Hướng dẫn: Mở https://coffee.autoneko.com/login và đăng nhập trước.');
    await browser.close();
    return;
  }

  console.log(`Tìm thấy tab: ${appPage.url()}`);

  // ==========================================================================
  // BƯỚC 3: Lấy localStorage thủ công và merge vào storageState
  // ==========================================================================
  // QUAN TRỌNG: Khi kết nối qua CDP, storageState() chỉ lấy được cookies,
  // KHÔNG lấy được localStorage! Phải đọc localStorage bằng evaluate() rồi merge vào.
  const storageState = await context.storageState();

  // Đọc toàn bộ localStorage từ trang hiện tại
  const lsData = await appPage.evaluate(() => ({ ...localStorage }));
  const origin = AUTH_CONFIG.UI_ORIGIN;

  // Chuyển localStorage từ object {key: value} sang array [{name, value}]
  // vì đây là format mà Playwright storage state yêu cầu
  const lsEntries = Object.entries(lsData).map(([name, value]) => ({
    name,
    value: value as string,
  }));

  // Tìm origin trong storageState, nếu có thì cập nhật, nếu không thì thêm mới
  // TẠI SAO: Playwright storage state lưu localStorage theo từng "origin" (vd: https://coffee.autoneko.com).
  // storageState.origins là mảng các origin, mỗi origin có localStorage riêng.
  // Khi CDP trả về, mảng origins có thể rỗng hoặc đã có origin nhưng thiếu localStorage.
  // -> Tìm origin phù hợp: nếu đã có thì cập nhật localStorage, nếu chưa có thì thêm mới.
  const existingOrigin = storageState.origins.find((o) => o.origin === origin);
  if (existingOrigin) {
    // Origin đã tồn tại (có thể từ cookie cùng domain) -> chỉ cần cập nhật localStorage
    existingOrigin.localStorage = lsEntries;
  } else {
    // Origin chưa có -> thêm mới vào mảng origins
    storageState.origins.push({ origin, localStorage: lsEntries });
  }

  // Lưu storage state ra file
  const storagePath = getStorageStatePath(ROLE);
  if (!fs.existsSync(AUTH_CONFIG.AUTH_DIR)) {
    fs.mkdirSync(AUTH_CONFIG.AUTH_DIR, { recursive: true });
  }
  fs.writeFileSync(storagePath, JSON.stringify(storageState, null, 2));
  console.log(`Đã lưu storage state -> ${storagePath}`);

  // ==========================================================================
  // BƯỚC 4: Trích xuất token cho API tests
  // ==========================================================================
  // API tests không cần toàn bộ storage state, chỉ cần access token
  // để gửi trong header Authorization: Bearer <token>
  //
  // Logic này PHỤ THUỘC VÀO CÁCH WEBSITE LƯU AUTH:
  // - Nếu website lưu "access_token" riêng lẻ -> lấy trực tiếp
  // - Nếu website dùng Zustand/Redux persist -> cần parse JSON và lấy từ bên trong
  // - Nếu website chỉ dùng cookie -> không cần bước này
  // (Sử dụng lsData đã đọc ở bước 3)

  // Thử tìm access_token trực tiếp
  let accessToken = lsData['access_token'];
  let refreshToken = lsData['refresh_token'];

  // Fallback: App Neko Coffee dùng Zustand persist, lưu state trong key "neko_auth"
  // Format: { state: { accessToken: "...", refreshToken: "...", ... }, version: 0 }
  if (!accessToken && lsData['neko_auth']) {
    try {
      const nekoAuth = JSON.parse(lsData['neko_auth']);
      accessToken = nekoAuth.state?.accessToken;
      refreshToken = nekoAuth.state?.refreshToken;
      console.log('Đã trích xuất token từ neko_auth (Zustand persist format)');
    } catch {
      console.warn('Không thể parse neko_auth');
    }
  }

  if (accessToken) {
    saveTokenFile(accessToken, refreshToken);
    console.log('Đã lưu token file -> auth/neko-token.json');
  } else {
    console.warn('Không tìm thấy access token trong localStorage');
  }

  // ==========================================================================
  // BƯỚC 5: Đóng kết nối
  // ==========================================================================
  // browser.close() chỉ đóng kết nối CDP, KHÔNG đóng Chrome.
  console.log('\nHoàn tất! Chạy test bình thường, setup sẽ tự động skip login.');
  await browser.close();
}

captureAuth().catch((error) => {
  console.error('\nLỖI KẾT NỐI:');
  console.error(`1. Đã mở Chrome với --remote-debugging-port=${CDP_PORT} chưa?`);
  console.error('2. Tắt hết Chrome cũ trước khi mở debug mode.');
  console.error('Chi tiết lỗi:', error);
});
