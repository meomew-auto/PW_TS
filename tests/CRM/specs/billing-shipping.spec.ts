import { test, expect } from '../fixture/gatekeeper.fixture';
import { createFullCustomerInfo } from '../../utils/test-data';
import { CustomerProfilePage } from '../pom/CustomerProfilePage';


test.describe('Billing & Shipping', () => {

  test('TC_CUST_04 - Kiểm tra "Same as Customer Info" (Billing)', async ({ 
    dashboardPage, 
    customersPage, 
    newCustomerPage,
    authedPage 
  }) => {
    const profilePage = new CustomerProfilePage(authedPage);

    await test.step('Navigate to New Customer', async () => {
      await dashboardPage.navigateMenu('Customers');
      await customersPage.clickAddNewCustomer();
    });

    const fullData = createFullCustomerInfo();

    await test.step('Fill Customer Details', async () => {
      await newCustomerPage.fillCompany(fullData.company);
      await newCustomerPage.fillAdress(fullData);
      await newCustomerPage.selectCountry(fullData);
    });

    await test.step('Switch to Billing & Shipping Tab', async () => {
      await newCustomerPage.clickBillingShippingTab();
    });

    await test.step('Click "Same as Customer Info"', async () => {
      await newCustomerPage.clickSameAsCustomerLink();
    });

    await test.step('Verify Billing Address matches Customer Info on Form', async () => {
      await newCustomerPage.expectBillingAddressMatchCustomer(fullData);
    });

    await test.step('Save Customer', async () => {
      await newCustomerPage.clickSaveButton();
    });

    await test.step('Verify persisted data on Profile Page', async () => {
      await profilePage.expectOnPage();
      const expectedData = {
        company: fullData.company,
        address: fullData.address,
        city: fullData.city,
        state: fullData.state,
        zip: fullData.zip,
        country: fullData.country,
        billingStreet: fullData.address,
        billingCity: fullData.city,
        billingState: fullData.state,
        billingZip: fullData.zip,
        billingCountry: fullData.country,
      };
      await profilePage.expectCustomerDetails(expectedData);
    });
  });

  test('TC_CUST_05 - Kiểm tra "Copy Billing Address" (Shipping)', async ({ 
    dashboardPage, 
    customersPage, 
    newCustomerPage,
    authedPage 
  }) => {
    const profilePage = new CustomerProfilePage(authedPage);

    await test.step('Navigate to New Customer', async () => {
      await dashboardPage.navigateMenu('Customers');
      await customersPage.clickAddNewCustomer();
    });

    const billingData = createFullCustomerInfo({
      billingStreet: '123 Billing St',
      billingCity: 'Billing City',
      billingState: 'Billing State',
      billingZip: '90001',
      billingCountry: 'Vietnam',
    });

    await test.step('Switch to Billing & Shipping and fill Billing', async () => {
      await newCustomerPage.fillCompany(billingData.company);
      await newCustomerPage.clickBillingShippingTab();
      await newCustomerPage.fillBillingAddress(billingData);
    });

    await test.step('Click "Copy Billing Address"', async () => {
      await newCustomerPage.clickCopyBillingLink();
    });

    await test.step('Verify Shipping Address matches Billing on Form', async () => {
      await newCustomerPage.expectShippingAddressMatchBilling(billingData);
    });

    await test.step('Save Customer', async () => {
      await newCustomerPage.clickSaveButton();
    });

    await test.step('Verify persisted data on Profile Page', async () => {
      await profilePage.expectOnPage();
      const expectedData = {
        company: billingData.company,
        billingStreet: billingData.billingStreet,
        billingCity: billingData.billingCity,
        billingState: billingData.billingState,
        billingZip: billingData.billingZip,
        billingCountry: billingData.billingCountry,
        shippingStreet: billingData.billingStreet,
        shippingCity: billingData.billingCity,
        shippingState: billingData.billingState,
        shippingZip: billingData.billingZip,
        shippingCountry: billingData.billingCountry,
      };
      await profilePage.expectCustomerDetails(expectedData);
    });
  });

});
