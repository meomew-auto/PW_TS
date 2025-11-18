import { BasePage } from './BasePage';
import { Page } from '@playwright/test';
import { expect } from '@playwright/test';
export class CRMDashboardPage extends BasePage {
  private readonly pageLocators = {
    logo: '#logo',
    // /search_input
    searchInput: (page: Page) => page.getByRole('searchbox', { name: 'Search' }),
    dashboardLink: (page: Page) => page.getByRole('link', { name: 'Dashboard' }),
  };

  public element = this.createLocatorGetter(this.pageLocators);

  async expectOnPage(): Promise<void> {
    await expect(this.element('logo')).toBeVisible();
    await expect(this.element('searchInput')).toBeVisible({ timeout: 10000 });
  }
}
