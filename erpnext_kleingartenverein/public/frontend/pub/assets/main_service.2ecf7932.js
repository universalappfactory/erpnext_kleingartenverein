/* empty css              */import{c as R,a as E,d as P,b as T,e as B,f as g,w as y,o as A,g as N,h as m,_ as f,i,j as l,k as n,t as u,l as w,u as z,r as x,m as b,F as C,n as D,p as j,q as v,s as O,v as V,x as S,y as Z,z as U,A as F,B as H,C as q}from"./vendor.cb63786a.js";const K="modulepreload",$={},W="/assets/erpnext_kleingartenverein/frontend/pub/",_=function(a,t){return!t||t.length===0?a():Promise.all(t.map(s=>{if(s=`${W}${s}`,s in $)return;$[s]=!0;const c=s.endsWith(".css"),d=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${d}`))return;const o=document.createElement("link");if(o.rel=c?"stylesheet":K,c||(o.as="script",o.crossOrigin=""),o.href=s,document.head.appendChild(o),c)return new Promise((r,p)=>{o.addEventListener("load",r),o.addEventListener("error",p)})})).then(()=>a())},G=[{path:"/calendar",name:"Kalender",component:()=>_(()=>import("./Calendar.2e5b25c9.js"),["assets/Calendar.2e5b25c9.js","assets/Calendar.2f59f770.css","assets/vendor.cb63786a.js","assets/vendor.911f9fdb.css"]),meta:{title:"Termine"}},{path:"/termine",name:"Termine",component:()=>_(()=>import("./Calendar.2e5b25c9.js"),["assets/Calendar.2e5b25c9.js","assets/Calendar.2f59f770.css","assets/vendor.cb63786a.js","assets/vendor.911f9fdb.css"]),meta:{title:"Termine"}},{path:"/kalender",name:"Kalender2",component:()=>_(()=>import("./Calendar.2e5b25c9.js"),["assets/Calendar.2e5b25c9.js","assets/Calendar.2f59f770.css","assets/vendor.cb63786a.js","assets/vendor.911f9fdb.css"]),meta:{title:"Termine"}},{path:"/counter",name:"Counter",component:()=>_(()=>import("./CounterUpload.65a11eb6.js"),["assets/CounterUpload.65a11eb6.js","assets/vendor.cb63786a.js","assets/vendor.911f9fdb.css"]),meta:{title:"Z\xE4hlerst\xE4nde"}}];let J=R({history:E("/service"),routes:G});const Q={user:"",email:""};function M(e){return e.hasOwnProperty("href")}function I(e){return e.hasOwnProperty("doctype")}const k=P("dashboardStore",{state:()=>({navigationItems:[],readMarkerItems:[],user:Q}),getters:{navigation:e=>e.navigationItems,readMarkers:e=>e.readMarkerItems,currentUser:e=>e.user,isUnread:e=>a=>e.readMarkerItems.find(t=>t.document===a)!==void 0},actions:{clearNavigation(){this.navigationItems.splice(0,this.navigationItems.length)},clearReadMarkers(){this.readMarkerItems.splice(0,this.readMarkerItems.length)},replaceItems(e){e.length!=0&&(M(e[0])&&(this.clearNavigation(),this.navigationItems.push(...e)),I(e[0])&&(this.clearReadMarkers(),this.readMarkers.push(...e)))},appendItems(e){e.length!=0&&(e[0],M(e[0])&&this.navigationItems.push(...e),I(e[0])&&this.readMarkers.push(...e))},append(e){this.appendItems([e])},replace(e){this.replaceItems([e])},calculateOpenCount(){for(const e of this.navigation){const a=this.readMarkers.filter(t=>t.doctype===e.read_marker_doctype).map(t=>t.count).reduce((t,s)=>t+s,0);e.openCount=a}}}});function X(){let e;const a=B({doctype:"Event",fields:["*"],filters:{event_type:"Public",status:"Open"},orderBy:"starts_on asc",start:0,pageLength:20,url:"/api/method/erpnext_kleingartenverein.dashboard_api.get_dashboard_navigation"});a.fetch();const t=g({url:"/api/method/erpnext_kleingartenverein.dashboard_api.get_unread_document_count"}),s=g({url:"/api/method/erpnext_kleingartenverein.dashboard_api.get_user_info"});s.fetch();const c=g({url:"/api/method/erpnext_kleingartenverein.dashboard_api.mark_as_read"}),d=function(r){!r||(r.length>0?e==null||e.appendItems(r):e==null||e.clearReadMarkers(),e==null||e.calculateOpenCount())};return y(t,()=>{d(t.data)}),y(a,()=>{for(const r of a.data)e==null||e.append({displayTitle:r.displayTitle,href:r.href,icon:r.icon,mode:r.mode,openCount:0,read_marker_doctype:r.read_marker_doctype});t.fetch()}),A(()=>{e=k(),e.clearNavigation(),e.clearReadMarkers()}),N(()=>{}),{readMarker:t,userInfo:s,markAsRead:function(r,p){e.clearReadMarkers(),c.submit({doctype:r,name:p}).then(()=>{t.reset(),t.fetch()})}}}const L=T(X),Y=m({name:"Logo",setup(){return{dashboard:L()}}}),ee={class:"sm:block"},te=["src"];function re(e,a,t,s,c,d){var o,r;return i(),l("div",ee,[n("img",{src:(r=(o=e.dashboard.userInfo)==null?void 0:o.data)==null?void 0:r.default_logo,class:"h-24",alt:"Logo"},null,8,te)])}var ne=f(Y,[["render",re]]);const ae={id:"dropdown-cta",class:"p-4 mt-6 rounded-lg bg-blue-50",role:"alert"},se={class:"flex items-center mb-3"},oe={class:"bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded"},ie=n("button",{type:"button",class:"ml-auto -mx-1.5 -my-1.5 bg-blue-50 inline-flex justify-center items-center w-6 h-6 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 h-6 w-6","data-dismiss-target":"#dropdown-cta","aria-label":"Close"},[n("span",{class:"sr-only"},"Close"),n("svg",{class:"w-2.5 h-2.5","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 14 14"},[n("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"})])],-1),le={class:"mb-3 text-sm text-blue-800"},ce=["href"],de=m({__name:"NavbarCta",props:{headline:{},message:{},url:{},linktext:{}},emits:["loadMore","clicked"],setup(e,{emit:a}){return(t,s)=>(i(),l("div",ae,[n("div",se,[n("span",oe,u(t.headline),1),ie]),n("p",le,u(t.message),1),t.url?(i(),l("a",{key:0,class:"text-sm text-blue-800 underline font-medium hover:text-blue-900",href:t.url},u(t.linktext),9,ce)):w("",!0)]))}}),ue=m({name:"navbar",components:{Logo:ne,NavbarCta:de},setup(){const e=L(),a=z(),t=k();return{dashboard:e,route:a,store:t}},methods:{navigateTo(e){e.href.toLocaleLowerCase()!==`/${this.$route.name.toLocaleLowerCase()}`&&e.href&&this.$router.push(e.href)},isRouter(e){return e.mode==="NavigationMode.Router"}}}),he={class:"sm:hidden flex items-center justify-start"},pe=n("button",{"data-drawer-target":"default-sidebar","data-drawer-toggle":"default-sidebar","aria-controls":"default-sidebar","data-drawer-backdrop":"true",type:"button",class:"inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"},[n("span",{class:"sr-only"},"Open sidebar"),n("svg",{class:"w-6 h-6","aria-hidden":"true",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[n("path",{"clip-rule":"evenodd","fill-rule":"evenodd",d:"M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"})])],-1),me={class:"md:hidden flex ml-2 md:mr-24 items-center w-full justify-center"},_e={id:"default-sidebar",class:"fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0",tabindex:"-1","aria-labelledby":"drawer-backdrop-label"},ge={class:"h-full px-3 py-4 overflow-y-auto bg-gray-50"},fe=j('<h5 id="drawer-disabled-backdrop-label" class="text-base font-semibold text-gray-500 uppercase ml-5 mb-4"> Menu </h5><button type="button" data-drawer-hide="default-sidebar" aria-controls="default-sidebar" class="block md:hidden text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg><span class="sr-only">Close menu</span></button>',2),be={class:"space-y-2 font-medium"},ve=["onClick"],ke={class:"ml-3 cursor-pointer"},ye={key:0,class:"text-sm relative inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-30"},we=["href"],xe={class:"ml-3"},Ce={class:"hidden sm:block ml-64"},$e={class:"flex justify-center"};function Me(e,a,t,s,c,d){const o=x("Logo");return i(),l(C,null,[n("div",he,[pe,n("a",me,[b(o)])]),n("aside",_e,[n("div",ge,[fe,n("ul",be,[(i(!0),l(C,null,D(e.store.navigation,r=>(i(),l("li",{class:v(e.isRouter(r)&&r.href===e.route.path?"bg-green-100":""),key:r.displayTitle},[e.isRouter(r)?(i(),l("a",{key:0,onClick:p=>e.navigateTo(r),class:"flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"},[n("i",{class:v(["fa text-gray-500 text-6xl",r.icon])},null,2),n("div",ke,[O(u(r.displayTitle)+" ",1),r.openCount>0?(i(),l("div",ye,u(r.openCount),1)):w("",!0)])],8,ve)):(i(),l("a",{key:1,href:r.href,target:"_blank",class:"flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"},[n("i",{class:v(["fa text-gray-500 text-6xl",r.icon])},null,2),n("span",xe,u(r.displayTitle),1)],8,we))],2))),128))])])]),n("div",Ce,[n("div",$e,[b(o)])])],64)}var Ie=f(ue,[["render",Me]]);const Le=m({name:"App",components:{Navbar:Ie},setup(){return{dashboardStore:k()}},mounted(){}}),Re={class:"w-full"};function Ee(e,a,t,s,c,d){const o=x("router-view");return i(),l("div",Re,[b(o)])}var Pe=f(Le,[["render",Ee]]);const Te={counter_upload:{headline:"Upload counter values",head_info:"Please note:",head_info_long:"There will be a message when the submission was successful",tenant:"Tenant",tenant_placeholder:"Name of tenant",garden_number:"Plotnumber",counter:"Counter",counter_value:"Counter value",counter_value_hint1:"",counter_value_hint2:"",counter_picture:"Picture of the counter",counter_select_picture:"Please select a picture",counter_delete_picture:"Delete",email_hint1:"",email_hint2:"",submitting:"Submitting",error:"Error",success:"Submission was succesful, thanks",submit:"Submit",filesizeError:"Max 10MB",sendConfirmationMail:"Send confirmation mail",tenant_error:"Tenant",plot_error:"Plotnumber",counter_value_error:"Counter"}},Be={counter_upload:{headline:"Hallo, hier k\xF6nnt ihr euere Z\xE4hlerst\xE4nde hochladen.",head_info:"Bitte beachtet:",head_info_long:"Nach dem klick auf \xDCbertragen wird ein Hinweis angezeigt, ob alles geklappt hat!",tenant:"P\xE4chter",tenant_placeholder:"Name des P\xE4chters",garden_number:"Gartennummer",counter:"Z\xE4hler",counter_value:"Z\xE4hlerstand",counter_value_hint1:"Z\xE4hlerstand in Kubikmeter (z.B. 19.3)",counter_value_hint2:"Als Dezimaltrennzeichen einen Punkt verwenden",counter_picture:"Foto von dem Z\xE4hlerstand hinzuf\xFCgen",counter_select_picture:"Bitte w\xE4hlen Sie ein Bild aus",counter_delete_picture:"L\xF6schen",email_hint1:"Wenn ihr eine EMail Adresse bei uns hinterlegt habt, k\xF6nnen wir euch eine Best\xE4tigung senden sobald die Z\xE4hlerst\xE4nde eingetragen und gepr\xFCft sind.",email_hint2:"Das kann ein paar Tage dauern.",submitting:"Daten werden \xFCbertagen",error:"Es ist ein Fehler aufgetreten",success:"Vielen Dank, ihre Daten wurden erfolgreich \xFCbertragen",submit:"\xDCbertragen",filesizeError:"Es sind maximal 10MB erlaubt!",sendConfirmationMail:"Best\xE4tigungs EMail senden",tenant_error:"P\xE4chtername muss angegeben werden",plot_error:"Gartennummer",counter_value_error:"Z\xE4hlerstand"}};var Ae={en:Te,de:Be};const Ne=V({messages:Ae,locale:"de",fallbackLocale:"en"}),ze=S(),h=Z(Pe);U("resourceFetcher",q);h.use(ze);h.use(J);h.use(F);h.use(Ne);h.component("Button",H);h.mount("#app");