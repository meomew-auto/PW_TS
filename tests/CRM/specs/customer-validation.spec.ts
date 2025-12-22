import { test, expect } from '../fixture/gatekeeper.fixture';
import { createMinimalCustomerInfo } from '../../utils/test-data';

test.describe('Customer Validation', () => {

  test('TC_CUST_06 - Bỏ trống trường "Company"', async ({ 
    dashboardPage, 
    customersPage, 
    newCustomerPage 
  }) => {
    await test.step('Navigate to New Customer', async () => {
      await dashboardPage.navigateMenu('Customers');
      await customersPage.clickAddNewCustomer();
    });

    await test.step('Leave Company empty and click Save', async () => {
      await newCustomerPage.expectOnPage();
      await newCustomerPage.clickSaveButton();
    });

    await test.step('Verify Company error message', async () => {
      await newCustomerPage.expectCompanyError();
    });
  });

  test('TC_CUST_07 - Cảnh báo "Company đã tồn tại"', async ({ 
    dashboardPage, 
    customersPage, 
    newCustomerPage,
    authedPage 
  }) => {
    // Pre-condition: Create a customer first
    const existingData = createMinimalCustomerInfo();

    await test.step('Pre-condition: Create a customer', async () => {
      await dashboardPage.navigateMenu('Customers');
      await customersPage.clickAddNewCustomer();
      await newCustomerPage.fillCompany(existingData.company);
      await newCustomerPage.clickSaveButton();
    });

    await test.step('Navigate back to New Customer', async () => {
      await dashboardPage.navigateMenu('Customers');
      await customersPage.clickAddNewCustomer();
    });

    await test.step('Fill existing company name', async () => {
      await newCustomerPage.fillCompany(existingData.company);
      await authedPage.keyboard.press('Tab');
    });

    await test.step('Verify duplicate company warning', async () => {
      await newCustomerPage.expectCompanyExistsWarning();
    });
  });

});
