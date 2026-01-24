import { test as base, BrowserContext, Page } from '@playwright/test';

type RoleName = 'admin' | 'staff';

type AsRoleFunction = (role: RoleName) => Promise<Page>;

export const test = base.extend<{ asRole: AsRoleFunction }>({
  asRole: async ({ browser }, use) => {
    const contexts: BrowserContext[] = [];
    const createRolePage: AsRoleFunction = async (role) => {
      const storageStatePath = `./auth/${role}.json`;
      console.log(`Loading StorageState ${storageStatePath}`);
      const context = await browser.newContext({
        storageState: storageStatePath,
      });
      contexts.push(context);

      const page = await context.newPage();
      return page;
    };

    //sử dụng cho KH
    await use(createRolePage);

    //clean
    console.log('Fixture cleaning up');
    for (const context of contexts) {
      await context.close();
    }
  },
});

export { expect } from '@playwright/test';
