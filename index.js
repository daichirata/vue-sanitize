const sanitizeHtml = require("sanitize-html");

const VueSanitize = {
  install(Vue, options) {
    const defaultOptions = options;

    Vue.prototype.$sanitize = (dirty, opts = null) =>
      sanitizeHtml(dirty, opts || defaultOptions);
  },

  defaults: sanitizeHtml.defaults
};

export default VueSanitize;
