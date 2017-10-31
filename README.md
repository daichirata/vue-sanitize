# vue-sanitize

Whitelist-based HTML sanitizer (sanitize-html) for Vue.js apps.

<p align="center">
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square" alt="Software License" />
  </a>
  <a href="https://npmjs.org/package/vue-sanitize">
    <img src="https://img.shields.io/npm/v/vue-sanitize.svg?style=flat-square" alt="Packagist" />
  </a>
  <a href="https://github.com/daichirata/vue-sanitize/releases">
    <img src="https://img.shields.io/github/release/daichirata/vue-sanitize.svg?style=flat-square" alt="Latest Version" />
  </a>

  <a href="https://github.com/daichirata/vue-sanitize/issues">
    <img src="https://img.shields.io/github/issues/daichirata/vue-sanitize.svg?style=flat-square" alt="Issues" />
  </a>
</p>

## Note

We should always sanitize user input values on the server. Do sanitize with Vue only for necessary cases (e.g markdown preview).

## Install

```
npm install --save vue-sanitize
```

or

```
yarn add vue-sanitize
```

## Usage

Register the plugin

``` js
import VueSanitize from "vue-sanitize";
Vue.use(VueSanitize);
```

You can pass default options too:

``` js
defaultOptions = {
    allowedTags: ['a' 'b'],
    allowedAttributes: {
      'a': [ 'href' ]
    }
};
Vue.use(VueSanitize, defaultOptions);
```

Use it in your components:

``` js
<template>
  <div contenteditable="true" @paste="sanitize"></div>
</template>

<script>
export default {
  methods: {
    sanitize(event) {
      event.preventDefault();
      const html = this.$sanitize(event.clipboardData.getData('text/html'));
      //or
      //const html = this.$sanitize(
      //  event.clipboardData.getData('text/html'),
      //  {
      //    allowedTags: ['b', 'br']
      //  }
      //);
      document.execCommand('insertHTML', false, (html));
    }
  },
}
</script>
```

## API

### `Vue.use(VueSanitize[, defaultOptions])`

#### options

* Type: `Object`

This plugin is dependent on [sanitize-html](https://github.com/punkave/sanitize-html). For details, see here https://github.com/punkave/sanitize-html#readme.

### `this.$sanitize(diarty[, options])`

#### diarty

* Type: `String`
* Required: `true`

#### options

* Type: `Object`

If you don't pass an options, the default options will be used.

#### `VueSanitize.defaults`

Return `sanitizeHtml.defaults`.

## Change log

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Security

If you discover any security related issues, please email daichirata@gmail.com instead of using the issue tracker.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
