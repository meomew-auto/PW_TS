// {
//   id: { columnIndex: 0, headerText: 'ID' },
//   dateCreated: { columnIndex: 1, headerText: 'Date Created' },
//   'date created': { columnIndex: 1, headerText: 'Date Created' },
//   customerName: { columnIndex: 2, headerText: 'customer name' },
//   'customer name': { columnIndex: 2, headerText: 'customer name' }

import { Locator } from '@playwright/test';

export type ColumnInfo = {
  index: number;
  text: string;
};

export type ColumnMap = Record<string, ColumnInfo>;

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

function cleanHeaderText(text: string): string {
  const parts = text.split(' ');
  const words = parts.filter((word) => word !== '');
  return words.join(' ');
}

export async function createColumnMap(headers: Locator): Promise<ColumnMap> {
  const count = await headers.count();
  const map: ColumnMap = {};

  for (let index = 0; index < count; index++) {
    const headerLocator = headers.nth(index);
    const rawText = await headerLocator.innerText();

    const clean = cleanHeaderText(rawText);

    const info: ColumnInfo = {
      index,
      text: clean,
    };

    const camelKey = toCamelCase(clean);

    if (camelKey) {
      map[camelKey] = info;
    }

    const lowerKey = clean.toLowerCase();
    if (lowerKey) {
      map[lowerKey] = info;
    }
  }
  return map;
}
export async function getColumnInfoSimple(
  headersLocator: Locator,
  columnKey: string,
  coloumnMapCache?: ColumnMap | null
): Promise<{ info: ColumnInfo; columnMap: ColumnMap }> {
  //B1: Thử dùng cache nếu có
  let map: ColumnMap | null = coloumnMapCache || null;
  if (!map) {
    map = await createColumnMap(headersLocator);
  }
  //B2: Tìm column trong map
  let info = map[columnKey];

  //B3: Nếu ko tìm thấy. tạo lại map từ DOM
  // retry strategy
  if (!info) {
    map = await createColumnMap(headersLocator);
    info = map[columnKey];
  }
  if (!info) {
    throw new Error(`Column ${columnKey} không tìm thấy`);
  }
  return { info, columnMap: map };
}

export type ColumnTextCleaner = (cell: Locator) => Promise<string>;

export async function getCellTextSimple(
  cell: Locator,
  columnKey: string,
  columnCleaner?: Record<string, ColumnTextCleaner>
): Promise<string> {
  ///B1: Kiểm tra xem custom cleaner cho column key có hay ko

  const cleaner = columnCleaner?.[columnKey];
  if (cleaner) {
    return cleaner(cell);
  }
  const text = await cell.textContent();
  return (text || '').trim();
}

export async function getColumnValuesSimple(
  headersLocator: Locator,
  rowsLocator: Locator,
  columnKey: string,
  columnCleaner?: Record<string, ColumnTextCleaner>,
  coloumnMapCache?: ColumnMap | null
): Promise<string[]> {
  const result = await getColumnInfoSimple(headersLocator, columnKey, coloumnMapCache);
  const count = await rowsLocator.count();

  const values: string[] = [];
  for (let i = 0; i < count; i++) {
    const cell = rowsLocator.nth(i).locator(`td:nth-child(${result.info.index + 1})`);
    values.push(await getCellTextSimple(cell, columnKey, columnCleaner));
  }
  return values;
}
