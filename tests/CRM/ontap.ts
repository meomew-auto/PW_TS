//
// <T>

function getRandomItem<T>(items: T[]) {
  const randomIdex = Math.floor(Math.random() * items.length);
  return items[randomIdex];
}

// function getRandomItemString(items: string[]) {
//   const randomIdex = Math.floor(Math.random() * items.length);
//   return items[randomIdex];
// }
// function getRandomItemNumber(items: number[]) {
//   const randomIdex = Math.floor(Math.random() * items.length);
//   return items[randomIdex];
// }

const names = ['Tuan', 'Phuong', 'Dung'];

const luckyPerson = getRandomItem(names);
console.log(luckyPerson.toUpperCase());

const numbers = [10, 25, 68, 99];

const luckeyNumber = getRandomItem(numbers);

console.log(luckeyNumber * 2);

///viết 1 cái hàm nhận vào 1 gói hàng (API RESPONE) , kiểm tra gói hàng có lỗi ko
// nếu ko lỗi: trả về cái ruột (data) đúng với kieeru T
//nếu có lỗi : ném ra errror
//status và message là luôn luôn giống nhau, data : {}

/// giả sử có 2 loại dữ liệu chính là User và product
//
interface User {
  id: number;
  username: string;
  email: string;
}

interface Product {
  sku: string;
  price: number;
  inStock: boolean;
}
/// vỏ hộp (api response chuẩn)
//cái vỏ này chứa 1 cái ruột bí ẩn tên là T
interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

function unwrapResponse<T>(response: ApiResponse<T>): T {
  if (response.statusCode !== 200) {
    throw new Error(`API Error: ${response.message}`);
  }
  //neu ngon lanh canh dao
  return response.data;
}

const userResponse: ApiResponse<User> = {
  statusCode: 200,
  message: 'Login success',
  data: {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
  },
};

const userData = unwrapResponse(userResponse);

console.log(userData.email);

const productResponse: ApiResponse<Product> = {
  statusCode: 200,
  message: 'Login success',
  data: {
    sku: 'IPHONE15',
    price: 20000,
    inStock: true,
  },
};

const productData = unwrapResponse(productResponse);

if (productData.inStock) {
  console.log(`Gia la ${productData.price}`);
}
// function unwrapAny(response: any): any {
//   return response.data;
// }

// const user = unwrapAny(userResponse);
// console.log(user.emaillll);
const dataGoc = { user: 'Admin', money: 1000 };

const dataCuaHoang = dataGoc;

// dataCuaHoang.money = 0;

// console.log(dataGoc);

//clone
function cloneData<T>(data: T): T {
  //c1: structured clone (cong nghe moi, copy sieu sau)
  if (typeof structuredClone !== 'undefined') {
    return structuredClone(data);
  }

  //cach 2 : Json (cong nghe cu, biến thhafnh chữ rồi lại biến thành hình)
  return JSON.parse(JSON.stringify(data));
}

const dataCuaHoangMoi = cloneData(dataGoc);

dataCuaHoangMoi.money = 2000;

console.log(dataGoc.money);

const teamGoc = ['Tuan', 'Hoang', 'Minh'];

const teamCongTac = cloneData(teamGoc);

teamCongTac.pop();
teamCongTac.push('Dung');

console.log(teamCongTac);
console.log(teamGoc);

//merge -> hop nhat 2 object
const nhanVien = {
  name: 'Tung',
  role: 'staff',
  salary: 1000,
};

const suaDoi = {
  salary: 2000,
  role: 'manager',
};

Object.assign(nhanVien, suaDoi);

console.log(nhanVien);
//ko su dung dc voi array

const gioHang = ['Tao', 'Cam', 'Nho'];

const muonSuaThanh = ['Dua hau'];

const gioHangMoi = ['Dua hau'];

Object.assign(gioHang, muonSuaThanh);

console.log(gioHang);

// 1 kho xe mau (catalog chi tiet)

const CAR_CATALOG = {
  sedans: {
    camry_standard: {
      description: 'Camry phien ban tieu chuan',
      data: {
        //1.
        model: 'Camry 2.0G',
        color: 'Black',
        isSold: false,
        engige: {
          type: '2.0L Pertrol',
          power: '200HP',
          fuel: 'Gas',
        },
        interior: {
          seats: 'Leather',
          color: 'Black',
        },
        accessories: ['Tham san', 'Phim cach nhiet'],
      },
    },
  },
};
//namespace: Khuvuc

// key: mau xe
function produceCar(namespace, key, options?) {
  console.log(`Lệnh sản xuất: ${namespace} -> ${key}`);

  //1. Lấy khung xe từ kho
  const template = CAR_CATALOG[namespace][key];
  if (!template) throw new Error('Khong tim thay mau xe');

  //2. clone (tao xe moi)
  let myCar = cloneData(template.data);

  if (options && options.overrides) {
    Object.assign(myCar, options.overrides);
  }

  if (options && options.transform) {
    myCar = options.transform(myCar);
    console.log(`Transform đã độ xe`);
  }
  return myCar;
}

const case1 = produceCar('sedans', 'camry_standard');
console.log(case1);
// muốn đổi màu sơn và đánh dấu xe đã bán
const case2 = produceCar('sedans', 'camry_standard', {
  overrides: {
    color: 'Pink',
    isSold: true,
  },
});
console.log(case2);

/// KH muon do xe thanh 500 ma luc
const case3 = produceCar('sedans', 'camry_standard', {
  transform: (car) => {
    car.engige.power = '500HP';
    return car;
  },
});
console.log(case3);

const case4 = produceCar('sedans', 'camry_standard', {
  transform: (car) => {
    car.accessories.push('camera hanh trinh');
    return car;
  },
});
console.log(case4);

console.log(CAR_CATALOG.sedans.camry_standard.data);
