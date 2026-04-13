module.exports = {
  plugins: {
    // rem 适配 - 基于 750px 设计稿
    'postcss-pxtorem': {
      rootValue: 37.5, // 750 / 20 = 37.5
      unitPrecision: 5,
      propList: ['*', '!border*'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 2
    },
    // 自动添加浏览器前缀
    autoprefixer: {
      overrideBrowserslist: [
        'iOS >= 10',
        'Android >= 5.0',
        'Chrome >= 49',
        'Firefox >= 31',
        'Safari >= 10',
        'Edge >= 13'
      ]
    }
  }
}
