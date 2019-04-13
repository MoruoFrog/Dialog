module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    // '@vue/airbnb'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    'semi': [2, "never"],
    'arrow-parens': 0,
    'import/prefer-default-export': 0,
    'max-len': ['error', { code: 140 }],
    'no-param-reassign': 0,
    'prefer-promise-reject-errors': 0,
    'vue/no-side-effects-in-computed-properties': 0,
    'vue/no-unused-components': 0,
    'linebreak-style': 0,
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
