module.exports = {
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',  // Use babel-jest to transpile JavaScript and JSX files
  },
  testEnvironment: 'node',  // Use node as the test environment
  transformIgnorePatterns: [
    'node_modules/(?!supertest)',  // Add this if you need to transform dependencies like supertest
  ],
};