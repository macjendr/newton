const config = require('../config');
const autoprefixer = require('autoprefixer');
const sourceMapQueryStr = (config.enabled.sourceMaps) ? '+sourceMap' : '-sourceMap';
const assetsFilenames = (config.enabled.cacheBusting) ? config.cacheBusting : '[name]';
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    rules: () => {
        const stylesRules = {
            test: /\.css$/,
            include: config.paths.assets,
            loader: ExtractTextPlugin.extract({
                fallback: 'style',
                publicPath: '../',
                use: [
                    `css?${sourceMapQueryStr}`,
                    'postcss',
                ],
            }),
            test: /\.scss$/,
            include: config.paths.assets,
            loader: ExtractTextPlugin.extract({
                fallback: 'style',
                publicPath: '../',
                use: [
                    `css?${sourceMapQueryStr}`,
                    'postcss',
                    `resolve-url?${sourceMapQueryStr}`,
                    `sass?${sourceMapQueryStr}`,
                ],
            })
        }
        return stylesRules;
    },
    plugins: () => {
        const stylesPlugins = [
            new ExtractTextPlugin({
                filename: `styles/${assetsFilenames}.css`,
                allChunks: true,
                disable: (config.enabled.watcher),
            })//,
            // new webpack.LoaderOptionsPlugin({
            //     test: /\.s?css$/,
            //     options: {
            //         output: { path: config.paths.dist },
            //         context: config.paths.assets,
            //         postcss: [
            //             autoprefixer({ browsers: config.browsers }),
            //         ],
            //     },
            // }),
        ]
        return stylesPlugins;
    }
}