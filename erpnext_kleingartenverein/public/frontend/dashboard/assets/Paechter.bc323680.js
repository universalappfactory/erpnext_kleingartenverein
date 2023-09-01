import{b as $,_ as y,o as d,e as p,m as t,F as A,C as V,D as k,t as h,n as C,r as _,f as u,E as U,H as T,w as O,x as H,I as E,J as q,K as G,L as J,M as Q,v as W,N as X,O as Y,P as ee,B as te,Q as se,i as ae,R}from"./vendor.0d1c2a14.js";import{N as oe}from"./Navbar.0bb1bc79.js";import{F as ne,L as le,C as F}from"./table.9955cb4f.js";import"./main.2e076ff9.js";/* empty css              */const re=$({name:"TabComponent",components:{},methods:{selectItem(e){for(const s of this.items)s.selected=!1;e.selected=!0,this.$emit("itemSelected",e)}},emits:{itemSelected:e=>!0},props:{items:{type:Array,default:()=>[]}},data(){}}),ie={class:"mb-4 border-b border-gray-200 dark:border-gray-700"},de={class:"flex flex-wrap -mb-px text-sm font-medium text-center",role:"tablist"},ue={class:"mr-2"},ce=["onClick"];function pe(e,s,b,r,a,g){return d(),p("div",ie,[t("ul",de,[(d(!0),p(A,null,V(e.items,(o,m)=>(d(),p("li",ue,[t("button",{class:k(["inline-block p-4 rounded-t-lg",o.selected?"border-b-2 border-blue-400":""]),type:"button",role:"tab",onClick:c=>e.selectItem(o)},h(e.$t(o.description)),11,ce)]))),256))])])}var me=y(re,[["render",pe]]),j;(function(e){e.Default="Default",e.EMail="EMail",e.Phone="Phone"})(j||(j={}));const be=$({name:"InputField",props:{value:{type:Object,default:()=>""},disabled:{type:Boolean,default:()=>!1},label:{type:String,default:()=>"Label"},type:{type:String,default:()=>"Default"}},methods:{getMobileHref(e){return`tel:${e}`},getMailHref(e){return`mailto:${e}`},isPhone(){return this.type===j.Phone},isMail(){return this.type===j.EMail}},data(){}}),he={for:"first_name",class:"block text-sm pb-1 pl-.5 font-medium text-gray-900 dark:text-white"},fe={class:"flex"},ge=["disabled","placeholder","value"],_e=["href"],ve=t("i",{class:"fa fa-phone","aria-hidden":"true"},null,-1),$e={class:"sr-only"},ye=["href"],we=t("i",{class:"fa fa-envelope","aria-hidden":"true"},null,-1),ke={class:"sr-only"};function Ce(e,s,b,r,a,g){return d(),p("div",null,[t("label",he,h(e.label),1),t("div",fe,[t("input",{type:"text",disabled:e.disabled,class:"grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.label,value:e.value,required:""},null,8,ge),e.isPhone()?(d(),p("a",{key:0,href:e.getMailHref(e.value),type:"button",class:k([e.value?"text-blue-700 hover:bg-blue-700 border  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 ":"border border-gray-300  bg-gray-100","ml-2 grow-0 disabled:opacity-75 font-medium text-sm p-2.5 text-center inline-flex items-center"])},[ve,t("span",$e,h(e.label),1)],10,_e)):C("",!0),e.isMail()?(d(),p("a",{key:1,href:e.getMailHref(e.value),type:"button",class:k([e.value?"text-blue-700 hover:bg-blue-700 border  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 ":"border border-gray-300  bg-gray-100","ml-2 grow-0 disabled:opacity-75 font-medium text-sm p-2.5 text-center inline-flex items-center"])},[we,t("span",ke,h(e.label),1)],10,ye)):C("",!0)])])}var Z=y(be,[["render",Ce]]);const De=$({name:"TenantBaseData",components:{InputField:Z},methods:{selectItem(e){for(const s of this.items)s.selected=!1;e.selected=!0,this.$emit("itemSelected",e)}},emits:{itemSelected:e=>!0},props:{data:{type:Object,default:()=>[]}},data(){return{inputDisabled:!0}}}),xe={class:"overflow-scroll h-[100%]"},Te={class:"border-b-2"},Me={class:"grid gap-6 mb-6 md:grid-cols-2 mt-3"},Be={class:"grid gap-6 mb-6 md:grid-cols-1 mt-2"},Se={class:"border-t-4 pt-2"},Ne={class:"grid gap-6 mb-6 md:grid-cols-1 mt-3"},Le={class:"grid gap-3 mb-6 md:grid-cols-2"};function Pe(e,s,b,r,a,g){var m,c,f,i,n,l,w,v,D,x,M,B,S,N,L,P,I,z;const o=_("InputField");return d(),p("div",xe,[t("p",Te,h(e.$t("tenant_editor.contact_data")),1),t("div",Me,[u(o,{value:(c=(m=e.data)==null?void 0:m.contact)==null?void 0:c.first_name,disabled:e.inputDisabled,label:e.$t("tenant_editor.first_name")},null,8,["value","disabled","label"]),u(o,{value:(i=(f=e.data)==null?void 0:f.contact)==null?void 0:i.last_name,disabled:e.inputDisabled,label:e.$t("tenant_editor.last_name")},null,8,["value","disabled","label"])]),t("div",Be,[u(o,{value:(l=(n=e.data)==null?void 0:n.contact)==null?void 0:l.email_id,disabled:e.inputDisabled,label:e.$t("tenant_editor.email"),type:"EMail"},null,8,["value","disabled","label"]),u(o,{value:(v=(w=e.data)==null?void 0:w.contact)==null?void 0:v.mobile_no,disabled:e.inputDisabled,label:e.$t("tenant_editor.mobile_no"),type:"Phone"},null,8,["value","disabled","label"]),u(o,{value:(x=(D=e.data)==null?void 0:D.contact)==null?void 0:x.phone,disabled:e.inputDisabled,label:e.$t("tenant_editor.phone")},null,8,["value","disabled","label"])]),t("p",Se,h(e.$t("tenant_editor.address_data")),1),t("div",Ne,[u(o,{value:(B=(M=e.data)==null?void 0:M.address)==null?void 0:B.address_line1,disabled:e.inputDisabled,label:e.$t("tenant_editor.street")},null,8,["value","disabled","label"]),u(o,{value:(N=(S=e.data)==null?void 0:S.address)==null?void 0:N.address_line2,disabled:e.inputDisabled,label:e.$t("tenant_editor.address_line_2")},null,8,["value","disabled","label"])]),t("div",Le,[u(o,{value:(P=(L=e.data)==null?void 0:L.address)==null?void 0:P.pincode,disabled:e.inputDisabled,label:e.$t("tenant_editor.zip")},null,8,["value","disabled","label"]),u(o,{value:(z=(I=e.data)==null?void 0:I.address)==null?void 0:z.city,disabled:e.inputDisabled,label:e.$t("tenant_editor.city")},null,8,["value","disabled","label"])])])}var Ee=y(De,[["render",Pe]]);const Ie=$({name:"DownloadButton",props:{url:{type:String,required:!0},label:{type:String,required:!1}},emits:{ok:()=>!0}}),je=["href"],Ae=t("svg",{"aria-hidden":"true",class:"w-5 h-5 mr-2 fill-current",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[t("path",{"fill-rule":"evenodd",d:"M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z","clip-rule":"evenodd"})],-1);function He(e,s,b,r,a,g){return d(),p("div",null,[t("a",{type:"button",href:e.url,class:"px-3 py-2 text-sm font-medium text-center inline-flex items-center text-gray-500 hover:opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"},[Ae,U(" "+h(e.label),1)],8,je)])}var Fe=y(Ie,[["render",He]]);const ze=$({name:"AttachmentList",components:{DownloadButton:Fe},props:{data:{type:Object,default:()=>[]}},methods:{getMobileHref(e){return`tel:${e}`},getMailHref(e){return`mailto:${e}`}},data(){}}),Ve={class:"divide-y divide-gray-200 dark:divide-gray-700 pl-4 pr-4"},Oe={class:"pb-3 sm:pb-4 pt-3 sm:pt-4"},qe={class:"flex items-center space-x-4"},Re={class:"flex-1 min-w-0 overflow-hidden text-ellipsis"},Ze={class:"inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"};function Ke(e,s,b,r,a,g){const o=_("DownloadButton");return d(),p("ul",Ve,[(d(!0),p(A,null,V(e.data,(m,c)=>(d(),p("li",Oe,[t("div",qe,[t("div",Re,h(m.description),1),t("div",Ze,[u(o,{url:m.url},null,8,["url"])])])]))),256))])}var Ue=y(ze,[["render",Ke]]);const Ge=$({name:"TenantPlotData",components:{InputField:Z},methods:{selectItem(e){for(const s of this.items)s.selected=!1;e.selected=!0,this.$emit("itemSelected",e)}},emits:{itemSelected:e=>!0},props:{data:{type:Object,default:()=>[]}},data(){return{inputDisabled:!0}}}),Je={class:"overflow-scroll h-[100%]"},Qe={class:"grid gap-6 mb-6 md:grid-cols-1 mt-3"};function We(e,s,b,r,a,g){var m,c;const o=_("InputField");return d(),p("div",Je,[t("div",Qe,[u(o,{value:(m=e.data)==null?void 0:m.plot_number,disabled:e.inputDisabled,label:e.$t("tenant_editor.plot_number")},null,8,["value","disabled","label"]),u(o,{value:(c=e.data)==null?void 0:c.plot_size_sqm,disabled:e.inputDisabled,label:e.$t("tenant_editor.plot_size_sqm")},null,8,["value","disabled","label"])])])}var Xe=y(Ge,[["render",We]]);const Ye=$({name:"Button",props:{disabled:{type:Boolean,default:()=>!1},label:{type:String,default:()=>"Label"}},emits:{ok:()=>!0}}),et=["disabled"];function tt(e,s,b,r,a,g){return d(),p("div",null,[t("button",{type:"button",disabled:e.disabled,onClick:s[0]||(s[0]=o=>this.$emit("ok")),class:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"},h(e.label),9,et)])}var st=y(Ye,[["render",tt]]);function K(){const e=T([]),s=T({item:void 0,attachments:void 0,plot_attachments:void 0}),r=T({hasNext:!1}),a=O({url:"/api/method/erpnext_kleingartenverein.api.get_tenant_data"}),g=i=>{const n=[];return i.files&&n.push(...i.files.map(l=>({description:l.file_name,url:l.file_url}))),i.attachments&&n.push(...i.attachments.map(l=>({description:l.attachment_description,url:l.attachment}))),n},o=i=>{const n=[];return i.plot_files&&n.push(...i.plot_files.map(l=>({description:l.file_name,url:l.file_url}))),i.plot_attachments&&n.push(...i.plot_attachments.map(l=>({description:l.attachment_description,url:l.attachment}))),n};H(a,()=>{r.hasNext=a.hasNextPage,a.data?a.start===0?(f(),e.push(...a.data),s.item=void 0,s.attachments=void 0,s.plot_attachments=void 0):(e.push(...a.data.slice(a.start,a.start+a.pageLength)),s.item=a.data[0],s.attachments=g(a.data[0]),s.plot_attachments=o(a.data[0])):f()});const m=()=>a.next(),c=i=>{if(!i||i.trim()===""){f();return}f(),a.reset(),a.fetch({name:i})},f=()=>{s.item=void 0,e.splice(0,e.length)};return{tenants:e,loadMore:m,pageInfo:r,clear:f,byName:c,first:s}}const at=$({name:"TenantEditor",components:{TabComponent:me,TenantBaseData:Ee,Button:st,AttachmentList:Ue,TenantPlotData:Xe},setup(){const e=K(),s=E({});return{editor:e,selectedCustomer:s}},mounted(){this.editor.byName(this.item)},methods:{tabSelected(e){this.selectedTab=e.name}},emits:{close:()=>!0},data(){return{items:[{description:"tenant_editor.base_data",selected:!0,name:"base"},{name:"attachments",description:"tenant_editor.attachments",selected:!1},{name:"plot",description:"tenant_editor.plot",selected:!1},{name:"plot_attachments",description:"tenant_editor.plot_attachments",selected:!1}],selectedTab:"base"}},computed:{isLoading:function(){return!this.editor.first.item},baseData:function(){return this.editor.first.item}},props:{item:{type:Object,required:!0}}}),ot={class:"bg-blue-200 flex p-4"},nt={key:0,class:"text-gray-600"},lt=t("svg",{class:"w-3 h-3","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 14 14"},[t("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"})],-1),rt=t("span",{class:"sr-only"},"Close modal",-1),it=[lt,rt],dt={key:0,class:"pl-4 pr-4 rounded-lg overflow-scroll h-[80%]",role:"tabpanel","aria-labelledby":"profile-tab"},ut={key:2,class:"pl-4 pr-4 rounded-lg overflow-scroll h-[80%]",role:"tabpanel","aria-labelledby":"profile-tab"},ct={class:"flex flex-row-reverse mr-4"},pt=t("svg",{"aria-hidden":"true",class:"w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"}),t("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"})],-1),mt=t("span",{class:"sr-only"},"Loading...",-1),bt=[pt,mt];function ht(e,s,b,r,a,g){var n,l,w,v,D,x,M,B,S,N,L,P;const o=_("TabComponent"),m=_("TenantBaseData"),c=_("AttachmentList"),f=_("TenantPlotData"),i=_("Button");return d(),p("div",{class:k(["relative bg-white rounded-lg shadow dark:bg-gray-700 h-[90vh]",e.isLoading?"opacity-25":""])},[t("div",ot,[t("div",null,[t("p",null,h((w=(l=(n=e.editor.first)==null?void 0:n.item)==null?void 0:l.tenant)==null?void 0:w.name),1),((D=(v=e.editor.first)==null?void 0:v.item)==null?void 0:D.plot)?(d(),p("p",nt,h(e.$t("tenant_editor.plot"))+" "+h((B=(M=(x=e.editor.first)==null?void 0:x.item)==null?void 0:M.plot)==null?void 0:B.plot_number),1)):C("",!0)]),t("button",{onClick:s[0]||(s[0]=I=>this.$emit("close")),type:"button",class:"absolute right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white","data-modal-hide":"authentication-modal"},it)]),u(o,{onItemSelected:e.tabSelected,items:e.items},null,8,["onItemSelected","items"]),e.selectedTab==="base"?(d(),p("div",dt,[u(m,{data:e.baseData},null,8,["data"])])):C("",!0),e.selectedTab==="attachments"?(d(),q(c,{key:1,data:(S=e.editor.first)==null?void 0:S.attachments},null,8,["data"])):C("",!0),e.selectedTab==="plot"?(d(),p("div",ut,[u(f,{data:(L=(N=e.editor.first)==null?void 0:N.item)==null?void 0:L.plot},null,8,["data"])])):C("",!0),e.selectedTab==="plot_attachments"?(d(),q(c,{key:3,data:(P=e.editor.first)==null?void 0:P.plot_attachments},null,8,["data"])):C("",!0),t("div",ct,[u(i,{onOk:s[1]||(s[1]=I=>this.$emit("close")),label:e.$t("tenant_editor.close")},null,8,["label"])]),t("div",{role:"status",class:k([e.isLoading?"":"hidden","absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"])},bt,2)],2)}var ft=y(at,[["render",ht]]);const gt=$({name:"TenantSearchBar",components:{},methods:{executeSearch(){this.$emit("search",this.searchText)},filter_selected(e){e.selected=!e.selected}},emits:{search:()=>!0},setup(){const e=E(!1),s=E("");return{dropdown:E(null),dropDownVisible:e,searchText:s}},props:{filters:{type:Object,required:!0}},data(){}}),_t={class:"flex"},vt={class:"relative w-full ml-2"},$t=["placeholder"],yt=t("svg",{class:"w-4 h-4","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 20 20"},[t("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"})],-1),wt={class:"sr-only"};function kt(e,s,b,r,a,g){return d(),p("div",_t,[t("div",vt,[G(t("input",{type:"search","onUpdate:modelValue":s[0]||(s[0]=o=>e.searchText=o),onKeyup:s[1]||(s[1]=Q((...o)=>e.executeSearch&&e.executeSearch(...o),["enter"])),class:"block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500",placeholder:e.$t("search_bar.search_for"),required:""},null,40,$t),[[J,e.searchText]]),t("button",{onClick:s[2]||(s[2]=(...o)=>e.executeSearch&&e.executeSearch(...o)),class:"absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"},[yt,t("span",wt,h(e.$t("search_bar.search")),1)])])])}var Ct=y(gt,[["render",kt]]);function Dt(){const e=T([]),b=T({hasNext:!1}),r=W({doctype:"Customer",fields:["*"],orderBy:"plot_link asc",filters:{customer_group:"Tenant"},start:0,pageLength:20}),a=O({url:"/api/method/erpnext_kleingartenverein.api.search_tenants"});H(a,()=>{console.log(a),console.log(a.start),b.hasNext=a.hasNextPage,a.data?(a.start===0&&e.splice(0,e.length),e.push(...a.data)):e.splice(0,e.length)}),H(r,()=>{b.hasNext=r.hasNextPage,r.data?r.start===0?(c(),e.push(...r.data)):e.push(...r.data.slice(r.start,r.start+r.pageLength)):c()});const g=n=>{if(!n||n.trim()===""){c(),m();return}c(),a.reset(),a.fetch({query:n,filter:f.filter(l=>l.selected).map(l=>X(l))})},o=()=>r.next(),m=()=>r.fetch(),c=()=>{e.splice(0,e.length)},f=T([{selected:!1,text:"search_bar.status_under_supervision"}]);return{tenants:e,loadMore:o,search:g,pageInfo:b,fetch:m,clear:c,filters:f,byName:n=>e.find(l=>l.name===n)}}const xt=$({name:"paechter",components:{NavbarComponent:oe,FooterComponent:ne,Dropdown:Y,Alert:ee,Button:te,ListComponent:le,Dialog:se,TenantEditor:ft,TenantSearchBar:Ct},methods:{executeSearch(e){this.tenant.search(e)},showDialog(e){this.selectedCustomer=e,this.bodyDialog=!0},getMobileHref(e){return`tel:${e}`},getMailHref(e){return`mailto:${e}`},closeEditor(){this.bodyDialog=!1}},setup(){const e=Dt(),s=K(),b=E({});return{tenant:e,selectedCustomer:b,editor:s}},data(){return{tableColumns:[{DisplayTitle:"Name",PropertyNames:["customer_name","email_id"],Mode:F.DoubleEntry},{DisplayTitle:"Contact",PropertyNames:["email_id","mobile_no"],Mode:F.DoubleEntry},{DisplayTitle:"Garten",PropertyNames:["plot_link"],Mode:F.Default}],bodyDialog:!1,searchText:""}},mounted(){ae(),this.tenant.fetch()}}),Tt={class:"p-4 sm:ml-64"},Mt={class:"flex p-4"},Bt=t("div",{class:"grid content-center"},[t("svg",{class:"w-10 h-10 text-gray-200","aria-hidden":"true",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[t("path",{"fill-rule":"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z","clip-rule":"evenodd"})])],-1),St={class:"grow p-2"},Nt={class:"font-semibold"},Lt={class:"font-semibold"},Pt={class:"grid grid-cols-1 sm:grid-cols-3 gap-4 content-center"},Et=["href"],It=t("i",{class:"fa fa-phone","aria-hidden":"true"},null,-1),jt=t("span",{class:"sr-only"},"Phonecall",-1),At=[It,jt],Ht=["href"],Ft=t("i",{class:"fa fa-envelope","aria-hidden":"true"},null,-1),zt=t("span",{class:"sr-only"},"EMail",-1),Vt=[Ft,zt],Ot=["onClick"],qt=t("i",{class:"fa fa-edit","aria-hidden":"true"},null,-1),Rt=t("span",{class:"sr-only"},"Edit",-1),Zt=[qt,Rt];function Kt(e,s,b,r,a,g){const o=_("NavbarComponent"),m=_("TenantEditor"),c=_("Dialog"),f=_("TenantSearchBar"),i=_("ListComponent");return d(),p(A,null,[u(o),t("div",Tt,[u(c,{modelValue:e.bodyDialog,"onUpdate:modelValue":s[0]||(s[0]=n=>e.bodyDialog=n),style:{"z-index":"300"}},{body:R(()=>[u(m,{item:e.selectedCustomer,onClose:e.closeEditor},null,8,["item","onClose"])]),_:1},8,["modelValue"]),u(f,{onSearch:e.executeSearch,filters:e.tenant.filters,class:"mb-4"},null,8,["onSearch","filters"]),u(i,{onLoadMore:e.tenant.loadMore,items:e.tenant.tenants,checkable:!1,headerList:["P\xE4chter"],hasNext:e.tenant.pageInfo.hasNext,onShowDetails:s[1]||(s[1]=n=>e.showDialog(n.name))},{item:R(({name:n,plot_link:l,email_id:w,mobile_no:v,customer_group:D})=>[t("div",Mt,[Bt,t("div",St,[t("div",Nt,h(n),1),t("div",Lt,h(l),1),t("div",null,h(w),1),t("div",null,h(v),1)]),t("div",Pt,[t("a",{href:e.getMobileHref(v),type:"button",class:k([v?"text-blue-700 hover:bg-blue-700 border border-blue-700  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 ":"border border-gray-300  bg-gray-100","disabled:opacity-75 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"])},At,10,Et),t("a",{href:e.getMailHref(w),type:"button",class:k([v?"text-blue-700 hover:bg-blue-700 border border-blue-700  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 ":"border border-gray-300  bg-gray-100","disabled:opacity-75 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"])},Vt,10,Ht),t("button",{type:"button",onClick:x=>e.showDialog(n),class:"text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"},Zt,8,Ot)])])]),_:1},8,["onLoadMore","items","hasNext"])])],64)}var Xt=y(xt,[["render",Kt]]);export{Xt as default};
