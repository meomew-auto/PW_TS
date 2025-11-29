//ví dụ đời thường: Tìm chỗ ngồi của bạn Tùng

///// có 1 dãy bàn gồm 3 chỗ ngồi
// nhó 1 cách máy móc
// |1|2|3|4|

//table bắt đầu bảng 1 thể table
//table -> bảng cha
//thead -> là phân vùng header -> tr (row) Là 1 hàng chứa các header thuộc phân vùng thead
// cấp độ nhỏ nhất của header là th
//body là thân bảng
//tbody => tr (row) -> tương ứng từng dòng trong bảng
//trong từng dòng sẽ có td => đơn vị nhỏ nhất -> hay là cell\\;\

//COloumn map

///
// dữ liệu đầu vào giống nhưu đọc từ thead
// const headers = ['ID', 'Full name', 'Phone', 'Email'];
// // headers[0] => ID
// //Mục tiêu tạo ra 1 cái Map (sơ đồ lơp học)
// // {
// //     "ID": 0,
// //     "Full Name": 3

// // }

// // function createSimpleMap(headerList) {
// //   const map = {};
// //   for (let index = 0; index < headerList.length; index++) {
// //     const tenCot = headerList[index];
// //     //{}
// //     map[tenCot] = index;
// //     console.log(`Da ghi nho cot ${tenCot} nam o vi tri ${index}`);
// //   }
// //   return map;
// // }

// // const myMap = createSimpleMap(headers);
// // console.log(myMap['Email']);

// // myMap['fullName'];
// // myMap['full name'];

// // sẽ viết 1 hàm biến 1 word thành camelCase
// // fullName
// // Full Name -> full name => Name
// // ['full', 'name']->
// // name -> charAt(0) => n
// // ame

// function toCamelCase(text: string): string {
//   const words = text.toLowerCase().split(' ');

//   let result = words[0];
//   for (let i = 1; i < words.length; i++) {
//     const word = words[i];

//     const chuHoa = word.charAt(0).toUpperCase() + word.slice(1);
//     result += chuHoa;
//   }
//   return result;
// }
// /// helloWorldCode
// const ketQUa = toCamelCase('hello World Code');
// console.log(ketQUa);

// // co truong hop ma header cua chung ta co chua dau cach vi du
// // ('  Hoc   Js   '); -> Hoc Js
// // ['', '', '', 'Hoc', '', '', 'JS', '', '']
// // ['Hoc', 'JS']
// // -> Hoc Js
// function cleanHeaderText(text: string): string {
//   const parts = text.split(' ');
//   const words = parts.filter((word) => word !== '');
//   return words.join(' ');
// }

// console.log(cleanHeaderText('   Hoc    JS   '));

// const tableHeaders = ['    ID    ', '  Date    Created', 'customer name'];
// /// hàm chính (logic mapping)
// // dateCreated
// // date created

// function createColumnMap(rawHeader) {
//   const map = {};
//   for (let index = 0; index < rawHeader.length; index++) {
//     let raw = rawHeader[index];

//     const clean = cleanHeaderText(raw);
//     const info = {
//       columnIndex: index,
//       headerText: clean,
//     };
//     const camelKey = toCamelCase(clean);
//     if (camelKey) map[camelKey] = info;

//     const lowerKey = clean.toLowerCase();
//     if (lowerKey) map[lowerKey] = info;
//   }
//   return map;
// }

// const coloumnMap = createColumnMap(tableHeaders);
// console.log(coloumnMap);

// // muon dung kieu camel case
// console.log("1. Tìm cột 'dateCreated' dev dùng ", coloumnMap['dateCreated']);

// console.log("2. Tìm cột 'date created' nếu như BA thích dùng", coloumnMap['date created']);

// const student = {
//   name: 'Teo',
//   age: 18,
// };

// console.log(student.name);
// student.age = 30;
// console.log(student.age);
// // student[age] = 40;
// // console.log(student.age);

// let tenCot = 'Email';
// let map = {};

// map[tenCot] = 'Data A';

// console.log(map);

//ket qua mong muon la {"Email": "Data A"}
//tính được tổng số mỗi loại snar phẩm là bao nhiêu
// là tôi sẽ cần 1 cái map là 1 object chứa thông tin {
//   tao: 3
//   banh: 2,
//   sua: 1
// // }

// type HoaDon = Record<string, number>;

// const gioHang = ['Tao', 'Banh', 'Tao', 'Sua', 'Banh', 'Tao'];

// function tinhTien(danhSachHang: string[]): HoaDon {
//   const ketQua: HoaDon = {};
//   for (let i = 0; i < danhSachHang.length; i++) {
//     const tenMonHang = danhSachHang[i];

//     // neu dung dau cham
//     // ketQUa.tenMonHang -> tenMonHang: ''
//     // dùng dấu [] => máy tính hiểu lấy giá trị chữ "Tao" làm key
//     if (ketQua[tenMonHang]) {
//       //Nếu trong hóa đơn đã có món này rồi thì tăng số lượng lên 1
//       ketQua[tenMonHang] = ketQua[tenMonHang] + 1;
//     } else {
//       ketQua[tenMonHang] = 1;
//     }
//   }
//   return ketQua;
// }
// const finalBill = tinhTien(gioHang);

// console.log(finalBill);

// let domReadCount = 0;

// async function createColumnMapSimple(headersLocator) {
//   domReadCount++;
//   console.log('[DOM] đang đọc Header để xây Map....  (tốn 500ms)');
//   return {
//     name: { index: 0 },
//     age: { index: 1 },
//     email: { index: 2 },
//   };
// }

// async function getColumnInfo(headers, key, cache) {
//   let map = cache;

//   if (!map) {
//     map = await createColumnMapSimple(headers);
//   }
//   console.log('Vi đã có cache rồi nên ko build lại nữa');
//   return { info: map[key], coloumnMap: map };
// }

// async function getCellText() {
//   return 'Data';
// }

// async function buildRowData(headers, row, keys, cache) {
//   const rowData = {};
//   let currentMap = cache;
//   for (const key of keys) {
//     const result = await getColumnInfo(headers, key, currentMap);
//     //cập nhật lại map cho vòng lặp sau
//     currentMap = result.coloumnMap;
//   }
//   return { rowData, coloumnMap: currentMap };
// }

// const keyToGet = ['name', 'age', 'email'];

// const totoRows = 5;

// async function runScenario(name, cacheStrategy) {
//   console.log(`Chay kich ban ${name}`);
//   domReadCount = 0;

//   let globalCache = null;

//   for (let i = 0; i < totoRows; i++) {
//     console.log(`Xu ly dong so ${i + 1}`);
//     const inputCache = cacheStrategy ? globalCache : null;
//     const result = await buildRowData(null, null, keyToGet, inputCache);
//     if (cacheStrategy) {
//       globalCache = result.coloumnMap;
//     }
//   }

//   console.log(`So dong da xu ly ${totoRows}`);
//   console.log(`So lan doc lai headers: ${domReadCount}`);

//   if (domReadCount > 1) {
//     console.log('Hieu nang kem');
//   } else {
//     console.log('Hieu nang tot');
//   }
// }

// (async () => {
//   // await runScenario('Khong dung cache', false);
//   await runScenario('co dung cache', true);
// })();

// input: là chuỗi bẩn
//output: là chuỗi sạch
// vấn đề là chúng ta cần xử lý 1 số cột thôi đặc biệt và các cộit khác xử lý bình thường

type DataCleaner = (rawValue: string) => string;

type CleanerMap = Record<string, DataCleaner>;

const dataCleaner: CleanerMap = {
  //luật 1 : giá tiền
  // input "$ 1,200.50 USD" -> output: 1200:50
  price: (raw) => {
    if (!raw) return '0';
    let text = raw;
    if (text.includes('$')) {
      text = text.replace('$', '');
    }
    if (text.includes('USD')) {
      text.replace('USD', '');
    }
    //1,200 => [1, 200] -> 1200
    text = text.split(',').join('');
    return text.trim();
  },
  //luật 2: trạng thái
  // ['ACTIVE'] => 'Active'
  status: (raw) => {
    if (!raw) return '';
    let text = raw.trim();
    if (text.startsWith('[')) {
      text = text.replace('[', '');
    }
    if (text.endsWith(']')) {
      text = text.replace(']', '');
    }
    const firstChar = text.charAt(0).toUpperCase();
    const rest = text.slice(1).toLowerCase();
    return firstChar + rest;
  },
};

function processRow(
  rowData: Record<string, string>,

  cleaners: CleanerMap
): Record<string, string> {
  const cleanRow: Record<string, string> = {};
  const keys = Object.keys(rowData);

  for (const key of keys) {
    const rawValue = rowData[key];
    const cleanerFunction = cleaners[key];
    if (cleanerFunction) {
      console.log(`Dang sua cot ${key}`);
      cleanRow[key] = cleanerFunction(rawValue);
    } else {
      // nếu k có bộ xử lý riêng cho mỗi màn hình
      cleanRow[key] = rawValue.trim();
    }
  }
  return cleanRow;
}

const dirtyData = {
  id: '    101    ',
  price: '$ 1,500.00 USD',
  status: '[in_STOCK]',
};

console.log('Du lieu goc', dirtyData);

const cleanData = processRow(dirtyData, dataCleaner);
console.log('Du lieu sach', cleanData);
