import{_ as l,b as i,D as m,A as c,B as d,x as p,k as u,r as n,o as f,e as b,f as a,l as o,F as h}from"./vendor.ff0e3d30.js";import{N as _}from"./Navbar.e6c5464c.js";import{F as g}from"./Footer.747c78c8.js";import{G as N,C as t}from"./GridTable.f9b74236.js";import"./main.d667c29c.js";/* empty css              */const C=i({name:"paechter",components:{NavbarComponent:_,FooterComponent:g,Dropdown:m,Alert:c,Button:d,GridTable:N},methods:{loadMoreData(){console.log("LoadMore"),this.tenants.next()}},setup(){console.log("SETUP");let e=p({doctype:"Customer",fields:["*"],orderBy:"plot_link asc",filters:{customer_group:"Tenant"},start:0,pageLength:20});return e.fetch(),{tenants:e}},data(){return{tableColumns:[{DisplayTitle:"Name",PropertyNames:["customer_name","email_id"],Mode:t.DoubleEntry},{DisplayTitle:"Contact",PropertyNames:["email_id","mobile_no"],Mode:t.DoubleEntry},{DisplayTitle:"Garten",PropertyNames:["plot_link"],Mode:t.Default}]}},mounted(){u()}}),y={class:"p-4 sm:ml-64"},D=o("div",{class:"m-8 p-4 mb-4 text-lg text-yellow-800 rounded-lg bg-yellow-50",role:"alert"},[o("span",{class:"font-semibold"},"Info"),o("p",null," Hier entsteht eine neue Liste in der man einfach P\xE4chter und G\xE4rten angezeigt bekommt. "),o("p",null," Diese Liste wird dann auch auf dem Mobiltelefon ordentlich angezeigt. "),o("br"),o("span",{class:"font-semibold"},"Achtung"),o("p",null," Ist noch ne Baustelle, funktioniert also noch nicht richtig. ")],-1);function M(e,v,x,T,k,B){const s=n("NavbarComponent"),r=n("GridTable");return f(),b(h,null,[a(s),o("div",y,[D,a(r,{onLoadMore:e.loadMoreData,items:e.tenants.data,checkable:!1,hasNext:e.tenants.hasNextPage,columns:e.tableColumns},null,8,["onLoadMore","items","hasNext","columns"])])],64)}var w=l(C,[["render",M]]);export{w as default};