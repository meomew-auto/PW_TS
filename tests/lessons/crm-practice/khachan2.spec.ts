import { test, expect } from './fixture/index2';

test('Khach goi combo sáng (phở + cf đen)', async ({ phoBo, cafeDen }) => {
  //gọi món từ bếp
  console.log(`Khach an ${phoBo}`);

  //gọi món từ bar
  console.log(`Khach uong ${cafeDen}`);
});

//cáchh 1 : dùng spread (...) -> giống như mình có 1 quyển vở trắng (base)
// mình chép công thức Toán vào , rồi chép tiếp công thức văn vào và vở đó chứa cả 2

//cách 2: mergeTest
// giống như có 1 qv toán ,. văn riêng. -> sau đó lấy băng dính dán 2 quyển lại thành 1 quyển
