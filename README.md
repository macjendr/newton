# Newton Theme

![newton logo](https://raw.githubusercontent.com/macjendr/newton/master/thumbnail.jpg "Newton")

The **Newton** Theme is for [Grav CMS](http://github.com/getgrav/grav). It's a very simple boilerplate for developers that want to start from scratch with basic modern tools:

1. webpack with webpack-dev-server to hot reload changes in styles.
2. eslint with airbnb-base configuration to lint JS code and babel to parse modern ES6 to be compatible with latest browsers.
3. special partial in twig templates - `icons.html.twig` to store inline svg icons instead of font icons. You can prepare collections of those svgs with tools like [icomoon.io](https://icomoon.io/).
4. Autoprefixer for styles.
5. no jQuery dependency - many great plugins use ES6 now and I dropped another layer of abstraction to focus on vanilla JS, but feel free to add it in `templates/partials/base.html.twig` if you need it!
6. OPTIONAL UiKit integration - ths is the framework that can be fully imported or used with defined mixins (which means that generated CSS is empty until definitions of selectors with mixins appear in local .scss files)

Nothing fancy was made with templates or php files, so feel free to replace them with, for example, quark theme files and tweak them accordingly. 

## Setup

This theme only needs PHP 7.x.x (with modules that grav will notify you about during installation) and npm in order to work, thanks to [built-in PHP Webserver](https://learn.getgrav.org/16/basics/installation#running-grav-with-the-built-in-php-webserver-using-router-php)

Unpack theme to `/user/themes` directory of your Grav installation and run `npm install`. Then run `npm run dev` to init webpack dev server that will watch for changes in your scss/js and hot reload the first one after edit.

## This is a work in progress!

I created minimum of minimums to make hot reloading of styles possible and keep things small. I'm aware that it's not complete setup and things like handy production builds, minimizing images, choosing modern and minimal css framework etc. should be added to this project.
