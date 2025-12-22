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
  // Billing
  billingStreet?: string;
  billingCity?: string;
  billingState?: string;
  billingZip?: string;
  billingCountry?: string;
  // Shipping
  shippingStreet?: string;
  shippingCity?: string;
  shippingState?: string;
  shippingZip?: string;
  shippingCountry?: string;
}

export class CRMNewCustomerPage extends BasePage {
  private readonly pageLocators = {
    //Input fields
    company: '#company',
    vat: '#vat',
    phone: '#phonenumber',
    website: '#website',
    adress: '#address',
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
    
    // Tabs
    tabCustomerDetails: (page: Page) => page.locator('a[href="#contact_info"]'),
    tabBillingShipping: (page: Page) => page.locator('a[href="#billing_and_shipping"]'),

    // Billing Fields
    billingStreet: '#billing_street',
    billingCity: '#billing_city',
    billingState: '#billing_state',
    billingZip: '#billing_zip',
    billingCountryButton: (page: Page) =>
      page
        .locator('div.form-group', { hasText: 'Country' })
        .nth(1)
        .locator('button[data-id="billing_country"]'), // Country trong tab Billing

    // Shipping Fields
    shippingStreet: '#shipping_street',
    shippingCity: '#shipping_city',
    shippingState: '#shipping_state',
    shippingZip: '#shipping_zip',
    shippingCountryButton: (page: Page) =>
      page
        .locator('div.form-group', { hasText: 'Country' })
        .nth(2)
        .locator('button[data-id="shipping_country"]'), // Country trong tab Shipping

    // Links
    sameAsCustomerLink: 'a.billing-same-as-customer',
    copyBillingLink: 'a.customer-copy-billing-address',

    // Validation & Alerts
    companyError: (page: Page) => page.locator('#company-error'),
    alertWarning: (page: Page) => page.locator('.alert.alert-warning'),
    companyExistsInfo: '#company_exists_info',
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

  // --- New Methods ---

  async clickBillingShippingTab() {
    await this.clickWithLog(this.element('tabBillingShipping'));
  }

  async fillBillingAddress(info: CustomerInfo) {
    if (info.billingStreet) await this.fillWithLog(this.element('billingStreet'), info.billingStreet);
    if (info.billingCity) await this.fillWithLog(this.element('billingCity'), info.billingCity);
    if (info.billingState) await this.fillWithLog(this.element('billingState'), info.billingState);
    if (info.billingZip) await this.fillWithLog(this.element('billingZip'), info.billingZip);
    if (info.billingCountry) {
      await this.helpers.selectBootstrapOption(this.element('billingCountryButton'), info.billingCountry);
    }
  }

  async fillShippingAddress(info: CustomerInfo) {
    if (info.shippingStreet) await this.fillWithLog(this.element('shippingStreet'), info.shippingStreet);
    if (info.shippingCity) await this.fillWithLog(this.element('shippingCity'), info.shippingCity);
    if (info.shippingState) await this.fillWithLog(this.element('shippingState'), info.shippingState);
    if (info.shippingZip) await this.fillWithLog(this.element('shippingZip'), info.shippingZip);
    if (info.shippingCountry) {
      await this.helpers.selectBootstrapOption(this.element('shippingCountryButton'), info.shippingCountry);
    }
  }

  async clickSameAsCustomerLink() {
    await this.clickWithLog(this.element('sameAsCustomerLink'));
  }

  async clickCopyBillingLink() {
    await this.clickWithLog(this.element('copyBillingLink'));
  }

  async expectBillingAddressMatchCustomer(info: CustomerInfo) {
    if (info.address) await expect(this.element('billingStreet')).toHaveValue(info.address);
    if (info.city) await expect(this.element('billingCity')).toHaveValue(info.city);
    if (info.state) await expect(this.element('billingState')).toHaveValue(info.state);
    if (info.zip) await expect(this.element('billingZip')).toHaveValue(info.zip);
  }

  async expectShippingAddressMatchBilling(info: CustomerInfo) {
    if (info.billingStreet) await expect(this.element('shippingStreet')).toHaveValue(info.billingStreet);
    if (info.billingCity) await expect(this.element('shippingCity')).toHaveValue(info.billingCity);
    if (info.billingState) await expect(this.element('shippingState')).toHaveValue(info.billingState);
    if (info.billingZip) await expect(this.element('shippingZip')).toHaveValue(info.billingZip);
  }

  async expectCompanyError() {
    await expect(this.element('companyError')).toBeVisible();
    await expect(this.element('companyError')).toHaveText(/This field is required/);
  }

  async expectCompanyExistsWarning() {
    await expect(this.element('companyExistsInfo')).toBeVisible();
    await expect(this.element('companyExistsInfo')).toContainText('already exists'); // Adjust text based on actual UI
    // Or check alert warning if it's a toast
    // await expect(this.element('alertWarning')).toBeVisible();
  }
}
