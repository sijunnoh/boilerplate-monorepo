/** @type {import("prettier").Config} */
const config = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],

  bracketSpacing: true,
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",

  importOrder: ["^react$", "<THIRD_PARTY_MODULES>", "^[@]+/", "^[.]+/"],
  importOrderSeparation: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
}

export default config
