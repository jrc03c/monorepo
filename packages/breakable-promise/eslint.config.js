import globals from "globals"
import html from "eslint-plugin-html"
import pluginJs from "@eslint/js"

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        afterAll: "readonly",
        beforeAll: "readonly",
        expect: "readonly",
        test: "readonly",
      },
    },
    plugins: { html },
    rules: {
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-unused-vars": ["error", { caughtErrors: "none" }],
    },
  },
  pluginJs.configs.recommended,
]
