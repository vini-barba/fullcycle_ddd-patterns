module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    "prettier",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["tsconfig.json"],
  },
  plugins: ["@typescript-eslint"],
  rules: {},
  ignorePatterns: [
    "jest.config.ts",
    "lint-staged.config.js",
    "node_modules/",
    "dist",
  ],
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".ts"],
      },
    },
  },
};
