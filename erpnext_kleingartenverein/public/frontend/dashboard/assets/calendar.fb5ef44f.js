import{w as f,H as c,x as l,a1 as m}from"./vendor.0d1c2a14.js";import{c as h}from"./Navbar.0bb1bc79.js";function w(n){const r=new Date(n.start);return D(r)}function D(n){return n.toLocaleDateString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric"})}function x(n){const r=n.start.toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"});let a=n.end.toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"});return n.end.getTime()===n.start.getTime()+864e5?"Ganzt\xE4gig":`${r} - ${a} Uhr`}function p(){const n=f({url:"/api/method/erpnext_kleingartenverein.api.get_public_events"}),r=c([]);n.fetch();const a=function(t){try{const e=new Date(t);return e.getHours()<=0&&e.setHours(1),e}catch(e){console.error(e)}},i=function(t){return a(t.starts_on)},d=function(t){if(t.ends_on)return a(t.ends_on);const e=i(t),o=new Date;return o.setTime(e.getTime()+864e5),o},u=function(t){r.splice(0,r.length);for(const e of t)r.push(e)};l(n,()=>{u(n.data.map((t,e)=>c({title:t.subject,start:i(t),end:d(t),index:e,description:t.description})))});const g=m(()=>{const t=new Date;return r.filter(e=>e.start>t)});return{events:n,calendarEvents:r,eventFocused:function(t,e){const o=r.find(s=>s.index===e.index);if(t==="event-focus"){for(const s of r)s.selected=!1;o.selected=!o.selected}},upcomingEvents:g}}const E=h(p);export{D as d,w as f,x as g,E as u};
