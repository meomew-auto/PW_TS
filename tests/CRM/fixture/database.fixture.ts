import { test as base } from '@playwright/test';

// giả lập database chung
const databaseChung: string[] = [];

// Đĩnh nghĩa TYPE hay là menu mà con robot sẽ phục vụ
type DatabaseFixture = {
  addAdminUser: string[];
};

//viết extend -> dạy robot cách học

export const test = base.extend<DatabaseFixture>({
  addAdminUser: async ({}, use) => {
    //Gd1: Setup
    console.log(`[SETUP] Thêm user admin`);
    databaseChung.push('Admin');

    //Gd2: Handover
    await use(databaseChung);

    //Gd3: Teardown
    console.log(`[Teardown] Đang dọn dẹp ...Xóa admin khỏi DB`);

    databaseChung.pop();

    console.log(`[Teaderdown] Hiện tại DB có: `, databaseChung);
  },
});
