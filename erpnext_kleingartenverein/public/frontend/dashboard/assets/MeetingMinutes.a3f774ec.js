import{_ as r,b as l,D as m,A as i,B as d,u as p,k as c,r as t,o as u,e as b,f as a,l as f,F as _}from"./vendor.8b680608.js";import{N}from"./Navbar.4460994c.js";import{F as M}from"./Footer.e0eb7c6f.js";import{G as C,C as o}from"./GridTable.66f79f7b.js";import"./main.a499db20.js";/* empty css              */const h=l({name:"Meeting Minutes",components:{NavbarComponent:N,FooterComponent:M,Dropdown:m,Alert:i,Button:d,GridTable:C},methods:{loadMoreData(){console.log("LoadMore"),this.tenants.next()}},setup(){console.log("SETUP");let e=p({doctype:"Bulletin",fields:["*"],start:0,pageLength:20});return e.fetch(),{tenants:e}},data(){return{tableColumns:[{DisplayTitle:"Name",PropertyNames:["customer_name","email_id"],Mode:o.DoubleEntry},{DisplayTitle:"Contact",PropertyNames:["email_id","mobile_no"],Mode:o.DoubleEntry},{DisplayTitle:"Garten",PropertyNames:["title"],Mode:o.Default}]}},mounted(){c()}}),D={class:"p-4 sm:ml-64"};function y(e,g,v,T,j,B){const n=t("NavbarComponent"),s=t("GridTable");return u(),b(_,null,[a(n),f("div",D,[a(s,{onLoadMore:e.loadMoreData,items:e.tenants.data,checkable:!1,hasNext:e.tenants.hasNextPage,columns:e.tableColumns},null,8,["onLoadMore","items","hasNext","columns"])])],64)}var E=r(h,[["render",y]]);export{E as default};
