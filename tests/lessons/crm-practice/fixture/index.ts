//IMport (nhập dữ liệu từ các đơn nguyên là bar, kitchen)
import { test as base } from '@playwright/test';

import { BarMenu, barRecipes } from './bar.fixture';
import { KitchenMenu, kitchenRecipes } from './kitchen.fixture';

type NhaHangMenu = BarMenu & KitchenMenu;

export const test = base.extend<NhaHangMenu>({
  ...barRecipes,
  ...kitchenRecipes,
});

export { expect } from '@playwright/test';
