const js = require('@eslint/js');

const nodeGlobals = {
  Buffer: 'readonly',
  __dirname: 'readonly',
  __filename: 'readonly',
  clearInterval: 'readonly',
  clearTimeout: 'readonly',
  console: 'readonly',
  exports: 'writable',
  global: 'readonly',
  module: 'writable',
  process: 'readonly',
  require: 'readonly',
  setInterval: 'readonly',
  setTimeout: 'readonly',
};

module.exports = [
  {
    ignores: [
      'coverage/**',
      'dist/**',
      'node_modules/**',
      'typescript-sample/**',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'commonjs',
      globals: nodeGlobals,
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    rules: {
      'no-console': 'error',
      'no-eval': 'error',
      'no-implicit-globals': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-prototype-builtins': 'off',
      'no-unused-vars': ['error', {
        args: 'none',
        caughtErrors: 'none',
        ignoreRestSiblings: true,
        vars: 'all',
      }],
      'require-atomic-updates': 'error',
    },
  },
  {
    files: ['src/dptlib/*.js'],
    rules: {
      'no-sparse-arrays': 'off',
    },
  },
  {
    files: ['manualtest/**/*.js', 'test/**/*.js'],
    rules: {
      'no-console': 'off',
      'no-new': 'off',
      'no-unused-vars': 'off',
    },
  },
];

