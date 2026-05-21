import { describe, expect, it } from "vitest";
import { createApp, defineComponent, h } from "vue";
import VueSanitize, { defaults, useSanitize } from "../src/index";

describe("vue-sanitize", () => {
  it("exposes sanitize-html defaults", () => {
    expect(defaults).toBeDefined();
    expect(Array.isArray(defaults.allowedTags)).toBe(true);
  });

  it("registers $sanitize on globalProperties", () => {
    const app = createApp({ render: () => null });
    app.use(VueSanitize);

    const sanitize = app.config.globalProperties.$sanitize;
    expect(typeof sanitize).toBe("function");

    const result = sanitize("<script>alert(1)</script><b>hi</b>");
    expect(result).not.toContain("<script>");
    expect(result).toContain("<b>hi</b>");
  });

  it("uses default options passed to app.use()", () => {
    const app = createApp({ render: () => null });
    app.use(VueSanitize, { allowedTags: ["b"] });

    const result = app.config.globalProperties.$sanitize("<b>x</b><i>y</i>");
    expect(result).toBe("<b>x</b>y");
  });

  it("per-call options override defaults", () => {
    const app = createApp({ render: () => null });
    app.use(VueSanitize, { allowedTags: ["b"] });

    const result = app.config.globalProperties.$sanitize("<i>y</i>", {
      allowedTags: ["i"],
    });
    expect(result).toBe("<i>y</i>");
  });

  it("useSanitize() returns the sanitize function inside setup", () => {
    let captured = "";

    const Child = defineComponent({
      setup() {
        const sanitize = useSanitize();
        captured = sanitize("<script>x</script><b>ok</b>");
        return () => h("div", captured);
      },
    });

    const app = createApp(Child);
    app.use(VueSanitize);
    app.mount(document.createElement("div"));

    expect(captured).not.toContain("<script>");
    expect(captured).toContain("<b>ok</b>");
  });

  it("useSanitize() throws when the plugin is not installed", () => {
    const Child = defineComponent({
      setup() {
        useSanitize();
        return () => null;
      },
    });

    expect(() => createApp(Child).mount(document.createElement("div"))).toThrow(
      /vue-sanitize/,
    );
  });
});
