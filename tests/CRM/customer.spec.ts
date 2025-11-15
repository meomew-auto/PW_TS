import { test, expect, Page } from '@playwright/test';
import { format } from 'date-fns';
import { faker } from '@faker-js/faker';

const LOGIN_URL = 'https://crm.anhtester.com/admin/';

function createRandomUser() {
  return {
    phone: faker.phone.number(),
    vatNumber: faker.string.numeric(10),
    website: faker.internet.url(),
    currency: 'USD',
    language: 'Vietnamese',
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipcode: faker.location.zipCode(),
    country: 'Vietnam',
  };
}

async function loginAndNaviagteToNewCustomer(page: Page, tabName: string) {
  //thực hiện hành động login -> navigate tới customer

  //1. đầu tiên goto Page
  await page.goto(LOGIN_URL);
  //2. assert page có text Login
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Login');
  //3 nhập thông tin username. password -> ấn login
  await page.locator('#email').fill('admin@example.com');
  await page.locator('#password').fill('123456');
  await page.locator("button[type='submit']").click();

  //4 verify login thành công bởi url => và customer tab link hiển thị
  await expect(page).toHaveURL(/admin/);

  //5 // click vào tab customer
  //span[normalize-space(.) = '${tabName}']//parent::a
  //#menu a[href*='Customer']
  await expect(page.getByRole('link', { name: `${tabName}` })).toBeVisible();
  await page.getByRole('link', { name: `${tabName}` }).click();
  await page.getByRole('link', { name: 'New Customer' }).click();

  //   await page.locator(`//span[normalize-space(.) = '${tabName}']//parent::a`).click();
}

test.describe('CRM Customer Page - Possitive case', () => {
  test('TC_CUST_01- Tạo Customer (Chỉ nhập trường bắt buộc)', async ({ page }) => {
    //action dang nhap thanh cong
    await loginAndNaviagteToNewCustomer(page, 'Customer');
    // thu hep khoangh cah tim kiem -> dau tien la tim thang cha parent
    // -> duyng locator chain de tim trong thang cha
    const containerCompany = page.locator('label', { hasText: 'Company' });
    // const containerCompany = page.locator('label').filter({ hasText: 'Company' });
    const asterik = containerCompany.locator('small', { hasText: '*' });
    await expect(asterik).toBeVisible();

    const now = new Date();
    const parsedDate = format(now, 'HH:mm:ss');
    const companyName = `Auto PW company ${parsedDate}`;
    await page.locator('#company').fill(companyName);

    await page
      .locator('#profile-save-section')
      .filter({ hasText: 'Save' })
      .locator('button', { hasText: 'Save' })
      .nth(1)
      .click();

    // await page.getByRole('button', { name: 'Save', exact: true }).click()
    // div[@id='profile-save-section']//button[contains(normalize-space(.), "Save")].nth(1)
    // (#profile-save-section button).nth(1)

    await expect(page.locator('#alert_float_1')).toContainText('Customer added successfully.');
    const currentUrl = page.url();
    const urlParst = currentUrl.split('/clients/client/');
    console.log(urlParst);
    const customerId = urlParst[1];

    const customerNameDisplay = page.locator('span.tw-truncate');
    const displayedText = await customerNameDisplay.textContent();
    console.log(displayedText);
    expect(displayedText).toContain(customerId);

    // https://crm.anhtester.com/admin/clients/client/3118
    // =>['https://crm.anhtester.com', '3118']
    // => lay 3118
    // await expect(page).toHaveURL(/clients\/client/);
  });

  test('TC_CUST_02- Tạo Customer (Nhập đầy đủ thông tin)', async ({ page }) => {
    //action dang nhap thanh cong
    await loginAndNaviagteToNewCustomer(page, 'Customer');
    // thu hep khoangh cah tim kiem -> dau tien la tim thang cha parent
    // -> duyng locator chain de tim trong thang cha
    const containerCompany = page.locator('label', { hasText: 'Company' });
    // const containerCompany = page.locator('label').filter({ hasText: 'Company' });
    const asterik = containerCompany.locator('small', { hasText: '*' });
    await expect(asterik).toBeVisible();

    const now = new Date();
    const parsedDate = format(now, 'HH:mm:ss');
    const companyName = `Auto PW company ${parsedDate}`;
    await page.locator('#company').fill(companyName);

    const information = createRandomUser();

    //cac input của các ô
    //VAT: #vat //input[@id='vat'] page.getByRole('textbox', { name: 'VAT Number' })
    await page.getByRole('textbox', { name: 'VAT Number' }).fill(information.vatNumber);

    //buoc tim ra dropdown va click mo
    const currencyContainer = page.locator('div.form-group', { hasText: 'Currency' });
    await currencyContainer.locator('button[data-id="default_currency"]').click();

    await page.locator('#default_language').selectOption(information.language);

    //a[@role='option'][.//span[contains(@class, 'text') and contains(., 'USD') ]]

    // await page.locator('#default_currency').selectOption(information.currency);

    //xpath
    // await page.locator("//button[@data-id='default_currency']").click();

    //a[@role='option'][.//span[contains(@class, 'text') and contains(., 'USD') ]]
    // a[id='bs-select-2-1']
    // 0 1 2
    // (#bs-select-2 a).nth(1)

    await page
      .locator('#profile-save-section')
      .filter({ hasText: 'Save' })
      .locator('button', { hasText: 'Save' })
      .nth(1)
      .click();

    // await page.getByRole('button', { name: 'Save', exact: true }).click()
    // div[@id='profile-save-section']//button[contains(normalize-space(.), "Save")].nth(1)
    // (#profile-save-section button).nth(1)

    await expect(page.locator('#alert_float_1')).toContainText('Customer added successfully.');
    const currentUrl = page.url();
    const urlParst = currentUrl.split('/clients/client/');
    const customerId = urlParst[1];

    const customerNameDisplay = page.locator('span.tw-truncate');
    const displayedText = await customerNameDisplay.textContent();
    expect(displayedText).toContain(customerId);

    await expect(page.locator('#vat')).toHaveValue(information.vatNumber);
    const dropdownText = await page
      .locator('button[data-id="default_currency"]')
      .getAttribute('title');

    expect(dropdownText).toContain(information.currency);
    const resultCurrencyDropdown = page.locator('div.form-group', { hasText: 'Currency' });
    const itemCurrency = resultCurrencyDropdown.locator('//button[@data-id="default_currency"]');
    const itemCurrentText = await itemCurrency.textContent();
    console.log(itemCurrentText);
  });

  test('TC_CUST_04- Tạo Customer (Nhập đầy đủ thông tin)', async ({ page }) => {
    //action dang nhap thanh cong
    await loginAndNaviagteToNewCustomer(page, 'Customer');
    // thu hep khoangh cah tim kiem -> dau tien la tim thang cha parent
    // -> duyng locator chain de tim trong thang cha
    const containerCompany = page.locator('label', { hasText: 'Company' });
    // const containerCompany = page.locator('label').filter({ hasText: 'Company' });
    const asterik = containerCompany.locator('small', { hasText: '*' });
    await expect(asterik).toBeVisible();

    const now = new Date();
    const parsedDate = format(now, 'HH:mm:ss');
    const companyName = `Auto PW company ${parsedDate}`;
    await page.locator('#company').fill(companyName);

    const information = createRandomUser();

    //cac input của các ô
    //VAT: #vat //input[@id='vat'] page.getByRole('textbox', { name: 'VAT Number' })
    await page.getByRole('textbox', { name: 'VAT Number' }).fill(information.vatNumber);
    await page.locator('#address').fill(information.address);

    await page.getByRole('tab', { name: 'Billing & Shipping' }).click();

    await page.getByText('Same as Customer Info').click();

    await expect(page.locator('#billing_street')).toHaveValue(information.address);
  });
});

//     test('TC_CUST_01', async ({ page }) => {
//      //  loginAndNavigateToNewCustomer(page)
//        await page.goto(URL)
//     await expect(page.getByRole('heading', {level : 1})).toContainText('Login')
//     await page.locator("#email").fill('admin@example.com')
//     await page.locator("#password").fill('123456')
//     await page.keyboard.press("Enter")
//     await expect(page.locator("//span[normalize-space(.) = 'Customers']//parent::a")).toBeVisible()
//     await page.pause()
//     })
// })
// Subscriptions
//span[normalize-space(.) = 'Subscriptions']//parent::a
//->
//

// <a href="https://crm.anhtester.com/admin/clients" aria-expanded="false">
//                 <i class="fa-regular fa-user menu-icon"></i>
//                 <span class="menu-text">
//                     Customers                </span>
// </a>

//cach 1 lay theo css
// label[for='company'] > small.req
//

// await page.locator('.menu-item-customers span').click();
// await page.locator('._buttons a').nth(0).click();
// //a[normalize-space()='New Customer']
// const asterisk = page.locator('.form-group .req.text-danger').nth(0);
// await expect(asterisk).toBeVisible();
//  * Company
//label[@for='company']/small[@class='req text-danger']
//label[contains(normalize-space(.), "* Company"]/small[contains(normalize-space(.), "*")]
//label[@for='company']/small[contains(normalize-space(.), "*")]
//div[@id='profile-save-section']//button[contains(normalize-space(.), "Save")]
//label[normalize-space(.) = "* Company"]//small
