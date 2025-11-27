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
const headers = ['ID', 'Full name', 'Phone', 'Email'];
// headers[0] => ID
//Mục tiêu tạo ra 1 cái Map (sơ đồ lơp học)
// {
//     "ID": 0,
//     "Full Name": 3

// }

// function createSimpleMap(headerList) {
//   const map = {};
//   for (let index = 0; index < headerList.length; index++) {
//     const tenCot = headerList[index];
//     //{}
//     map[tenCot] = index;
//     console.log(`Da ghi nho cot ${tenCot} nam o vi tri ${index}`);
//   }
//   return map;
// }

// const myMap = createSimpleMap(headers);
// console.log(myMap['Email']);

// myMap['fullName'];
// myMap['full name'];

// sẽ viết 1 hàm biến 1 word thành camelCase
// fullName
// Full Name -> full name => Name
// ['full', 'name']->
// name -> charAt(0) => n
// ame

function toCamelCase(text: string): string {
  const words = text.toLowerCase().split(' ');

  let result = words[0];
  for (let i = 1; i < words.length; i++) {
    const word = words[i];

    const chuHoa = word.charAt(0).toUpperCase() + word.slice(1);
    result += chuHoa;
  }
  return result;
}
/// helloWorldCode
const ketQUa = toCamelCase('hello World Code');
console.log(ketQUa);

// co truong hop ma header cua chung ta co chua dau cach vi du
// ('  Hoc   Js   '); -> Hoc Js
// ['', '', '', 'Hoc', '', '', 'JS', '', '']
// ['Hoc', 'JS']
// -> Hoc Js
function cleanHeaderText(text: string): string {
  const parts = text.split(' ');
  const words = parts.filter((word) => word !== '');
  return words.join(' ');
}

console.log(cleanHeaderText('   Hoc    JS   '));

const tableHeaders = ['    ID    ', '  Date    Created', 'customer name'];
/// hàm chính (logic mapping)
// dateCreated
// date created

function createColumnMap(rawHeader) {
  const map = {};
  for (let index = 0; index < rawHeader.length; index++) {
    let raw = rawHeader[index];

    const clean = cleanHeaderText(raw);
    const info = {
      columnIndex: index,
      headerText: clean,
    };
    const camelKey = toCamelCase(clean);
    if (camelKey) map[camelKey] = info;

    const lowerKey = clean.toLowerCase();
    if (lowerKey) map[lowerKey] = info;
  }
  return map;
}

const coloumnMap = createColumnMap(tableHeaders);
console.log(coloumnMap);

// muon dung kieu camel case
console.log("1. Tìm cột 'dateCreated' dev dùng ", coloumnMap['dateCreated']);

console.log("2. Tìm cột 'date created' nếu như BA thích dùng", coloumnMap['date created']);
