# vue-sanitize

HTML sanitizer plugin for [Vue 3](https://vuejs.org/), powered by [sanitize-html](https://github.com/apostrophecms/sanitize-html).

<p align="center">
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square" alt="Software License" />
  </a>
  <a href="https://npmjs.org/package/vue-sanitize">
    <img src="https://img.shields.io/npm/v/vue-sanitize.svg?style=flat-square" alt="npm" />
  </a>
  <a href="https://github.com/daichirata/vue-sanitize/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/daichirata/vue-sanitize/ci.yml?branch=master&style=flat-square" alt="CI" />
  </a>
  <a href="https://github.com/daichirata/vue-sanitize/issues">
    <img src="https://img.shields.io/github/issues/daichirata/vue-sanitize.svg?style=flat-square" alt="Issues" />
  </a>
</p>

> **Note**
> Always sanitize user input on the server. Use this plugin only when client-side sanitization is genuinely needed (e.g. live markdown previews).

## Install

```bash
npm install vue-sanitize
# or
yarn add vue-sanitize
# or
pnpm add vue-sanitize
```

## Usage

### Register the plugin

```ts
import { createApp } from "vue";
import VueSanitize from "vue-sanitize";
import App from "./App.vue";

createApp(App).use(VueSanitize).mount("#app");
```

You can pass default sanitize-html options:

```ts
import VueSanitize from "vue-sanitize";

const defaultOptions = {
  allowedTags: ["a", "b"],
  allowedAttributes: {
    a: ["href"],
  },
};

createApp(App).use(VueSanitize, defaultOptions).mount("#app");
```

### Options API (`this.$sanitize`)

```vue
<template>
  <div contenteditable="true" @paste="onPaste" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    onPaste(event: ClipboardEvent) {
      event.preventDefault();
      const html = this.$sanitize(event.clipboardData?.getData("text/html") ?? "");
      document.execCommand("insertHTML", false, html);
    },
  },
});
</script>
```

### Composition API (`useSanitize`)

```vue
<script setup lang="ts">
import { useSanitize } from "vue-sanitize";

const sanitize = useSanitize();

function onPaste(event: ClipboardEvent) {
  event.preventDefault();
  const html = sanitize(event.clipboardData?.getData("text/html") ?? "", {
    allowedTags: ["b", "br"],
  });
  document.execCommand("insertHTML", false, html);
}
</script>

<template>
  <div contenteditable="true" @paste="onPaste" />
</template>
```

## API

### `app.use(VueSanitize, defaultOptions?)`

Registers the plugin. `defaultOptions` are forwarded to `sanitize-html` and used whenever a call site does not pass its own options. See the [sanitize-html docs](https://github.com/apostrophecms/sanitize-html#default-options) for the full option reference.

### `this.$sanitize(dirty, options?)` / `useSanitize()(dirty, options?)`

| arg       | type     | required | description                                                              |
| --------- | -------- | -------- | ------------------------------------------------------------------------ |
| `dirty`   | `string` | yes      | The untrusted HTML to sanitize.                                          |
| `options` | `object` | no       | Per-call sanitize-html options. Falls back to the plugin defaults.       |

Returns the sanitized HTML string.

### `defaults`

Re-exports `sanitizeHtml.defaults` for inspection or extension.

```ts
import { defaults } from "vue-sanitize";
console.log(defaults.allowedTags);
```

## Security

If you discover a security issue, please email daichirata@gmail.com instead of opening a public issue.

## Contributing

1. Fork the repository
2. Create a feature branch
3. `npm install && npm run typecheck && npm test`
4. Commit and open a pull request

## License

The MIT License (MIT). See [LICENSE](LICENSE) for details.
