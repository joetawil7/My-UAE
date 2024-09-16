module.exports = {
  env: {
    es2021: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: [
    'android/*',
    'ios/*',
    'src/assets/icons/icons.ts',
    'react-native.config.js',
    'metro.config.js',
  ],
  rules: {
    'dot-notation': ['error', { allowKeywords: true }],
    'no-implied-eval': 'error',
    'no-throw-literal': 'error',
    'no-return-await': 'error',
    'no-underscore-dangle': 0,
    '@typescript-eslint/dot-notation': 0,
    '@typescript-eslint/no-implied-eval': 0,
    '@typescript-eslint/no-throw-literal': 0,
    '@typescript-eslint/return-await': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-implicit-any-catch': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'no-nested-ternary': 0,
    'global-require': 0,
    'class-methods-use-this': 0,
    'no-plusplus': 0,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        jsxSingleQuote: true,
        endOfLine: 'auto',
      },
    ],
    'no-restricted-exports': 0,
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'func-style': ['error', 'expression'],
    'react/jsx-filename-extension': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'react/prop-types': 0,
    'react/destructuring-assignment': ['error', 'always'],
    'react-hooks/exhaustive-deps': [
      'error',
      {
        additionalHooks:
          '(useRecoilCallback|useCode|useDerivedValue|useAnimatedStyle)',
      },
    ],
    'import/prefer-default-export': 0,
    'import/no-anonymous-default-export': 'error',
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0,
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'no-void': [
      'error',
      {
        allowAsStatement: true,
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase', 'snake_case'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
  },
  globals: {
    __DEV__: true,
    fetch: false,
  },
};
