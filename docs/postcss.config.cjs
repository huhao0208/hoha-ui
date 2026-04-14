module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,
      unitPrecision: 5,
      propList: ['*', '!border*'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: true,
      minPixelValue: 2
    },
    autoprefixer: {
      overrideBrowserslist: [
        'iOS >= 10',
        'Android >= 5.0',
        'Chrome >= 49'
      ]
    }
  }
}
