// const webpack = require("webpack");
const path = require("path");
const { name, version } = require('./package');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: path.join(__dirname, '/lib/index.ts'),
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: `${name}-${version}.js`,
        library: "CFetch",
        libraryExport: 'default',
        libraryTarget: 'var',
        umdNamedDefine: true
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        loaders: [
            { test: /\.ts?$/, loader: "ts-loader" },
           
        ]
    },
    plugins: [
        // new UglifyJSPlugin({
        //     include:''
        // })
    ]
}