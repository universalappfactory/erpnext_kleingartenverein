import { _ as _export_sfc, B as Button, C as Dialog, H as FileUploader, b as createElementBlock, v as renderSlot, x as normalizeProps, y as guardReactiveProps, e as createVNode, w as withCtx, F as Fragment, r as resolveComponent, o as openBlock, j as createBaseVNode, k as createTextVNode, t as toDisplayString, q as createBlock, p as createCommentVNode } from "./vendor.1d4b85a3.js";
const _sfc_main = {
  name: "InsertImage",
  props: ["editor"],
  expose: ["openDialog"],
  data() {
    return {
      addVideoDialog: { url: "", file: null, show: false }
    };
  },
  components: { Button, Dialog, FileUploader },
  methods: {
    openDialog() {
      this.addVideoDialog.show = true;
    },
    onVideoSelect(e) {
      let file = e.target.files[0];
      if (!file) {
        return;
      }
      this.addVideoDialog.file = file;
    },
    addVideo(src) {
      this.editor.chain().focus().insertContent(`<video src="${src}"></video>`).run();
      this.reset();
    },
    reset() {
      this.addVideoDialog = this.$options.data().addVideoDialog;
    }
  }
};
const _hoisted_1 = { class: "flex items-center space-x-2" };
const _hoisted_2 = /* @__PURE__ */ createTextVNode(" Remove ");
const _hoisted_3 = ["src"];
const _hoisted_4 = /* @__PURE__ */ createTextVNode(" Insert Video ");
const _hoisted_5 = /* @__PURE__ */ createTextVNode("Cancel");
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Button = resolveComponent("Button");
  const _component_FileUploader = resolveComponent("FileUploader");
  const _component_Dialog = resolveComponent("Dialog");
  return openBlock(), createElementBlock(Fragment, null, [
    renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps({ onClick: $options.openDialog }))),
    createVNode(_component_Dialog, {
      options: { title: "Add Video" },
      modelValue: $data.addVideoDialog.show,
      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.addVideoDialog.show = $event),
      onAfterLeave: $options.reset
    }, {
      "body-content": withCtx(() => [
        createVNode(_component_FileUploader, {
          "file-types": "video/*",
          onSuccess: _cache[0] || (_cache[0] = (file) => $data.addVideoDialog.url = file.file_url)
        }, {
          default: withCtx(({ file, progress, uploading, openFileSelector }) => [
            createBaseVNode("div", _hoisted_1, [
              createVNode(_component_Button, { onClick: openFileSelector }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(uploading ? `Uploading ${progress}%` : $data.addVideoDialog.url ? "Change Video" : "Upload Video"), 1)
                ]),
                _: 2
              }, 1032, ["onClick"]),
              $data.addVideoDialog.url ? (openBlock(), createBlock(_component_Button, {
                key: 0,
                onClick: () => {
                  $data.addVideoDialog.url = null;
                  $data.addVideoDialog.file = null;
                }
              }, {
                default: withCtx(() => [
                  _hoisted_2
                ]),
                _: 2
              }, 1032, ["onClick"])) : createCommentVNode("", true)
            ])
          ]),
          _: 1
        }),
        $data.addVideoDialog.url ? (openBlock(), createElementBlock("video", {
          key: 0,
          src: $data.addVideoDialog.url,
          class: "mt-2 w-full rounded-lg",
          type: "video/mp4",
          controls: ""
        }, null, 8, _hoisted_3)) : createCommentVNode("", true)
      ]),
      actions: withCtx(() => [
        createVNode(_component_Button, {
          appearance: "primary",
          onClick: _cache[1] || (_cache[1] = ($event) => $options.addVideo($data.addVideoDialog.url))
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
var InsertVideo = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { InsertVideo as default };
