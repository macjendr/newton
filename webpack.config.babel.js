
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const srcPath = path.resolve(__dirname, 'assets')
const distPath = path.resolve(__dirname, 'dist')
const rootPath = process.cwd();

const config = {
  paths: {
    root: rootPath,
    assets: path.join(rootPath, 'assets'),
    dist: path.join(rootPath, 'dist'),
  },
  enabled: {
    sourceMaps: true,
    optimize: false,
    cacheBusting: false,
    watcher: true,
  },
};

module.exports = {
  entry: {
    main: [
      path.resolve(srcPath, 'js/main.js'),
      path.resolve(srcPath, 'scss/main.scss'),
    ]
  },
  context: srcPath,
  output: {
    path: distPath,
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json',
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    writeToDisk: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          'eslint-loader',
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        include: config.paths.assets,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader', options: {
              config: { path: __dirname, ctx: config },
              sourceMap: config.enabled.sourceMaps,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.twig$/,
        use: {
          loader: 'raw-loader',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
}

//"dev": "webpack-dev-server --config webpack.config.babel.js --mode development --port 8000 --hot --disable-host-check --reload",
