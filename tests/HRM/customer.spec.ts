import { test, expect, Page } from '@playwright/test';
import { format } from 'date-fns';
const LOGIN_URL = 'https://crm.anhtester.com/admin/';

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
