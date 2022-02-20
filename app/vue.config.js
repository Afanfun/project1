// 配置文件修改后,需要重新运行(npm run serve)
module.exports = {
    // 是打包后是否让每个js文件都生成一个.map文件？true代表生成，false代表不生成。
    // 所以如果不需要定位问题，并且不想被看到源码，就把productionSourceMap 设置为false，可以减少包大小，也可以加密源码。
    productionSourceMap:false,
    // 关闭eslint
    lintOnSave:false,
    // webpack提供了这个功能 代理跨域
    devServer: {
        // true 则热更新，false 则手动刷新，默认值为 true
        inline: false,
        // development server port 8000
        port: 8000,
        //代理服务器解决跨域
        proxy: {
            //会把请求路径中的/api换为后面的代理服务器
            '/api': {
                //提供数据的服务器地址
                target: 'http://39.98.123.211',
                // 路径重写就不需要了,因为真实接口都带 /api
                // pathRewrite: { '^/api': '' },
            }
        },
    }
}