/* eslint-disable global-require */

// polyfills and vendors

if (!window._babelPolyfill) {
  require('babel-polyfill');
}
// a polyfill fills in anything the browser is missing. Looks at browser and takes new JS and converts it into code the browser can render)
