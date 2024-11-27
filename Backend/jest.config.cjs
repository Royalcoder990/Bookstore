module.exports = {
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  testEnvironment: 'node',
  transformIgnorePatterns: [
    'node_modules/(?!supertest)', // Handle transforming supertest
  ],
};