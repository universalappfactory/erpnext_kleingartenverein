import{d as i,_ as d,o as s,b as o,j as r,F as c,l as f,n as l,t as n}from"./vendor.5e8781b9.js";var a;(function(e){e[e.Router=0]="Router",e[e.External=1]="External"})(a||(a={}));const h=i({name:"navbar",components:{},methods:{navigateTo(e){e.href&&this.$router.push(e.href)},isRouter(e){return e.mode==a.Router}},data(){return{items:[{displayTitle:"Zum Desk",href:"/app/",icon:"fa-desktop",mode:a.External},{displayTitle:"Zur Homepage",href:"/",icon:"fa-globe",mode:a.External},{displayTitle:"Dashboard",href:"/dashboard",icon:"fa-home",mode:a.External},{displayTitle:"P\xE4chter",href:"/paechter",icon:"fa-list",mode:a.Router},{displayTitle:"Kalender",href:"/calendar",icon:"fa-list",mode:a.Router},{displayTitle:"Drive",href:"/drive",icon:"fa-list",mode:a.External}]}},mounted(){}}),p={id:"default-sidebar",class:"fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0","aria-label":"Sidebar"},u={class:"h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800"},y={class:"space-y-2 font-medium"},m=["onClick"],x={class:"ml-3"},g=["href"],_={class:"ml-3"};function b(e,k,v,T,E,R){return s(),o("aside",p,[r("div",u,[r("ul",y,[(s(!0),o(c,null,f(e.items,t=>(s(),o("li",{key:t.displayTitle},[e.isRouter(t)?(s(),o("a",{key:0,onClick:$=>e.navigateTo(t),class:"flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"},[r("i",{class:l(["fa text-gray-500 text-6xl",t.icon])},null,2),r("span",x,n(t.displayTitle),1)],8,m)):(s(),o("a",{key:1,href:t.href,class:"flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"},[r("i",{class:l(["fa text-gray-500 text-6xl",t.icon])},null,2),r("span",_,n(t.displayTitle),1)],8,g))]))),128))])])])}var w=d(h,[["render",b]]);export{w as N};
