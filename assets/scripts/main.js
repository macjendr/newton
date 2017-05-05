/** import local dependencies */
import Router from './util/Router';
import common from './routes/common';

/**
 * Populate Router instance with DOM routes
 * @type {Router} routes - An instance of our router
 */
const routes = new Router({
  /** All pages */
  common,
  /** Home page */
  //home,
  /** About Us page, note the change from about-us to aboutUs. */
  //aboutUs,
});

/** Load Events */
function documentReady(fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

documentReady(function () {
    routes.loadEvents()
});