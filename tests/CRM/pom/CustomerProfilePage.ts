import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { CustomerInfo } from './CRMNewCustomerPage';



export class CustomerProfilePage extends BasePage {
  private readonly pageLocators = {
    profileHeader: (page: Page) =>
      page
        .locator('span.tw-truncate')
        .or(page.locator('//span[contains(@class, "tw-truncate")]'))
        .first(),
    sidebarNav: '.customer-tabs',
    activeSidebarTab: (page: Page) =>
      page.locator('.customer-tabs li.active a'),
  } as const;

  public element = this.createLocatorGetter(this.pageLocators);

  private get sidebarTabSelector() {
    return '.customer-tabs a';
  }

  readonly profileHeader = this.element('profileHeader');




  private getSidebarTabByLabel(label: string): Locator {
    return this.page.locator(this.sidebarTabSelector).filter({ hasText: label });
  }

  private getHorizontalTabById(tabId: string): Locator {
    return this.page.locator(`.customer-profile-tabs a[href="#${tabId}"]`);
  }

  private getTabPanelById(tabId: string): Locator {
    return this.page.locator(`#${tabId}`);
  }



  /**
   * Verify that Customer Profile page has loaded successfully
   * Implements abstract method from BasePage
   * 
   * 💡 Usage:
   * - Can be called explicitly: `await profilePage.expectOnPage()`
   * - Or rely on lazy verification: methods auto-verify before actions
   */
  async expectOnPage() {
    await expect(this.profileHeader).toBeVisible({ timeout: 10000 });
    await expect(this.page).toHaveURL(/\/clients\/client\/\d+/);
    // No need to mark - ensureOnPage() always verifies
  }

  /**
   * Extracts customer ID from the current URL
   * 
   * 💡 Note: Test should call expectOnPage() before using this method
   * to ensure page is loaded. This method does NOT verify page state.
   */
  async getCustomerIdFromUrl(): Promise<string> {
    return this.helpers.extractCustomerIdFromUrl(this.page.url());
  }

 
  async expectProfileHeaderContains(companyName: string, customerId: string) {
    const text = await this.profileHeader.textContent();
    const displayText = text || '';
    expect(displayText).toContain(`#${customerId}`);
    expect(displayText).toContain(companyName);
    // Verify order: company name should appear after customer ID
    expect(displayText.indexOf(companyName)).toBeGreaterThan(
      displayText.indexOf(`#${customerId}`)
    );
  }

 
  async expectCustomerDetails(info: CustomerInfo) {
    // ───────────────────────────────────────────────────────
    // CÁCH 1: Dùng Array (dễ hiểu hơn, dễ thêm/bớt fields)
    // ───────────────────────────────────────────────────────
    
    // Định nghĩa danh sách fields cần verify
    // Mỗi item: { fieldName, selector, value }
    const fieldsToVerify = [
      // Main Info
      { fieldName: 'company', selector: '#company', value: info.company },
      { fieldName: 'vat', selector: '#vat', value: info.vat },
      { fieldName: 'phone', selector: '#phonenumber', value: info.phone },
      { fieldName: 'website', selector: '#website', value: info.website },
      { fieldName: 'address', selector: '#address', value: info.address },
      { fieldName: 'city', selector: '#city', value: info.city },
      { fieldName: 'state', selector: '#state', value: info.state },
      { fieldName: 'zip', selector: '#zip', value: info.zip },
      
      // Billing
      { fieldName: 'billingStreet', selector: '#billing_street', value: info.billingStreet },
      { fieldName: 'billingCity', selector: '#billing_city', value: info.billingCity },
      { fieldName: 'billingState', selector: '#billing_state', value: info.billingState },
      { fieldName: 'billingZip', selector: '#billing_zip', value: info.billingZip },
      
      // Shipping
      { fieldName: 'shippingStreet', selector: '#shipping_street', value: info.shippingStreet },
      { fieldName: 'shippingCity', selector: '#shipping_city', value: info.shippingCity },
      { fieldName: 'shippingState', selector: '#shipping_state', value: info.shippingState },
      { fieldName: 'shippingZip', selector: '#shipping_zip', value: info.shippingZip },
    ];

    for (const field of fieldsToVerify) {
      if (field.value) {
        // Switch tab if necessary for Billing/Shipping
        if (field.fieldName.startsWith('billing') || field.fieldName.startsWith('shipping')) {
           await this.ensureBillingShippingTabActive();
        } else {
           await this.ensureCustomerDetailsTabActive();
        }

        await expect(this.page.locator(field.selector)).toHaveValue(field.value);
      }
    }

    // Dropdowns (Selections)
    if (info.currency) {
        await this.ensureCustomerDetailsTabActive();
        const currencyText = await this.helpers.getBootstrapSelectTextWithRegex(this.page.locator('button[data-id="default_currency"]'));
        expect(currencyText).toContain(info.currency);
    }
    
    if (info.country) {
        await this.ensureCustomerDetailsTabActive();
         const countryText = await this.helpers.getBootstrapSelectTextWithRegex(this.page.locator('button[data-id="country"]'));
         expect(countryText).toContain(info.country);
    }

    if (info.billingCountry) {
        await this.ensureBillingShippingTabActive();
        const billingCountryText = await this.helpers.getBootstrapSelectTextWithRegex(
            this.page.locator('button[data-id="billing_country"]')
        );
        expect(billingCountryText).toContain(info.billingCountry);
    }

    if (info.shippingCountry) {
       await this.ensureBillingShippingTabActive();
        const shippingCountryText = await this.helpers.getBootstrapSelectTextWithRegex(
             this.page.locator('button[data-id="shipping_country"]')
        );
        expect(shippingCountryText).toContain(info.shippingCountry);
    }
  }

  private async ensureCustomerDetailsTabActive() {
      const tabItem = this.page
        .locator('li[role="presentation"]')
        .filter({ has: this.page.locator('a[href="#contact_info"]') });
      if (!(await tabItem.getAttribute('class'))?.includes('active')) {
          await tabItem.locator('a').click();
      }
  }

  private async ensureBillingShippingTabActive() {
      const tabItem = this.page
        .locator('li[role="presentation"]')
        .filter({ has: this.page.locator('a[href="#billing_and_shipping"]') });
      if (!(await tabItem.getAttribute('class'))?.includes('active')) {
          await tabItem.locator('a').click();
      }
  }


}

