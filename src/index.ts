import sanitizeHtml, { type IOptions } from "sanitize-html";
import { inject, type App, type InjectionKey, type Plugin } from "vue";

export type SanitizeOptions = IOptions;
export type SanitizeFn = (dirty: string, options?: SanitizeOptions) => string;

export const VueSanitizeKey: InjectionKey<SanitizeFn> = Symbol("VueSanitize");

const VueSanitize: Plugin<[SanitizeOptions?]> = {
  install(app: App, defaultOptions?: SanitizeOptions) {
    const sanitize: SanitizeFn = (dirty, options) =>
      sanitizeHtml(dirty, options ?? defaultOptions);

    app.config.globalProperties.$sanitize = sanitize;
    app.provide(VueSanitizeKey, sanitize);
  },
};

export function useSanitize(): SanitizeFn {
  const sanitize = inject(VueSanitizeKey);
  if (!sanitize) {
    throw new Error(
      "[vue-sanitize] useSanitize() was called before the plugin was installed. Call app.use(VueSanitize) first.",
    );
  }
  return sanitize;
}

export const defaults = sanitizeHtml.defaults;

export default VueSanitize;

declare module "vue" {
  interface ComponentCustomProperties {
    $sanitize: SanitizeFn;
  }
}
