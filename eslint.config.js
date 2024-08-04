// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";
//
//
// export default [
//   {files: ["**/*.{js,mjs,cjs,ts}"]},
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
// ];

{
  "rules": {
  "no-unused-vars": 2,
      "max-len": [1, 100],
      "max-params": [2, 3],
  /build
      **/*.min.js
      /node_modules
}
}
