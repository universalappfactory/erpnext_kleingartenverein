/* empty css              */import{c as h,a as _,d as f,b as v,_ as g,i as k,r as I,o as M,e as y,f as E,g as C,h as P,s as b,j as R,B as w,k as O}from"./vendor.3b87180e.js";const T="modulepreload",u={},$="/assets/erpnext_kleingartenverein/frontend/pub/",i=function(a,t){return!t||t.length===0?a():Promise.all(t.map(r=>{if(r=`${$}${r}`,r in u)return;u[r]=!0;const s=r.endsWith(".css"),c=s?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${c}`))return;const n=document.createElement("link");if(n.rel=s?"stylesheet":T,s||(n.as="script",n.crossOrigin=""),n.href=r,document.head.appendChild(n),s)return new Promise((l,m)=>{n.addEventListener("load",l),n.addEventListener("error",m)})})).then(()=>a())},S=[{path:"/calendar",name:"Kalender",component:()=>i(()=>import("./Calendar.754c3ecc.js"),["assets/Calendar.754c3ecc.js","assets/Calendar.2f59f770.css","assets/index.28bffc38.css","assets/vendor.3b87180e.js","assets/vendor.911f9fdb.css"]),meta:{title:"Termine"}},{path:"/termine",name:"Termine",component:()=>i(()=>import("./Calendar.754c3ecc.js"),["assets/Calendar.754c3ecc.js","assets/Calendar.2f59f770.css","assets/index.28bffc38.css","assets/vendor.3b87180e.js","assets/vendor.911f9fdb.css"]),meta:{title:"Termine"}},{path:"/kalender",name:"Kalender2",component:()=>i(()=>import("./Calendar.754c3ecc.js"),["assets/Calendar.754c3ecc.js","assets/Calendar.2f59f770.css","assets/index.28bffc38.css","assets/vendor.3b87180e.js","assets/vendor.911f9fdb.css"]),meta:{title:"Termine"}}];let j=h({history:_("/service"),routes:S});const x={user:"",email:""};function p(e){return e.hasOwnProperty("href")}function d(e){return e.hasOwnProperty("doctype")}const A=f("dashboardStore",{state:()=>({navigationItems:[],readMarkerItems:[],user:x}),getters:{navigation:e=>e.navigationItems,readMarkers:e=>e.readMarkerItems,currentUser:e=>e.user,isUnread:e=>a=>e.readMarkerItems.find(t=>t.document===a)!==void 0},actions:{clearNavigation(){this.navigationItems.splice(0,this.navigationItems.length)},clearReadMarkers(){this.readMarkerItems.splice(0,this.readMarkerItems.length)},replaceItems(e){e.length!=0&&(p(e[0])&&(this.clearNavigation(),this.navigationItems.push(...e)),d(e[0])&&(this.clearReadMarkers(),this.readMarkers.push(...e)))},appendItems(e){e.length!=0&&(e[0],p(e[0])&&this.navigationItems.push(...e),d(e[0])&&this.readMarkers.push(...e))},append(e){this.appendItems([e])},replace(e){this.replaceItems([e])},calculateOpenCount(){for(const e of this.navigation){const a=this.readMarkers.filter(t=>t.doctype===e.read_marker_doctype).map(t=>t.count).reduce((t,r)=>t+r,0);e.openCount=a}}}}),B=v({name:"App",setup(e,a){return{dashboardStore:A()}},mounted(){console.log("MOUNTED"),k()}}),D={class:"w-full"};function L(e,a,t,r,s,c){const n=I("router-view");return M(),y("div",D,[E(n)])}var N=g(B,[["render",L]]);const U=C(),o=P(N);b("resourceFetcher",O);o.use(U);o.use(j);o.use(R);o.component("Button",w);o.mount("#app");export{A as u};
