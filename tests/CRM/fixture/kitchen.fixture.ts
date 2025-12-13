import { BarMenu } from './bar.fixture';
//Món này trả về cái gì
export type KitchenMenu = {
  phoBo: string;
  banhMi: string;
};

//công thức pha chế
// Bỏ ': Fixtures<KitchenMenu, BarMenu>' để tránh lỗi khi spread
export const kitchenRecipes = {
  phoBo: async ({ cafeDen }: BarMenu, use: (value: string) => Promise<void>) => {
    console.log(`Bếp đang chan nc lèo`);
    const monAn = 'Phở bò tái nạm';
    await use(monAn);
  },
  banhMi: async ({}, use: (value: string) => Promise<void>) => {
    console.log(`Bếp đang nướng bánh mì`);
    const monAn = 'Bánh mì pate';
    await use(monAn);
  },
};
