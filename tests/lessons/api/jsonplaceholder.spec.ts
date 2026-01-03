import { test, expect } from '@playwright/test';

test('GET - Lấy thông tin bài viết số 1', async ({ request }) => {
  //1 gửi yêu cầu tới endpoint /posts/1
  const response = await request.get('/posts/1');
  const status = response.status();
  const statusText = response.statusText();

  expect(status).toBe(200);
  expect(statusText).toContain('OK');

  const body = await response.json();
  console.log('GET response', body);
  expect(body.id).toBe(1);
  expect(body.userId).toBe(1);
});

test('POST - Tạo bài viết mới', async ({ request }) => {
  const response = await request.post('/posts', {
    data: {
      title: 'Học PW với Hoàng',
      body: 'Bài 1: API',
      userId: 1,
    },
  });
  const body = await response.json();
  console.log('POST request', body);
  expect(body.title).toBe('Học PW với Hoàng');
});

//BTVN
// Đề bài: tạo 1 file test mới tên là hw-comments.spec.ts để test api
// posts/1/comments với curl ở đây
// curl --location 'https://jsonplaceholder.typicode.com/posts/1/comments' \
// --header 'Content-Type: application/json' \
// --data-raw '{
//     "name": "22",
//     "email": "Eliseo@gardner.biz",
//     "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
// }'
// nhớ viết expect
