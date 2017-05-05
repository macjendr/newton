'use strict'; // eslint-disable-line

const webpack = require('webpack');
const qs = require('qs');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const CleanPlugin = require('clean-webpack-plugin');

const CopyGlobsPlugin = require('copy-globs-webpack-plugin');
const config = require('./config');

const styles = require('./partials/styles');
const assetsFilenames = (config.enabled.cacheBusting) ? config.cacheBusting : '[name]';
const ExtractTextPlugin = require('extract-text-webpack-plugin');


let webpackConfig = {
    context: config.paths.assets,
    entry: config.entry,
    devtool: (config.enabled.sourceMaps ? '#source-map' : undefined),
    output: {
        path: config.paths.dist,
        publicPath: config.publicPath,
        filename: `scripts/${assetsFilenames}.js`,
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js?$/,
                include: config.paths.assets,
                loader: 'eslint',
            },
            {
                test: /\.js$/,
                exclude: [/(node_modules|_components)(?![/|\\](bootstrap|foundation-sites))/],
                loader: 'buble',
                options: { objectAssign: 'Object.assign' },
            },
            styles.rules(),
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/,
                include: config.paths.assets,
                loader: `file?${qs.stringify({
                    name: `[path]${assetsFilenames}.[ext]`,
                })}`,
            },
            {
                test: /\.(ttf|eot)$/,
                include: config.paths.assets,
                loader: `file?${qs.stringify({
                    name: `[path]${assetsFilenames}.[ext]`,
                })}`,
            },
            {
                test: /\.woff2?$/,
                include: config.paths.assets,
                loader: `url?${qs.stringify({
                    limit: 10000,
                    mimetype: 'application/font-woff',
                    name: `[path]${assetsFilenames}.[ext]`,
                })}`,
            },
            {
                test: /\.(ttf|eot|woff2?|png|jpe?g|gif|svg)$/,
                include: /node_modules/,
                loader: 'file',
                options: {
                    name: `vendor/${config.cacheBusting}.[ext]`,
                },
            },
        ],
    },
    resolve: {
        modules: [
            config.paths.assets,
            'node_modules',
        ],
        enforceExtension: false,
    },
    resolveLoader: {
        moduleExtensions: ['-loader'],
    },
    externals: {
        jquery: 'jQuery',
    },
    plugins: [
        new CleanPlugin([config.paths.dist], {
            root: config.paths.root,
            verbose: false,
        }),
        new CopyGlobsPlugin({
            pattern: config.copy,
            output: `[path]${assetsFilenames}.[ext]`,
            manifest: config.manifest,
        }),
        new ExtractTextPlugin({
            filename: `styles/${assetsFilenames}.css`,
            allChunks: true,
            disable: (config.enabled.watcher),
        }),
        new webpack.LoaderOptionsPlugin({
            test: /\.s?css$/,
            options: {
                output: { path: config.paths.dist },
                context: config.paths.assets,
                postcss: [
                    autoprefixer({ browsers: config.browsers }),
                ],
            },
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: config.enabled.optimize,
            debug: config.enabled.watcher,
            stats: { colors: true },
        }),
        new webpack.LoaderOptionsPlugin({
            test: /\.js$/,
            options: {
                eslint: { failOnWarning: false, failOnError: true },
            },
        }),
    ],
};

/* eslint-disable global-require */ /** Let's only load dependencies as needed */

if (config.enabled.optimize) {
    webpackConfig = merge(webpackConfig, require('./webpack.config.optimize'));
}

if (config.env.production) {
    webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());
}

if (config.enabled.cacheBusting) {
    const WebpackAssetsManifest = require('webpack-assets-manifest');

    webpackConfig.plugins.push(
        new WebpackAssetsManifest({
            output: 'assets.json',
            space: 2,
            writeToDisk: false,
            assets: config.manifest,
            replacer: require('./partials/assetManifestsFormatter'),
        })
    );
}

if (config.enabled.watcher) {
    webpackConfig.entry = require('./partials/addHotMiddleware')(webpackConfig.entry);
    webpackConfig = merge(webpackConfig, require('./webpack.config.watch'));
}

module.exports = webpackConfig;