module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 0,
    'no-useless-return': 0,
    'no-trailing-spaces': 0,
    'key-spacing': [0, { beforeColon: false, afterColon: true }] // 对象字面量中冒号的前后空
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
