import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log(`[GLOBAL SETUP] bawts đầu khởi động hệ thống`);

  await new Promise((r) => setTimeout(r, 1000));

  process.env.DB_CONNECTION_URL = 'postgres://admin:123';
  process.env.API_PORT = '8080';
}

export default globalSetup;
