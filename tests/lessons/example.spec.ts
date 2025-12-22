import { test, expect } from '@playwright/test';
//fixtures

///vong doi cua pages...

/// ko can phai tao page => playwright se ra page cho minhf
//1. Khoi tao: dau tien PW se tao ra browserContext(giong nhu 1 profile rieng sach se) => sau do se mo 1 page() 1 tab moi hoan trong trong context do
// 2. Su dung: page -> se duoc truyen vao qua co che destructering. => toan bo test case se dien ra { }

///3. sau khi chay xong => page va browsercontext tuong ugn se bi huy bo
//framework => dung bo khung de co the s u dunfg duoc

test('has title', async ({ page, context }) => {
  //Tab 1: Trang playwright
  const playwrightPage = page;
  await playwrightPage.goto('https://playwright.dev/');
  await playwrightPage.getByRole('button', { name: 'Search (Ctrl+K)' }).click();
  await playwrightPage.getByRole('searchbox', { name: 'Search' }).fill('Locators');
  console.log('Tab 1 da go locators vao o tim kiem');

  //Tab2: trang anh tester hrm
  console.log('Dang mo tab2');
  const hrmPage = await context.newPage();
  await hrmPage.goto('https://hrm.anhtester.com/');
  await hrmPage.getByRole('textbox', { name: 'Your Username' }).click();
  await hrmPage.getByRole('textbox', { name: 'Your Username' }).fill('admin_example');
  await hrmPage.getByRole('textbox', { name: 'Enter Password' }).click();
  await hrmPage.getByRole('textbox', { name: 'Enter Password' }).fill('passwrd_example');
  console.log('Tab 2 da dien thong tin dang nhap ');

  console.log('Back ve tab1');
  await page.pause();
  await playwrightPage.getByRole('searchbox', { name: 'Search' }).press('Enter');
  console.log('Tab 1 dang cho ket qua xua hien');
  await playwrightPage.screenshot({ path: 'screenshots/tab1-playwright.png' });

  await hrmPage.screenshot({ path: 'screenshots/tab2-hrm.png' });
});
//pause la 1 trick de minfh debug
//
// echo "# PW_TS" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/meomew-auto/PW_TS.git
// git push -u origin main
