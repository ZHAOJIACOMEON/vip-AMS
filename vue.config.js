const path = require('path')
const config = require('./build/config');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false,
  runtimeCompiler: true,
  lintOnSave: false,
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: 'localhost',
    port: config.dev.port,
    open: true,
    overlay: { warnings: false, errors: true },
    publicPath: '/',
    proxy: {
      '/': {
        target: 'http://10.4.83.175:8080/',
        pathRewrite: {
          '^/api': ''
        },
      },
    },
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
        poll: false
    },
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
    },
    disableHostCheck: true
  },
  // // publicPath: "./",
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@images', resolve('src/assets/images'))
      .set('@components', resolve('src/components'))
      .set('@assets', resolve('src/assets'))
      .set('@utils', resolve('src/utils'))
      .set('@api', resolve('src/api'))
      .set('@router', resolve('src/router'))
      // .set('@code', resolve('src/utils/code'))
      // .set('@graph', resolve('src/graph'))
      // .set('@view', resolve('src/view'))
  },
  configureWebpack: (config) => {
    config.externals = {
      // vue: 'Vue',
      // 'element-ui': 'ELEMENT',
      //'vue-router': 'VueRouter'
    }
  },
}
