var q=Object.defineProperty;var E=Object.getOwnPropertySymbols;var z=Object.prototype.hasOwnProperty,U=Object.prototype.propertyIsEnumerable;var L=(e,t,o)=>t in e?q(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,M=(e,t)=>{for(var o in t||(t={}))z.call(t,o)&&L(e,o,t[o]);if(E)for(var o of E(t))U.call(t,o)&&L(e,o,t[o]);return e};var C=(e,t,o)=>new Promise((c,a)=>{var y=n=>{try{u(o.next(n))}catch(g){a(g)}},h=n=>{try{u(o.throw(n))}catch(g){a(g)}},u=n=>n.done?c(n.value):Promise.resolve(n.value).then(y,h);u((o=o.apply(e,t)).next())});import{F as O}from"./Footer.6dd90ff1.js";import{L as V}from"./ListComponent.8234c5c8.js";import{T as j,L as R,a as I,u as K,b as P}from"./tenants.6959e07d.js";import{h as B,D as $,_ as S,i as r,j as p,k as s,r as d,m,E as b,G as v,l as _,t as l,q as N,s as T,F as G,n as J,H as Q,f as W,I as X,J as Y,B as Z,K as ee}from"./vendor.93fb9eca.js";import{e as te,M as se}from"./Button.02938b3b.js";const oe=B({name:"Checkbox",props:{selected:{type:Boolean,default:()=>!1,required:!0}},setup(){return{checkbox:$()}},methods:{changeSelection(){this.$emit("checkChanged",this.checkbox.checked)}},emits:{checkChanged:()=>!0}}),ne={class:"grid items-center"},ae=["value","checked"];function re(e,t,o,c,a,y){return r(),p("div",ne,[s("input",{ref:"checkbox",type:"checkbox",value:e.selected,checked:e.selected,onClick:t[0]||(t[0]=(...h)=>e.changeSelection&&e.changeSelection(...h)),class:"h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"},null,8,ae)])}var le=S(oe,[["render",re]]);const ie=B({name:"TenantList",components:{TenantSearchBar:j,ListComponent:V,Checkbox:le,Badge:te,LinkButton:R},props:{showEditButton:{type:Boolean,default:()=>!1},showActions:{type:Boolean,default:()=>!1},selectable:{type:Boolean,default:()=>!1},filter:{type:String,default:()=>""},tenant:{type:Object,required:!0},tags:{type:Object,required:!1},showTags:{type:Boolean,required:!1}},emits:{loadMore:()=>!0,showDialog:()=>!0,selectedFilterChanged:()=>!0},mounted(){return C(this,null,function*(){yield this.tenant.fetch()})},methods:{executeSearch(e){this.tenant.search(e,this.filter)},getMobileHref(e){return`tel:${e}`},getMailHref(e){return`mailto:${e}`},showDialog(e){this.showEditButton&&this.$emit("showDialog",e)},checkChanged(e,t){t?this.tenant.select(e):this.tenant.unselect(e)},getUserTags(e){return e?e.split(",").filter(t=>t.trim()!=="null"&&t!==""):[]}}}),de={class:"overflow-y-scroll"},ce={class:"flex p-4"},he={class:"grid grid-cols-2 content-center"},ue=s("svg",{class:"w-10 h-10 text-gray-200","aria-hidden":"true",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[s("path",{"fill-rule":"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z","clip-rule":"evenodd"})],-1),ge={class:"grow p-2"},fe={class:"font-semibold"},pe={class:"font-semibold"},me={key:0,class:"grid grid-cols-1 sm:grid-cols-3 gap-4 content-center"},be=["href"],_e=s("i",{class:"fa fa-phone","aria-hidden":"true"},null,-1),ye=s("span",{class:"sr-only"},"Phonecall",-1),ve=[_e,ye],we=["href"],ke=s("i",{class:"fa fa-envelope","aria-hidden":"true"},null,-1),Ce=s("span",{class:"sr-only"},"EMail",-1),$e=[ke,Ce],Te=["onClick"],Fe=s("i",{class:"fa fa-edit","aria-hidden":"true"},null,-1),Be=s("span",{class:"sr-only"},"Edit",-1),Se=[Fe,Be],De={class:"p-4"},xe={class:"flex"},Ee=s("div",{class:"grow"},null,-1),Le={class:"flex"},Me=["href"],Ve=["href"];function je(e,t,o,c,a,y){var f;const h=d("TenantSearchBar"),u=d("Checkbox"),n=d("Badge"),g=d("ListComponent");return r(),p("div",null,[s("div",null,[m(h,{onSearch:e.executeSearch,onSelectedFilterChanged:t[0]||(t[0]=i=>this.$emit("selectedFilterChanged",i)),showFilters:e.showTags,filters:(f=e.tags)!=null?f:[],class:"mb-4"},null,8,["onSearch","showFilters","filters"])]),s("div",de,[m(g,{onLoadMore:e.tenant.loadMore,items:e.tenant.tenants,checkable:!1,headerList:["P\xE4chter"],hasNext:e.tenant.pageInfo.hasNext,onShowDetails:t[1]||(t[1]=i=>this.showDialog(i.name))},{item:b(({name:i,plot_link:D,email_id:x,mobile_no:w,customer_group:F,selected:A,_user_tags:H})=>[s("div",ce,[s("div",he,[e.selectable?(r(),v(u,{key:0,selected:A,onCheckChanged:k=>this.checkChanged(i,k)},null,8,["selected","onCheckChanged"])):_("",!0),ue]),s("div",ge,[s("div",fe,l(i),1),s("div",pe,l(D),1),s("div",null,l(x),1),s("div",null,l(w),1)]),e.showActions?(r(),p("div",me,[s("a",{href:e.getMobileHref(w),type:"button",class:N([w?"text-blue-700 hover:bg-blue-700 border border-blue-700  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 ":"border border-gray-300  bg-gray-100","disabled:opacity-75 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"])},ve,10,be),s("a",{href:e.getMailHref(x),type:"button",class:N([w?"text-blue-700 hover:bg-blue-700 border border-blue-700  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 ":"border border-gray-300  bg-gray-100","disabled:opacity-75 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"])},$e,10,we),e.showEditButton?(r(),p("button",{key:0,type:"button",onClick:k=>this.showDialog(i),class:"text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"},Se,8,Te)):_("",!0)])):_("",!0)]),s("div",De,[s("div",xe,[F==="Tenant"?(r(),v(n,{key:0,type:"green"},{default:b(()=>[T(l(e.$t("tenant_list.group_tenant")),1)]),_:1})):_("",!0),F==="Former Tenant"?(r(),v(n,{key:1,type:"yellow"},{default:b(()=>[T(l(e.$t("tenant_list.group_former_tenant")),1)]),_:1})):_("",!0),F==="Member"?(r(),v(n,{key:2,type:"dark",class:"dark:bg-gray-100"},{default:b(()=>[T(l(e.$t("tenant_list.group_member")),1)]),_:1})):_("",!0),(r(!0),p(G,null,J(e.getUserTags(H),(k,Oe)=>(r(),v(n,null,{default:b(()=>[T(l(k),1)]),_:2},1024))),256)),Ee,s("div",Le,[s("a",{class:"pl-4 font-medium text-blue-600 hover:underline",target:"_blank",href:`/service/counter?tenant=${i}&plot=${D}`},l(e.$t("tenant_list.counter_upload")),9,Me),s("a",{class:"pl-4 font-medium text-blue-600 hover:underline",target:"_blank",href:`/app/customer/${i}`},l(e.$t("tenant_list.open_in_desk")),9,Ve)])])])]),_:1},8,["onLoadMore","items","hasNext"])])])}var Ne=S(ie,[["render",je]]);function Ae(e){const t=Q([]),o=W({url:e.url});return{fetch:()=>C(this,null,function*(){try{t.splice(0,t.length),yield o.fetch(),t.push(...o.data.map(a=>e.mapFn?e.mapFn(a):M({},a)))}catch(a){console.error(a)}}),items:t}}const He=B({name:"paechter",components:{FooterComponent:O,Dropdown:X,Alert:Y,Button:Z,ListComponent:V,Dialog:ee,TenantEditor:I,TenantSearchBar:j,TenantList:Ne,Select:se},methods:{showDialog(e){this.selectedCustomer=e,this.bodyDialog=!0},closeEditor(){this.bodyDialog=!1},selectedTagChanged(e){this.selectedTag=e,this.tenant.search(e,this.selectedFilter)}},setup(){const e=K(),t=P(),o=$("");$("");const c=Ae({url:"/api/method/erpnext_kleingartenverein.api.get_tenant_tags"}),a=$("");return{selectedCustomer:o,editor:t,tenant:e,filters:[{value:"",name:"Kein Filter"},{value:"withTag",name:"Hat Schlagwort"},{value:"withoutTag",name:"Ohne Schlagwort"}],selectedFilter:a,tags:c}},mounted(){return C(this,null,function*(){yield this.tags.fetch()})},watch:{selectedFilter:function(e){this.selectedFilter!==""?this.tenant.search(this.selectedTag,this.selectedFilter):this.tenant.clear()}},data(){return{bodyDialog:!1}}}),qe={class:"p-4 sm:ml-64"},ze={class:"ml-2 mr-2 mb-4"};function Ue(e,t,o,c,a,y){const h=d("TenantEditor"),u=d("Dialog"),n=d("Select"),g=d("TenantList");return r(),p("div",qe,[m(u,{id:"tenant-dialog",modelValue:e.bodyDialog,"onUpdate:modelValue":t[0]||(t[0]=f=>e.bodyDialog=f),style:{"z-index":"300"}},{body:b(()=>[m(h,{class:"tenant-editor",item:e.selectedCustomer,onClose:e.closeEditor},null,8,["item","onClose"])]),_:1},8,["modelValue"]),s("div",ze,[m(n,{modelValue:e.selectedFilter,"onUpdate:modelValue":t[1]||(t[1]=f=>e.selectedFilter=f),placeholder:e.$t("tenant_list.select_placeholder"),options:e.filters,class:"rounded-lg border border-gray-300"},null,8,["modelValue","placeholder","options"])]),m(g,{onSelectedFilterChanged:e.selectedTagChanged,onShowDialog:e.showDialog,tags:e.tags.items,showTags:e.selectedFilter!=="",filter:e.selectedFilter,tenant:e.tenant,showEditButton:!0,showActions:!0},null,8,["onSelectedFilterChanged","onShowDialog","tags","showTags","filter","tenant"])])}var Qe=S(He,[["render",Ue]]);export{Qe as default};
