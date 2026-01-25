import { loadFromFolder } from './file-upload.util';
import { test, expect } from './fixtures/gatekeeper.api.fixture';

// test.describe('Products Service Test', () => {
//   test('TC01. Getproducts List', async ({ productService }) => {
//     const response = await productService.getProducts({ limit: 5 });
//     console.log('Total', response.pagination.total_items);
//     console.log('Products', response.data.length);
//     console.log('All products', response.data);
//   });
// });
// BTVN
// viet TC02 get products voi pagination dựa vào productService
//viet Tc03 get chi tiết 1 product

//Zod validation
//
// ý tưởng là mình sẽ tạo ra 1 sản phẩm chỉ dành riêng để PUT và PATCH -> dùng xong xóa luôn
test.describe('Product Service Test - PUT và PATCH', () => {
  let testProductId: number;

  test.beforeEach(async ({ productService }) => {
    const product = await productService.createProduct({
      name: `Test PUT - PATCH ${Date.now()}`,
      type: 'bean',
      price_per_unit: 20000,
      unit_type: 'kg',
      specifications: {
        region: 'Bani Mattar',
        altitude: '2,000 - 2,400m',
        processing: 'Natural (Dried on rooftops)',
        grade: 'Mattari',
        flavor_profile: {
          acidity: 7.0,
          bitterness: 4.0,
          sweetness: 7.5,
          floral: 5.0,
          notes: ['Rượu vang đỏ', 'Sô-cô-la', 'Gia vị', 'Nho khô'],
        },
        grind_options: ['whole', 'filter'],
        weight_options: [100, 250],
      },
    });

    testProductId = product.id;
    console.log('Created test product', testProductId);
  });

  test.afterEach(async ({ productService }) => {
    if (testProductId) {
      await productService.deleteProduct(testProductId);
      console.log('Deleted test product');
    }
  });

  test('TC01. Cập nhật toàn bộ product (đầy đủ required field)', async ({ productService }) => {
    const updatedProduct = await productService.updateProduct(testProductId, {
      name: `PUT updated ${Date.now()}`,
      type: 'bean',
      price_per_unit: 60000,
      unit_type: 'kg',
      specifications: {
        region: 'Bani Mattar',
        altitude: '2,000 - 2,400m',
        processing: 'Natural (Dried on rooftops)',
        grade: 'Mattari',
        flavor_profile: {
          acidity: 7.0,
          bitterness: 4.0,
          sweetness: 7.5,
          floral: 5.0,
          notes: ['Rượu vang đỏ', 'Sô-cô-la', 'Gia vị', 'Nho khô'],
        },
        grind_options: ['whole', 'filter'],
        weight_options: [100, 250],
      },
    });

    expect(updatedProduct.id).toBe(testProductId);
    expect(updatedProduct.price_per_unit).toBe(60000);
  });

  test('TC02. Cập nhật giá sản phẩm qua PATCH', async ({ productService }) => {
    const patched = await productService.pactchProduct(testProductId, {
      name: 'PATCH 123',
    });
    expect(patched.name).toBe('PATCH21221');
    // expect(patched.price_per_unit).toBe(500000000);
  });

  test('TC03. Upload ảnh cho sản phẩm', async ({ productService }) => {
    const list = await productService.getProducts({ limit: 1 });
    const productId = list.data[0].id;

    const imageFile = loadFromFolder('2.jpg', 'files');
    const UPLOAD_SERVER = 'https://uploads-neko-coffee.autoneko.com';
    const result = await productService.uploadImage(productId, imageFile, UPLOAD_SERVER);
    console.log(result.message);
    console.log(result.image_url);
  });
});

//race condition nghĩa là 1 sảnphaamr vừa bị put và patch tác động

//soft assertion

// test('TC01.Hard assertion - Dung ngay khi fail', async ({ productService }) => {
//   const response = await productService.getProduct(1);

//   expect(response.id).toBe(2);
//   expect(expect.name).toBeTruthy();
// });

// test('TC02.Soft assertion - Dung ngay khi fail', async ({ productService }) => {
//   const response = await productService.getProduct(2);
//   console.log('Assertion 1 . id === 9999 (se fail)');
//   expect.soft(response.id, 'id phai la 9999').toBe(9999);

//   console.log('Assertion 2 . name === xyz (se fail)');
//   expect.soft(response.name, 'name phai la xyz').toBe('XYZ');

//   console.log('Assertion 3 . price > 0 (se pass)');
//   expect.soft(response.price_per_unit, 'price lon hon khong').toBeGreaterThan(0);

//   console.log('Assertion 4 . type ===xxx (se faild)');
//   expect.soft(response.type, 'type phai la xxx').toBe('XXXX');

//   console.log('Assertion 5 . is active (se pass)');
//   expect.soft(response.is_active, 'isactive').toBe(true);
// });
