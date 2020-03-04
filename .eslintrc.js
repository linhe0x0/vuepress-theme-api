module.exports = {
  root: true,
  extends: ['plugin:vue/recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'vue/no-v-html': 'off',
  },
}
