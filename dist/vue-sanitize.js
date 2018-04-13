(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global['vue-sanitize'] = factory());
}(this, (function () { 'use strict';

  var sanitizeHtml = require("sanitize-html");

  var VueSanitize = {
    install: function install(Vue, options) {
      var defaultOptions = options;

      Vue.prototype.$sanitize = function (dirty) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        return sanitizeHtml(dirty, opts || defaultOptions);
      };
    },


    defaults: sanitizeHtml.defaults
  };

  return VueSanitize;

})));
