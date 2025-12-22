import { mergeTests } from '@playwright/test';

import { testBar } from './bar2.fixture';

import { testKitchen } from './kitchen2.fixture';

//tạo ra siêu ROBOT có sức mạnh của kitchen + bar

export const test = mergeTests(testBar, testKitchen);
export { expect } from '@playwright/test';
