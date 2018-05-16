const webpack = require("webpack");
const modName = "CHARM-FETCH";

module.expors = {
    entry: './lib/index.js',
    out: {
        filename: `./dist/${modName}.js`,
        library: modName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        loaders: [
            { test: /\.ts?$/, loader: "babel?presets[]=es2015!ts" }
        ]
    }
}