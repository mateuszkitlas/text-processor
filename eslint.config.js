import js from "@eslint/js";
import globals from "globals";
import babelParser from "@babel/eslint-parser";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  { ignores: ["docs", "node_modules"] },
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    ...js.configs.recommended,
    settings: {
      react: { version: "detect" },
    },
  },
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  reactHooks.configs.flat.recommended,
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
  prettierRecommended,
];
