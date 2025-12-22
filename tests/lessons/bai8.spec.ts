import { expect, Locator, test, Page } from '@playwright/test';
import { stat } from 'node:fs/promises';

test('ví dụ về upload file', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
  await page.getByRole('tab', { name: 'Upload Files' }).click();

  const visible = page.locator('#visible-input');
  //PW tự động upload file cho chúng ta -> ok
  await visible.setInputFiles('tests/fixtures/sample1.txt');
  //div[contains(text(), '1) Input hiển thị') and @class='ant-card-head-title']/ancestor::div[@class='ant-card-head']/following-sibling::div//span
  await expect(
    page
      .locator(
        "//div[contains(text(), '1) Input hiển thị') and @class='ant-card-head-title']/ancestor::div[@class='ant-card-head']/following-sibling::div//span"
      )
      .nth(1)
  ).toContainText('sample1.txt');

  const hidden = page.locator('#hidden-input-upload');
  await hidden.setInputFiles('tests/fixtures/sample1.txt');
  await expect(page.locator('#hidden-input-upload')).toBeAttached();

  // 3) Bắt sự kiện filechooser khi bắt buộc phải click nút
  const chooserPromise = page.waitForEvent('filechooser');
  await page.locator('#fancy-button').click();
  const chooser = await chooserPromise;
  await chooser.setFiles('tests/fixtures/sample1.txt');

  // upload nhieu file
  const multi = page.locator('#multi-input');
  await multi.setInputFiles(['tests/fixtures/sample1.txt', 'tests/fixtures/sample2.txt']);
  await expect(page.locator('text=Số file:').nth(0)).toContainText('2');
  await page.pause();
  // Xoá
  await multi.setInputFiles([]);
  await expect(page.locator('text=Chưa có file nào').nth(0)).toBeVisible();

  await page.pause();
});

test('ví dụ về download file', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
  await page.getByRole('tab', { name: 'Upload Files' }).click();

  // 1. Đợi event download
  //đợi cho tất cả các promise con ở trong array thực hiện thành công rồi lấy kết quả

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('#download-demo-btn').click(),
  ]);

  const fileName = download.suggestedFilename();
  console.log(fileName);
  // 2. Kiểm tra tên file (suggested)
  expect(download.suggestedFilename()).toBe('login-data.xlsx');
  await download.saveAs('downloads/login-data-verified.xlsx');
  const info = await stat('downloads/login-data-verified.xlsx');
  console.log(info.size);
  expect(info.size).toBeGreaterThan(100);
  await page.pause();
});

test('ví dụ về shadow DOM', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 5: Shadow DOM & iFrame' }).click();

  //tương tác như 1 element bình thường. chỉ cần trỏ tới thằng DOM -> và từ đó dùng locator chain để tương tác
  //phần còn lại để PW lo
  //   const openHost = page.locator('open-shadow-el#open-shadow-demo');
  //   await page.locator('#os-input').fill('Hello Shadow');
  //   await page.locator('#os-btn').click();
  //   await expect(page.locator('#os-status')).toHaveText('You typed: Hello Shadow');
  //   await page.pause();

  // Shadow DOM (CLOSED): không thể pierce. Cần evaluate trong browser context nếu buộc phải chạm vào
  //   const closedHost = page.locator('closed-shadow-el#closed-shadow-demo');
  // Ví dụ assert chỉ quanh host (không vào bên trong):
  //   const shadowDomText = await closedHost.textContent();
  //   console.log(shadowDomText);

  //   await expect(closedHost).toBeVisible();

  //   const el = await closedHost.elementHandle();
  //   const innerText = await page.evaluate(
  //     (h) => (h.shadowRoot ? h.shadowRoot.textContent : '(closed)'),
  //     el
  //   );
  //   expect(innerText).toContain('closed');
});

//  await page.locator('#demo-input-1').evaluate((el: HTMLInputElement)
export async function isImageOk(page: Page, imgLocator: string): Promise<boolean> {
  const img = page.locator(imgLocator);

  await expect(img).toBeVisible(); // element hiển thị
  await expect(img).toHaveJSProperty('complete', true); // ảnh đã load xong

  return await img.evaluate((el: HTMLImageElement) => {
    console.log(el.naturalWidth);
    console.log(el.naturalHeight);
    return el.naturalWidth > 0 && el.naturalHeight > 0;
  });
}

test('ví dụ về iframe', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 5: Shadow DOM & iFrame' }).click();

  //   // Cách 1: Theo ID (dễ nhất)
  //   const frame = page.frameLocator('#demo-iframe');
  //   await frame.locator('#if-input').fill('Hello iFrame');
  //   await frame.locator('#if-btn').click();
  //   await expect(frame.locator('#if-status')).toHaveText('You typed: Hello iFrame');

  //   // CÁCH 2: Theo title attribute
  //   const iframeSelector = 'iframe[title="payment-iframe"]';
  //   const iframeElement = page.locator(iframeSelector);
  //   await iframeElement.waitFor({ state: 'attached', timeout: 10000 });

  //   const framePayment = page.frameLocator(iframeSelector);
  //   await framePayment.locator('#pf-input').fill('hello');

  //   const iframeElementNth = page.locator('iframe').nth(2);
  //   await iframeElementNth.waitFor({ state: 'attached', timeout: 10000 });
  //   await iframeElementNth.scrollIntoViewIfNeeded();

  // 1) Kiểm tra theo thuộc tính DOM: complete + naturalWidth/Height

  // Ví dụ: chọn theo alt

  page.on('console', (msg) => console.log('[BROWSER]', msg.text()));

  const checkImage = await isImageOk(page, "//img[@alt='Broken 404']");
  expect(checkImage).toBeFalsy();
});

test('ví dụ về evaluate', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app');

  await page.getByRole('link', { name: 'Bài 5: Shadow DOM & iFrame' }).click();

  await page.getByRole('tab', { name: 'evaluate()' }).click();
  // Cú pháp cơ bản
  //   const result = await page.evaluate(() => {
  //     // Code này chạy trong browser context
  //     return document.title;
  //   });
  //   await page.locator('#demo-input-1').getAttribute('className');
  //   await page.locator('#demo-input-1').getAttribute('type');
  //   const domInfo = await page.locator('#demo-input-1').evaluate((el: HTMLInputElement) => {
  //     return {
  //       value: el.value,
  //       placeholder: el.placeholder,
  //       type: el.type,
  //       disabled: el.disabled,
  //       maxLength: el.maxLength,
  //       className: el.className,
  //       defaultValue: el.defaultValue,
  //       selectionStart: el.selectionStart, // Không có native method
  //       selectionEnd: el.selectionEnd, // Không có native method
  //     };
  //   });
  //   console.log('DOM Info:', domInfo);
  page.on('console', (msg) => console.log('[BROWSER]', msg.text()));

  // const panel = page.getByRole('tabpanel', { name: '🔧 evaluate()' });
  // const input = panel.locator('#demo-input-1');

  // // 1) Gõ nội dung
  // await input.fill('Hello Playwright');

  // // 2) Chọn đoạn text “Hello” (từ index 0 đến 5)
  // await input.evaluate((el: HTMLInputElement) => {
  //   el.setSelectionRange(0, 5, 'forward');
  // });

  // await page.pause();

  // // 3) Đọc selection range (cần evaluate)
  // const selection = await input.evaluate((el: HTMLInputElement) => ({
  //   selectionStart: el.selectionStart,
  //   selectionEnd: el.selectionEnd,
  //   selectionDirection: el.selectionDirection,
  // }));
  // console.log(selection); // { selectionStart: 0, selectionEnd: 5, selectionDirection: 'forward' }

  // // 4) Thay thế đoạn đã chọn bằng chuỗi khác (mô phỏng user gõ)
  // await input.type('Hi');
  // // Lúc này value: "Hi Playwright"

  // // 5) Chọn từ vị trí 3 đến hết và xoá
  // await input.evaluate((el: HTMLInputElement) => {
  //   el.setSelectionRange(3, el.value.length, 'backward');
  // });
  // await page.keyboard.press('Delete');
  // Kỳ vọng: còn lại "Hi "

  const element = page.locator('#style-demo-element');

  // Đọc một style property
  const backgroundColor = await element.evaluate((el: HTMLElement) => {
    return window.getComputedStyle(el).backgroundColor;
  });
  console.log('Background color:', backgroundColor); // "rgb(230, 247, 255)"

  // Đọc nhiều styles cùng lúc
  const styles = await element.evaluate((el: HTMLElement) => {
    const computed = window.getComputedStyle(el);
    return {
      backgroundColor: computed.backgroundColor,
      color: computed.color,
      fontSize: computed.fontSize,
      fontWeight: computed.fontWeight,
      padding: computed.padding,
      border: computed.border,
      borderRadius: computed.borderRadius,
    };
  });
  console.log('All styles:', styles);
});
//
