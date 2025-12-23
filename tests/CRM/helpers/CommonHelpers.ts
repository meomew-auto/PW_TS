import { Locator, Page } from '@playwright/test';

export class CommonHelpers {
  constructor(private page: Page) {}

  async selectBootstrapOption(button: Locator, text: string): Promise<void> {
    await button.click();
    
    // Đợi dropdown mở (Bootstrap thêm class 'open' vào parent .bootstrap-select)
    const dropdownContainer = button.locator('xpath=ancestor::div[contains(@class,"bootstrap-select")]');
    const openMenu = dropdownContainer.locator('.inner.open');
    await openMenu.waitFor({ state: 'visible' });
    
    // CHỈ target <a role="option"> (không phải <option> ẩn trong select gốc)
    // Vì Bootstrap tạo cả 2: <option> ẩn và <a role="option"> hiển thị
    const option = openMenu
      .locator('a[role="option"]')
      .filter({ hasText: text });
    
    await option.click();
  }

    async getBootstrapSelectTextWithRegex(button: Locator): Promise<string> {
    const text = await button.locator('.filter-option-inner-inner').textContent();
    if (text) {
      // Lấy từ đầu tiên (trước space)
      const firstWord = text.trim().split(' ')[0] || '';
      return firstWord.replace(/[^a-zA-Z0-9]/g, '').trim();
    }
    
    const title = await button.getAttribute('title');
    if (title) {
      const firstWord = title.trim().split(' ')[0] || '';
      return firstWord.replace(/[^a-zA-Z0-9]/g, '').trim();
    }
    
    return '';
  }
    extractCustomerIdFromUrl(url: string): string {
    const parts = url.split('/clients/client/');
    return parts[1]?.split('/')[0]?.split('?')[0] || '';
  }
}
