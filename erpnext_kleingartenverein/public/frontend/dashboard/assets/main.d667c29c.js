/* empty css              */import{c as m,a as l,d as _,b as h,_ as f,r as v,o as g,e as b,f as E,g as I,h as P,s as D,i as j,B as y,j as A}from"./vendor.ff0e3d30.js";const C="modulepreload",p={},R="/assets/erpnext_kleingartenverein/frontend/dashboard/",a=function(o,s){return!s||s.length===0?o():Promise.all(s.map(t=>{if(t=`${R}${t}`,t in p)return;p[t]=!0;const r=t.endsWith(".css"),c=r?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${c}`))return;const e=document.createElement("link");if(e.rel=r?"stylesheet":C,r||(e.as="script",e.crossOrigin=""),e.href=t,document.head.appendChild(e),r)return new Promise((u,d)=>{e.addEventListener("load",u),e.addEventListener("error",d)})})).then(()=>o())},$=[{path:"/",name:"Dashboard",component:()=>a(()=>import("./Dashboard.2c957ca5.js"),["assets/Dashboard.2c957ca5.js","assets/index.e174b3f7.css","assets/vendor.ff0e3d30.js","assets/vendor.911f9fdb.css","assets/Navbar.e6c5464c.js","assets/Footer.747c78c8.js"])},{path:"/paechter",name:"P\xE4chter",component:()=>a(()=>import("./Paechter.4b9a17a6.js"),["assets/Paechter.4b9a17a6.js","assets/index.e174b3f7.css","assets/vendor.ff0e3d30.js","assets/vendor.911f9fdb.css","assets/Navbar.e6c5464c.js","assets/Footer.747c78c8.js","assets/GridTable.f9b74236.js"])},{path:"/calendar",name:"Kalender",component:()=>a(()=>import("./InternalCalendar.c984847f.js"),["assets/InternalCalendar.c984847f.js","assets/InternalCalendar.d7c0ced3.css","assets/index.e174b3f7.css","assets/vendor.ff0e3d30.js","assets/vendor.911f9fdb.css","assets/Navbar.e6c5464c.js"])},{path:"/myclub",name:"MyClub",component:()=>a(()=>import("./MyClub.2b449edb.js"),["assets/MyClub.2b449edb.js","assets/index.e174b3f7.css","assets/vendor.ff0e3d30.js","assets/vendor.911f9fdb.css","assets/Navbar.e6c5464c.js","assets/Footer.747c78c8.js","assets/GridTable.f9b74236.js"])},{path:"/meetingminutes",name:"Bulletins",component:()=>a(()=>import("./MeetingMinutes.5d463673.js"),["assets/MeetingMinutes.5d463673.js","assets/index.e174b3f7.css","assets/vendor.ff0e3d30.js","assets/vendor.911f9fdb.css","assets/Navbar.e6c5464c.js","assets/Footer.747c78c8.js","assets/GridTable.f9b74236.js"])}];let x=m({history:l("/dashboard"),routes:$});const L=_("dashboardStore",{state:()=>({navigationItems:[]}),getters:{navigation:n=>n.navigationItems},actions:{appendItems(n){this.navigationItems.splice(0,this.navigationItems.length);for(const o in n)this.navigationItems.push(o)}}}),O=h({name:"App",setup(n,o){return{dashboardStore:L()}},mounted(){console.log("MOUNTED")}}),S={class:"h-screen w-full"};function k(n,o,s,t,r,c){const e=v("router-view");return g(),b("div",S,[E(e)])}var B=f(O,[["render",k]]);const i=I(B),T=P();D("resourceFetcher",A);i.use(T);i.use(x);i.use(j);i.component("Button",y);i.mount("#app");export{L as u};