import { defineConfig, devices } from '@playwright/test';
import dotenvflow from 'dotenv-flow';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

dotenvflow.config({
  default_node_env: 'development',
});

export default defineConfig({
  testDir: './tests/lessons',
  // globalSetup: './global-setup.ts',
  // globalTeardown: './global-teardown.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: [
    // ['allure-playwright'],
    ['./custom.ts'],
    // [
    //   'json',
    //   {
    //     outputFile: './data.json',
    //   },
    // ],
    // // [
    // //   'list',
    // //   {
    // //     printSteps: true,
    // //   },
    // // ],
    // ['html'],
  ],

  use: {
    baseURL: 'https://crm.anhtester.com',
    trace: 'retain-on-failure',
    headless: false,
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'setup',
      testMatch: '**/*.setup.ts',
      teardown: 'cleanup',
    },
    {
      name: 'cleanup',
      testMatch: '**/*.teardown.ts',
    },
    {
      name: 'chromium',
      use: {
        // browserName: '',
        ...devices['Desktop Chrome'],
        storageState: './auth/user.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'api',
      use: {
        browserName: undefined,
        baseURL: 'https://jsonplaceholder.typicode.com',
      },
      testMatch: '/api/**/*.spec.ts',
    },
  ],
});

// type DeviceDescriptor = {
//   viewport: ViewportSize;
//   userAgent: string;
//   deviceScaleFactor: number;
//   isMobile: boolean;
//   hasTouch: boolean;
//   defaultBrowserType: 'chromium' | 'firefox' | 'webkit';
// };
