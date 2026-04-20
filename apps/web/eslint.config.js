import { nextJsConfig } from "@repo/eslint-config/next-js"

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextJsConfig,
  {
    rules: {
      "no-restricted-globals": [
        "error",
        {
          name: "localStorage",
          message:
            "Use localStorage from '@/core/local-storage/local-storage' instead of direct localStorage access.",
        },
        {
          name: "sessionStorage",
          message:
            "Use sessionStorage from '@/core/session-storage/session-storage' instead of direct sessionStorage access.",
        },
      ],
    },
  },
  {
    files: ["src/core/**/*.ts"],
    rules: {
      "no-console": "off",
      "no-restricted-globals": "off",
    },
  },
]
