const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
    lintOnSave: true,
    productionSourceMap: process.env.NODE_ENV !== 'production',
    publicPath: "./",
    assetsDir: "static",
    //开发跨域
    devServer: {
        clientLogLevel: `none`,
        host: "0.0.0.0",
        port: 8090,
        open: false,
        proxy: {
            [process.env.VUE_APP_URL]: {//使用"/api"来代替"http://f.apiplus.c"
                target: process.env.VUE_APP_BASE_URL,//源地址
                changeOrigin: true,//改地址
                ws: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_URL]: ''//路由重写
                }
            }
        }
    },
    //css
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require("autoprefixer")({
                        overrideBrowserslist: ["last 15 versions"]
                    }),
                    require('postcss-plugin-px2rem')({
                        exclude: /(node_module)/,
                        rootValue: 192, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
                        mediaQuery: false,  //（布尔值）允许在媒体查询中转换px。
                    }),
                ]
            }
        }
    },
    //webpack 简单设置
    configureWebpack: config => {
        if (process.env.NODE_ENV === "production") {
            // 上线压缩去除console等信息
            config.devtool = "eval-source-map";
            config.plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        warnings: false,
                        compress: {

                            drop_console: true,
                            drop_debugger: false,
                            pure_funcs: ["console.log"] // 移除console
                        }
                    },
                    sourceMap: false,
                    parallel: true
                })
            );
        } else {
            config.devtool = 'source-map';
        }



    },
    //webpack 高级设置
    chainWebpack: config => {
        config.optimization.minimize(true);//进行代码压缩
        //图片压缩base64 (注意：压缩的图片使用require会报错)
        config.module.rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, {limit: 10000}))
    }
};