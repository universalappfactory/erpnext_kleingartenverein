var h=(a,i,s)=>new Promise((c,l)=>{var d=e=>{try{r(s.next(e))}catch(t){l(t)}},p=e=>{try{r(s.throw(e))}catch(t){l(t)}},r=e=>e.done?c(e.value):Promise.resolve(e.value).then(d,p);r((s=s.apply(a,i)).next())});import{u as g}from"./list.52fc1d50.js";import{W as k}from"./Button.ce6c3d7b.js";import{L as y}from"./ListComponent.8234c5c8.js";import{_ as w}from"./PageHeadline.89a343ba.js";import{_ as L,D as f,o as N,i as m,j as $,m as v,P as n,G as j,E as b,l as I,k as o,s as B,t as x,Y as D,Z as S}from"./vendor.93fb9eca.js";const C=a=>(D("data-v-12806575"),a=a(),S(),a),R={class:"p-4 sm:ml-64"},V={class:"mt-6"},E={class:"flex p-4"},q={class:"grow"},A=["href"],M=C(()=>o("i",{class:"fa fa-external-link","aria-hidden":"true"},null,-1)),P=[M],T=["href"],W={__name:"Reports",setup(a){const i=f(),s=f(""),{fetch:c,previous:l,next:d,items:p,pageInfo:r}=g({docType:"Report",filters:{_user_tags:["like","%Dashboard"]}});N(()=>h(this,null,function*(){yield c()}));const e=t=>{s.value=`${location.host}/app/query-report/${t.name}`,i.value.click()};return(t,u)=>(m(),$("div",R,[v(w,{messageId:"reports.headline"}),n(r).withError?(m(),j(n(k),{key:0,type:"warning",class:"mb-2 mt-4"},{default:b(()=>[B(x(t.$t("new_letter.error_while_shipping")),1)]),_:1})):I("",!0),o("div",V,[v(y,{items:n(p),onShowDetails:e,hasNext:n(r).hasNext,onLoadMore:u[0]||(u[0]=_=>n(d)()),headerList:[t.$t("reports.headline")]},{item:b(({name:_})=>[o("div",E,[o("div",q,x(_),1),o("div",null,[o("a",{href:`/app/query-report/${_}`,target:"_blank",type:"button",class:"text-blue-700 hover:bg-blue-700 border border-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:opacity-75 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"},P,8,A)])])]),_:1},8,["items","hasNext","headerList"]),o("a",{href:s.value,class:"hidden",target:"_blank",ref_key:"openLinkAnchor",ref:i},null,8,T)])]))}};var J=L(W,[["__scopeId","data-v-12806575"]]);export{J as default};
