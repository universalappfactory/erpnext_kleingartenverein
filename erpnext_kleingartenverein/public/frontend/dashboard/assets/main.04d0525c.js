/* empty css              */import{c as I,a as R,d as P,b as A,e as N,f as g,w,o as T,g as B,h as m,_ as b,i,j as l,k as n,t as p,l as x,u as V,r as v,m as f,F as C,n as O,p as S,q as y,s as j,v as z,x as D,y as F,z as U,A as G,B as q,C as K}from"./vendor.93fb9eca.js";const H="modulepreload",M={},W="/assets/erpnext_kleingartenverein/frontend/dashboard/",c=function(r,a){return!a||a.length===0?r():Promise.all(a.map(s=>{if(s=`${W}${s}`,s in M)return;M[s]=!0;const d=s.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${u}`))return;const o=document.createElement("link");if(o.rel=d?"stylesheet":H,d||(o.as="script",o.crossOrigin=""),o.href=s,document.head.appendChild(o),d)return new Promise((t,h)=>{o.addEventListener("load",t),o.addEventListener("error",h)})})).then(()=>r())},Z=[{path:"/",name:"Dashboard",component:()=>c(()=>import("./MyClub.86a6f665.js"),["assets/MyClub.86a6f665.js","assets/index.5450e21b.css","assets/vendor.93fb9eca.js","assets/vendor.911f9fdb.css"])},{path:"/paechter",name:"P\xE4chter",component:()=>c(()=>import("./Tenants.81bccff9.js"),["assets/Tenants.81bccff9.js","assets/Footer.6dd90ff1.js","assets/vendor.93fb9eca.js","assets/vendor.911f9fdb.css","assets/ListComponent.8234c5c8.js","assets/tenants.2be633cc.js","assets/Button.ce6c3d7b.js"])},{path:"/calendar",name:"Kalender",component:()=>c(()=>import("./InternalCalendar.afe9e730.js"),["assets/InternalCalendar.afe9e730.js","assets/InternalCalendar.d7c0ced3.css","assets/vendor.93fb9eca.js","assets/vendor.911f9fdb.css","assets/calendar.269324cb.js"])},{path:"/myclub",name:"MyClub",component:()=>c(()=>import("./MyClub.86a6f665.js"),["assets/MyClub.86a6f665.js","assets/index.5450e21b.css","assets/vendor.93fb9eca.js","assets/vendor.911f9fdb.css"])},{path:"/meetingminutes",name:"Bulletins",component:()=>c(()=>import("./MeetingMinutes.ba569d94.js"),["assets/MeetingMinutes.ba569d94.js","assets/index.5450e21b.css","assets/ListComponent.8234c5c8.js","assets/vendor.93fb9eca.js","assets/vendor.911f9fdb.css","assets/Footer.6dd90ff1.js","assets/calendar.269324cb.js"])},{path:"/profile",name:"Profile",component:()=>c(()=>import("./ProfilePage.5f4d83c6.js"),["assets/ProfilePage.5f4d83c6.js","assets/index.5450e21b.css","assets/vendor.93fb9eca.js","assets/vendor.911f9fdb.css"])},{path:"/letter",name:"Letter",component:()=>c(()=>import("./NewLetter.9e7eda6a.js").then(function(e){return e.u}),["assets/NewLetter.9e7eda6a.js","assets/NewLetter.f7dc34bb.css","assets/vendor.93fb9eca.js","assets/vendor.911f9fdb.css","assets/tenants.2be633cc.js","assets/Button.ce6c3d7b.js","assets/ListComponent.8234c5c8.js","assets/LoadingIndicator.af236d2e.js","assets/PageHeadline.89a343ba.js"])},{path:"/reports",name:"Reports",component:()=>c(()=>import("./Reports.a4630f28.js"),["assets/Reports.a4630f28.js","assets/Reports.67572a1d.css","assets/list.52fc1d50.js","assets/vendor.93fb9eca.js","assets/vendor.911f9fdb.css","assets/Button.ce6c3d7b.js","assets/ListComponent.8234c5c8.js","assets/PageHeadline.89a343ba.js"])},{path:"/bankstatements",name:"Bank Statements",component:()=>c(()=>import("./BankStatements.f3a4ab68.js"),["assets/BankStatements.f3a4ab68.js","assets/BankStatements.f12d7e5b.css","assets/list.52fc1d50.js","assets/vendor.93fb9eca.js","assets/vendor.911f9fdb.css","assets/Button.ce6c3d7b.js","assets/ListComponent.8234c5c8.js","assets/PageHeadline.89a343ba.js","assets/LoadingIndicator.af236d2e.js"])}];let J=I({history:R("/dashboard"),routes:Z});const Q={user:"",email:""};function E(e){return e.hasOwnProperty("href")}function L(e){return e.hasOwnProperty("doctype")}const k=P("dashboardStore",{state:()=>({navigationItems:[],readMarkerItems:[],user:Q}),getters:{navigation:e=>e.navigationItems,readMarkers:e=>e.readMarkerItems,currentUser:e=>e.user,isUnread:e=>r=>e.readMarkerItems.find(a=>a.document===r)!==void 0},actions:{clearNavigation(){this.navigationItems.splice(0,this.navigationItems.length)},clearReadMarkers(){this.readMarkerItems.splice(0,this.readMarkerItems.length)},replaceItems(e){e.length!=0&&(E(e[0])&&(this.clearNavigation(),this.navigationItems.push(...e)),L(e[0])&&(this.clearReadMarkers(),this.readMarkers.push(...e)))},appendItems(e){e.length!=0&&(e[0],E(e[0])&&this.navigationItems.push(...e),L(e[0])&&this.readMarkers.push(...e))},append(e){this.appendItems([e])},replace(e){this.replaceItems([e])},calculateOpenCount(){for(const e of this.navigation){const r=this.readMarkers.filter(a=>a.doctype===e.read_marker_doctype).map(a=>a.count).reduce((a,s)=>a+s,0);e.openCount=r}}}});function X(){let e;const r=N({doctype:"Event",fields:["*"],filters:{event_type:"Public",status:"Open"},orderBy:"starts_on asc",start:0,pageLength:20,url:"/api/method/erpnext_kleingartenverein.dashboard_api.get_dashboard_navigation"});r.fetch();const a=g({url:"/api/method/erpnext_kleingartenverein.dashboard_api.get_unread_document_count"}),s=g({url:"/api/method/erpnext_kleingartenverein.dashboard_api.get_user_info"});s.fetch();const d=g({url:"/api/method/erpnext_kleingartenverein.dashboard_api.mark_as_read"}),u=function(t){!t||(t.length>0?e==null||e.appendItems(t):e==null||e.clearReadMarkers(),e==null||e.calculateOpenCount())};return w(a,()=>{u(a.data)}),w(r,()=>{for(const t of r.data)e==null||e.append({displayTitle:t.displayTitle,href:t.href,icon:t.icon,mode:t.mode,openCount:0,read_marker_doctype:t.read_marker_doctype});a.fetch()}),T(()=>{e=k(),e.clearNavigation(),e.clearReadMarkers()}),B(()=>{}),{readMarker:a,userInfo:s,markAsRead:function(t,h){e.clearReadMarkers(),d.submit({doctype:t,name:h}).then(()=>{a.reset(),a.fetch()})}}}const $=A(X),Y=m({name:"Logo",setup(){return{dashboard:$()}}}),ee={class:"sm:block"},te=["src"];function ae(e,r,a,s,d,u){var o,t;return i(),l("div",ee,[n("img",{src:(t=(o=e.dashboard.userInfo)==null?void 0:o.data)==null?void 0:t.default_logo,class:"h-24",alt:"Logo"},null,8,te)])}var ne=b(Y,[["render",ae]]);const re={id:"dropdown-cta",class:"p-4 mt-6 rounded-lg bg-blue-50",role:"alert"},se={class:"flex items-center mb-3"},oe={class:"bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded"},ie=n("button",{type:"button",class:"ml-auto -mx-1.5 -my-1.5 bg-blue-50 inline-flex justify-center items-center w-6 h-6 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 h-6 w-6","data-dismiss-target":"#dropdown-cta","aria-label":"Close"},[n("span",{class:"sr-only"},"Close"),n("svg",{class:"w-2.5 h-2.5","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 14 14"},[n("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"})])],-1),le={class:"mb-3 text-sm text-blue-800"},de=["href"],ce=m({__name:"NavbarCta",props:{headline:{},message:{},url:{},linktext:{}},emits:["loadMore","clicked"],setup(e,{emit:r}){return(a,s)=>(i(),l("div",re,[n("div",se,[n("span",oe,p(a.headline),1),ie]),n("p",le,p(a.message),1),a.url?(i(),l("a",{key:0,class:"text-sm text-blue-800 underline font-medium hover:text-blue-900",href:a.url},p(a.linktext),9,de)):x("",!0)]))}}),ue=m({name:"navbar",components:{Logo:ne,NavbarCta:ce},setup(){const e=$(),r=V(),a=k();return{dashboard:e,route:r,store:a}},methods:{navigateTo(e){e.href.toLocaleLowerCase()!==`/${this.$route.name.toLocaleLowerCase()}`&&e.href&&this.$router.push(e.href)},isRouter(e){return e.mode==="NavigationMode.Router"}}}),pe={class:"sm:hidden flex items-center justify-start"},_e=n("button",{"data-drawer-target":"default-sidebar","data-drawer-toggle":"default-sidebar","aria-controls":"default-sidebar","data-drawer-backdrop":"true",type:"button",class:"inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"},[n("span",{class:"sr-only"},"Open sidebar"),n("svg",{class:"w-6 h-6","aria-hidden":"true",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[n("path",{"clip-rule":"evenodd","fill-rule":"evenodd",d:"M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"})])],-1),he={class:"md:hidden flex ml-2 md:mr-24 items-center w-full justify-center"},me={id:"default-sidebar",class:"fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0",tabindex:"-1","aria-labelledby":"drawer-backdrop-label"},fe={class:"h-full px-3 py-4 overflow-y-auto bg-gray-50"},ge=S('<h5 id="drawer-disabled-backdrop-label" class="text-base font-semibold text-gray-500 uppercase ml-5 mb-4"> Menu </h5><button type="button" data-drawer-hide="default-sidebar" aria-controls="default-sidebar" class="block md:hidden text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg><span class="sr-only">Close menu</span></button>',2),be={class:"space-y-2 font-medium"},ve=["onClick"],ye={class:"ml-3 cursor-pointer"},ke={key:0,class:"text-sm relative inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-30"},we=["href"],xe={class:"ml-3"},Ce={class:"hidden sm:block ml-64"},Me={class:"flex justify-center"};function Ee(e,r,a,s,d,u){const o=v("Logo");return i(),l(C,null,[n("div",pe,[_e,n("a",he,[f(o)])]),n("aside",me,[n("div",fe,[ge,n("ul",be,[(i(!0),l(C,null,O(e.store.navigation,t=>(i(),l("li",{class:y(e.isRouter(t)&&t.href===e.route.path?"bg-green-100":""),key:t.displayTitle},[e.isRouter(t)?(i(),l("a",{key:0,onClick:h=>e.navigateTo(t),class:"flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"},[n("i",{class:y(["fa text-gray-500 text-6xl",t.icon])},null,2),n("div",ye,[j(p(t.displayTitle)+" ",1),t.openCount>0?(i(),l("div",ke,p(t.openCount),1)):x("",!0)])],8,ve)):(i(),l("a",{key:1,href:t.href,target:"_blank",class:"flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"},[n("i",{class:y(["fa text-gray-500 text-6xl",t.icon])},null,2),n("span",xe,p(t.displayTitle),1)],8,we))],2))),128))])])]),n("div",Ce,[n("div",Me,[f(o)])])],64)}var Le=b(ue,[["render",Ee]]);const $e=m({name:"App",components:{Navbar:Le},setup(){return{dashboardStore:k()}},mounted(){}}),Ie={class:"w-full"};function Re(e,r,a,s,d,u){const o=v("Navbar"),t=v("router-view");return i(),l("div",Ie,[f(o),f(t)])}var Pe=b($e,[["render",Re]]);const Ae={common:{no_data:"No Data"},dashboad:{myclub:"My Club"},myclub:{myclub:"My Club",welcome:"Welcome"},profile:{mysignature:"My Signature"},list:{load_more:"Load more"},tenant_list:{select_placeholder:"Select a filter",group_tenant:"Tenant",group_member:"Member",group_former_tenant:"Former Tenant",select_tag:"Select a tag",open_in_desk:"Open in desk",counter_upload:"Counter upload"},tenant_editor:{base_data:"Base data",first_name:"First name",last_name:"Last name",contact_data:"Contact data",address_data:"Address data",email:"EMail",zip:"Zip",city:"City",street:"Street",address_line_2:"Address line 2",mobile_no:"Mobil",phone:"Telefon",close:"Close",attachments:"Attachments",plot:"Plot",plot_number:"Plotnumber",plot_size_sqm:"Plot size (sqm)",plot_attachments:"Plot Attachments"},search_bar:{status_under_lease:"Under Lease",status_not_under_lease:"Not under lease",status_under_supervision:"Under supervision",status_canceled_by_lessee:"Canceled by lessee",status_canceled_by_club:"Canceled by club",search_for:"First Name, Name, Plot, EMail...",filter:"Filter",search:"Search"},new_letter:{headline:"Create a new letter",recipients:"Recipients",template:"Template",no_recipients:"No recipients selected",add_recipients:"Add recipients",select_template:"Select a template",show_preview:"Print preview",print_letters:"Create letters",letter_description:"Internal description",search_hint:"Search for a recipient",error_while_shipping:"An error occured while shipping",open_all:"Open all",edit_templates:"Edit templates"},reports:{headline:"Reports"},bankstatements:{headline:"Bank Statements",upload:"Upload",show_bank_transactions:"Show bank transactions"},fileupload:{upload:"Upload"}},Ne={common:{no_data:"Keine Daten vorhanden"},myclub:{myclub:"Mein Kleingartenverein",welcome:"Hallo"},profile:{mysignature:"Meine Unterschrift"},list:{load_more:"Weitere laden"},search_bar:{status_under_lease:"Verpachtet",status_not_under_lease:"Nicht verpachtet",status_under_supervision:"Unter Beobachtung",status_canceled_by_lessee:"Gek\xFCndigt durch P\xE4chter",status_canceled_by_club:"Gek\xFCndigkt durch den Verein",search_for:"Vorname, Name, Gartennummer, EMail...",filter:"Filter",search:"Suchen"},tenant_editor:{base_data:"Basis Daten",first_name:"Vorname",last_name:"Nachname",contact_data:"Kontaktdaten",address_data:"Adresse",email:"EMail",zip:"PLZ",city:"Ort",street:"Stra\xDFe",address_line_2:"Zusatz",mobile_no:"Mobil",phone:"Telefon",close:"Schlie\xDFen",attachments:"Anh\xE4nge",plot:"Garten",plot_number:"Gartennummer",plot_size_sqm:"Gr\xF6\xDFe (qm)",plot_attachments:"Garten Anh\xE4nge"},new_letter:{headline:"Neuen Brief verfassen",recipients:"Empf\xE4nger",template:"Vorlage",no_recipients:"Keine Empf\xE4nger gew\xE4hlt",add_recipients:"Empf\xE4nger hinzuf\xFCgen",select_template:"Vorlage ausw\xE4hlen",show_preview:"Vorschau anzeigen",print_letters:"Briefe erstellen",letter_description:"Interne Beschreibung",search_hint:"Empf\xE4nger suchen (Name, Garten, ...)",error_while_shipping:"Es ist ein Fehler aufgetreten",open_all:"Alle \xF6ffnen",edit_templates:"Vorlagen bearbeiten"},reports:{headline:"Berichte"},tenant_list:{select_placeholder:"Filter w\xE4hlen",group_tenant:"P\xE4chter",group_member:"Passives Mitglied",group_former_tenant:"Ehemaliger P\xE4chter",select_tag:"Schlagwort ausw\xE4hlen",open_in_desk:"Im Desk \xF6ffnen"},bankstatements:{headline:"Kontoausz\xFCge",upload:"Kontoauszug \xFCbertragen",show_bank_transactions:"Banktransaktionen anzeigen"},fileupload:{upload:"\xDCbertragen"}};var Te={en:Ae,de:Ne};const _=z(Pe),Be=D(),Ve=F({messages:Te,locale:"de",fallbackLocale:"en"});U("resourceFetcher",K);_.use(Ve);_.use(Be);_.use(J);_.use(G);_.component("Button",q);_.mount("#app");export{Le as N,k as a,$ as u};