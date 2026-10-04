import js from "@eslint/js";
import globals from "globals";
import babelParser from "@babel/eslint-parser";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import css from "@eslint/css";

export default [
  { ignores: ["docs", "node_modules"] },
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    ...js.configs.recommended,
    settings: {
      react: { version: "detect" },
    },
  },
  {
    ...react.configs.flat.recommended,
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
  },
  {
    ...react.configs.flat["jsx-runtime"],
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
  },
  {
    ...reactHooks.configs.flat.recommended,
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    rules: {
      "react/no-children-prop": "off",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "no-undef": "off",
    },
    languageOptions: {
      parser: babelParser,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          parserOpts: {
            plugins: ["jsx", ["typescript", { isTSX: true }]],
          },
        },
      },
    },
  },
  {
    files: ["**/*.css"],
    language: "css/css",
    plugins: { css },
  },
  {
    ...prettierRecommended,
    rules: {
      ...prettierRecommended.rules,
      "prettier/prettier": "warn",
    },
  },
];
