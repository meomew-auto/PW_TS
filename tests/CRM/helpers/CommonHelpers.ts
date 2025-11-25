import { Locator, Page } from '@playwright/test';

export class CommonHelpers {
  constructor(private page: Page) {}

  async selectBootstrapOption(button: Locator, text: string): Promise<void> {
    await button.click();
    const option = this.page
      .locator("a[@role='option']")
      .filter({ has: this.page.locator('span.text', { hasText: text }) });
    if (await option.count()) {
      await option.click();
      return;
    }
    // đề phòng nếu như mà getbyfilter ko đc.
    await this.page.locator(`//a[normalize-space()='${text}']`).first().click();
  }
}
