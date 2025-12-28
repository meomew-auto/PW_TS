import { test } from '@playwright/test';

test.describe('Bộ Test Nặng Ký (5 món)', () => {
  test('Món A', async ({}, testInfo) => {
    console.log(`🔴 [Worker ${testInfo.workerIndex}] ▶️ Bắt đầu làm Món A`);
    await new Promise((r) => setTimeout(r, 2000));
    console.log(`🔴 [Worker ${testInfo.workerIndex}] ✅ Xong Món A`);
  });

  test('Món B', async ({}, testInfo) => {
    console.log(`🔵 [Worker ${testInfo.workerIndex}] ▶️ Bắt đầu làm Món B`);
    await new Promise((r) => setTimeout(r, 2000));
    console.log(`🔵 [Worker ${testInfo.workerIndex}] ✅ Xong Món B`);
  });

  test('Món C', async ({}, testInfo) => {
    console.log(`🟢 [Worker ${testInfo.workerIndex}] ▶️ Bắt đầu làm Món C`);
    await new Promise((r) => setTimeout(r, 2000));
    console.log(`🟢 [Worker ${testInfo.workerIndex}] ✅ Xong Món C`);
  });

  test('Món D', async ({}, testInfo) => {
    console.log(`🟠 [Worker ${testInfo.workerIndex}] ▶️ Bắt đầu làm Món D`);
    await new Promise((r) => setTimeout(r, 2000));
    console.log(`🟠 [Worker ${testInfo.workerIndex}] ✅ Xong Món D`);
  });

  test('Món E', async ({}, testInfo) => {
    console.log(`🟣 [Worker ${testInfo.workerIndex}] ▶️ Bắt đầu làm Món E`);
    await new Promise((r) => setTimeout(r, 2000));
    console.log(`🟣 [Worker ${testInfo.workerIndex}] ✅ Xong Món E`);
  });
});
