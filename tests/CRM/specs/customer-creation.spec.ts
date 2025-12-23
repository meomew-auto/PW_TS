import { test, expect } from '../fixture/gatekeeper.fixture';
import { createMinimalCustomerInfo, createFullCustomerInfo } from '../../utils/test-data';
import { CustomerProfilePage } from '../pom/CustomerProfilePage';

test.describe('Customer Creation', () => {
  test.only('TC_CUST_01 - Tạo Customer (Chỉ nhập trường bắt buộc)', async ({
    dashboardPage,
    customersPage,
    newCustomerPage,
    authedPage,
  }) => {
    await test.step('Verify dashboard loaded after login', async () => {
      await dashboardPage.expectOnPage();
    });

    await test.step('Navigate to Customers page', async () => {
      await dashboardPage.navigateMenu('Customers');
      await customersPage.expectOnPage();
    });

    await test.step('Navigate to New Customer page', async () => {
      await customersPage.clickAddNewCustomer();
      await newCustomerPage.expectOnPage();
    });

    const customerInfo = createMinimalCustomerInfo();

    await test.step('Fill required company field and save', async () => {
      await newCustomerPage.fillCompany(customerInfo.company);
      await newCustomerPage.clickSaveButton();
    });

    await test.step('Verify customer created', async () => {
      const profilePage = new CustomerProfilePage(authedPage);
      await profilePage.expectOnPage();
    });
  });

  test('TC_CUST_02 - Tạo Customer (Nhập đầy đủ thông tin)', async ({
    dashboardPage,
    customersPage,
    newCustomerPage,
    authedPage,
  }) => {
    await test.step('Navigate to New Customer', async () => {
      await dashboardPage.navigateMenu('Customers');
      await customersPage.clickAddNewCustomer();
    });

    const fullData = createFullCustomerInfo();

    await test.step('Fill all fields', async () => {
      await newCustomerPage.fillCompany(fullData.company);
      await newCustomerPage.fillContactInfo(fullData);
      await newCustomerPage.fillAdress(fullData);
      await newCustomerPage.selectCurrency(fullData);
      await newCustomerPage.selectCountry(fullData);
      await newCustomerPage.clickSaveButton();
    });

    await test.step('Verify customer created with full info', async () => {
      const profilePage = new CustomerProfilePage(authedPage);
      await profilePage.expectOnPage();
      const customerId = await profilePage.getCustomerIdFromUrl();
      await profilePage.expectProfileHeaderContains(fullData.company, customerId);
      await profilePage.expectCustomerDetails(fullData);
    });
  });
});
