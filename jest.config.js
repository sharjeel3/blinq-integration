const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
};

module.exports = createJestConfig(customJestConfig);
