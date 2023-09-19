<template>
  <div
    class="w-full mb-4 border rounded-lg bg-gray-50"
    :class="hasError ? 'border-red-400 border-2' : 'border-gray-200'"
  >
    <div class="flex items-center justify-between px-3 py-2 border-b">
      <div class="flex flex-wrap items-center divide-gray-200 sm:divide-x">
        <div class="flex items-center space-x-1 sm:pr-4">
          <button
            type="button"
            class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
          >
            <i
              class="fa fa-eye"
              :class="preview ? 'text-black' : ''"
              @click="this.preview = !this.preview"
              aria-hidden="true"
            ></i>
            <span class="sr-only">Show Preview</span>
          </button>

          <Select
            :items="templates"
            label=""
            @itemSelected="(tpl) => this.$emit('templateSelected', tpl)"
            :placeholder="$t('new_letter.select_template')"
          ></Select>

          <a
            class="pl-4 font-medium text-blue-600 hover:underline"
            target="_blank"
            href="/app/member-letter-template"
            >{{ $t("new_letter.edit_templates") }}</a
          >
        </div>
      </div>
    </div>
    <div class="h-full rounded-b-lg">
      <template v-if="preview">
        <div class="preview-markdown p-2 min-h-[5vh]" v-html="renderedContent"></div>
      </template>
      <template v-else>
        <MdEditor
          :toolbars="toolbars"
          v-model="editorContent"
          language="en-US"
          class="preview-markdown min-h-[50vh] inline-block h-full w-full p-1.5 bg-gray-50 text-sm text-gray-800 border-0"
        />
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { PropType, defineComponent, ref, unref } from "vue";
import { SelectItem } from "../ts/buttons/select";
import { marked } from "marked";
import Select from "./buttons/Select.vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

export default defineComponent({
  name: "EditorComponent",

  props: {
    content: {
      type: String,
      default: () => "Label",
      required: true,
    },
    placeholder: {
      type: String,
      default: () => "Write some contents here",
    },
    templates: {
      type: Object as PropType<SelectItem[]>,
      required: true,
    },
    hasError: {
      type: Boolean,
      default: () => false,
    },
  },
  emits: {
    templateSelected: () => {
      return true;
    },
    contentChanged: () => {
      return true;
    },
  },
  components: {
    Select,
    MdEditor,
  },
  setup(props) {
    const preview = ref(false);
    const editorContent = ref(unref(props.content));

    const toolbars = [
      "bold",
      "underline",
      "italic",
      "-",
      "strikeThrough",
      "title",
      "sub",
      "sup",
      "quote",
      "unorderedList",
      "orderedList",
      "code",
      "link",
      "table",
      "pageFullscreen",
      "fullscreen",
      "preview",
    ];

    return {
      preview,
      editorContent,
      toolbars,
    };
  },
  methods: {},
  watch: {
    editorContent: function (val) {
      this.$emit("contentChanged", val);
    },
    content: function (val) {
      if (this.editorContent !== val) {
        this.editorContent = val;
      }
    },
  },
  computed: {
    renderedContent: function () {
      if (this.preview) {
        return marked.parse(this.editorContent);
      }
      return "";
    },
  },
});
</script>
