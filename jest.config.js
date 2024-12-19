module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    testTimeout: 10000, // Set timeout to 10 seconds
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
  };