var j=(e,s,i)=>new Promise((c,l)=>{var b=d=>{try{n(i.next(d))}catch(f){l(f)}},t=d=>{try{n(i.throw(d))}catch(f){l(f)}},n=d=>d.done?c(d.value):Promise.resolve(d.value).then(b,t);n((i=i.apply(e,s)).next())});import{h as w,_ as T,i as r,j as u,k as a,F as q,m as H,p as k,t as g,O as K,l as _,P as z,Q as G,s as C,r as B,q as Q,D as M,R,S as U,H as L,f as O,w as Z,G as N,T as J,e as W,U as X}from"./vendor.daf37894.js";import{I as Y,B as ee,M as te}from"./Button.133825c3.js";const se=w({name:"TabComponent",components:{},methods:{selectItem(e){for(const s of this.items)s.selected=!1;e.selected=!0,this.$emit("itemSelected",e)}},emits:{itemSelected:e=>!0},props:{items:{type:Array,default:()=>[]}}}),ae={class:"mb-4 border-b border-gray-400"},ne={class:"flex flex-wrap -mb-px text-sm font-medium text-center",role:"tablist"},le={class:"mr-2"},oe=["onClick"],re={class:"flex items-center"},ie={class:"hidden sm:block pl-2"};function de(e,s,i,c,l,b){return r(),u("div",ae,[a("ul",ne,[(r(!0),u(q,null,H(e.items,(t,n)=>(r(),u("li",le,[a("button",{class:k(["inline-block p-4 rounded-t-lg",t.selected?"border-b-2 border-blue-400":""]),type:"button",role:"tab",onClick:d=>e.selectItem(t)},[a("div",re,[a("i",{class:k(["fa",t.icon]),"aria-hidden":"true"},null,2),a("div",ie,g(e.$t(t.description)),1)])],10,oe)]))),256))])])}var ue=T(se,[["render",de]]);const ce={class:"flex"},pe=["href"],he=a("i",{class:"fa fa-phone","aria-hidden":"true"},null,-1),me={class:"sr-only"},be=["href"],fe=a("i",{class:"fa fa-envelope","aria-hidden":"true"},null,-1),ge={class:"sr-only"},_e=w({__name:"InputField",props:{value:{},disabled:{},type:{},label:{}},setup(e){const s=e,i=K(s,"value"),c=t=>s.type==="EMail",l=t=>s.type==="Phone",b=t=>t!==""?`mailto:${t}`:"";return(t,n)=>(r(),u("div",ce,[_(z(Y),{placeholder:t.label,class:"grow",modelValue:z(i),"onUpdate:modelValue":n[0]||(n[0]=d=>G(i)?i.value=d:null),disabled:t.disabled},null,8,["placeholder","modelValue","disabled"]),l()?(r(),u("a",{key:0,href:b(t.value),type:"button",class:k([t.value?"text-blue-700 hover:bg-blue-700 border  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 ":"border border-gray-300  bg-gray-100","ml-2 grow-0 disabled:opacity-75 font-medium text-sm p-2.5 text-center inline-flex items-center"])},[he,a("span",me,g(t.label),1)],10,pe)):C("",!0),c()?(r(),u("a",{key:1,href:b(t.value),type:"button",class:k([t.value?"text-blue-700 hover:bg-blue-700 border  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 ":"border border-gray-300  bg-gray-100","ml-2 grow-0 disabled:opacity-75 font-medium text-sm p-2.5 text-center inline-flex items-center"])},[fe,a("span",ge,g(t.label),1)],10,be)):C("",!0)]))}}),ve=w({name:"TenantBaseData",components:{InputField:_e},methods:{selectItem(e){for(const s of this.items)s.selected=!1;e.selected=!0,this.$emit("itemSelected",e)}},emits:{itemSelected:e=>!0},props:{data:{type:Object,default:()=>[]}},data(){return{inputDisabled:!0}}}),$e={class:"overflow-scroll h-[100%] p-2"},ye={class:"border-b-2"},we={class:"grid gap-6 mb-6 md:grid-cols-2 mt-3"},ke={class:"grid gap-6 mb-6 md:grid-cols-1 mt-2"},Ce={class:"border-t-4 pt-2"},De={class:"grid gap-6 mb-6 md:grid-cols-1 mt-3"},Te={class:"grid gap-3 mb-6 md:grid-cols-2"};function Se(e,s,i,c,l,b){var n,d,f,p,v,h,y,I,D,S,x,P,o,m,$,F,A,E;const t=B("InputField");return r(),u("div",$e,[a("p",ye,g(e.$t("tenant_editor.contact_data")),1),a("div",we,[_(t,{value:(d=(n=e.data)==null?void 0:n.contact)==null?void 0:d.first_name,disabled:e.inputDisabled,label:e.$t("tenant_editor.first_name")},null,8,["value","disabled","label"]),_(t,{value:(p=(f=e.data)==null?void 0:f.contact)==null?void 0:p.last_name,disabled:e.inputDisabled,label:e.$t("tenant_editor.last_name")},null,8,["value","disabled","label"])]),a("div",ke,[_(t,{value:(h=(v=e.data)==null?void 0:v.contact)==null?void 0:h.email_id,disabled:e.inputDisabled,label:e.$t("tenant_editor.email"),type:"EMail"},null,8,["value","disabled","label"]),_(t,{value:(I=(y=e.data)==null?void 0:y.contact)==null?void 0:I.mobile_no,disabled:e.inputDisabled,label:e.$t("tenant_editor.mobile_no"),type:"Phone"},null,8,["value","disabled","label"]),_(t,{value:(S=(D=e.data)==null?void 0:D.contact)==null?void 0:S.phone,disabled:e.inputDisabled,label:e.$t("tenant_editor.phone")},null,8,["value","disabled","label"])]),a("p",Ce,g(e.$t("tenant_editor.address_data")),1),a("div",De,[_(t,{value:(P=(x=e.data)==null?void 0:x.address)==null?void 0:P.address_line1,disabled:e.inputDisabled,label:e.$t("tenant_editor.street")},null,8,["value","disabled","label"]),_(t,{value:(m=(o=e.data)==null?void 0:o.address)==null?void 0:m.address_line2,disabled:e.inputDisabled,label:e.$t("tenant_editor.address_line_2")},null,8,["value","disabled","label"])]),a("div",Te,[_(t,{value:(F=($=e.data)==null?void 0:$.address)==null?void 0:F.pincode,disabled:e.inputDisabled,label:e.$t("tenant_editor.zip")},null,8,["value","disabled","label"]),_(t,{value:(E=(A=e.data)==null?void 0:A.address)==null?void 0:E.city,disabled:e.inputDisabled,label:e.$t("tenant_editor.city")},null,8,["value","disabled","label"])])])}var Be=T(ve,[["render",Se]]);const Me=w({name:"DownloadButton",props:{url:{type:String,required:!0},label:{type:String,required:!1},target:{type:String,required:!1,default:"_blank"}},emits:{ok:()=>!0}}),Ie=["href","target"],Fe=a("svg",{"aria-hidden":"true",class:"w-5 h-5 mr-2 fill-current",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[a("path",{"fill-rule":"evenodd",d:"M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z","clip-rule":"evenodd"})],-1);function Le(e,s,i,c,l,b){return r(),u("div",null,[a("a",{type:"button",href:e.url,target:e.target,class:"px-3 py-2 text-sm font-medium text-center inline-flex items-center text-gray-500 hover:opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"},[Fe,Q(" "+g(e.label),1)],8,Ie)])}var xe=T(Me,[["render",Le]]);const Pe=w({name:"AttachmentList",components:{DownloadButton:xe},props:{data:{type:Object,default:()=>[]}},methods:{getMobileHref(e){return`tel:${e}`},getMailHref(e){return`mailto:${e}`}}}),Ve={class:"divide-y divide-gray-200 dark:divide-gray-700 pl-4 pr-4"},Ne={class:"pb-3 sm:pb-4 pt-3 sm:pt-4"},Ae={class:"flex items-center space-x-4"},Ee={class:"flex-1 min-w-0 overflow-hidden text-ellipsis"},je={class:"inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"},qe={key:0,class:"text-center"};function He(e,s,i,c,l,b){const t=B("DownloadButton");return r(),u("ul",Ve,[(r(!0),u(q,null,H(e.data,(n,d)=>(r(),u("li",Ne,[a("div",Ae,[a("div",Ee,g(n.description),1),a("div",je,[_(t,{url:n.url},null,8,["url"])])])]))),256)),e.data.length===0?(r(),u("div",qe,[a("p",null,g(e.$t("common.no_data")),1)])):C("",!0)])}var ze=T(Pe,[["render",He]]),V;(function(e){e.Default="Default",e.EMail="EMail",e.Phone="Phone"})(V||(V={}));const Re=w({name:"InputField",props:{value:{type:String,default:()=>""},disabled:{type:Boolean,default:()=>!1},hasError:{type:Boolean,default:()=>!1},label:{type:String,default:()=>"Label"},placeholder:{type:String,default:()=>""},type:{type:String,default:()=>"Default"}},emits:{valueChanged:()=>!0},setup(e,s){return console.log("SETUP"),{actualContent:M(e.value)}},methods:{getMobileHref(e){return`tel:${e}`},getMailHref(e){return`mailto:${e}`},isPhone(){return this.type===V.Phone},isMail(){return this.type===V.EMail}},computed:{calculatedClass(){return this.hasError?"border border-red-600 focus:border-red-600 focus:ring-red-600":"border border-gray-300 focus:ring-blue-500 focus:border-blue-500"}}}),Ue={for:"first_name",class:"block text-sm pb-1 pl-.5 font-medium text-gray-900"},Oe={class:"flex"},Ze=["disabled","placeholder"],Ke=["href"],Ge=a("i",{class:"fa fa-phone","aria-hidden":"true"},null,-1),Qe={class:"sr-only"},Je=["href"],We=a("i",{class:"fa fa-envelope","aria-hidden":"true"},null,-1),Xe={class:"sr-only"};function Ye(e,s,i,c,l,b){return r(),u("div",null,[a("label",Ue,g(e.label),1),a("div",Oe,[R(a("input",{type:"text",disabled:e.disabled,class:k(["grow bg-gray-50 text-gray-900 text-sm rounded-sm block w-full p-1.5",e.calculatedClass]),placeholder:e.placeholder,"onUpdate:modelValue":s[0]||(s[0]=t=>e.actualContent=t),required:""},null,10,Ze),[[U,e.actualContent]]),e.isPhone()?(r(),u("a",{key:0,href:e.getMailHref(e.value),type:"button",class:k([e.value?"text-blue-700 hover:bg-blue-700 border  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 ":"border border-gray-300  bg-gray-100","ml-2 grow-0 disabled:opacity-75 font-medium text-sm p-2.5 text-center inline-flex items-center"])},[Ge,a("span",Qe,g(e.label),1)],10,Ke)):C("",!0),e.isMail()?(r(),u("a",{key:1,href:e.getMailHref(e.value),type:"button",class:k([e.value?"text-blue-700 hover:bg-blue-700 border  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 ":"border border-gray-300  bg-gray-100","ml-2 grow-0 disabled:opacity-75 font-medium text-sm p-2.5 text-center inline-flex items-center"])},[We,a("span",Xe,g(e.label),1)],10,Je)):C("",!0)])])}var et=T(Re,[["render",Ye]]);const tt=w({name:"TenantPlotData",components:{InputField:et},methods:{selectItem(e){for(const s of this.items)s.selected=!1;e.selected=!0,this.$emit("itemSelected",e)}},emits:{itemSelected:e=>!0},props:{data:{type:Object,default:()=>[]}},data(){return{inputDisabled:!0}}}),st={class:"overflow-scroll h-[100%]"},at={class:"grid gap-6 mb-6 md:grid-cols-1 mt-3"};function nt(e,s,i,c,l,b){var n,d;const t=B("InputField");return r(),u("div",st,[a("div",at,[_(t,{value:(n=e.data)==null?void 0:n.plot_number,disabled:e.inputDisabled,label:e.$t("tenant_editor.plot_number")},null,8,["value","disabled","label"]),_(t,{value:(d=e.data)==null?void 0:d.plot_size_sqm,disabled:e.inputDisabled,label:e.$t("tenant_editor.plot_size_sqm")},null,8,["value","disabled","label"])])])}var lt=T(tt,[["render",nt]]);function ot(){const e=L([]),s=L({item:void 0,attachments:void 0,plot_attachments:void 0}),c=L({hasNext:!1}),l=O({url:"/api/method/erpnext_kleingartenverein.api.get_tenant_data"}),b=p=>{const v=[];return p.files&&v.push(...p.files.map(h=>({description:h.file_name,url:h.file_url}))),p.attachments&&v.push(...p.attachments.map(h=>({description:h.attachment_description,url:h.attachment}))),v},t=p=>{const v=[];return p.plot_files&&v.push(...p.plot_files.map(h=>({description:h.file_name,url:h.file_url}))),p.plot_attachments&&v.push(...p.plot_attachments.map(h=>({description:h.attachment_description,url:h.attachment}))),v};Z(l,()=>{c.hasNext=l.hasNextPage,l.data?l.start===0?(f(),e.push(...l.data),s.item=void 0,s.attachments=void 0,s.plot_attachments=void 0):(e.push(...l.data.slice(l.start,l.start+l.pageLength)),s.item=l.data[0],s.attachments=b(l.data[0]),s.plot_attachments=t(l.data[0])):f()});const n=()=>l.next(),d=p=>{if(!p||p.trim()===""){f();return}f(),l.reset(),l.fetch({name:p})},f=()=>{s.item=void 0,e.splice(0,e.length)};return{tenants:e,loadMore:n,pageInfo:c,clear:f,byName:d,first:s}}const rt=w({name:"TenantEditor",components:{TabComponent:ue,TenantBaseData:Be,Button:ee,AttachmentList:ze,TenantPlotData:lt},setup(){const e=ot(),s=M({});return{editor:e,selectedCustomer:s}},mounted(){this.editor.byName(this.item)},methods:{tabSelected(e){this.selectedTab=e.name}},emits:{close:()=>!0},data(){return{items:[{description:"tenant_editor.base_data",selected:!0,name:"base",icon:"fa-info"},{name:"attachments",description:"tenant_editor.attachments",selected:!1,icon:"fa-file"},{name:"plot",description:"tenant_editor.plot",selected:!1,icon:"fa-tree"},{name:"plot_attachments",description:"tenant_editor.plot_attachments",selected:!1,icon:"fa-download"}],selectedTab:"base"}},computed:{isLoading:function(){return!this.editor.first.item},baseData:function(){return this.editor.first.item}},props:{item:{type:String,required:!0}}}),it={class:"bg-blue-200 flex p-4"},dt={key:0,class:"text-gray-600"},ut=a("svg",{class:"w-3 h-3","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 14 14"},[a("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"})],-1),ct=a("span",{class:"sr-only"},"Close modal",-1),pt=[ut,ct],ht={key:0,class:"pl-4 pr-4 rounded-lg overflow-scroll h-[70%]",role:"tabpanel","aria-labelledby":"profile-tab"},mt={key:2,class:"pl-4 pr-4 rounded-lg overflow-scroll h-[80%]",role:"tabpanel","aria-labelledby":"profile-tab"},bt=a("svg",{"aria-hidden":"true",class:"w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[a("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"}),a("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"})],-1),ft=a("span",{class:"sr-only"},"Loading...",-1),gt=[bt,ft];function _t(e,s,i,c,l,b){var p,v,h,y,I,D,S,x,P,o,m,$;const t=B("TabComponent"),n=B("TenantBaseData"),d=B("AttachmentList"),f=B("TenantPlotData");return r(),u("div",{class:k(["relative bg-white rounded-lg dark:bg-gray-700 h-[100vh] sm:h-[80vh]",e.isLoading?"opacity-25":""])},[a("div",it,[a("div",null,[a("p",null,g((h=(v=(p=e.editor.first)==null?void 0:p.item)==null?void 0:v.tenant)==null?void 0:h.name),1),((I=(y=e.editor.first)==null?void 0:y.item)==null?void 0:I.plot)?(r(),u("p",dt,g(e.$t("tenant_editor.plot"))+" "+g((x=(S=(D=e.editor.first)==null?void 0:D.item)==null?void 0:S.plot)==null?void 0:x.plot_number),1)):C("",!0)]),a("button",{onClick:s[0]||(s[0]=F=>this.$emit("close")),type:"button",class:"absolute right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white","data-modal-hide":"authentication-modal"},pt)]),_(t,{onItemSelected:e.tabSelected,items:e.items},null,8,["onItemSelected","items"]),e.selectedTab==="base"?(r(),u("div",ht,[_(n,{data:e.baseData},null,8,["data"])])):C("",!0),e.selectedTab==="attachments"?(r(),N(d,{key:1,data:(P=e.editor.first)==null?void 0:P.attachments},null,8,["data"])):C("",!0),e.selectedTab==="plot"?(r(),u("div",mt,[_(f,{data:(m=(o=e.editor.first)==null?void 0:o.item)==null?void 0:m.plot},null,8,["data"])])):C("",!0),e.selectedTab==="plot_attachments"?(r(),N(d,{key:3,data:($=e.editor.first)==null?void 0:$.plot_attachments},null,8,["data"])):C("",!0),a("div",{role:"status",class:k([e.isLoading?"":"hidden","absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"])},gt,2)],2)}var Lt=T(rt,[["render",_t]]);const vt=w({name:"TenantSearchBar",components:{Select:te},methods:{executeSearch(){this.$emit("search",this.searchText)},filter_selected(e){e.selected=!e.selected}},emits:{search:()=>!0,selectedFilterChanged:()=>!0},setup(){const e=M(!1),s=M(""),i=M("");return{dropdown:M(null),dropDownVisible:e,searchText:s,selectedFilter:i}},watch:{selectedFilter:function(e){this.$emit("selectedFilterChanged",e)}},props:{filters:{type:Object,required:!1},showFilters:{type:Boolean,required:!1}}}),$t={class:"flex"},yt={class:"relative w-full ml-2 mr-2"},wt=["placeholder"],kt=a("svg",{class:"w-4 h-4","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 20 20"},[a("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"})],-1),Ct={class:"sr-only"};function Dt(e,s,i,c,l,b){const t=B("Select");return r(),u("div",$t,[a("div",yt,[e.showFilters?(r(),N(t,{key:0,modelValue:e.selectedFilter,"onUpdate:modelValue":s[0]||(s[0]=n=>e.selectedFilter=n),options:e.filters,placeholder:e.$t("tenant_list.select_tag")},null,8,["modelValue","options","placeholder"])):R((r(),u("input",{key:1,type:"search","onUpdate:modelValue":s[1]||(s[1]=n=>e.searchText=n),onKeyup:s[2]||(s[2]=J((...n)=>e.executeSearch&&e.executeSearch(...n),["enter"])),class:"block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500",placeholder:e.$t("search_bar.search_for"),required:""},null,40,wt)),[[U,e.searchText]]),a("button",{onClick:s[3]||(s[3]=(...n)=>e.executeSearch&&e.executeSearch(...n)),class:"absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"},[kt,a("span",Ct,g(e.$t("search_bar.search")),1)])])])}var xt=T(vt,[["render",Dt]]);const Tt=w({name:"LinkButton",props:{disabled:{type:Boolean,default:()=>!1},href:{type:String},label:{type:String,default:()=>"Label"},target:{type:String,default:()=>"_blank"}},emits:{clicked:()=>!0}}),St=["href","target","disabled"];function Bt(e,s,i,c,l,b){return r(),u("div",null,[a("a",{type:"button",href:e.disabled?"#":e.href,target:e.disabled?"":e.target,disabled:e.disabled,onClick:s[0]||(s[0]=t=>this.$emit("clicked")),class:k([e.disabled?"bg-gray-300":"bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300","text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"])},g(e.label),11,St)])}var Pt=T(Tt,[["render",Bt]]);function Vt(){const e=L([]),i=L({hasNext:!1}),c=L([]),l=M(""),b=M(!1),t=W({doctype:"Customer",fields:["*"],orderBy:"plot_link asc",filters:{customer_group:"Tenant"},start:0,pageLength:20}),n=O({url:"/api/method/erpnext_kleingartenverein.api.search_tenants"});function d(o){let m=o;return m.selected=c.findIndex($=>$.name===m.name)>-1,m}function f(o){return o.map(d)}Z(t,()=>{if(i.hasNext=t.hasNextPage,t.data){if(t.start===0){y();let o=f(t.data);e.push(...o)}else e.push(...f(t.data.slice(t.start,t.start+t.pageLength)));b.value=e.length>0}else y(),b.value=!1}),X(l,o=>{p(l.value)},{throttle:1e3});const p=(o,m="")=>{if(!o||o.trim()===""){y(),h();return}y(),n.reset(),n.fetch({query:o,filter:m}).then(()=>{if(i.hasNext=n.hasNextPage,n.data){n.start===0&&e.splice(0,e.length);let $=f(n.data);e.push(...$)}else e.splice(0,e.length)})},v=()=>j(this,null,function*(){return t.next()}),h=()=>{t.fetch()},y=()=>{e.splice(0,e.length)},I=L([{selected:!1,text:"search_bar.status_under_supervision"}]),D=o=>e.find(m=>m.name===o),S=o=>{const m=D(o);m&&(m.selected=!0,c.findIndex(F=>F.name===o)===-1&&c.push(m))};return{tenants:e,searchText:l,loadMore:v,search:p,pageInfo:i,fetch:h,clear:y,filters:I,byName:D,selection:c,select:S,unselect:o=>{const m=D(o);if(m){m.selected=!1;const $=c.findIndex(F=>F.name===o);$>-1&&c.splice($,1)}},hasItems:b,selectAll:()=>{for(const o of e)S(o.name)}}}export{xe as D,et as I,Pt as L,xt as T,Lt as a,ot as b,Vt as u};
