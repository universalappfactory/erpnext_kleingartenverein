/* empty css              */import{c as L,a as T,d as E,b as A,e as j,f,w as x,o as N,g as P,h as m,_ as g,i,j as l,k as a,t as u,l as k,u as O,r as w,m as v,F as $,n as B,p as V,q as b,s as D,v as z,x as U,y as S,z as q,B as F,A as H}from"./vendor.31bbe92c.js";const K="modulepreload",C={},W="/assets/erpnext_kleingartenverein/frontend/pub/",_=function(s,t){return!t||t.length===0?s():Promise.all(t.map(n=>{if(n=`${W}${n}`,n in C)return;C[n]=!0;const d=n.endsWith(".css"),c=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${c}`))return;const o=document.createElement("link");if(o.rel=d?"stylesheet":K,d||(o.as="script",o.crossOrigin=""),o.href=n,document.head.appendChild(o),d)return new Promise((r,h)=>{o.addEventListener("load",r),o.addEventListener("error",h)})})).then(()=>s())},Z=[{path:"/calendar",name:"Kalender",component:()=>_(()=>import("./Calendar.99d13679.js"),["assets/Calendar.99d13679.js","assets/Calendar.2f59f770.css","assets/vendor.31bbe92c.js","assets/vendor.911f9fdb.css"]),meta:{title:"Termine"}},{path:"/termine",name:"Termine",component:()=>_(()=>import("./Calendar.99d13679.js"),["assets/Calendar.99d13679.js","assets/Calendar.2f59f770.css","assets/vendor.31bbe92c.js","assets/vendor.911f9fdb.css"]),meta:{title:"Termine"}},{path:"/kalender",name:"Kalender2",component:()=>_(()=>import("./Calendar.99d13679.js"),["assets/Calendar.99d13679.js","assets/Calendar.2f59f770.css","assets/vendor.31bbe92c.js","assets/vendor.911f9fdb.css"]),meta:{title:"Termine"}},{path:"/counter",name:"Counter",component:()=>_(()=>import("./CounterUpload.29960222.js"),["assets/CounterUpload.29960222.js","assets/vendor.31bbe92c.js","assets/vendor.911f9fdb.css"]),meta:{title:"Z\xE4hlerst\xE4nde"}}];let G=L({history:T("/service"),routes:Z});const J={user:"",email:""};function M(e){return e.hasOwnProperty("href")}function R(e){return e.hasOwnProperty("doctype")}const y=E("dashboardStore",{state:()=>({navigationItems:[],readMarkerItems:[],user:J}),getters:{navigation:e=>e.navigationItems,readMarkers:e=>e.readMarkerItems,currentUser:e=>e.user,isUnread:e=>s=>e.readMarkerItems.find(t=>t.document===s)!==void 0},actions:{clearNavigation(){this.navigationItems.splice(0,this.navigationItems.length)},clearReadMarkers(){this.readMarkerItems.splice(0,this.readMarkerItems.length)},replaceItems(e){e.length!=0&&(M(e[0])&&(this.clearNavigation(),this.navigationItems.push(...e)),R(e[0])&&(this.clearReadMarkers(),this.readMarkers.push(...e)))},appendItems(e){e.length!=0&&(e[0],M(e[0])&&this.navigationItems.push(...e),R(e[0])&&this.readMarkers.push(...e))},append(e){this.appendItems([e])},replace(e){this.replaceItems([e])},calculateOpenCount(){for(const e of this.navigation){const s=this.readMarkers.filter(t=>t.doctype===e.read_marker_doctype).map(t=>t.count).reduce((t,n)=>t+n,0);e.openCount=s}}}});function Q(){let e;const s=j({doctype:"Event",fields:["*"],filters:{event_type:"Public",status:"Open"},orderBy:"starts_on asc",start:0,pageLength:20,url:"/api/method/erpnext_kleingartenverein.dashboard_api.get_dashboard_navigation"});s.fetch();const t=f({url:"/api/method/erpnext_kleingartenverein.dashboard_api.get_unread_document_count"}),n=f({url:"/api/method/erpnext_kleingartenverein.dashboard_api.get_user_info"});n.fetch();const d=f({url:"/api/method/erpnext_kleingartenverein.dashboard_api.mark_as_read"}),c=function(r){!r||(r.length>0?e==null||e.appendItems(r):e==null||e.clearReadMarkers(),e==null||e.calculateOpenCount())};return x(t,()=>{c(t.data)}),x(s,()=>{for(const r of s.data)e==null||e.append({displayTitle:r.displayTitle,href:r.href,icon:r.icon,mode:r.mode,openCount:0,read_marker_doctype:r.read_marker_doctype});t.fetch()}),N(()=>{e=y(),e.clearNavigation(),e.clearReadMarkers()}),P(()=>{}),{readMarker:t,userInfo:n,markAsRead:function(r,h){e.clearReadMarkers(),d.submit({doctype:r,name:h}).then(()=>{t.reset(),t.fetch()})}}}const I=A(Q),X=m({name:"Logo",setup(){return{dashboard:I()}}}),Y={class:"sm:block"},ee=["src"];function te(e,s,t,n,d,c){var o,r;return i(),l("div",Y,[a("img",{src:(r=(o=e.dashboard.userInfo)==null?void 0:o.data)==null?void 0:r.default_logo,class:"h-24",alt:"Logo"},null,8,ee)])}var re=g(X,[["render",te]]);const ae={id:"dropdown-cta",class:"p-4 mt-6 rounded-lg bg-blue-50",role:"alert"},se={class:"flex items-center mb-3"},ne={class:"bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded"},oe=a("button",{type:"button",class:"ml-auto -mx-1.5 -my-1.5 bg-blue-50 inline-flex justify-center items-center w-6 h-6 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 h-6 w-6","data-dismiss-target":"#dropdown-cta","aria-label":"Close"},[a("span",{class:"sr-only"},"Close"),a("svg",{class:"w-2.5 h-2.5","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 14 14"},[a("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"})])],-1),ie={class:"mb-3 text-sm text-blue-800"},le=["href"],de=m({__name:"NavbarCta",props:{headline:{},message:{},url:{},linktext:{}},emits:["loadMore","clicked"],setup(e,{emit:s}){return(t,n)=>(i(),l("div",ae,[a("div",se,[a("span",ne,u(t.headline),1),oe]),a("p",ie,u(t.message),1),t.url?(i(),l("a",{key:0,class:"text-sm text-blue-800 underline font-medium hover:text-blue-900",href:t.url},u(t.linktext),9,le)):k("",!0)]))}}),ce=m({name:"navbar",components:{Logo:re,NavbarCta:de},setup(){const e=I(),s=O(),t=y();return{dashboard:e,route:s,store:t}},methods:{navigateTo(e){e.href.toLocaleLowerCase()!==`/${this.$route.name.toLocaleLowerCase()}`&&e.href&&this.$router.push(e.href)},isRouter(e){return e.mode==="NavigationMode.Router"}}}),ue={class:"sm:hidden flex items-center justify-start"},pe=a("button",{"data-drawer-target":"default-sidebar","data-drawer-toggle":"default-sidebar","aria-controls":"default-sidebar","data-drawer-backdrop":"true",type:"button",class:"inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"},[a("span",{class:"sr-only"},"Open sidebar"),a("svg",{class:"w-6 h-6","aria-hidden":"true",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[a("path",{"clip-rule":"evenodd","fill-rule":"evenodd",d:"M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"})])],-1),he={class:"md:hidden flex ml-2 md:mr-24 items-center w-full justify-center"},me={id:"default-sidebar",class:"fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0",tabindex:"-1","aria-labelledby":"drawer-backdrop-label"},_e={class:"h-full px-3 py-4 overflow-y-auto bg-gray-50"},fe=V('<h5 id="drawer-disabled-backdrop-label" class="text-base font-semibold text-gray-500 uppercase ml-5 mb-4"> Menu </h5><button type="button" data-drawer-hide="default-sidebar" aria-controls="default-sidebar" class="block md:hidden text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg><span class="sr-only">Close menu</span></button>',2),ge={class:"space-y-2 font-medium"},ve=["onClick"],be={class:"ml-3 cursor-pointer"},ye={key:0,class:"text-sm relative inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-30"},xe=["href"],ke={class:"ml-3"},we={class:"hidden sm:block ml-64"},$e={class:"flex justify-center"};function Ce(e,s,t,n,d,c){const o=w("Logo");return i(),l($,null,[a("div",ue,[pe,a("a",he,[v(o)])]),a("aside",me,[a("div",_e,[fe,a("ul",ge,[(i(!0),l($,null,B(e.store.navigation,r=>(i(),l("li",{class:b(e.isRouter(r)&&r.href===e.route.path?"bg-green-100":""),key:r.displayTitle},[e.isRouter(r)?(i(),l("a",{key:0,onClick:h=>e.navigateTo(r),class:"flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"},[a("i",{class:b(["fa text-gray-500 text-6xl",r.icon])},null,2),a("div",be,[D(u(r.displayTitle)+" ",1),r.openCount>0?(i(),l("div",ye,u(r.openCount),1)):k("",!0)])],8,ve)):(i(),l("a",{key:1,href:r.href,target:"_blank",class:"flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"},[a("i",{class:b(["fa text-gray-500 text-6xl",r.icon])},null,2),a("span",ke,u(r.displayTitle),1)],8,xe))],2))),128))])])]),a("div",we,[a("div",$e,[v(o)])])],64)}var Me=g(ce,[["render",Ce]]);const Re=m({name:"App",components:{Navbar:Me},setup(){return{dashboardStore:y()}},mounted(){}}),Ie={class:"w-full"};function Le(e,s,t,n,d,c){const o=w("router-view");return i(),l("div",Ie,[v(o)])}var Te=g(Re,[["render",Le]]);const Ee=z(),p=U(Te);S("resourceFetcher",H);p.use(Ee);p.use(G);p.use(q);p.component("Button",F);p.mount("#app");
