import { test as setup, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { AuthService } from './services/AuthServices';
import { getStorageStatePath } from '../../utils/auth.utils';

setup('Authentication Neko APi', async ({ request }) => {
  const adminStoragePath = getStorageStatePath('admin');

  const authService = new AuthService(request);
  const response = await authService.login('admin', 'Admin@123');

  expect(response.token).toBeTruthy();

  const authDir = path.dirname(authFile);

  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  fs.writeFileSync(
    authFile,
    JSON.stringify({
      token: response.token,
      expires_at: response.exiresAt,
    })
  );
});

//logic
// lần đầu tiên đăng nhập chưa có file token
// -> lưu thành công ok -> chạy test lần 1 ok

// lần 2/ lại login 0-> lấy token ???? hơi phí thời gian  dựa vào cái expire In để check nếu mà token còn hạn
// thì chúng ta xài lại ko cần login nữa.

// ví như là thời hạn token là 30 phút

// chúng ta chạy test ví dụ mất khoảng 5 phút

// 25 - 30 phút (token expire) -> là chúng ta call mới

// nếu mà chúng ta check token ở thời gian 26 phút -> test sẽ fail  -> do token expires
