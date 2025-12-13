import { test as base } from '@playwright/test';
export type KitchenMenu = {
  phoBo: string;
  banhMi: string;
};

export const testKitchen = base.extend<KitchenMenu>({
  phoBo: async ({}, use) => {
    console.log(`Bếp đang chan nc lèo`);
    const monAn = 'Phở bò tái nạm';
    await use(monAn);
  },
  banhMi: async ({}, use) => {
    console.log(`Bếp đang nướng bánh mì`);
    const monAn = 'Bánh mì pate';
    await use(monAn);
  },
});
