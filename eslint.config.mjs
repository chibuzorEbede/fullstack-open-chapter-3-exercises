import globals from "globals";
import js from "@eslint/js";
import stylisticJS from "@stylistic/eslint-plugin-js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: { ...globals.node },
      ecmaVersion: "latest",
    },
    plugins: {
      "@stylistic/js": stylisticJS,
    },
    rules: {
      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/linebreak-style": ["error", "unix"],
      "@stylistic/js/semi": ["error", "never"],
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
    },
  },
  {
    ignores: ["dist/**"],
  },
];

// import { defineConfig } from "eslint/config";
// import globals from "globals";
// import js from "@eslint/js";

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs}"] },
//   { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
//   { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
//   { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
// ]);
