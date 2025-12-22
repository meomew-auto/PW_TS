import { test, Page } from '@playwright/test';
import { CRMLoginPage } from './pom/CRMLoginPage';
import { CRMDashboardPage } from './pom/CRMDashboardPage';
import { CRMCustomerPage } from './pom/CRMCustomerPage';
import { createMinimalCustomerInfo, createFullCustomerInfo } from '../utils/test-data';
import { CRMNewCustomerPage } from './pom/CRMNewCustomerPage';
import { CustomerProfilePage } from './pom/CustomerProfilePage';
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


// TC_CUST_02
test('TC_CUST_02- Tạo Customer (Nhập đầy đủ thông tin)', async ({ page }) => {
  const { dashboardPage, customersPage, newCustomerPage } = createCRMPages(page);
  const profilePage = new CustomerProfilePage(page);

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
    await profilePage.expectOnPage();
    // Use getCustomerIdFromUrl() because profile header might format it differently or contain invisible chars
    const customerId = await profilePage.getCustomerIdFromUrl();
    await profilePage.expectProfileHeaderContains(fullData.company, customerId);
    await profilePage.expectCustomerDetails(fullData);
  });
});

// TC_CUST_04
test('TC_CUST_04- Kiểm tra "Same as Customer Info" (Billing)', async ({ page }) => {
  const { dashboardPage, customersPage, newCustomerPage } = createCRMPages(page);
  const profilePage = new CustomerProfilePage(page); // Needed for final verification

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
      // Billing matches Customer Address
      billingStreet: fullData.address,
      billingCity: fullData.city,
      billingState: fullData.state,
      billingZip: fullData.zip,
      billingCountry: fullData.country,
    };
    await profilePage.expectCustomerDetails(expectedData);
  });
});

// TC_CUST_05
test('TC_CUST_05- Kiểm tra "Copy Billing Address" (Shipping)', async ({ page }) => {
  const { dashboardPage, customersPage, newCustomerPage } = createCRMPages(page);
  const profilePage = new CustomerProfilePage(page); // Needed for final verification

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
     // We need to fill company name to be able to save
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
      // Billing fields
      billingStreet: billingData.billingStreet,
      billingCity: billingData.billingCity,
      billingState: billingData.billingState,
      billingZip: billingData.billingZip,
      billingCountry: billingData.billingCountry,
      // Shipping matches Billing
      shippingStreet: billingData.billingStreet,
      shippingCity: billingData.billingCity,
      shippingState: billingData.billingState,
      shippingZip: billingData.billingZip,
      shippingCountry: billingData.billingCountry,
    };
    await profilePage.expectCustomerDetails(expectedData);
  });
});

// TC_CUST_06
test('TC_CUST_06- Bỏ trống trường "Company"', async ({ page }) => {
  const { dashboardPage, customersPage, newCustomerPage } = createCRMPages(page);

  await test.step('Navigate to New Customer', async () => {
    await dashboardPage.navigateMenu('Customers');
    await customersPage.clickAddNewCustomer();
  });

  await test.step('Leave Company empty and click Save', async () => {
    await newCustomerPage.expectOnPage()
    await newCustomerPage.clickSaveButton();
  });

  await test.step('Verify validation error', async () => {
    await newCustomerPage.expectCompanyError();
  });
});

// TC_CUST_07
test('TC_CUST_07- Cảnh báo "Company đã tồn tại"', async ({ page }) => {
  const { dashboardPage, customersPage, newCustomerPage } = createCRMPages(page);
  const profilePage = new CustomerProfilePage(page);

  // Requirement: Need an existing company => create one first (TC_CUST_01 style)
  const existingData = createMinimalCustomerInfo();
  
  await test.step('Pre-condition: Create a customer', async () => {
    await dashboardPage.navigateMenu('Customers');
    await customersPage.clickAddNewCustomer();
    await newCustomerPage.fillCompany(existingData.company);
    await newCustomerPage.clickSaveButton();
    await profilePage.expectOnPage();
  });

  await test.step('Navigate back to New Customer', async () => {
    await dashboardPage.navigateMenu('Customers');
    await customersPage.clickAddNewCustomer();
  });

  await test.step('Fill existing company name', async () => {
    await newCustomerPage.fillCompany(existingData.company);
    await page.keyboard.press('Tab'); 
  });

  await test.step('Verify duplicate warning', async () => {
    await newCustomerPage.expectCompanyExistsWarning();
  });
});
  