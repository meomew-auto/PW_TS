import { test, expect } from './fixture/index';

test('Khach goi combo sáng (phở + cf đen)', async ({ phoBo, cafeDen }) => {
  //gọi món từ bếp
  console.log(`Khach an ${phoBo}`);

  //gọi món từ bar
  console.log(`Khach uong ${cafeDen}`);
});
