import { Locator, Page } from '@playwright/test';

export class CommonHelpers {
  constructor(private page: Page) {}

  async selectBootstrapOption(button: Locator, text: string): Promise<void> {
    await button.click();
    // Scope to the currently open dropdown menu (visible .dropdown-menu)
    // This avoids strict mode violation when multiple dropdowns have same option text
    const openMenu = this.page.locator('.dropdown-menu.open, .dropdown-menu:visible, .bootstrap-select.open .dropdown-menu').first();
    const option = openMenu
      .locator("a[role='option']")
      .filter({ has: this.page.locator('span.text', { hasText: text }) });
    if (await option.count()) {
      await option.click();
      return;
    }
    // đề phòng nếu như mà getbyfilter ko đc.
    await this.page.locator(`//a[normalize-space()='${text}']`).first().click();
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
