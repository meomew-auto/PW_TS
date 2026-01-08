import { test, expect } from '@playwright/test';

test('TC01. Register -> Login -> Lấy JWT token', async ({ request }) => {
  //STEP 1: Đăng kí tài khoản

  const uniqueId = Date.now();

  const newUser = {
    username: `student_${uniqueId}`,
    email: `student_${uniqueId}@test.com`,
    password: '123456789',
  };

  const resgisterRes = await request.post('/auth/register', { data: newUser });

  const regisBody = await resgisterRes.json();

  expect(regisBody.access_token).toBeTruthy();
  expect(regisBody.token_type).toBe('Bearer');

  //STEP 2: Đăng nhập

  const loginRes = await request.post('/auth/login', {
    data: {
      username: newUser.username,
      password: newUser.password,
    },
  });

  expect(loginRes.status()).toBe(200);

  const loginBody = await loginRes.json();
  console.log(loginBody.access_token);

  //step 3: LẤY JWT
});

async function getToken(request: any): Promise<string> {
  const loginRes = await request.post('/auth/login', {
    data: {
      username: 'test1',
      password: '123456789',
    },
  });
  const body = await loginRes.json();
  return body.access_token;
}

test('TC02. Query param - Lọc products theo type', async ({ request }) => {
  //STEP 1: Đăng kí tài khoản
  const token = await getToken(request);

  const response = await request.get('/api/products', {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      type: 'equipment',
      limit: 2,
    },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();

  console.log('So san pham', body.data?.length);

  for (const product of body.data) {
    expect(product.type).toBe('equipment');
  }
  console.log('Tat ca san pham deu la type equipment');
});

test('TC03. Path Param - Lấy product theo id', async ({ request }) => {
  const token = await getToken(request);

  const listRes = await request.get('/api/products', {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      type: 'equipment',
      limit: 2,
    },
  });
  const listBody = await listRes.json();
  const productId = listBody.data?.[0]?.id;

  const response = await request.get(`/api/products/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const product = await response.json();

  console.log('Ten san pham', product.name);
  console.log('Gia', product.price_per_unit);
});

test('TC04. Pagination - kiểm tra limit trả về đúng số lượng', async ({ request }) => {
  const token = await getToken(request);

  const listRes = await request.get('/api/products', {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      page: 1,
      limit: 5,
    },
  });
  const listBody = await listRes.json();

  const items = listBody.data;

  console.log(`Nhận được ${items.length}`);
  expect(items.length).toBe(5);
});

test('TC05. Multipart form - gửi các text fields', async ({ request }) => {
  //   const token = await getToken(request);

  const listRes = await request.post('/public/test/echo-form', {
    multipart: {
      name: 'Teo',
      email: 'teo@gmail.com',
      age: '25',
    },
  });
  const listBody = await listRes.json();

  console.log(listBody.form_fields);
});

test('TC06. Multipart form - upload file', async ({ request }) => {
  //   const token = await getToken(request);]]
  const fileContent1 = Buffer.from('Đây là nội dung file test upload1');
  const fileContent2 = Buffer.from('Đây là nội dung file test upload2');

  const listRes = await request.post('/public/test/echo-form', {
    multipart: {
      name: 'Teo',
      email: 'teo@gmail.com',
      avatar: {
        name: 'test-upload.txt',
        mimeType: 'text/plain',
        buffer: fileContent1,
      },
      avatar2: {
        name: 'test-upload2.txt',
        mimeType: 'image/jpeg',
        buffer: fileContent2,
      },
    },
  });
  const listBody = await listRes.json();

  console.log(listBody.form_fields);

  console.log(listBody.files?.[0].filename);
  console.log(listBody.files?.[1].filename);
});

// bài tập về nhà
// Thực hành post ảnh sản phẩm multipart-formdata
// với endpoint:
// curl https://api-neko-coffee.autoneko.com/api/products/1/image \
//   --request POST \
//   --header 'Content-Type: multipart/form-data' \
//   --header 'Authorization: Bearer YOUR_SECRET_TOKEN' \
//   --form 'image='

// hoàn thiện nốt kịch bản phân trang mà trang thứ 2 nội dung phải khác trang 1
// check qua id sản phẩm
