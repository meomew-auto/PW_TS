import { test, Page } from '@playwright/test';
import { CRMLoginPage } from './pom/CRMLoginPage';
import { CRMDashboardPage } from './pom/CRMDashboardPage';
import { CRMCustomerPage } from './pom/CRMCustomerPage';
import { createMinimalCustomerInfo } from './utils/test-data';
import { CRMNewCustomerPage } from './pom/CRMNewCustomerPage';
import { getTestDataSimple } from './test-data';

test.beforeEach(async ({ page }) => {
  const loginPage = new CRMLoginPage(page);
  await loginPage.goto();
  await loginPage.login('admin@example.com', '123456');
  await loginPage.expectLoggedIn();
});

function createCRMPages(page: Page) {
  return {
    dashboardPage: new CRMDashboardPage(page),
    customersPage: new CRMCustomerPage(page),
    newCustomerPage: new CRMNewCustomerPage(page),
    // profile
  };
}
test('TC_CUST_01- Tạo Customer (Chỉ nhập trường bắt buộc)', async ({ page }) => {
  const { dashboardPage, customersPage, newCustomerPage } = createCRMPages(page);

  await test.step('Verify dashboard da load sau khi login', async () => {
    await dashboardPage.expectOnPage();
  });

  await test.step('Navigate tu dashboardPage -> customer page', async () => {
    await dashboardPage.navigateMenu('Customers');
    await customersPage.expectOnPage();
  });
  await test.step('Navigate tu customerPage -> new Customer Page', async () => {
    await customersPage.clickAddNewCustomer();
    await newCustomerPage.expectOnPage();
  });
  const minimalData = getTestDataSimple('customers', 'minimal');
  console.log(minimalData.company);
  const customerInfo = createMinimalCustomerInfo();
  await test.step('Fill required company field', async () => {
    await newCustomerPage.fillCompany(customerInfo.company);
    await newCustomerPage.clickSaveButton();
  });
});
