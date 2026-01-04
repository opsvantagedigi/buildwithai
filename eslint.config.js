module.exports = [
  {
    // Lint JS/JSX files with a minimal flat config so ESLint v9 stops
    files: ["**/*.{js,jsx}"],
    ignores: ["node_modules/**", ".next/**", "out/**", "tmp/**"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    rules: {},
  },
];
