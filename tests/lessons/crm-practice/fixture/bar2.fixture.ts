import { test as base } from '@playwright/test';
export type BarMenu = {
  traSua: string;
  cafeDen: string;
};

export const testBar = base.extend<BarMenu>({
  traSua: async ({}, use) => {
    console.log(`Bar đang lắc trà sữa`);
    const monAn = 'Tra sua tran chau duong den';
    await use(monAn);
  },
  cafeDen: async ({}, use) => {
    console.log(`Bar đang pha cà phê`);
    const monAn = 'Cf đen sài gòn';
    await use(monAn);
  },
});
