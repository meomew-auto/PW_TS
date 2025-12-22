import { test as base } from '@playwright/test';

///Bước 2. Dạy robot (định nghĩa fixture)
//mowr rong extend bo nao ro bot goc
export const test = base.extend<{
  randomNumber: number; //Mon 1: so
  greeting: string; //Mon 2: chu
  userInfo: { name: string; age: number; email: string }; //3 mon object
}>({
  randomNumber: async ({}, use) => {
    const number = Math.floor(Math.random() * 100) + 1;

    //bung ra ban

    await use(number);
  },
  greeting: async ({}, use) => {
    const message = 'hello, world';
    await use(message);
  },

  userInfo: async ({}, use) => {
    const user = {
      name: 'Teo',
      age: 18,
      email: 'Teo@gmail.com',
    };

    await use(user);
  },
});
