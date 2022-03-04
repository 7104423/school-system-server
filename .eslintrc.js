export default {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': ['off'],
    'max-len': ['error', { code: 80, tabWidth: 2 }],
    'func-names': ['off'],
  },
};
