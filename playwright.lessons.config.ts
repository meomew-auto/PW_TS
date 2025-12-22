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
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://staging.example.com', 
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'Lessons',
      testMatch: ['**/*.spec.ts', '**/*.spec1.ts', '**/*.spec2.ts'],
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
