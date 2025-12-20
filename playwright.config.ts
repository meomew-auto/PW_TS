import { defineConfig, devices } from '@playwright/test';
import dotenvflow from 'dotenv-flow';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

dotenvflow.config({
  default_node_env: 'development',
});

export default defineConfig({
  //cấu hình thư mục chạy test
  //mặc định playwright sẽ quét hết những file có tên *.spec.ts ở tất cả cấp bậc trong thư mục testDir
  testDir: './tests',
  //khai báo global teardown và setup
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',
  // testMatch: '**/*.spec.ts',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    //https://crm.anhtester.com/admin/authentication
    baseURL: 'https://crm.anhtester.com',
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    headless: true,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'global',
      testMatch: '**/*.spec2.ts',
      use: {
        browserName: undefined,
        //ko ghi đè gì cả -> kế thừa toàn bộ của global use
      },
    },

    //proejct chuyên chạy API
    {
      name: 'api-engine',
      testMatch: '**/api/*.spec1.ts',
      use: {
        browserName: undefined,
        //ko ghi đè gì cả -> kế thừa toàn bộ của global use
      },
    },

    //project desktop chay UI

    {
      name: 'desktop-chrome',
      testMatch: '**/ui/*.spec1.ts',
      use: {
        ...devices['Desktop Chrome'],
        headless: true,
      },
    },

    //project chuyeen chay ui iphone
    {
      name: 'mobile-ios',
      testMatch: '**/ui/*.spec1.ts',
      use: {
        ...devices['iPhone 12 Pro Max'],
        headless: true,
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
