// // as const (const assertion)

// const direction = {
//   UP: 'up',
//   DOWN: 'down',
// } as const;

// //nghĩa là mình có thể vô tình gán lại thành chuỗi khác
// const PI = 3.14;

// //as const sẽ khóa cứng object, ngăn chặn việc sửa đổi ngớ ngẩn
// // direction.UP = 'left';

// const envs = ['dev', 'uat', 'prod'] as const;

// // envs.push();

// // typeof
// // - dùng để copy kiểu dữ liểu từ 1 đối tượng đã có sẵn
// //
// const settings = {
//   theme: 'dark',
//   notification: true,
//   version: 1.0,
// };

// // type
// // interface Settings {
// //   theme: string;
// //   notfications: boolean;
// //   version: number;
// // }
// type SettingsType = typeof settings;

// //keyof

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// type UserKeys = keyof User;

// const idTest: UserKeys = 'id';
// // tương đương với
// // type UserKeys = 'id' | 'name' | 'email'

// const Colors = {
//   Red: '#FF0000',
//   Green: '#00FF00',
//   Blue: '#0000FF',
// } as const;

// //2 cách để lấy giá trị trong 1 object
// // console.log(Colors.Green);
// // console.log(Colors['Blue']);

// //viết 1 cái hàm chỉ nhận đúng tên màu có trong object
// type ColorsType = typeof Colors;

// const green: ColorsType = {
//   Red: '#FF0000',
//   Green: '#00FF00',
//   Blue: '#0000FF',
// };
// // bước 1: typeof Colors => ra cái type là {Red: ''....}
// // bước 2: keyOf (b1) =? keyoF ColorType => union 'Red' | 'Green' | 'Blue'

// type ColorName = keyof typeof Colors;

// function changeColor(color: ColorName) {
//   console.log(Colors[color]);
// }

// changeColor('Red');

// // const configDevEnv = {
// //   endPoint: 'https://api.com',
// //   timeOut: 5000,
// //   retries: 3,
// // };

// const config = {
//   endPoint: 'https://api2.com',
//   timeOut: 3000,
//   retries: 3,
// } as const;

// // const devconFig = {...Colors.}

// type Config = typeof config;
// type ConfigKey = keyof Config;
// type ConfigDirect = keyof Config;
// //viết 1 cái hàm lấy giá trị của config

// function getConfigValue(key: keyof typeof config) {
//   return config[key];
// }

// const endPoint = getConfigValue('endPoint');

// const timeoue = getConfigValue('timeOut');
// //có 2 THẾ GIỚI Ở TRONG TYPE SCRIPT SONG SONG VỚI NHAU
// // 1/ thế giới type (kiểu = bản vẽ) => interface, type
// //2 là thế giới VALUE () const let vả function

// // => THÌ THẰNG KEYOF LÀ 1 công cụ của thế giới TYPE
// //Partial
// //
// interface UserProfile {
//   id: number;
//   name: string;
//   email: string;
//   age: number;
// }
// // Partial =>
// // interface UserProfile {
// //   id?: number;
// //   name?: string;
// //   email?: string;
// //   age?: number;
// // }

// // interface updateId {
// //   id?: number;
// // }

// //cu phap Partial<T>
// //ví dụ là tôi muốn viết 1 cái hàm updateProfile
// function updateProfile(original: UserProfile, updates: Partial<UserProfile>): UserProfile {
//   return {
//     ...original,
//     ...updates,
//   };
// }

// const userA: UserProfile = {
//   id: 1,
//   name: 'A',
//   email: '123@gmail.com',
//   age: 20,
// };

// const userB = updateProfile(userA, { age: 21 });

// console.log(userB);

// // rest params
// // {...rest}

// interface UserEntity {
//   id: string;
//   username: string;
//   password: string;
//   secretKey: string;
//   role: string;
// }

// const dbUser: UserEntity = {
//   id: 'u1',
//   username: 'admin',
//   password: '123',
//   secretKey: 'abc',
//   role: 'admin',
// };

// function chuanHoaUser(user: UserEntity) {
//   // su dung rest param  va destructoring de tach password va secretKey ra khoi phan con lai
//   const { password, secretKey, ...safeUser } = user;
//   return safeUser;
// }

// const clientData = chuanHoaUser(dbUser);
// console.log(clientData);

// const user = {
//   name: 'Alice',
//   age: 25,
// };

// // const name = user.name
// // const age = user.age

// // destructoring
// const { name, age } = user;
// const { name: userName } = user;

// console.log(userName);

// const colors = ['red', 'green'];

// const c1 = colors[0];

// const [first, second] = colors;
// console.log(first);

// //rest params
// const settings2 = {
//   theme: 'dark',
//   volume: 80,
//   wifi: true,
//   bluetooth: false,
// };

// // const { theme, volume, ...others } = settings2;

// // console.log(theme);
// // console.log(others);

// const racers = ['Hai', 'Minh', 'Tung', 'Lan'];
// // racers[0]
// const [winner, nhi, ...others] = racers;

// console.log(winner);
// console.log(others);

// // Records
// ///tư duy sử dụng record để tạo ra OBJECT  giống như 1 cuốn từ điển nơi bạn chưa biết tên key cụ thể, nhưng biết kiểu dữ liệu của chúng

// // {
// //   productName: 330
// // }
// // type ProductPrices = {
// //     [x: string]: number;
// // }
// type ProductPrices = Record<string, number>;

// const prices: ProductPrices = {
//   laptop: 1500,
//   mouse: 25,
// };
// //object laptop va 'laptop' la tuong duong nhau

// type OrderStatus = 'pending' | 'shipping' | 'delivered';

// const stastusLables: Record<OrderStatus, string> = {
//   delivered: 'Giao hang thanh cong',
//   shipping: 'dang giao hang',
//   pending: 'dang cho xu ly',
// };

// /// closure -> hay hàm trả về 1 hàm

// //bình thường; khi 1 hàm chạy xong ,. nó chết đi và quên sạch kí ức (biến cục bộ bị xóa khỏi bộ nhớ)
// // clousure ;khi hàm cha return 1 hàm con, hàm con đó gióng như đc đeo 1 cái balo " balo kí ức".
// // trong balo chứa tất cả các biến của hàm cha dù hàm cha đã chạy xxong. hàm con vẫn mang theo cái balo này

// function hamCha(x: number) {
//   //biến này nằm trong phạm vi của cha => biến cục bộ
//   let bienCuaCha = x;

//   return function hamcon(y: number) {
//     return bienCuaCha + y;
//   };
// }
// //cú pháp quan trọng là phải hứng giá trị của closure = 1 biến.
// const add5 = hamCha(5);
// const ketQua = add5(2);
// console.log(ketQua);

// /// tạo ra nhà máy tạo hàm
// //tạo ra hàm nhân
// function createMultiplier(factor: number) {
//   return function (number: number) {
//     return number * factor;
//   };
// }

// // vis duj toi muon tao ham nhan doi
// const double = createMultiplier(2);

// console.log(double(10));

// const triple = createMultiplier(3);

// console.log(triple(3));

// // // TƯ DUY TẠO RA 1 HỆ THỐNG 'ĐỒNG BỘ HÓA DỮ LIỆU"

// // 1. mình có 1 object gốc
// // 2. dùng keyof typeof để lấy danh sách key của nó
// // 3. dùng record để bắt buộc 1 object kahjsc có key y hệt object gốc.

// // Nguồn
// // const SOURCE = { KeyA: '..' };

// // type SOURCEKEY = keyof typeof SOURCE;

// // const Target: Record<SOURCEKEY, ValueType>;

// const ORDER_STATUS = {
//   CREATED: 'orderCreated',
//   PAID: 'orderPaid',
//   SHIPPED: 'orderShipped',
// } as const;

// type StatusKey = keyof typeof ORDER_STATUS;

// const STATUS_COLOR: Record<StatusKey, string> = {
//   CREATED: 'gray',
//   PAID: 'blue',
//   SHIPPED: 'green',
// };
// function getBadgeColor(status: StatusKey) {
//   return STATUS_COLOR[status];
// }

// // getBadgeColor('');

// const ENV_LIST = {
//   DEV: 'development',
//   STAGING: 'staging',
//   PROD: 'prod',
// } as const;

// type EnvKey = keyof typeof ENV_LIST;

// interface EnvConfig {
//   baseUrl: string;
//   retries: number;
//   timeOut: number;
// }

// const PLAYWRIGHT_CONFIG: Record<EnvKey, EnvConfig> = {
//   DEV: {
//     baseUrl: 'dev',
//     retries: 0,
//     timeOut: 300,
//   },
//   STAGING: {
//     baseUrl: 'uat',
//     retries: 0,
//     timeOut: 100,
//   },
//   PROD: {
//     baseUrl: 'prod',
//     retries: 1,
//     timeOut: 200,
//   },
// };
// PLAYWRIGHT_CONFIG['PROD'];

// //

// const MEMBERSHIP_TIERS = {
//   STD: 'standard_user',
//   GOLD: 'gold_user',
//   VIP: 'vip_user',
// } as const;

// type TierKey = keyof typeof MEMBERSHIP_TIERS;

// type FeeConfig = Record<TierKey, number>;

// // phần clouse tạo nhà máy hàm
// function createFeeCalculator(config: FeeConfig) {
//   console.log('khoi tao bo tinh phi voi config');

//   //closure
//   return (tier: TierKey, amount: number): number => {
//     const rate = config[tier];
//     const fee = rate * amount;
//     console.log(`${tier} giao dich ${amount}: Phi ${fee}`);
//     return fee;
//   };
// }

// /// dịp giáng sinh
// const giangSinhConfig: FeeConfig = {
//   STD: 0.05,
//   GOLD: 0.02,
//   VIP: 0.0,
// };

// const tetConfig: FeeConfig = {
//   STD: 0.1,
//   GOLD: 0.05,
//   VIP: 0.01,
// };

// // nhà máy tạo hàm
// const calculateGiangSinh = createFeeCalculator(giangSinhConfig);

// const calculateTet = createFeeCalculator(tetConfig);

// //su dung

// calculateGiangSinh('GOLD', 100);

// calculateTet('VIP', 500);

// //

// // vi du day la locator
// type LyNuoc = string;

// // viết 1 hàm nhận vào MENU -> trả về về 1 cái nút bấm cho menu
// function caiDatMayBanNuoc<T extends Record<string, string | (() => LyNuoc)>>(
//   menu: T
// ): (tenMon: keyof T) => LyNuoc {
//   // Nút bấm trả về
//   return (tenMon: keyof T): LyNuoc => {
//     const congThuc = menu[tenMon];
//     if (typeof congThuc === 'function') {
//       console.log(` May dang pha che mon ${String(tenMon)}`);
//       return congThuc();
//     }
//     console.log(`Lay ngay mon co san ${String(tenMon)}`);
//     return congThuc;
//   };
// }
// // () => string
// const MENU_QUAN = {
//   cocacola: 'Lon coca uop lanh',
//   sinh_to_bo: () => {
//     return 'Xay bo + sua + da -> sinh to bo';
//   },
//   cafe_sua: 'Cafe pha phin',
// } as const;

// const bamNut = caiDatMayBanNuoc(MENU_QUAN);

// /// khách hàng sử dụng
// //case 1: lấy nc ngọt
// const nc1 = bamNut('cocacola');

// //case 2: nc sinh to
// const nc2 = bamNut('sinh_to_bo');
// console.log(nc2);

// /// T extends Record<string, string | ((page: Page) => Locator)
// // => chúng ta sẽ nhận vào là bất cứ dạng css, xpath hoặc getby bởi pW

// // protected createLocatorGetter<T extends Record<string, string | ((page: Page) => Locator)>>(
// //     locatorMap: T
// //   ): (locatorName: keyof T) => Locator {
// //     return (locatorName: keyof T): Locator => {
// //       const locatorDef = locatorMap[locatorName];
// //       if (typeof locatorDef === 'function') {
// //         return locatorDef(this.page);
// //       }
// //       return this.page.locator(locatorDef);
// //     };
// //   }

// // ý tưởng để tìm kiếm và trích xuất thông tin theo nhiều điều kiện
// // B1. Định vị (locate)
// // /// quét qua tất cả các dòng để tìm ra đúng dòng <tr> thỏa mãn điều kiện
// // B2. Quyết định
// // . sau khi tìm đc rồi, câu hỏi tiếp theo là : chúng ta cần lấy thông tin gì ?
// // B3. Trích xuất
// // thu hoạch giá trị
// // mỗi 1 object là 1 tr

// ///đầu ra muốn tìm đc vị trí kệ C
// // ==========================================
// // 1. KHO XE MẪU (CATALOG CHI TIẾT)
// // ==========================================
// const CAR_CATALOG = {
//   sedans: {
//     camry_standard: {
//       description: 'Camry bản tiêu chuẩn',
//       data: {
//         // 1. Primitive (Số/Chuỗi) -> Dùng Overrides tốt
//         model: 'Camry 2.0G',
//         color: 'Black',
//         isSold: false,

//         // 2. Object (Cấu hình con) -> Dùng Overrides để THAY THẾ
//         engine: {
//           type: '2.0L Petrol',
//           power: '170 HP',
//           fuel: 'Gasoline',
//         },
//         interior: {
//           seats: 'Leather',
//           color: 'Beige',
//         },

//         // 3. Array (Danh sách) -> Overrides bị cấm -> Phải dùng Transform
//         accessories: ['Thảm sàn', 'Phim cách nhiệt'],
//       },
//     },
//   },
// };

// // ==========================================
// // 2. CỖ MÁY SẢN XUẤT (Logic y hệt getTestDataSimple)
// // ==========================================
// function mockClone(data) {
//   return JSON.parse(JSON.stringify(data));
// }

// function produceCar(namespace, key, options) {
//   console.log(`\n🏭 LỆNH SẢN XUẤT: [${namespace}] -> [${key}]`);

//   // 1. Lấy khung xe từ kho
//   const template = CAR_CATALOG[namespace][key];
//   if (!template) throw new Error('❌ Không tìm thấy mẫu xe!');

//   // 2. Clone (Tạo xe mới)
//   let myCar = mockClone(template.data);

//   // 3. APPLY OVERRIDES (Dán đè thông số)
//   if (options && options.overrides) {
//     // Validation chặn mảng
//     if (Array.isArray(myCar)) throw new Error('❌ Không dùng overrides cho Array!');

//     // Merge: Ghi đè các thuộc tính từ overrides vào myCar
//     Object.assign(myCar, options.overrides);
//     console.log('   🎨 [Overrides] Đã thay đổi thông số.');
//   }

//   // 4. APPLY TRANSFORM (Độ xe chuyên sâu)
//   if (options && options.transform) {
//     myCar = options.transform(myCar);
//     console.log('   🔧 [Transform] Đã độ xe.');
//   }

//   return myCar;
// }

// // ==========================================
// // 3. CÁC KỊCH BẢN MINH HỌA (SCENARIOS)
// // ==========================================

// try {
//   // 🟢 CASE 1: OVERRIDE PRIMITIVE (Dễ nhất)
//   // Tình huống: Khách muốn đổi màu sơn và đánh dấu xe đã bán
//   const car1 = produceCar('sedans', 'camry_standard', {
//     overrides: {
//       color: 'White Pearl', // Đổi màu
//       isSold: true, // Đổi trạng thái
//     },
//   });
//   console.log('   👉 Kết quả 1:', {
//     color: car1.color,
//     isSold: car1.isSold,
//   });

//   // 🟢 CASE 2: OVERRIDE OBJECT (Quan trọng!)
//   // Tình huống: Khách muốn nâng cấp toàn bộ Động Cơ lên bản Hybrid.
//   // Lưu ý: Khi override object, ta THAY THẾ toàn bộ cục object đó.
//   const car2 = produceCar('sedans', 'camry_standard', {
//     overrides: {
//       // Thay thế nguyên cục engine cũ bằng cục engine mới
//       engine: {
//         type: '2.5L Hybrid',
//         power: '210 HP',
//         fuel: 'Electric/Gas',
//       },
//     },
//   });
//   console.log('   👉 Kết quả 2 (Động cơ mới):', car2.engine);
//   // Engine cũ (2.0L Petrol) đã biến mất hoàn toàn

//   // 🟠 CASE 3: TRANSFORM (Sửa 1 phần trong Object con)
//   // Tình huống: Khách giữ nguyên động cơ cũ, NHƯNG muốn "Hack" công suất lên 500HP.
//   // Nếu dùng overrides, ta phải copy lại toàn bộ engine (mất công).
//   // Dùng transform để chọc vào sửa đúng 1 dòng.
//   const car3 = produceCar('sedans', 'camry_standard', {
//     transform: (car) => {
//       // Chỉ sửa đúng dòng power, giữ nguyên type và fuel
//       car.engine.power = '500 HP (Tuned)';
//       return car;
//     },
//   });
//   console.log('   👉 Kết quả 3 (Động cơ độ):', car3.engine);

//   // 🟡 CASE 4: TRANSFORM ARRAY (Xử lý mảng)
//   // Tình huống: Thêm "Camera hành trình" vào danh sách phụ kiện
//   const car4 = produceCar('sedans', 'camry_standard', {
//     transform: (car) => {
//       car.accessories.push('Camera hành trình');
//       return car;
//     },
//   });
//   console.log('   👉 Kết quả 4 (Phụ kiện):', car4.accessories);
// } catch (e) {
//   console.error(e.message);
// }
