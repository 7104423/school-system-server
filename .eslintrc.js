module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb-base",
    "plugin:prettier/recommended",
    "plugin:jsdoc/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["prettier", "jsdoc"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        singleQuote: false,
        trailingComma: "all",
        arrowParens: "avoid",
        printWidth: 80,
        bracketSpacing: true,
        jsxBracketSameLine: true,
      },
      {
        usePrettierrc: true,
      },
    ],
    "func-names": "off",
    "import/prefer-default-export": "off",
    "no-use-before-define": "off",
    "no-unused-vars": "off",
    "jsdoc/require-param-description": false,
  },
};
