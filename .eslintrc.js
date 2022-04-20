module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "vuejs-accessibility/label-has-for": 'off',
    // 'max-len': ['error', { code: 170 }],
    // 'max-len': ["warn", { "code": 140 }],
    "ignoreComments": 'off',
    "skipBlankLines": 'off',
    'no-trailing-spaces': 0,
    /*eslint linebreak-style: ["error", "windows"]*/
    "linebreak-style": 0,
    // 'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],

  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
