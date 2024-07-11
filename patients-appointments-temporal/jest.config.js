// jest.config.js
module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    moduleNameMapper: {
      '@activities/(.*)': '<rootDir>/src/activities/$1',
      '@workflows/(.*)': '<rootDir>/src/workflows/$1',
    },
  };
  