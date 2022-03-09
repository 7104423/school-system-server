module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["prettier"],
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
  },
};
