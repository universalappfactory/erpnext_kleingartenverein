/* empty css              */import{c as u,a as _,d,_ as f,b as h,e as v,r as E,o as C,f as $,s as k,g as P,B as T,h as g}from"./vendor.172593b3.js";const A="modulepreload",l={},R="/assets/erpnext_kleingartenverein/frontend/pub/",a=function(n,o){return!o||o.length===0?n():Promise.all(o.map(t=>{if(t=`${R}${t}`,t in l)return;l[t]=!0;const r=t.endsWith(".css"),c=r?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${c}`))return;const e=document.createElement("link");if(e.rel=r?"stylesheet":A,r||(e.as="script",e.crossOrigin=""),e.href=t,document.head.appendChild(e),r)return new Promise((p,m)=>{e.addEventListener("load",p),e.addEventListener("error",m)})})).then(()=>n())},j=[{path:"/calendar",name:"Kalender",component:()=>a(()=>import("./Calendar.e7ea3e0c.js"),["assets/Calendar.e7ea3e0c.js","assets/Calendar.7052768e.css","assets/vendor.172593b3.js","assets/vendor.911f9fdb.css"]),meta:{title:"Termine"}},{path:"/termine",name:"Termine",component:()=>a(()=>import("./Calendar.e7ea3e0c.js"),["assets/Calendar.e7ea3e0c.js","assets/Calendar.7052768e.css","assets/vendor.172593b3.js","assets/vendor.911f9fdb.css"]),meta:{title:"Termine"}},{path:"/kalender",name:"Kalender2",component:()=>a(()=>import("./Calendar.e7ea3e0c.js"),["assets/Calendar.e7ea3e0c.js","assets/Calendar.7052768e.css","assets/vendor.172593b3.js","assets/vendor.911f9fdb.css"]),meta:{title:"Termine"}}];let x=u({history:_("/service"),routes:j});const y=d({name:"App",setup(i,n){}});function B(i,n,o,t,r,c){const e=E("router-view");return C(),h("div",null,[v(e)])}var L=f(y,[["render",B]]);let s=$(L);k("resourceFetcher",g);s.use(x);s.use(P);s.component("Button",T);s.mount("#app");
