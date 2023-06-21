import { _ as _export_sfc, B as Button, C as Dialog, G as fileToBase64, b as createElementBlock, v as renderSlot, x as normalizeProps, y as guardReactiveProps, e as createVNode, w as withCtx, F as Fragment, r as resolveComponent, o as openBlock, j as createBaseVNode, t as toDisplayString, p as createCommentVNode, k as createTextVNode } from "./vendor.1d4b85a3.js";
const _sfc_main = {
  name: "InsertImage",
  props: ["editor"],
  expose: ["openDialog"],
  data() {
    return {
      addImageDialog: { url: "", file: null, show: false }
    };
  },
  components: { Button, Dialog },
  methods: {
    openDialog() {
      this.addImageDialog.show = true;
    },
    onImageSelect(e) {
      let file = e.target.files[0];
      if (!file) {
        return;
      }
      this.addImageDialog.file = file;
      fileToBase64(file).then((base64) => {
        this.addImageDialog.url = base64;
      });
    },
    addImage(src) {
      this.editor.chain().focus().setImage({ src }).run();
      this.reset();
    },
    reset() {
      this.addImageDialog = this.$options.data().addImageDialog;
    }
  }
};
const _hoisted_1 = { class: "relative cursor-pointer rounded-lg bg-gray-100 py-1 focus-within:bg-gray-200 hover:bg-gray-200" };
const _hoisted_2 = { class: "absolute inset-0 select-none px-2 py-1 text-base" };
const _hoisted_3 = ["src"];
const _hoisted_4 = /* @__PURE__ */ createTextVNode(" Insert Image ");
const _hoisted_5 = /* @__PURE__ */ createTextVNode(" Cancel ");
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Button = resolveComponent("Button");
  const _component_Dialog = resolveComponent("Dialog");
  return openBlock(), createElementBlock(Fragment, null, [
    renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps({ onClick: $options.openDialog }))),
    createVNode(_component_Dialog, {
      options: { title: "Add Image" },
      modelValue: $data.addImageDialog.show,
      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.addImageDialog.show = $event),
      onAfterLeave: $options.reset
    }, {
      "body-content": withCtx(() => [
        createBaseVNode("label", _hoisted_1, [
          createBaseVNode("input", {
            type: "file",
            class: "w-full opacity-0",
            onChange: _cache[0] || (_cache[0] = (...args) => $options.onImageSelect && $options.onImageSelect(...args)),
            accept: "image/*"
          }, null, 32),
          createBaseVNode("span", _hoisted_2, toDisplayString($data.addImageDialog.file ? "Select another image" : "Select an image"), 1)
        ]),
        $data.addImageDialog.url ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: $data.addImageDialog.url,
          class: "mt-2 w-full rounded-lg"
        }, null, 8, _hoisted_3)) : createCommentVNode("", true)
      ]),
      actions: withCtx(() => [
        createVNode(_component_Button, {
          appearance: "primary",
          onClick: _cache[1] || (_cache[1] = ($event) => $options.addImage($data.addImageDialog.url))
        }, {
          default: withCtx(() => [
            _hoisted_4
          ]),
          _: 1
        }),
        createVNode(_component_Button, { onClick: $options.reset }, {
          default: withCtx(() => [
            _hoisted_5
          ]),
          _: 1
        }, 8, ["onClick"])
      ]),
      _: 1
    }, 8, ["modelValue", "onAfterLeave"])
  ], 64);
}
var InsertImage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { InsertImage as default };
