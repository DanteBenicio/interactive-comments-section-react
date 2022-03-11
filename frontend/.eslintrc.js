module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-undef': 'off',
    'no-case-declarations': 'off',
    'no-unused-vars': 'off',
    'no-console': 'off',
    'arrow-body-style': 'off',
    'no-param-reassign': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/no-unstable-nested-components': 'off',
    'react/no-namespace': 'off',
    'react/prefer-exact-props': 'off',
    'react/no-arrow-function-lifecycle': 'off',
    'react/no-invalid-html-attribute': 'off',
    'react/no-unused-class-component-methods': 'off',
    'import/no-import-module-exports': 'off',
    'import/no-relative-packages': 'off',
    'import/no-mutable-exports': 'off',
    'func-names': 'off',
    'react/function-component-definition': 'off',
    'dot-notation': 'off',
    'react/require-default-props': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/default-props-match-prop-types': 'off',
    'react/no-danger-with-children': 'off',
    'react/no-danger': 'off',
    'react/jsx-filename-extension': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'arrow-parens': 'off',
  },
};