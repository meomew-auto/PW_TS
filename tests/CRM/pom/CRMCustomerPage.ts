import { ColoumnMap } from '../helpers/TableColumnHelpers';
import { BasePage } from './BasePage';
import { Page, expect } from '@playwright/test';

export class CRMCustomerPage extends BasePage {
  private readonly pageLocators = {
    newCustomerLink: (page: Page) => page.getByRole('link', { name: 'New Customer' }),

    tableHeaders: '#clients thead th',
    tableRows: '#clients tbody tr',
    saerchInput: '#clients_filter input[type="search"]',
    tableProcessing: '#clients_processing',
  } as const;

  public element = this.createLocatorGetter(this.pageLocators);

  async expectOnPage(): Promise<void> {
    await expect(this.element('newCustomerLink')).toBeVisible();
  }
  async waitForTableReady() {
    const processing = this.element('tableProcessing');
    await expect(processing).not.toBeVisible();

    const headers = this.element('tableHeaders');
    await expect(headers.first()).toBeVisible();
  }

  private async buildColumnMap(): Promise<ColoumnMap> {
    const headers = this.element('tableHeaders');
    return createColumnMap(headers);
  }

  async clickAddNewCustomer() {
    await this.clickWithLog(this.element('newCustomerLink'));
  }
}
