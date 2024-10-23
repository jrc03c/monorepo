import globals from "globals"
import pluginJs from "@eslint/js"

export default [
  {
    languageOptions: { globals: globals.browser },
    rules: {
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-unused-vars": ["error", { caughtErrors: "none" }],
    },
  },
  pluginJs.configs.recommended,
]
