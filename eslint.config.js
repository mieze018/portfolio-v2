import typescriptEslintParser from '@typescript-eslint/parser'
import js from '@eslint/js'
import tsEslint from 'typescript-eslint'
// import importPlugin from 'eslint-plugin-import'
import * as cssPlugin from 'eslint-plugin-css'
import unusedImports from 'eslint-plugin-unused-imports'
import reactPlugin from 'eslint-plugin-react'
import hooksPlugin from 'eslint-plugin-react-hooks'
import nextPlugin from '@next/eslint-plugin-next'
import eslintConfigPrettier from 'eslint-config-prettier'
// import storybook from 'eslint-plugin-storybook' // v9でバグってる？

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      parser: typescriptEslintParser,
    },
  },
  js.configs.recommended,
  // importPlugin.flatConfigs.recommended,
  ...tsEslint.configs.recommended,
  cssPlugin.configs['flat/standard'],
  // ...storybook.configs['flat/recommended'], //まだ実装されていない
  eslintConfigPrettier,
  {
    files: ['**/*.{mjs,ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
      '@next/next': nextPlugin,
      'unused-imports': unusedImports,
    },
    settings: {
      react: {
        version: 'detect',
        runtime: 'automatic',
      },
    },
    rules: {
      'react/no-unknown-property': [
        'error',
        {
          ignore: ['css'],
        },
      ],
      // 'import/order': [
      //   'error',
      //   {
      //     groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
      //     alphabetize: {
      //       order: 'asc',
      //     },
      //     'newlines-between': 'always',
      //   },
      // ],
      // 'import/no-duplicates': 'error',
      // 'import/first': 'error',
      // 'import/newline-after-import': 'error',
      'no-multi-spaces': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      // 未使用のインポートを自動で削除したい
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.{js,cjs,}'],
  },
]
