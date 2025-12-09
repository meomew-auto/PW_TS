//dieu quan trong nha la import tu file fixture cua minh ko phai thu vien goc

import { test } from './fixture/robot.fixture';

test('Khach hang kiem tra loi chao robot', async ({ loiChao }) => {
  console.log('Bat dau test');

  console.log(loiChao);
});
