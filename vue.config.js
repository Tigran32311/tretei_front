const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // transpileDependencies: true,
  devServer: {
    port: 3001,
    // proxy: "http://127.0.0.1:8000/Api/",
    proxy: {
      "/api": {
        target: 'http://127.0.0.1:8000',
        pathRewrite: { '^/Api': '' },
      },
    }
  }
})
