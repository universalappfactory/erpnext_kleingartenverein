/* empty css              */import{c as m,a as l,d as _,b as h,_ as f,r as v,o as b,e as g,f as E,g as I,h as P,s as D,i as j,B as y,j as A}from"./vendor.6b7fc6d3.js";const C="modulepreload",p={},R="/assets/erpnext_kleingartenverein/frontend/dashboard/",a=function(o,s){return!s||s.length===0?o():Promise.all(s.map(t=>{if(t=`${R}${t}`,t in p)return;p[t]=!0;const r=t.endsWith(".css"),c=r?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${c}`))return;const e=document.createElement("link");if(e.rel=r?"stylesheet":C,r||(e.as="script",e.crossOrigin=""),e.href=t,document.head.appendChild(e),r)return new Promise((u,d)=>{e.addEventListener("load",u),e.addEventListener("error",d)})})).then(()=>o())},$=[{path:"/",name:"Dashboard",component:()=>a(()=>import("./Dashboard.f4637054.js"),["assets/Dashboard.f4637054.js","assets/index.9d7848e4.css","assets/vendor.6b7fc6d3.js","assets/vendor.911f9fdb.css","assets/Navbar.83f2a500.js","assets/Footer.47c85be5.js"])},{path:"/paechter",name:"P\xE4chter",component:()=>a(()=>import("./Paechter.8ec93425.js"),["assets/Paechter.8ec93425.js","assets/index.9d7848e4.css","assets/vendor.6b7fc6d3.js","assets/vendor.911f9fdb.css","assets/Navbar.83f2a500.js","assets/Footer.47c85be5.js","assets/GridTable.e36cc438.js"])},{path:"/calendar",name:"Kalender",component:()=>a(()=>import("./InternalCalendar.4325a11d.js"),["assets/InternalCalendar.4325a11d.js","assets/InternalCalendar.d7c0ced3.css","assets/index.9d7848e4.css","assets/Navbar.83f2a500.js","assets/vendor.6b7fc6d3.js","assets/vendor.911f9fdb.css"])},{path:"/myclub",name:"MyClub",component:()=>a(()=>import("./MyClub.c59b03ac.js"),["assets/MyClub.c59b03ac.js","assets/index.9d7848e4.css","assets/vendor.6b7fc6d3.js","assets/vendor.911f9fdb.css","assets/Navbar.83f2a500.js","assets/Footer.47c85be5.js","assets/GridTable.e36cc438.js"])},{path:"/meetingminutes",name:"Bulletins",component:()=>a(()=>import("./MeetingMinutes.49bb20dc.js"),["assets/MeetingMinutes.49bb20dc.js","assets/index.9d7848e4.css","assets/vendor.6b7fc6d3.js","assets/vendor.911f9fdb.css","assets/Navbar.83f2a500.js","assets/Footer.47c85be5.js","assets/GridTable.e36cc438.js"])}];let x=m({history:l("/dashboard"),routes:$});const L=_("dashboardStore",{state:()=>({navigationItems:[]}),getters:{navigation:n=>n.navigationItems},actions:{appendItems(n){this.navigationItems.splice(0,this.navigationItems.length);for(const o in n)this.navigationItems.push(o)}}}),O=h({name:"App",setup(n,o){return{dashboardStore:L()}},mounted(){console.log("MOUNTED")}}),S={class:"w-full"};function k(n,o,s,t,r,c){const e=v("router-view");return b(),g("div",S,[E(e)])}var B=f(O,[["render",k]]);const i=I(B),T=P();D("resourceFetcher",A);i.use(T);i.use(x);i.use(j);i.component("Button",y);i.mount("#app");export{L as u};
