const path = require('path');
const webpack = require('webpack');

function resolve (dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: './',
    productionSourceMap: false,
    devServer: {
        port: 8080,
    },
    chainWebpack: config => {
        config
        // 设置别名
        config.resolve.alias
            .set('@', resolve('src'))
        ;
    },
};

