import { d as defineComponent, _ as _export_sfc, o as openBlock, b as createElementBlock, j as createBaseVNode, F as Fragment, l as renderList, n as normalizeClass, t as toDisplayString, k as createTextVNode, m as createStaticVNode } from "./vendor.1d4b85a3.js";
var NavigationMode;
(function(NavigationMode2) {
  NavigationMode2[NavigationMode2["Router"] = 0] = "Router";
  NavigationMode2[NavigationMode2["External"] = 1] = "External";
})(NavigationMode || (NavigationMode = {}));
const _sfc_main$1 = defineComponent({
  name: "navbar",
  components: {},
  methods: {
    navigateTo(item) {
      if (item.href) {
        this.$router.push(item.href);
      }
    },
    isRouter(item) {
      return item.mode == NavigationMode.Router;
    }
  },
  data() {
    const items = [
      {
        displayTitle: "Zum Desk",
        href: "/app/",
        icon: "fa-desktop",
        mode: NavigationMode.External
      },
      {
        displayTitle: "Zur Homepage",
        href: "/",
        icon: "fa-globe",
        mode: NavigationMode.External
      },
      {
        displayTitle: "Dashboard",
        href: "/dashboard",
        icon: "fa-home",
        mode: NavigationMode.External
      },
      {
        displayTitle: "P\xE4chter",
        href: "/paechter",
        icon: "fa-list",
        mode: NavigationMode.Router
      }
    ];
    return {
      items
    };
  },
  mounted() {
  }
});
const _hoisted_1$1 = {
  id: "default-sidebar",
  class: "fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0",
  "aria-label": "Sidebar"
};
const _hoisted_2$1 = { class: "h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800" };
const _hoisted_3$1 = { class: "space-y-2 font-medium" };
const _hoisted_4$1 = ["onClick"];
const _hoisted_5 = { class: "ml-3" };
const _hoisted_6$1 = ["href"];
const _hoisted_7$1 = { class: "ml-3" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("aside", _hoisted_1$1, [
    createBaseVNode("div", _hoisted_2$1, [
      createBaseVNode("ul", _hoisted_3$1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.items, (item) => {
          return openBlock(), createElementBlock("li", {
            key: item.displayTitle
          }, [
            _ctx.isRouter(item) ? (openBlock(), createElementBlock("a", {
              key: 0,
              onClick: ($event) => _ctx.navigateTo(item),
              class: "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            }, [
              createBaseVNode("i", {
                class: normalizeClass(["fa text-gray-500 text-6xl", item.icon])
              }, null, 2),
              createBaseVNode("span", _hoisted_5, toDisplayString(item.displayTitle), 1)
            ], 8, _hoisted_4$1)) : (openBlock(), createElementBlock("a", {
              key: 1,
              href: item.href,
              class: "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            }, [
              createBaseVNode("i", {
                class: normalizeClass(["fa text-gray-500 text-6xl", item.icon])
              }, null, 2),
              createBaseVNode("span", _hoisted_7$1, toDisplayString(item.displayTitle), 1)
            ], 8, _hoisted_6$1))
          ]);
        }), 128))
      ])
    ])
  ]);
}
var NavbarComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _sfc_main = {
  data() {
    return {
      date: new Date().getFullYear()
    };
  }
};
const _hoisted_1 = { class: "relative bg-gray-300 pt-8 pb-6" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", {
  class: "bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20",
  style: { "height": "80px" }
}, [
  /* @__PURE__ */ createBaseVNode("svg", {
    class: "absolute bottom-0 overflow-hidden",
    xmlns: "http://www.w3.org/2000/svg",
    preserveAspectRatio: "none",
    version: "1.1",
    viewBox: "0 0 2560 100",
    x: "0",
    y: "0"
  }, [
    /* @__PURE__ */ createBaseVNode("polygon", {
      class: "text-gray-300 fill-current",
      points: "2560 0 2560 100 0 100"
    })
  ])
], -1);
const _hoisted_3 = { class: "container mx-auto px-4" };
const _hoisted_4 = /* @__PURE__ */ createStaticVNode('<div class="flex flex-wrap"><div class="w-full lg:w-6/12 px-4"><h4 class="text-3xl font-semibold">Let&#39;s keep in touch!</h4><h5 class="text-lg mt-0 mb-2 text-gray-700"> Find us on any of these platforms, we respond 1-2 business days. </h5><div class="mt-6"><button class="bg-white text-blue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-3" type="button"><i class="flex fab fa-twitter"></i></button><button class="bg-white text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-3" type="button"><i class="flex fab fa-facebook-square"></i></button><button class="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-3" type="button"><i class="flex fab fa-dribbble"></i></button><button class="bg-white text-gray-900 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-3" type="button"><i class="flex fab fa-github"></i></button></div></div><div class="w-full lg:w-6/12 px-4"><div class="flex flex-wrap items-top mb-6"><div class="w-full lg:w-4/12 px-4 ml-auto"><span class="block uppercase text-gray-600 text-sm font-semibold mb-2">Useful Links</span><ul class="list-unstyled"><li><a class="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm" href="https://www.creative-tim.com/presentation">About Us</a></li><li><a class="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm" href="https://blog.creative-tim.com">Blog</a></li><li><a class="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm" href="https://www.github.com/creativetimofficial">Github</a></li><li><a class="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm" href="https://www.creative-tim.com/bootstrap-themes/free">Free Products</a></li></ul></div><div class="w-full lg:w-4/12 px-4"><span class="block uppercase text-gray-600 text-sm font-semibold mb-2">Other Resources</span><ul class="list-unstyled"><li><a class="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm" href="https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md">MIT License</a></li><li><a class="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm" href="https://creative-tim.com/terms">Terms &amp; Conditions</a></li><li><a class="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm" href="https://creative-tim.com/privacy">Privacy Policy</a></li><li><a class="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm" href="https://creative-tim.com/contact-us">Contact Us</a></li></ul></div></div></div></div><hr class="my-6 border-gray-400">', 2);
const _hoisted_6 = { class: "flex flex-wrap items-center md:justify-between justify-center" };
const _hoisted_7 = { class: "w-full md:w-4/12 px-4 mx-auto text-center" };
const _hoisted_8 = { class: "text-sm text-gray-600 font-semibold py-1" };
const _hoisted_9 = /* @__PURE__ */ createBaseVNode("a", {
  href: "https://www.creative-tim.com",
  class: "text-gray-600 hover:text-gray-900"
}, "Creative Tim", -1);
const _hoisted_10 = /* @__PURE__ */ createTextVNode(". ");
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("footer", _hoisted_1, [
    _hoisted_2,
    createBaseVNode("div", _hoisted_3, [
      _hoisted_4,
      createBaseVNode("div", _hoisted_6, [
        createBaseVNode("div", _hoisted_7, [
          createBaseVNode("div", _hoisted_8, [
            createTextVNode(" Copyright \xA9 " + toDisplayString($data.date) + " Tailwind Starter Kit by ", 1),
            _hoisted_9,
            _hoisted_10
          ])
        ])
      ])
    ])
  ]);
}
var FooterComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { FooterComponent as F, NavbarComponent as N };
