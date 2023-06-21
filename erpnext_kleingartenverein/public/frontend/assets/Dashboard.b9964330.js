import { _ as _export_sfc, d as defineComponent, D as Dropdown, A as Alert, B as Button, i as initFlowbite, b as createElementBlock, e as createVNode, F as Fragment, j as createBaseVNode, k as createTextVNode, r as resolveComponent, o as openBlock } from "./vendor.1d4b85a3.js";
import { N as NavbarComponent, F as FooterComponent } from "./Footer.2caaf4a0.js";
const _sfc_main = defineComponent({
  name: "dashboard",
  components: {
    NavbarComponent,
    FooterComponent,
    Dropdown,
    Alert,
    Button
  },
  methods: {
    doIt: function() {
      alert("doIt");
    }
  },
  mounted() {
    initFlowbite();
  }
});
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", { class: "p-4 sm:ml-64" }, [
  /* @__PURE__ */ createBaseVNode("div", {
    class: "p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300",
    role: "alert"
  }, [
    /* @__PURE__ */ createBaseVNode("span", { class: "font-medium" }, "Wilkommen!"),
    /* @__PURE__ */ createBaseVNode("br"),
    /* @__PURE__ */ createTextVNode(" Hier entsteht eine neue Startseite ")
  ]),
  /* @__PURE__ */ createBaseVNode("div", { class: "p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700" }, [
    /* @__PURE__ */ createBaseVNode("div", { class: "grid grid-cols-3 gap-4 mb-4" }, [
      /* @__PURE__ */ createBaseVNode("div", { class: "flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800" }, [
        /* @__PURE__ */ createBaseVNode("p", { class: "text-2xl text-gray-400 dark:text-gray-500" }, "+")
      ]),
      /* @__PURE__ */ createBaseVNode("div", { class: "flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800" }, [
        /* @__PURE__ */ createBaseVNode("p", { class: "text-2xl text-gray-400 dark:text-gray-500" }, "+")
      ]),
      /* @__PURE__ */ createBaseVNode("div", { class: "flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800" }, [
        /* @__PURE__ */ createBaseVNode("p", { class: "text-2xl text-gray-400 dark:text-gray-500" }, "+")
      ])
    ]),
    /* @__PURE__ */ createBaseVNode("div", { class: "flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800" }, [
      /* @__PURE__ */ createBaseVNode("p", { class: "text-2xl text-gray-400 dark:text-gray-500" }, "+")
    ]),
    /* @__PURE__ */ createBaseVNode("div", { class: "grid grid-cols-2 gap-4 mb-4" }, [
      /* @__PURE__ */ createBaseVNode("div", { class: "flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800" }, [
        /* @__PURE__ */ createBaseVNode("p", { class: "text-2xl text-gray-400 dark:text-gray-500" }, "+")
      ]),
      /* @__PURE__ */ createBaseVNode("div", { class: "flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800" }, [
        /* @__PURE__ */ createBaseVNode("p", { class: "text-2xl text-gray-400 dark:text-gray-500" }, "+")
      ]),
      /* @__PURE__ */ createBaseVNode("div", { class: "flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800" }, [
        /* @__PURE__ */ createBaseVNode("p", { class: "text-2xl text-gray-400 dark:text-gray-500" }, "+")
      ]),
      /* @__PURE__ */ createBaseVNode("div", { class: "flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800" }, [
        /* @__PURE__ */ createBaseVNode("p", { class: "text-2xl text-gray-400 dark:text-gray-500" }, "+")
      ])
    ]),
    /* @__PURE__ */ createBaseVNode("div", { class: "flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800" }, [
      /* @__PURE__ */ createBaseVNode("p", { class: "text-2xl text-gray-400 dark:text-gray-500" }, "+")
    ]),
    /* @__PURE__ */ createBaseVNode("div", { class: "grid grid-cols-2 gap-4" }, [
      /* @__PURE__ */ createBaseVNode("div", { class: "flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800" }, [
        /* @__PURE__ */ createBaseVNode("p", { class: "text-2xl text-gray-400 dark:text-gray-500" }, "+")
      ]),
      /* @__PURE__ */ createBaseVNode("div", { class: "flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800" }, [
        /* @__PURE__ */ createBaseVNode("p", { class: "text-2xl text-gray-400 dark:text-gray-500" }, "+")
      ]),
      /* @__PURE__ */ createBaseVNode("div", { class: "flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800" }, [
        /* @__PURE__ */ createBaseVNode("p", { class: "text-2xl text-gray-400 dark:text-gray-500" }, "+")
      ]),
      /* @__PURE__ */ createBaseVNode("div", { class: "flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800" }, [
        /* @__PURE__ */ createBaseVNode("p", { class: "text-2xl text-gray-400 dark:text-gray-500" }, "+")
      ])
    ])
  ])
], -1);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_NavbarComponent = resolveComponent("NavbarComponent");
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(_component_NavbarComponent),
    _hoisted_1
  ], 64);
}
var Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Dashboard as default };
