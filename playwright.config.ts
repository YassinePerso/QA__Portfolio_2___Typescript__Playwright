import { defineConfig, devices } from '@playwright/test';

// If TypeScript cannot find the global `process` symbol (no @types/node),
// declare it here to avoid the "Cannot find name 'process'" error.
declare const process: any;

export default defineConfig({
  testDir: './Sprint_1___Access-management/automatisation/tests',  
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://practicesoftwaretesting.com',
    trace: 'on-first-retry',
    actionTimeout: 15000,
    locale: 'fr-FR'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});