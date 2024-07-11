module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    roots: ['<rootDir>/src/'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    testMatch: ['**/tests/**/*.test.[jt]s?(x)'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    setupFiles: ['<rootDir>/jest.setup.js'],
};
