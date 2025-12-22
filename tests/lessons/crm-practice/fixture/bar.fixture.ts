//Món này trả về cái gì
export type BarMenu = {
  traSua: string;
  cafeDen: string;
};

//công thức pha chế
// Bỏ ': Fixtures<BarMenu>' để tránh lỗi khi spread
export const barRecipes = {
  traSua: async ({}, use: (value: string) => Promise<void>) => {
    console.log(`Bar đang lắc trà sữa`);
    const monAn = 'Tra sua tran chau duong den';
    await use(monAn);
  },
  cafeDen: async ({}, use: (value: string) => Promise<void>) => {
    console.log(`Bar đang pha cà phê`);
    const monAn = 'Cf đen sài gòn';
    await use(monAn);
  },
};
