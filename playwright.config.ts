import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	timeout: 30_000,
	expect: { timeout: 10_000 },
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 2 : undefined,
	reporter: process.env.CI
		? [['list'], ['github'], ['html', { open: 'never' }]]
		: [['list'], ['html', { open: 'never' }]],
	use: {
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
		actionTimeout: 10_000,
		navigationTimeout: 15_000,
	},
	projects: [
		{
			name: 'ui',
			testMatch: 'tests/ui/**',
			use: {
				...devices['Desktop Chrome'],
				baseURL: 'https://www.saucedemo.com',
			},
		},
		{
			name: 'api',
			testMatch: 'tests/api/**',
			use: {
				// API-only project: no browser context is spun up, just request context.
				baseURL: 'https://restful-booker.herokuapp.com',
			},
		},
	],
});
