/* empty css                */import { c as createRouter, a as createWebHistory, d as defineComponent, _ as _export_sfc, b as createElementBlock, e as createVNode, r as resolveComponent, o as openBlock, f as createApp, s as setConfig, g as resourcesPlugin, B as Button, h as frappeRequest } from "./vendor.1d4b85a3.js";
const scriptRel = "modulepreload";
const seen = {};
const base = "/assets/erpnext_kleingartenverein/frontend/";
const __vitePreload = function preload(baseModule, deps) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  return Promise.all(deps.map((dep) => {
    dep = `${base}${dep}`;
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", rej);
      });
    }
  })).then(() => baseModule());
};
const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => __vitePreload(() => import("./Dashboard.b9964330.js"), true ? ["assets/Dashboard.b9964330.js","assets/vendor.1d4b85a3.js","assets/vendor.7c581ac4.css","assets/Footer.2caaf4a0.js"] : void 0)
  },
  {
    path: "/paechter",
    name: "P\xE4chter",
    component: () => __vitePreload(() => import("./Paechter.68814ced.js"), true ? ["assets/Paechter.68814ced.js","assets/vendor.1d4b85a3.js","assets/vendor.7c581ac4.css","assets/Footer.2caaf4a0.js"] : void 0)
  }
];
let router = createRouter({
  history: createWebHistory("/dashboard"),
  routes
});
const _sfc_main = defineComponent({
  name: "App",
  setup(props, context) {
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createElementBlock("div", null, [
    createVNode(_component_router_view)
  ]);
}
var App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
let app = createApp(App);
setConfig("resourceFetcher", frappeRequest);
app.use(router);
app.use(resourcesPlugin);
app.component("Button", Button);
app.mount("#app");
