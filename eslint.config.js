import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [{
    ignores: ['dist']
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    extends: [
      'plugin:react/recommended',
      'plugin:react/jsx-runtime', // เพิ่มในที่นี้
    ],
    rules: {
      ...js.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', {
        varsIgnorePattern: '^[A-Z_]'
      }],
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true
        },
      ],
    },
  },
]
