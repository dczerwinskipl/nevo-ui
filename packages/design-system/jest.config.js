/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",

  // Setup files
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  // Module resolution
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // Test file patterns
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{ts,tsx}",
    "<rootDir>/src/**/*.{test,spec}.{ts,tsx}",
  ],

  // Coverage configuration
  collectCoverage: process.env.CI === "true",
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.{ts,tsx}",
    "!src/**/index.ts",
  ],

  // Only collect coverage for files that have tests
  coverageReporters: ["text", "html", "lcov"],

  // Coverage thresholds - conservative for now, will increase as more tests are added
  coverageThreshold: {
    // Individual file thresholds for critical components
    "./src/theme/ThemeProvider.tsx": {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  }, // Transform configuration
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json",
      },
    ],
  },

  // Module file extensions
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],

  // Test environment setup
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
};
