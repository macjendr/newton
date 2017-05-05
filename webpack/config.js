const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const uniq = require('lodash/uniq');
const merge = require('webpack-merge');

const isProduction = !!((argv.env && argv.env.production) || argv.p);
const rootPath = process.cwd();

/**
 * @namespace
 * @property {string}  copy                   - Including all files in assets/images directory 
 * @property {number}  proxyUrl               - URL for browsersync watch
 * @property {string}  paths                  - Collection of paths used by webpack
 * @property {object}  paths.root             - Root path to this grav theme
 * @property {string}  paths.assets           - Directory with work files
 * @property {string}  paths.dist             - Directory with processed and ready to use files
 * @property {object}  enabled                - Collection of rules for production/development
 * @property {boolean} enabled.sourceMaps     - Should webpack generate sourcemaps for CSS and JS
 * @property {boolean} enabled.optimize       - Specify if files should be minified
 * @property {boolean} enabled.cacheBusting   - If this is enabled name of generated files will be hashed on build to force browser to download them again
 * @property {boolean} enabled.watcher        - Should watcher for files be enabled
 * @property {object}  entry                  - Entry files that you modify - development JS and SCSS
 * @property {array}   entry.main             - Paths to considered files
 * @property {array}   watch                  - Paths of files that will be watched for changes by BrowserSync
 * @property {string}  publicPath             - Root path of theme
 * @property {string}  devUrl                 - Domain of your project that webpack points to
 * @property {string}  cacheBusting           - Pattern for cache busting files
 * @property {array}   browsers               - Settings for autoprefixer
 */
const config = {
  copy: 'images/**/*',
  proxyUrl: 'http://localhost:3000',
  paths: {
    root: rootPath,
    assets: path.join(rootPath, 'assets'),
    dist: path.join(rootPath, 'dist'),
  },
  enabled: {
    sourceMaps: !isProduction,
    optimize: isProduction,
    cacheBusting: isProduction,
    watcher: !!argv.watch,
  },
  entry: {
    main: [
      "./scripts/main.js",
      "./styles/main.scss"
    ]
  },
  watch: [
    "assets/scripts/**/*.js",
    "assets/styles/**/*.scss",
    "templates/**/*.twig"
  ],
  publicPath: "/user/themes/newton",
  devUrl: "http://domain.loc",
  cacheBusting: "[name]_[hash:8]",
  browsers: [
    "last 4 versions",
    "android 4",
    "opera 12"
  ]
};

config.watch.push(`${path.basename(config.paths.assets)}/${config.copy}`);
config.watch = uniq(config.watch);

module.exports = merge(config, {
  env: Object.assign({ production: isProduction, development: !isProduction }, argv.env),
  publicPath: `${config.publicPath}/${path.basename(config.paths.dist)}/`,
  manifest: {},
});