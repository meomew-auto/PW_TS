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

export type ColoumnMap = Record<string, ColumnInfo>;

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

export async function createColumnMap(headers: Locator): Promise<ColoumnMap> {
  const count = await headers.count();
  const map: ColoumnMap = {};

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
