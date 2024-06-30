module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:require-extensions/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic',
    'prettier',
  ],
  plugins: ['unicorn', '@typescript-eslint', 'require-extensions'],
  rules: {
    'arrow-body-style': 'error',
    'prefer-arrow-callback': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      { ts: 'never', cts: 'never', mts: 'never', tsx: 'never' },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['*.config.{js,cjs,mjs,ts,cts,mts}'],
        optionalDependencies: false,
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
      },
    ],
    'import/prefer-default-export': 'off',
    'linebreak-style': ['error', 'unix'],
    'unicorn/prefer-node-protocol': 'error',
    'no-param-reassign': ['error', { props: false }],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-confusing-void-expression': 'error',
    '@typescript-eslint/prefer-for-of': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ['*.ts', '*.cts', '*.mts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          { allowTypedFunctionExpressions: false },
        ],
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './src/frontend/tsconfig.json'],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.cts', '.mts', '.tsx'],
    },
    'import/resolver': {
      typescript: { alwaysTryTypes: true, project: ['.', './src/frontend'] },
    },
  },
}
