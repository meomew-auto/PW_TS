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
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 2,
  reporter: 'html',

  use: {
    baseURL: 'https://crm.anhtester.com',
    trace: 'on-first-retry',
    headless: false,
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
