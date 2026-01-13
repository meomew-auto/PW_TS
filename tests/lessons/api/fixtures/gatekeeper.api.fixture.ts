import { AuthApiFixture, test as authTest } from './auth.api.fixture';
import { serviceFixtures, ServicesFixtures } from './services.fixture';
import { expect } from '@playwright/test';
export type GateKeeperApiFixtures = AuthApiFixture & ServicesFixtures;

export const test = authTest.extend<ServicesFixtures>({
  ...serviceFixtures,
});

export { expect };
