import { test, expect } from '@playwright/test';
test('TC_01: Demo Hover', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app');

  await page.getByRole('link', { name: 'Bài 5: Shadow DOM & iFrame' }).click();

  await page.getByText('♾️ Infinite Scroll', { exact: true }).click();

  const panel = page.getByRole('tabpanel', { name: '♾️ Infinite Scroll' });
  const container = panel.locator('#mouse-position-demo');

  //hover vào tâm
  await container.hover();

  //hover vào góc trên bên trái
  await container.hover({ position: { x: 0, y: 0 } });

  const box = await container.boundingBox();
  if (!box) {
    throw new Error('Container không có kích thước');
  }
  await container.hover({ position: { x: box?.width - 5, y: box?.height - 5 } });

  await page.pause();
});

test('TC_02: Demo Infinite scroll', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app');

  await page.getByRole('link', { name: 'Bài 5: Shadow DOM & iFrame' }).click();

  await page.getByText('♾️ Infinite Scroll', { exact: true }).click();

  const panel = page.getByRole('tabpanel', { name: '♾️ Infinite Scroll' });
  const container = panel.locator('#infinite-scroll-container');
  const targetItem = container.locator('#item-80');

  //hover vào tâm
  await container.hover();

  for (let i = 0; i < 20; i++) {
    try {
      await expect(targetItem).toBeInViewport({ timeout: 500 });
      break;
    } catch {
      await page.mouse.wheel(0, 400);

      //   dùng cho scroll ngang
      //   await page.mouse.wheel(400, 0);
    }
  }

  await targetItem.scrollIntoViewIfNeeded();
  await expect(targetItem).toBeVisible();
});
