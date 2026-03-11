import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import solid from "eslint-plugin-solid";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      solid,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    ignores: [".output/**", ".vinxi/**", "node_modules/**"],
  }
);
