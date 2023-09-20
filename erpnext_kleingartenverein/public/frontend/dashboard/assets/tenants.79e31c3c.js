var j=(e,s,d)=>new Promise((h,l)=>{var m=o=>{try{n(d.next(o))}catch(b){l(b)}},t=o=>{try{n(d.throw(o))}catch(b){l(b)}},n=o=>o.done?h(o.value):Promise.resolve(o.value).then(m,t);n((d=d.apply(e,s)).next())});import{h as C,_ as S,i,j as p,k as a,F as R,n as z,q as k,t as _,O as Q,m as v,P as U,Q as J,l as D,r as I,s as W,D as x,R as O,S as Z,H as L,f as q,w as K,G as H,T as X,e as Y,U as ee}from"./vendor.fddf21c1.js";import{I as te,B as se,M as ae}from"./Button.f813293b.js";const ne=C({name:"TabComponent",components:{},methods:{selectItem(e){for(const s of this.items)s.selected=!1;e.selected=!0,this.$emit("itemSelected",e)}},emits:{itemSelected:e=>!0},props:{items:{type:Array,default:()=>[]}}}),le={class:"mb-4 border-b border-gray-400"},oe={class:"flex flex-wrap -mb-px text-sm font-medium text-center",role:"tablist"},re={class:"mr-2"},ie=["onClick"],de={class:"flex items-center"},ue={class:"hidden sm:block pl-2"};function ce(e,s,d,h,l,m){return i(),p("div",le,[a("ul",oe,[(i(!0),p(R,null,z(e.items,(t,n)=>(i(),p("li",re,[a("button",{class:k(["inline-block p-4 rounded-t-lg",t.selected?"border-b-2 border-blue-400":""]),type:"button",role:"tab",onClick:o=>e.selectItem(t)},[a("div",de,[a("i",{class:k(["fa",t.icon]),"aria-hidden":"true"},null,2),a("div",ue,_(e.$t(t.description)),1)])],10,ie)]))),256))])])}var pe=S(ne,[["render",ce]]);const he={class:"flex"},me=["href"],fe=a("i",{class:"fa fa-phone","aria-hidden":"true"},null,-1),be={class:"sr-only"},ge=["href"],_e=a("i",{class:"fa fa-envelope","aria-hidden":"true"},null,-1),ve={class:"sr-only"},$e=C({__name:"InputField",props:{value:{},disabled:{},type:{},label:{}},setup(e){const s=e,d=Q(s,"value"),h=t=>s.type==="EMail",l=t=>s.type==="Phone",m=t=>t!==""?`mailto:${t}`:"";return(t,n)=>(i(),p("div",he,[v(U(te),{placeholder:t.label,class:"grow",modelValue:U(d),"onUpdate:modelValue":n[0]||(n[0]=o=>J(d)?d.value=o:null),disabled:t.disabled},null,8,["placeholder","modelValue","disabled"]),l()?(i(),p("a",{key:0,href:m(t.value),type:"button",class:k([t.value?"text-blue-700 hover:bg-blue-700 border  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 ":"border border-gray-300  bg-gray-100","ml-2 grow-0 disabled:opacity-75 font-medium text-sm p-2.5 text-center inline-flex items-center"])},[fe,a("span",be,_(t.label),1)],10,me)):D("",!0),h()?(i(),p("a",{key:1,href:m(t.value),type:"button",class:k([t.value?"text-blue-700 hover:bg-blue-700 border  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 ":"border border-gray-300  bg-gray-100","ml-2 grow-0 disabled:opacity-75 font-medium text-sm p-2.5 text-center inline-flex items-center"])},[_e,a("span",ve,_(t.label),1)],10,ge)):D("",!0)]))}}),ye=C({name:"TenantBaseData",components:{InputField:$e},methods:{selectItem(e){for(const s of this.items)s.selected=!1;e.selected=!0,this.$emit("itemSelected",e)}},emits:{itemSelected:e=>!0},props:{data:{type:Object,default:()=>[]}},data(){return{inputDisabled:!0}}}),we={class:"overflow-scroll h-[100%] p-2"},Ce={class:"border-b-2"},ke={class:"grid gap-6 mb-6 md:grid-cols-2 mt-3"},De={class:"grid gap-6 mb-6 md:grid-cols-1 mt-2"},Te={class:"border-t-4 pt-2"},Se={class:"grid gap-6 mb-6 md:grid-cols-1 mt-3"},Be={class:"grid gap-3 mb-6 md:grid-cols-2"};function Me(e,s,d,h,l,m){var n,o,b,c,g,f,B,y,F,T,M,P,V,r,u,$,w,N;const t=I("InputField");return i(),p("div",we,[a("p",Ce,_(e.$t("tenant_editor.contact_data")),1),a("div",ke,[v(t,{value:(o=(n=e.data)==null?void 0:n.contact)==null?void 0:o.first_name,disabled:e.inputDisabled,label:e.$t("tenant_editor.first_name")},null,8,["value","disabled","label"]),v(t,{value:(c=(b=e.data)==null?void 0:b.contact)==null?void 0:c.last_name,disabled:e.inputDisabled,label:e.$t("tenant_editor.last_name")},null,8,["value","disabled","label"])]),a("div",De,[v(t,{value:(f=(g=e.data)==null?void 0:g.contact)==null?void 0:f.email_id,disabled:e.inputDisabled,label:e.$t("tenant_editor.email"),type:"EMail"},null,8,["value","disabled","label"]),v(t,{value:(y=(B=e.data)==null?void 0:B.contact)==null?void 0:y.mobile_no,disabled:e.inputDisabled,label:e.$t("tenant_editor.mobile_no"),type:"Phone"},null,8,["value","disabled","label"]),v(t,{value:(T=(F=e.data)==null?void 0:F.contact)==null?void 0:T.phone,disabled:e.inputDisabled,label:e.$t("tenant_editor.phone")},null,8,["value","disabled","label"])]),a("p",Te,_(e.$t("tenant_editor.address_data")),1),a("div",Se,[v(t,{value:(P=(M=e.data)==null?void 0:M.address)==null?void 0:P.address_line1,disabled:e.inputDisabled,label:e.$t("tenant_editor.street")},null,8,["value","disabled","label"]),v(t,{value:(r=(V=e.data)==null?void 0:V.address)==null?void 0:r.address_line2,disabled:e.inputDisabled,label:e.$t("tenant_editor.address_line_2")},null,8,["value","disabled","label"])]),a("div",Be,[v(t,{value:($=(u=e.data)==null?void 0:u.address)==null?void 0:$.pincode,disabled:e.inputDisabled,label:e.$t("tenant_editor.zip")},null,8,["value","disabled","label"]),v(t,{value:(N=(w=e.data)==null?void 0:w.address)==null?void 0:N.city,disabled:e.inputDisabled,label:e.$t("tenant_editor.city")},null,8,["value","disabled","label"])])])}var Ie=S(ye,[["render",Me]]);const xe=C({name:"DownloadButton",props:{url:{type:String,required:!0},label:{type:String,required:!1},target:{type:String,required:!1,default:"_blank"}},emits:{ok:()=>!0}}),Fe=["href","target"],Le=a("svg",{"aria-hidden":"true",class:"w-5 h-5 mr-2 fill-current",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[a("path",{"fill-rule":"evenodd",d:"M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z","clip-rule":"evenodd"})],-1);function Pe(e,s,d,h,l,m){return i(),p("div",null,[a("a",{type:"button",href:e.url,target:e.target,class:"px-3 py-2 text-sm font-medium text-center inline-flex items-center text-gray-500 hover:opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300"},[Le,W(" "+_(e.label),1)],8,Fe)])}var Ve=S(xe,[["render",Pe]]);const Ne=C({name:"AttachmentList",components:{DownloadButton:Ve},props:{data:{type:Object,default:()=>[]}},methods:{getMobileHref(e){return`tel:${e}`},getMailHref(e){return`mailto:${e}`}}}),Ae={class:"divide-y divide-gray-200 pl-4 pr-4"},Ee={class:"pb-3 sm:pb-4 pt-3 sm:pt-4"},je={class:"flex items-center space-x-4"},qe={class:"flex-1 min-w-0 overflow-hidden text-ellipsis"},He={class:"inline-flex items-center text-base font-semibold text-gray-900"},Re={key:0,class:"text-center"};function ze(e,s,d,h,l,m){const t=I("DownloadButton");return i(),p("ul",Ae,[(i(!0),p(R,null,z(e.data,(n,o)=>(i(),p("li",Ee,[a("div",je,[a("div",qe,_(n.description),1),a("div",He,[v(t,{url:n.url},null,8,["url"])])])]))),256)),e.data.length===0?(i(),p("div",Re,[a("p",null,_(e.$t("common.no_data")),1)])):D("",!0)])}var Ue=S(Ne,[["render",ze]]),E;(function(e){e.Default="Default",e.EMail="EMail",e.Phone="Phone"})(E||(E={}));const Oe=C({name:"InputField",props:{value:{type:String,default:()=>""},disabled:{type:Boolean,default:()=>!1},hasError:{type:Boolean,default:()=>!1},label:{type:String,default:()=>"Label"},placeholder:{type:String,default:()=>""},type:{type:String,default:()=>"Default"}},emits:{valueChanged:()=>!0},setup(e,s){return console.log("SETUP"),{actualContent:x(e.value)}},methods:{getMobileHref(e){return`tel:${e}`},getMailHref(e){return`mailto:${e}`},isPhone(){return this.type===E.Phone},isMail(){return this.type===E.EMail}},computed:{calculatedClass(){return this.hasError?"border border-red-600 focus:border-red-600 focus:ring-red-600":"border border-gray-300 focus:ring-blue-500 focus:border-blue-500"}}}),Ze={for:"first_name",class:"block text-sm pb-1 pl-.5 font-medium text-gray-900"},Ke={class:"flex"},Ge=["disabled","placeholder"],Qe=["href"],Je=a("i",{class:"fa fa-phone","aria-hidden":"true"},null,-1),We={class:"sr-only"},Xe=["href"],Ye=a("i",{class:"fa fa-envelope","aria-hidden":"true"},null,-1),et={class:"sr-only"};function tt(e,s,d,h,l,m){return i(),p("div",null,[a("label",Ze,_(e.label),1),a("div",Ke,[O(a("input",{type:"text",disabled:e.disabled,class:k(["grow bg-gray-50 text-gray-900 text-sm rounded-sm block w-full p-1.5",e.calculatedClass]),placeholder:e.placeholder,"onUpdate:modelValue":s[0]||(s[0]=t=>e.actualContent=t),required:""},null,10,Ge),[[Z,e.actualContent]]),e.isPhone()?(i(),p("a",{key:0,href:e.getMailHref(e.value),type:"button",class:k([e.value?"text-blue-700 hover:bg-blue-700 border  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 ":"border border-gray-300  bg-gray-100","ml-2 grow-0 disabled:opacity-75 font-medium text-sm p-2.5 text-center inline-flex items-center"])},[Je,a("span",We,_(e.label),1)],10,Qe)):D("",!0),e.isMail()?(i(),p("a",{key:1,href:e.getMailHref(e.value),type:"button",class:k([e.value?"text-blue-700 hover:bg-blue-700 border  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 ":"border border-gray-300  bg-gray-100","ml-2 grow-0 disabled:opacity-75 font-medium text-sm p-2.5 text-center inline-flex items-center"])},[Ye,a("span",et,_(e.label),1)],10,Xe)):D("",!0)])])}var st=S(Oe,[["render",tt]]);const at=C({name:"TenantPlotData",components:{InputField:st},methods:{selectItem(e){for(const s of this.items)s.selected=!1;e.selected=!0,this.$emit("itemSelected",e)}},emits:{itemSelected:e=>!0},props:{data:{type:Object,default:()=>[]}},data(){return{inputDisabled:!0}}}),nt={class:"overflow-scroll h-[100%]"},lt={class:"grid gap-6 mb-6 md:grid-cols-1 mt-3"};function ot(e,s,d,h,l,m){var n,o;const t=I("InputField");return i(),p("div",nt,[a("div",lt,[v(t,{value:(n=e.data)==null?void 0:n.plot_number,disabled:e.inputDisabled,label:e.$t("tenant_editor.plot_number")},null,8,["value","disabled","label"]),v(t,{value:(o=e.data)==null?void 0:o.plot_size_sqm,disabled:e.inputDisabled,label:e.$t("tenant_editor.plot_size_sqm")},null,8,["value","disabled","label"])])])}var rt=S(at,[["render",ot]]);function it(){const e=L([]),s=L({item:void 0,attachments:void 0,plot_attachments:void 0}),h=L({hasNext:!1}),l=q({url:"/api/method/erpnext_kleingartenverein.api.get_tenant_data"}),m=c=>{const g=[];return c.files&&g.push(...c.files.map(f=>({description:f.file_name,url:f.file_url}))),c.attachments&&g.push(...c.attachments.map(f=>({description:f.attachment_description,url:f.attachment}))),g},t=c=>{const g=[];return c.plot_files&&g.push(...c.plot_files.map(f=>({description:f.file_name,url:f.file_url}))),c.plot_attachments&&g.push(...c.plot_attachments.map(f=>({description:f.attachment_description,url:f.attachment}))),g};K(l,()=>{h.hasNext=l.hasNextPage,l.data?l.start===0?(b(),e.push(...l.data),s.item=void 0,s.attachments=void 0,s.plot_attachments=void 0):(e.push(...l.data.slice(l.start,l.start+l.pageLength)),s.item=l.data[0],s.attachments=m(l.data[0]),s.plot_attachments=t(l.data[0])):b()});const n=()=>l.next(),o=c=>{if(!c||c.trim()===""){b();return}b(),l.reset(),l.fetch({name:c})},b=()=>{s.item=void 0,e.splice(0,e.length)};return{tenants:e,loadMore:n,pageInfo:h,clear:b,byName:o,first:s}}const dt=C({name:"TenantEditor",components:{TabComponent:pe,TenantBaseData:Ie,Button:se,AttachmentList:Ue,TenantPlotData:rt},setup(){const e=it(),s=x({});return{editor:e,selectedCustomer:s}},mounted(){this.editor.byName(this.item)},methods:{tabSelected(e){this.selectedTab=e.name}},emits:{close:()=>!0},data(){return{items:[{description:"tenant_editor.base_data",selected:!0,name:"base",icon:"fa-info"},{name:"attachments",description:"tenant_editor.attachments",selected:!1,icon:"fa-file"},{name:"plot",description:"tenant_editor.plot",selected:!1,icon:"fa-tree"},{name:"plot_attachments",description:"tenant_editor.plot_attachments",selected:!1,icon:"fa-download"}],selectedTab:"base"}},computed:{isLoading:function(){return!this.editor.first.item},baseData:function(){return this.editor.first.item}},props:{item:{type:String,required:!0}}}),ut={class:"bg-blue-200 flex p-4"},ct={key:0,class:"text-gray-600"},pt=a("svg",{class:"w-3 h-3","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 14 14"},[a("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"})],-1),ht=a("span",{class:"sr-only"},"Close modal",-1),mt=[pt,ht],ft={key:0,class:"pl-4 pr-4 rounded-lg overflow-scroll h-[70%]",role:"tabpanel","aria-labelledby":"profile-tab"},bt={key:2,class:"pl-4 pr-4 rounded-lg overflow-scroll h-[80%]",role:"tabpanel","aria-labelledby":"profile-tab"},gt=a("svg",{"aria-hidden":"true",class:"w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[a("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"}),a("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"})],-1),_t=a("span",{class:"sr-only"},"Loading...",-1),vt=[gt,_t];function $t(e,s,d,h,l,m){var c,g,f,B,y,F,T,M,P,V,r,u;const t=I("TabComponent"),n=I("TenantBaseData"),o=I("AttachmentList"),b=I("TenantPlotData");return i(),p("div",{class:k(["relative bg-white rounded-lg h-[100vh] sm:h-[80vh]",e.isLoading?"opacity-25":""])},[a("div",ut,[a("div",null,[a("p",null,_((f=(g=(c=e.editor.first)==null?void 0:c.item)==null?void 0:g.tenant)==null?void 0:f.name),1),((y=(B=e.editor.first)==null?void 0:B.item)==null?void 0:y.plot)?(i(),p("p",ct,_(e.$t("tenant_editor.plot"))+" "+_((M=(T=(F=e.editor.first)==null?void 0:F.item)==null?void 0:T.plot)==null?void 0:M.plot_number),1)):D("",!0)]),a("button",{onClick:s[0]||(s[0]=$=>this.$emit("close")),type:"button",class:"absolute right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center","data-modal-hide":"authentication-modal"},mt)]),v(t,{onItemSelected:e.tabSelected,items:e.items},null,8,["onItemSelected","items"]),e.selectedTab==="base"?(i(),p("div",ft,[v(n,{data:e.baseData},null,8,["data"])])):D("",!0),e.selectedTab==="attachments"?(i(),H(o,{key:1,data:(P=e.editor.first)==null?void 0:P.attachments},null,8,["data"])):D("",!0),e.selectedTab==="plot"?(i(),p("div",bt,[v(b,{data:(r=(V=e.editor.first)==null?void 0:V.item)==null?void 0:r.plot},null,8,["data"])])):D("",!0),e.selectedTab==="plot_attachments"?(i(),H(o,{key:3,data:(u=e.editor.first)==null?void 0:u.plot_attachments},null,8,["data"])):D("",!0),a("div",{role:"status",class:k([e.isLoading?"":"hidden","absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"])},vt,2)],2)}var Vt=S(dt,[["render",$t]]);const yt=C({name:"TenantSearchBar",components:{Select:ae},methods:{executeSearch(){this.$emit("search",this.searchText)},filter_selected(e){e.selected=!e.selected}},emits:{search:()=>!0,selectedFilterChanged:()=>!0},setup(){const e=x(!1),s=x(""),d=x("");return{dropdown:x(null),dropDownVisible:e,searchText:s,selectedFilter:d}},watch:{selectedFilter:function(e){this.$emit("selectedFilterChanged",e)}},props:{filters:{type:Object,required:!1},showFilters:{type:Boolean,required:!1}}}),wt={class:"flex"},Ct={class:"relative w-full ml-2 mr-2"},kt=["placeholder"],Dt=a("svg",{class:"w-4 h-4","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 20 20"},[a("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"})],-1),Tt={class:"sr-only"};function St(e,s,d,h,l,m){const t=I("Select");return i(),p("div",wt,[a("div",Ct,[e.showFilters?(i(),H(t,{key:0,modelValue:e.selectedFilter,"onUpdate:modelValue":s[0]||(s[0]=n=>e.selectedFilter=n),options:e.filters,placeholder:e.$t("tenant_list.select_tag")},null,8,["modelValue","options","placeholder"])):O((i(),p("input",{key:1,type:"search","onUpdate:modelValue":s[1]||(s[1]=n=>e.searchText=n),onKeyup:s[2]||(s[2]=X((...n)=>e.executeSearch&&e.executeSearch(...n),["enter"])),class:"block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500",placeholder:e.$t("search_bar.search_for"),required:""},null,40,kt)),[[Z,e.searchText]]),a("button",{onClick:s[3]||(s[3]=(...n)=>e.executeSearch&&e.executeSearch(...n)),class:"absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"},[Dt,a("span",Tt,_(e.$t("search_bar.search")),1)])])])}var Nt=S(yt,[["render",St]]);const Bt=C({name:"LinkButton",props:{disabled:{type:Boolean,default:()=>!1},href:{type:String},label:{type:String,default:()=>"Label"},target:{type:String,default:()=>"_blank"}},emits:{clicked:()=>!0}}),Mt=["href","target","disabled"];function It(e,s,d,h,l,m){return i(),p("div",null,[a("a",{type:"button",href:e.disabled?"#":e.href,target:e.disabled?"":e.target,disabled:e.disabled,onClick:s[0]||(s[0]=t=>this.$emit("clicked")),class:k([e.disabled?"bg-gray-300":"bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300","text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"])},_(e.label),11,Mt)])}var At=S(Bt,[["render",It]]);function Et(){const e=L([]),d=L({hasNext:!1}),h=L([]),l=x(""),m=x(!1),t=Y({doctype:"Customer",fields:["*"],orderBy:"plot_link asc",filters:{customer_group:"Tenant"},start:0,pageLength:20}),n=q({url:"/api/method/erpnext_kleingartenverein.api.search_tenants"}),o=q({url:"/api/method/erpnext_kleingartenverein.api.get_plot_tags"});function b(r){var $;let u=r;if(u.selected=h.findIndex(w=>w.name===u.name)>-1,o.data){const w=(($=u._user_tags)!=null?$:"").split(","),N=o.data.find(A=>A.name===u.plot_link);if(N)for(const A of N.tags)w.findIndex(G=>G===A)===-1&&(u._user_tags=u._user_tags+","+A)}return u}function c(r){return r.map(b)}K(t,()=>{if(d.hasNext=t.hasNextPage,t.data){if(t.start===0){y();let r=c(t.data);e.push(...r)}else e.push(...c(t.data.slice(t.start,t.start+t.pageLength)));m.value=e.length>0}else y(),m.value=!1}),ee(l,r=>{g(l.value)},{throttle:1e3});const g=(r,u="")=>{if(!r||r.trim()===""){y(),B();return}y(),n.reset(),n.fetch({query:r,filter:u}).then(()=>{if(d.hasNext=n.hasNextPage,n.data){n.start===0&&e.splice(0,e.length);let $=c(n.data);e.push(...$)}else e.splice(0,e.length)})},f=()=>j(this,null,function*(){return t.next()}),B=()=>j(this,null,function*(){yield o.fetch(),yield t.list.fetch()}),y=()=>{e.splice(0,e.length)},F=L([{selected:!1,text:"search_bar.status_under_supervision"}]),T=r=>e.find(u=>u.name===r),M=r=>{const u=T(r);u&&(u.selected=!0,h.findIndex(w=>w.name===r)===-1&&h.push(u))};return{tenants:e,searchText:l,loadMore:f,search:g,pageInfo:d,fetch:B,clear:y,filters:F,byName:T,selection:h,select:M,unselect:r=>{const u=T(r);if(u){u.selected=!1;const $=h.findIndex(w=>w.name===r);$>-1&&h.splice($,1)}},hasItems:m,selectAll:()=>{for(const r of e)M(r.name)}}}export{Ve as D,st as I,At as L,Nt as T,Vt as a,it as b,Et as u};
