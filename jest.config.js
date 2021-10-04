/*
 * For a detailed explanation regarding each
  configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
  process.env.JEST_PLAYWRIGHT_CONFIG = 'jest-playwright.config.cjs';

  export default {
    projects: [
      {
        displayName: 'normal',
        testMatch: ['<rootDir>/tests/**/*.n.test.js']
      },
      {
        displayName: 'playwright',
        testMatch: ['<rootDir>/tests/**/*.pw.test.js'],
        preset: 'jest-playwright-preset'
      }
    ],
    setupFilesAfterEnv: ['expect-playwright'],
    testEnvironment: 'jest-environment-node',
    transform: {}
  };