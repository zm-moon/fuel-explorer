import { join } from 'path';
import type { PlaywrightTestConfig } from '@playwright/test';
import { defineConfig, devices } from '@playwright/test';
import './load.envs';

const IS_CI = !!process.env.CI;
const PORT = process.env.PORT || 3005;

const config: PlaywrightTestConfig = defineConfig({
  workers: 1,
  testMatch: join(__dirname, './playwright/**/*.test.ts'),
  testDir: join(__dirname, './playwright/'),
  timeout: 60_000 * 10,
  expect: {
    timeout: 5000,
  },
  reporter: [['html'], ['list', { printSteps: true }]],
  // Retry tests on CI if they fail
  retries: IS_CI ? 2 : 0,
  webServer: {
    command: `pnpm dev --mode test --port ${PORT}`,
    port: Number(PORT),
    reuseExistingServer: true,
  },
  use: {
    baseURL: `http://localhost:${PORT}/`,
    permissions: ['clipboard-read', 'clipboard-write'],
    trace: 'on-first-retry',
    headless: false,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

export default config;
