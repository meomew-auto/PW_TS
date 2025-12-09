import { test } from './fixture/basic.fixture';

test('Test dung toan bo fixture moi', async ({ randomNumber, greeting, userInfo }) => {
  console.log(`loi chao ${greeting}`);
  console.log(`So may man ${randomNumber}`);
  console.log(`User ${userInfo.name}`);
});

test('Test dung toan bo fixture moi2', async ({ userInfo }) => {
  console.log(`User ${userInfo.name}`);
});
