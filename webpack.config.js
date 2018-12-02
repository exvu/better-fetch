// const webpack = require("webpack");
const path = require("path");
const { name, version } = require('./package');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: path.join(__dirname, '/lib/index.ts'),
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: `charm-api.js`,
        library: "CApi",
        libraryTarget: 'window',
        umdNamedDefine: true,
        libraryExport: 'default'
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        loaders: [
            {
                test: /\.ts?$/,
                loader: "ts-loader",
                // options: {
                //     compilerOptions: {
                //         declaration: false,
                //     }
                // }
            },
        ]
    },
    plugins: [
        // new UglifyJSPlugin({

        // })
    ]
}