module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier", // Must be last to override other configs
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "*.config.js", "*.config.ts"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    "react",
    "react-hooks",
    "react-refresh",
    "@typescript-eslint",
    "jsx-a11y",
  ],
  rules: {
    // TypeScript specific rules
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-non-null-assertion": "warn",

    // React specific rules
    "react/react-in-jsx-scope": "off", // Not needed with new JSX transform
    "react/prop-types": "off", // Using TypeScript for prop validation
    "react/display-name": "warn",
    "react/no-unescaped-entities": "error",
    "react/jsx-key": "error",
    "react/jsx-no-duplicate-props": "error",
    "react/jsx-no-undef": "error",
    "react/jsx-uses-react": "off", // Not needed with new JSX transform
    "react/jsx-uses-vars": "error",

    // React Hooks rules
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    // Accessibility rules
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/anchor-has-content": "error",
    "jsx-a11y/anchor-is-valid": "error",
    "jsx-a11y/click-events-have-key-events": "error",
    "jsx-a11y/label-has-associated-control": "error",
    "jsx-a11y/no-static-element-interactions": "error",

    // General code quality rules
    "no-console": "warn",
    "no-debugger": "error",
    "no-duplicate-imports": "error",
    "no-unused-vars": "off", // Handled by @typescript-eslint/no-unused-vars
    "prefer-const": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "prefer-template": "error",

    // Code style rules - Let Prettier handle formatting
    "max-len": ["warn", { code: 100, ignoreUrls: true, ignoreStrings: true }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [
    // Test files specific rules
    {
      files: ["**/__tests__/**/*", "**/*.{test,spec}.*"],
      env: {
        jest: true,
      },
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "no-console": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
      },
    },
    // Configuration files
    {
      files: ["*.config.{js,ts}", ".eslintrc.{js,cjs}"],
      env: {
        node: true,
      },
      rules: {
        "no-console": "off",
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};
