module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 0,
    'prefer-const': 0,
    'no-useless-retur ': 0,
    "eol-last": 0,
    "eqeqeq":0,
    "no-useless-return": 0,
    "no-new": 0,
    "no-unused-components": 0
  }
}
