
module.exports = {
  devServer: {
    port: 9527,
    disableHostCheck: true,
    proxy: {
      // '/demoApi': {
      //   target: 'http://127.0.0.1:8888',
      //   changeOrigin: true,
      //   ws: true,
      //   pathRewrite: {
      //     '^/demoApi': '/demoApi'
      //   }
      // },
      '/api': {
        target: 'http://127.0.0.1:8081',
        changeOrigin: true,
        ws: true
      }

    }
  },
  // publicPath: '/cone/',
  productionSourceMap: false
}
