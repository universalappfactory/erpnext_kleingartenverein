/* empty css              */import{c as M,a as L,d as T,b as A,e as E,f as h,w as k,o as N,g as P,h as f,_ as m,i as l,j as c,k as s,u as j,r as x,l as _,F as w,m as O,n as B,p as g,q as V,t as v,s as z,v as D,x as S,y as U,z as q,B as F,A as H}from"./vendor.4d780664.js";const K="modulepreload",$={},W="/assets/erpnext_kleingartenverein/frontend/pub/",y=function(n,r){return!r||r.length===0?n():Promise.all(r.map(o=>{if(o=`${W}${o}`,o in $)return;$[o]=!0;const i=o.endsWith(".css"),d=i?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${d}`))return;const a=document.createElement("link");if(a.rel=i?"stylesheet":K,i||(a.as="script",a.crossOrigin=""),a.href=o,document.head.appendChild(a),i)return new Promise((t,p)=>{a.addEventListener("load",t),a.addEventListener("error",p)})})).then(()=>n())},G=[{path:"/calendar",name:"Kalender",component:()=>y(()=>import("./Calendar.7c1208f4.js"),["assets/Calendar.7c1208f4.js","assets/Calendar.2f59f770.css","assets/vendor.4d780664.js","assets/vendor.911f9fdb.css"]),meta:{title:"Termine"}},{path:"/termine",name:"Termine",component:()=>y(()=>import("./Calendar.7c1208f4.js"),["assets/Calendar.7c1208f4.js","assets/Calendar.2f59f770.css","assets/vendor.4d780664.js","assets/vendor.911f9fdb.css"]),meta:{title:"Termine"}},{path:"/kalender",name:"Kalender2",component:()=>y(()=>import("./Calendar.7c1208f4.js"),["assets/Calendar.7c1208f4.js","assets/Calendar.2f59f770.css","assets/vendor.4d780664.js","assets/vendor.911f9fdb.css"]),meta:{title:"Termine"}}];let J=M({history:L("/service"),routes:G});const Q={user:"",email:""};function C(e){return e.hasOwnProperty("href")}function R(e){return e.hasOwnProperty("doctype")}const b=T("dashboardStore",{state:()=>({navigationItems:[],readMarkerItems:[],user:Q}),getters:{navigation:e=>e.navigationItems,readMarkers:e=>e.readMarkerItems,currentUser:e=>e.user,isUnread:e=>n=>e.readMarkerItems.find(r=>r.document===n)!==void 0},actions:{clearNavigation(){this.navigationItems.splice(0,this.navigationItems.length)},clearReadMarkers(){this.readMarkerItems.splice(0,this.readMarkerItems.length)},replaceItems(e){e.length!=0&&(C(e[0])&&(this.clearNavigation(),this.navigationItems.push(...e)),R(e[0])&&(this.clearReadMarkers(),this.readMarkers.push(...e)))},appendItems(e){e.length!=0&&(e[0],C(e[0])&&this.navigationItems.push(...e),R(e[0])&&this.readMarkers.push(...e))},append(e){this.appendItems([e])},replace(e){this.replaceItems([e])},calculateOpenCount(){for(const e of this.navigation){const n=this.readMarkers.filter(r=>r.doctype===e.read_marker_doctype).map(r=>r.count).reduce((r,o)=>r+o,0);e.openCount=n}}}});function X(){let e;const n=E({doctype:"Event",fields:["*"],filters:{event_type:"Public",status:"Open"},orderBy:"starts_on asc",start:0,pageLength:20,url:"/api/method/erpnext_kleingartenverein.api.get_dashboard_navigation"});n.fetch();const r=h({url:"/api/method/erpnext_kleingartenverein.api.get_unread_document_count"}),o=h({url:"/api/method/erpnext_kleingartenverein.api.get_user_info"});o.fetch();const i=h({url:"/api/method/erpnext_kleingartenverein.api.mark_as_read"}),d=function(t){!t||(t.length>0?e==null||e.appendItems(t):e==null||e.clearReadMarkers(),e==null||e.calculateOpenCount())};return k(r,()=>{d(r.data)}),k(n,()=>{for(const t of n.data)e==null||e.append({displayTitle:t.displayTitle,href:t.href,icon:t.icon,mode:t.mode,openCount:0,read_marker_doctype:t.read_marker_doctype});r.fetch()}),N(()=>{e=b(),e.clearNavigation(),e.clearReadMarkers()}),P(()=>{}),{readMarker:r,userInfo:o,markAsRead:function(t,p){e.clearReadMarkers(),i.submit({doctype:t,name:p}),r.reset(),r.fetch()}}}const I=A(X),Y=f({name:"Logo",setup(){return{dashboard:I()}}}),Z={class:"sm:block"},ee=["src"];function te(e,n,r,o,i,d){var a,t;return l(),c("div",Z,[s("img",{src:(t=(a=e.dashboard.userInfo)==null?void 0:a.data)==null?void 0:t.default_logo,class:"h-24",alt:"Logo"},null,8,ee)])}var re=m(Y,[["render",te]]);const ae=f({name:"navbar",components:{Logo:re},setup(){const e=I(),n=j(),r=b();return{dashboard:e,route:n,store:r}},methods:{navigateTo(e){e.href.toLocaleLowerCase()!==`/${this.$route.name.toLocaleLowerCase()}`&&e.href&&this.$router.push(e.href)},isRouter(e){return e.mode==="NavigationMode.Router"}}}),se={class:"sm:hidden flex items-center justify-start"},ne=s("button",{"data-drawer-target":"default-sidebar","data-drawer-toggle":"default-sidebar","aria-controls":"default-sidebar","data-drawer-backdrop":"true",type:"button",class:"inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"},[s("span",{class:"sr-only"},"Open sidebar"),s("svg",{class:"w-6 h-6","aria-hidden":"true",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[s("path",{"clip-rule":"evenodd","fill-rule":"evenodd",d:"M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"})])],-1),oe={class:"md:hidden flex ml-2 md:mr-24 items-center w-full justify-center"},ie={id:"default-sidebar",class:"fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0",tabindex:"-1","aria-labelledby":"drawer-backdrop-label"},le={class:"h-full px-3 py-4 overflow-y-auto bg-gray-50"},ce=B('<h5 id="drawer-disabled-backdrop-label" class="text-base font-semibold text-gray-500 uppercase ml-5 mb-4"> Menu </h5><button type="button" data-drawer-hide="default-sidebar" aria-controls="default-sidebar" class="block md:hidden text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg><span class="sr-only">Close menu</span></button>',2),de={class:"space-y-2 font-medium"},ue=["onClick"],pe={class:"ml-3 cursor-pointer"},he={key:0,class:"text-sm relative inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-30"},fe=["href"],me={class:"ml-3"},_e={class:"hidden sm:block ml-64"},ge={class:"flex justify-center"};function ve(e,n,r,o,i,d){const a=x("Logo");return l(),c(w,null,[s("div",se,[ne,s("a",oe,[_(a)])]),s("aside",ie,[s("div",le,[ce,s("ul",de,[(l(!0),c(w,null,O(e.store.navigation,t=>(l(),c("li",{class:g(e.isRouter(t)&&t.href===e.route.path?"bg-green-100":""),key:t.displayTitle},[e.isRouter(t)?(l(),c("a",{key:0,onClick:p=>e.navigateTo(t),class:"flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"},[s("i",{class:g(["fa text-gray-500 text-6xl",t.icon])},null,2),s("div",pe,[V(v(t.displayTitle)+" ",1),t.openCount>0?(l(),c("div",he,v(t.openCount),1)):z("",!0)])],8,ue)):(l(),c("a",{key:1,href:t.href,class:"flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"},[s("i",{class:g(["fa text-gray-500 text-6xl",t.icon])},null,2),s("span",me,v(t.displayTitle),1)],8,fe))],2))),128))])])]),s("div",_e,[s("div",ge,[_(a)])])],64)}var ye=m(ae,[["render",ve]]);const be=f({name:"App",components:{Navbar:ye},setup(){return{dashboardStore:b()}},mounted(){}}),ke={class:"w-full"};function xe(e,n,r,o,i,d){const a=x("router-view");return l(),c("div",ke,[_(a)])}var we=m(be,[["render",xe]]);const $e=D(),u=S(we);U("resourceFetcher",H);u.use($e);u.use(J);u.use(q);u.component("Button",F);u.mount("#app");
