import { BasePage } from './BasePage';
import { Page, expect } from '@playwright/test';

export interface CustomerInfo {
  company: string;
  vat?: string;
  phone?: string;
  website?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  language?: string;
  currency?: string;
}

export class CRMNewCustomerPage extends BasePage {
  private readonly pageLocators = {
    //Input fields
    company: '#company',
    vat: '#vat',
    phone: '#phonenumber',
    website: '#website',
    adress: '#adress',
    city: '#city',
    state: '#state',
    zip: '#zip',

    //
    saveButtons: (page: Page) =>
      page
        .locator('#profile-save-section')
        .filter({ hasText: 'Save' })
        .locator('button', { hasText: 'Save' })
        .nth(1),
    asterik: (page: Page) =>
      page.locator('label', { hasText: 'Company' }).locator('small', { hasText: '*' }),
    currencyButton: (page: Page) =>
      page
        .locator('div.form-group', { hasText: 'Currency' })
        .locator('button[data-id="default_currency"]'),
    languageButton: (page: Page) =>
      page
        .locator('div.form-group', { hasText: 'Language' })
        .locator('button[data-id="default_language"]'),
    countryButton: (page: Page) =>
      page.locator('div.form-group', { hasText: 'Country' }).locator('button[data-id="country"]'),
  } as const;

  public element = this.createLocatorGetter(this.pageLocators);

  async fillCompany(name: string) {
    await this.fillWithLog(this.element('company'), name);
  }

  async fillContactInfo(info: CustomerInfo) {
    if (info.vat) {
      await this.fillWithLog(this.element('vat'), info.vat);
    }
    if (info.phone) {
      await this.fillWithLog(this.element('phone'), info.phone);
    }
    if (info.website) {
      await this.fillWithLog(this.element('website'), info.website);
    }
  }

  async fillAdress(info: CustomerInfo) {
    if (info.address) {
      await this.fillWithLog(this.element('adress'), info.address);
    }
    if (info.city) {
      await this.fillWithLog(this.element('city'), info.city);
    }
    if (info.state) {
      await this.fillWithLog(this.element('state'), info.state);
    }
    if (info.zip) {
      await this.fillWithLog(this.element('zip'), info.zip);
    }
  }
  async selectCurrency(info: CustomerInfo) {
    if (info.currency) {
      await this.helpers.selectBootstrapOption(this.element('currencyButton'), info.currency);
    }
  }
  async selectCountry(info: CustomerInfo) {
    if (info.country) {
      await this.helpers.selectBootstrapOption(this.element('countryButton'), info.country);
    }
  }
  async selectLanguage(info: CustomerInfo) {
    if (info.language) {
      await this.helpers.selectBootstrapOption(this.element('languageButton'), info.language);
    }
  }
  async clickSaveButton() {
    await this.clickWithLog(this.element('saveButtons'));
  }
  async expectOnPage(): Promise<void> {
    await expect(this.element('asterik')).toBeVisible();
  }
}
