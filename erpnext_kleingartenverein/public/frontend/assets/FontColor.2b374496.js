import { _ as _export_sfc, P as Popover, T as Tooltip, q as createBlock, w as withCtx, r as resolveComponent, o as openBlock, v as renderSlot, x as normalizeProps, y as guardReactiveProps, j as createBaseVNode, b as createElementBlock, l as renderList, z as normalizeStyle, F as Fragment, n as normalizeClass } from "./vendor.1d4b85a3.js";
const _sfc_main = {
  name: "FontColor",
  props: ["editor"],
  components: { Popover, Tooltip },
  methods: {
    setBackgroundColor(color) {
      if (color.name != "Default") {
        this.editor.chain().focus().toggleHighlight({ color: color.hex }).run();
      } else {
        this.editor.chain().focus().unsetHighlight().run();
      }
    },
    setForegroundColor(color) {
      if (color.name != "Default") {
        this.editor.chain().focus().setColor(color.hex).run();
      } else {
        this.editor.chain().focus().unsetColor().run();
      }
    }
  },
  computed: {
    foregroundColors() {
      return [
        { name: "Default", hex: "#1F272E" },
        { name: "Yellow", hex: "#ca8a04" },
        { name: "Orange", hex: "#ea580c" },
        { name: "Red", hex: "#dc2626" },
        { name: "Green", hex: "#16a34a" },
        { name: "Blue", hex: "#1579D0" },
        { name: "Purple", hex: "#9333ea" },
        { name: "Pink", hex: "#db2777" }
      ];
    },
    backgroundColors() {
      return [
        { name: "Default", hex: null },
        { name: "Yellow", hex: "#fef9c3" },
        { name: "Orange", hex: "#ffedd5" },
        { name: "Red", hex: "#fee2e2" },
        { name: "Green", hex: "#dcfce7" },
        { name: "Blue", hex: "#D3E9FC" },
        { name: "Purple", hex: "#f3e8ff" },
        { name: "Pink", hex: "#fce7f3" }
      ];
    }
  }
};
const _hoisted_1 = { class: "p-2" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", { class: "text-sm text-gray-700" }, "Text Color", -1);
const _hoisted_3 = { class: "mt-1 grid grid-cols-8 gap-1" };
const _hoisted_4 = ["aria-label", "onClick"];
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("div", { class: "mt-2 text-sm text-gray-700" }, "Background Color", -1);
const _hoisted_6 = { class: "mt-1 grid grid-cols-8 gap-1" };
const _hoisted_7 = ["aria-label", "onClick"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Tooltip = resolveComponent("Tooltip");
  const _component_Popover = resolveComponent("Popover");
  return openBlock(), createBlock(_component_Popover, { transition: "default" }, {
    target: withCtx(({ togglePopover, isOpen }) => [
      renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps({ onClick: () => togglePopover(), isActive: isOpen })))
    ]),
    "body-main": withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        _hoisted_2,
        createBaseVNode("div", _hoisted_3, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($options.foregroundColors, (color) => {
            return openBlock(), createBlock(_component_Tooltip, {
              class: "flex",
              key: color.name,
              text: color.name
            }, {
              default: withCtx(() => [
                createBaseVNode("button", {
                  "aria-label": color.name,
                  class: "flex h-5 w-5 items-center justify-center rounded border text-base",
                  style: normalizeStyle({
                    color: color.hex
                  }),
                  onClick: ($event) => $options.setForegroundColor(color)
                }, " A ", 12, _hoisted_4)
              ]),
              _: 2
            }, 1032, ["text"]);
          }), 128))
        ]),
        _hoisted_5,
        createBaseVNode("div", _hoisted_6, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($options.backgroundColors, (color) => {
            return openBlock(), createBlock(_component_Tooltip, {
              class: "flex",
              key: color.name,
              text: color.name
            }, {
              default: withCtx(() => [
                createBaseVNode("button", {
                  "aria-label": color.name,
                  class: normalizeClass(["flex h-5 w-5 items-center justify-center rounded border text-base text-gray-900", !color.hex ? "border-gray-200" : "border-transparent"]),
                  style: normalizeStyle({
                    backgroundColor: color.hex
                  }),
                  onClick: ($event) => $options.setBackgroundColor(color)
                }, " A ", 14, _hoisted_7)
              ]),
              _: 2
            }, 1032, ["text"]);
          }), 128))
        ])
      ])
    ]),
    _: 3
  });
}
var FontColor = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { FontColor as default };
