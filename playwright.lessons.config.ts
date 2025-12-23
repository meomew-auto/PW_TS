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
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://crm.anhtester.com',
    trace: 'on-first-retry',
    headless: true,
  },

  projects: [
    { name: 'setup', testMatch: '**/*.setup.ts', teardown: 'cleanup' },
    {
      name: 'cleanup',
      testMatch: '**/*.teardown.ts',
    },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: './auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});

//userAgent:
