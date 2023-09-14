module.exports = {
  roots: ["<rootDir>"],
  testMatch: ["**/tests/**/*.+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 30000,
};
