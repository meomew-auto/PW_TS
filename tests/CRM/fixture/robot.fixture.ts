//3 bước

//1 nhập robot gốc về
//2 dạy robot công thức (fixture)
//3 gọi món để kiểm tra(test)

//Bước 1

import { test as base } from '@playwright/test';

///Bước 2. Dạy robot (định nghĩa fixture)
//mowr rong extend bo nao ro bot goc
export const test = base.extend<{
  loiChao: string;
}>({
  //tên món: lời chào

  // món này siêu dễ ko cần nguyên liệu

  loiChao: async ({ page }, use) => {
    await page.goto('https://playwright.dev');
    const title = await page.title();

    //1 chế biến: *set up làm trong bêpos
    // const text = 'Xin chao ban! Robot da san sang phuc vu ban.';

    //2. dang mon (bung ra ban)

    ///robot dua text cho KH va cho
    await use(`Xin chao! Ban dang o trang ${title}`);
  },
});
