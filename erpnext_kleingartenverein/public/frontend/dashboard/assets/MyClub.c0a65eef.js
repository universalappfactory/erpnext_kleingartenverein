import{u as f,a as h}from"./main.9fdc8efe.js";import{_,h as g,i as u,j as p,k as s,t as o,l as y}from"./vendor.fddf21c1.js";/* empty css              */const v=g({name:"MyClub",setup(){const e=f();return{store:h(),dashboard:e}}}),$={class:"p-4 sm:ml-64"},w={class:"m-8 p-4 mb-4 text-lg text-yellow-800 rounded-lg bg-yellow-50",role:"alert"},j={class:"font-semibold"},k={key:0,class:"m-8 text-lg text-yellow-800 rounded-lg bg-orange-50",role:"alert"},x=["innerHTML"],C={class:"m-8 p-4 mb-4 text-lg text-yellow-800 rounded-lg bg-green-50",role:"alert"},I={class:"font-semibold"};function M(e,b,B,D,S,H){var a,t,r,l,d,n,i,c,m;return u(),p("div",$,[s("div",w,[s("span",j,o(e.$t("myclub.myclub")),1)]),((r=(t=(a=e.dashboard)==null?void 0:a.userInfo)==null?void 0:t.data)==null?void 0:r.email)!==""?(u(),p("div",k,[s("p",{class:"p-0 m-0",innerHTML:(l=e.dashboard.userInfo.data)==null?void 0:l.dashboard_message},null,8,x)])):y("",!0),s("div",null,[s("div",C,[s("span",I,[s("p",null,o(e.$t("myclub.welcome"))+", "+o((n=(d=e.dashboard)==null?void 0:d.userInfo.data)==null?void 0:n.user),1)]),s("p",null,o((m=(c=(i=e.dashboard)==null?void 0:i.userInfo)==null?void 0:c.data)==null?void 0:m.email),1)])])])}var V=_(v,[["render",M]]);export{V as default};
