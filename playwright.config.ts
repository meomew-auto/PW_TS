import { defineConfig, devices } from '@playwright/test';
import dotenvflow from 'dotenv-flow';
import { EnvManager } from './tests/utils/EnvManager';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

dotenvflow.config({
  default_node_env: 'development',
});

export default defineConfig({
  //cấu hình thư mục chạy test - Just CRM
  testDir: './tests/CRM',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 10,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    //https://crm.anhtester.com/admin/authentication
    baseURL: 'https://crm.anhtester.com',
    headless: false,
    trace: 'retain-on-failure',
  },

  /* Configure projects */
  projects: [
    {
      name: 'setup',
      testMatch: '**/*.setup.ts',
    },
    {
      name: 'Start CRM',
      testMatch: '**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        storageState: EnvManager.get('STORAGE_STATE_PATH')!,
      },
      dependencies: ['setup'],
    },
  ],
});
