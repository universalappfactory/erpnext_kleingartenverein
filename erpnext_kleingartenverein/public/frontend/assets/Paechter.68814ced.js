import { d as defineComponent, _ as _export_sfc, o as openBlock, b as createElementBlock, t as toDisplayString, j as createBaseVNode, p as createCommentVNode, r as resolveComponent, F as Fragment, l as renderList, q as createBlock, m as createStaticVNode, D as Dropdown, A as Alert, B as Button, u as createListResource, i as initFlowbite, e as createVNode } from "./vendor.1d4b85a3.js";
import { N as NavbarComponent, F as FooterComponent } from "./Footer.2caaf4a0.js";
const _sfc_main$3 = defineComponent({
  name: "tablehead",
  components: {},
  methods: {},
  props: {
    name: {
      type: Object,
      required: true
    }
  }
});
const _hoisted_1$3 = {
  scope: "col",
  class: "px-6 py-3"
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("th", _hoisted_1$3, toDisplayString(_ctx.name), 1);
}
var TableHead = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
const _sfc_main$2 = defineComponent({
  name: "tablehead",
  components: {},
  methods: {},
  props: {
    item: {
      type: Object,
      required: true
    },
    column: {
      type: Object,
      required: true
    }
  },
  data() {
    const mode = this.column.Mode.toString();
    return {
      mode
    };
  }
});
const _hoisted_1$2 = {
  key: 0,
  scope: "col",
  class: "px-6 py-3"
};
const _hoisted_2$2 = {
  key: 1,
  scope: "col",
  class: "px-6 py-3"
};
const _hoisted_3$1 = {
  scope: "row",
  class: "flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
};
const _hoisted_4$1 = { class: "pl-3" };
const _hoisted_5 = { class: "text-base font-semibold" };
const _hoisted_6$1 = { class: "font-normal text-gray-500" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.mode == "0" ? (openBlock(), createElementBlock("th", _hoisted_1$2, toDisplayString(_ctx.item[_ctx.column.PropertyNames[0]]), 1)) : _ctx.mode == "1" ? (openBlock(), createElementBlock("th", _hoisted_2$2, [
    createBaseVNode("th", _hoisted_3$1, [
      createBaseVNode("div", _hoisted_4$1, [
        createBaseVNode("div", _hoisted_5, toDisplayString(_ctx.item[_ctx.column.PropertyNames[0]]), 1),
        createBaseVNode("div", _hoisted_6$1, toDisplayString(_ctx.item[_ctx.column.PropertyNames[1]]), 1)
      ])
    ])
  ])) : createCommentVNode("", true);
}
var ColumnValue = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const _sfc_main$1 = defineComponent({
  name: "navbar",
  components: {
    TableHead,
    ColumnValue
  },
  methods: {
    executeLoadMore() {
      this.emit("loadMore");
    }
  },
  props: {
    items: {
      type: Object,
      required: true
    },
    columns: {
      type: Object,
      required: true
    },
    checkable: {
      type: Boolean,
      required: false
    },
    hasActionDropDown: {
      type: Object,
      required: false
    },
    hasNext: {
      type: Boolean,
      required: false
    }
  },
  emits: {
    loadMore: () => {
      return true;
    }
  },
  data() {
    const isLoading = false;
    return {
      isLoading
    };
  },
  mounted() {
    console.log("--------");
    console.log(this.items);
  },
  computed: {
    dataLoading() {
      return this.isLoading ? "visible" : "collapse";
    }
  }
});
const _hoisted_1$1 = { class: "relative overflow-x-auto shadow-md sm:rounded-lg" };
const _hoisted_2$1 = { class: "flex items-center justify-between py-4 bg-white dark:bg-gray-800" };
const _hoisted_3 = { key: 0 };
const _hoisted_4 = /* @__PURE__ */ createStaticVNode('<button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button"><span class="sr-only">Action button</span> Action <svg class="w-3 h-3 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div id="dropdownAction" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"><ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton"><li><a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reward</a></li><li><a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Promote</a></li><li><a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Activate account</a></li></ul><div class="py-1"><a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete User</a></div></div>', 2);
const _hoisted_6 = [
  _hoisted_4
];
const _hoisted_7 = { key: 1 };
const _hoisted_8 = /* @__PURE__ */ createStaticVNode('<label for="table-search" class="sr-only">Search</label><div class="relative"><div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg></div><input type="text" id="table-search-users" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users"></div>', 2);
const _hoisted_10 = { class: "w-full text-sm text-left text-gray-500 dark:text-gray-400" };
const _hoisted_11 = { class: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" };
const _hoisted_12 = {
  key: 0,
  scope: "col",
  class: "p-4"
};
const _hoisted_13 = /* @__PURE__ */ createBaseVNode("div", { class: "flex items-center" }, [
  /* @__PURE__ */ createBaseVNode("input", {
    id: "checkbox-all-search",
    type: "checkbox",
    class: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
  }),
  /* @__PURE__ */ createBaseVNode("label", {
    for: "checkbox-all-search",
    class: "sr-only"
  }, "checkbox")
], -1);
const _hoisted_14 = [
  _hoisted_13
];
const _hoisted_15 = {
  key: 0,
  class: "w-4 p-4"
};
const _hoisted_16 = /* @__PURE__ */ createBaseVNode("div", { class: "flex items-center" }, [
  /* @__PURE__ */ createBaseVNode("input", {
    id: "checkbox-table-search-1",
    type: "checkbox",
    class: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
  }),
  /* @__PURE__ */ createBaseVNode("label", {
    for: "checkbox-table-search-1",
    class: "sr-only"
  }, "checkbox")
], -1);
const _hoisted_17 = [
  _hoisted_16
];
const _hoisted_18 = {
  key: 0,
  class: "flex items-center justify-center px-4 py-4",
  "aria-label": "Table navigation"
};
const _hoisted_19 = /* @__PURE__ */ createBaseVNode("span", null, "Load more", -1);
const _hoisted_20 = [
  _hoisted_19
];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_TableHead = resolveComponent("TableHead");
  const _component_ColumnValue = resolveComponent("ColumnValue");
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createBaseVNode("div", _hoisted_2$1, [
      _ctx.hasActionDropDown ? (openBlock(), createElementBlock("div", _hoisted_3, _hoisted_6)) : (openBlock(), createElementBlock("div", _hoisted_7, "\xA0")),
      _hoisted_8
    ]),
    createBaseVNode("table", _hoisted_10, [
      createBaseVNode("thead", _hoisted_11, [
        createBaseVNode("tr", null, [
          _ctx.checkable ? (openBlock(), createElementBlock("th", _hoisted_12, _hoisted_14)) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.columns, (col) => {
            return openBlock(), createBlock(_component_TableHead, {
              key: col.DisplayTitle,
              name: col.DisplayTitle
            }, null, 8, ["name"]);
          }), 128))
        ])
      ]),
      createBaseVNode("tbody", null, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.items, (row) => {
          return openBlock(), createElementBlock("tr", {
            class: "bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600",
            key: row.name
          }, [
            _ctx.checkable ? (openBlock(), createElementBlock("td", _hoisted_15, _hoisted_17)) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.columns, (col) => {
              return openBlock(), createBlock(_component_ColumnValue, {
                column: col,
                item: row,
                key: col.DisplayTitle
              }, null, 8, ["column", "item"]);
            }), 128))
          ]);
        }), 128))
      ])
    ]),
    _ctx.hasNext ? (openBlock(), createElementBlock("div", _hoisted_18, [
      createBaseVNode("button", {
        type: "button",
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("loadMore")),
        class: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
      }, _hoisted_20)
    ])) : createCommentVNode("", true)
  ]);
}
var TableComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
var ColumnMode;
(function(ColumnMode2) {
  ColumnMode2[ColumnMode2["Default"] = 0] = "Default";
  ColumnMode2[ColumnMode2["DoubleEntry"] = 1] = "DoubleEntry";
})(ColumnMode || (ColumnMode = {}));
const _sfc_main = defineComponent({
  name: "paechter",
  components: {
    NavbarComponent,
    FooterComponent,
    Dropdown,
    Alert,
    Button,
    TableComponent
  },
  methods: {
    loadMoreData() {
      console.log("LoadMore");
      this.tenants.next();
    }
  },
  setup() {
    console.log("SETUP");
    let tenants = createListResource({
      doctype: "Customer",
      fields: ["*"],
      orderBy: "plot_link asc",
      start: 0,
      pageLength: 20
    });
    tenants.fetch();
    return {
      tenants
    };
  },
  data() {
    const tableColumns = [
      {
        DisplayTitle: "Name",
        PropertyNames: ["customer_name", "email_id"],
        Mode: ColumnMode.DoubleEntry
      },
      {
        DisplayTitle: "Contact",
        PropertyNames: ["email_id", "mobile_no"],
        Mode: ColumnMode.DoubleEntry
      },
      {
        DisplayTitle: "Garten",
        PropertyNames: ["plot_link"],
        Mode: ColumnMode.Default
      }
    ];
    return {
      tableColumns
    };
  },
  mounted() {
    initFlowbite();
  }
});
const _hoisted_1 = { class: "p-4 sm:ml-64" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", {
  class: "m-8 p-4 mb-4 text-lg text-yellow-800 rounded-lg bg-yellow-50",
  role: "alert"
}, [
  /* @__PURE__ */ createBaseVNode("span", { class: "font-semibold" }, "Info"),
  /* @__PURE__ */ createBaseVNode("p", null, " Hier entsteht eine neue Liste in der man einfach P\xE4chter und G\xE4rten angezeigt bekommt. "),
  /* @__PURE__ */ createBaseVNode("p", null, " Diese Liste wird dann auch auf dem Mobiltelefon ordentlich angezeigt. "),
  /* @__PURE__ */ createBaseVNode("br"),
  /* @__PURE__ */ createBaseVNode("span", { class: "font-semibold" }, "Achtung"),
  /* @__PURE__ */ createBaseVNode("p", null, " Ist noch ne Baustelle, funktioniert also noch nicht richtig. ")
], -1);
function _sfc_render(_ctx, _cache) {
  const _component_NavbarComponent = resolveComponent("NavbarComponent");
  const _component_TableComponent = resolveComponent("TableComponent");
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(_component_NavbarComponent),
    createBaseVNode("div", _hoisted_1, [
      _hoisted_2,
      createVNode(_component_TableComponent, {
        onLoadMore: _ctx.loadMoreData,
        items: _ctx.tenants.data,
        checkable: false,
        hasNext: _ctx.tenants.hasNextPage,
        columns: _ctx.tableColumns
      }, null, 8, ["onLoadMore", "items", "hasNext", "columns"])
    ])
  ], 64);
}
var Paechter = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Paechter as default };
