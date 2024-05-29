module.exports = {
  extends: ["@valora/eslint-config-typescript"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "jest/valid-title": ["error", { ignoreTypeOfDescribeName: true }],
  },
  ignorePatterns: ["tsconfig.json"],
};
