import { _ as _export_sfc, B as Button, I as Input, C as Dialog, b as createElementBlock, v as renderSlot, x as normalizeProps, y as guardReactiveProps, e as createVNode, w as withCtx, F as Fragment, r as resolveComponent, o as openBlock, E as withKeys, k as createTextVNode } from "./vendor.1d4b85a3.js";
const _sfc_main = {
  name: "InsertLink",
  props: ["editor"],
  components: { Button, Input, Dialog },
  data() {
    return {
      setLinkDialog: { url: "", show: false }
    };
  },
  methods: {
    openDialog() {
      let existingURL = this.editor.getAttributes("link").href;
      if (existingURL) {
        this.setLinkDialog.url = existingURL;
      }
      this.setLinkDialog.show = true;
    },
    setLink(url) {
      if (url === "") {
        this.editor.chain().focus().extendMarkRange("link").unsetLink().run();
      } else {
        this.editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
      }
      this.setLinkDialog.show = false;
      this.setLinkDialog.url = "";
    },
    reset() {
      this.setLinkDialog = this.$options.data().setLinkDialog;
    }
  }
};
const _hoisted_1 = /* @__PURE__ */ createTextVNode(" Save ");
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Input = resolveComponent("Input");
  const _component_Button = resolveComponent("Button");
  const _component_Dialog = resolveComponent("Dialog");
  return openBlock(), createElementBlock(Fragment, null, [
    renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps({ onClick: $options.openDialog }))),
    createVNode(_component_Dialog, {
      options: { title: "Set Link" },
      modelValue: $data.setLinkDialog.show,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.setLinkDialog.show = $event),
      onAfterLeave: $options.reset
    }, {
      "body-content": withCtx(() => [
        createVNode(_component_Input, {
          type: "text",
          label: "URL",
          modelValue: $data.setLinkDialog.url,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.setLinkDialog.url = $event),
          onKeydown: _cache[1] || (_cache[1] = withKeys((e) => $options.setLink(e.target.value), ["enter"]))
        }, null, 8, ["modelValue"])
      ]),
      actions: withCtx(() => [
        createVNode(_component_Button, {
          appearance: "primary",
          onClick: _cache[2] || (_cache[2] = ($event) => $options.setLink($data.setLinkDialog.url))
        }, {
          default: withCtx(() => [
            _hoisted_1
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue", "onAfterLeave"])
  ], 64);
}
var InsertLink = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { InsertLink as default };
