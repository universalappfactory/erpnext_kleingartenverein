import{b as g,f as l,H as c,w as m,a2 as h}from"./vendor.fddf21c1.js";function w(n){const r=new Date(n.start);return D(r)}function D(n){return n.toLocaleDateString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric"})}function E(n){const r=n.start.toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"});let s=n.end.toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"});return n.end.getTime()===n.start.getTime()+864e5?"Ganzt\xE4gig":`${r} - ${s} Uhr`}function p(){const n=l({url:"/api/method/erpnext_kleingartenverein.api.get_public_events"}),r=c([]);n.fetch();const s=function(t){try{const e=new Date(t);return e.getHours()<=0&&e.setHours(1),e}catch(e){console.error(e)}},i=function(t){return s(t.starts_on)},d=function(t){if(t.ends_on)return s(t.ends_on);const e=i(t),o=new Date;return o.setTime(e.getTime()+864e5),o},u=function(t){r.splice(0,r.length);for(const e of t)r.push(e)};m(n,()=>{u(n.data.map((t,e)=>c({title:t.subject,start:i(t),end:d(t),index:e,description:t.description})))});const f=h(()=>{const t=new Date;return r.filter(e=>e.start>t)});return{events:n,calendarEvents:r,eventFocused:function(t,e){const o=r.find(a=>a.index===e.index);if(t==="event-focus"){for(const a of r)a.selected=!1;o.selected=!o.selected}},upcomingEvents:f}}const T=g(p);export{D as d,w as f,E as g,T as u};
