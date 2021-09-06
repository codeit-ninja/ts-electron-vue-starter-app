const webpack = require('webpack');

module.exports = {
    pluginOptions: {
        electronBuilder: {
            enableRemoteModule: true,
            nodeIntegration: true,
            webSecurity: false,
            mainProcessWatch: [
                'src/services/*',
                'src/classes/*',
            ]
        }
    },
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        },
        headers: { "Access-Control-Allow-Origin": "*" }
    },
    configureWebpack: {
        module: {
            rules: [
                {test: /\.ts$/, exclude: /node_modules/, loader: 'ts-loader'}
            ]
        }
    }
}