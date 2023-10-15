import{_ as x,ae as g,af as _,r as d,i as n,J as l,I as r,E as p,N as C,aa as k,k as a,j as c,n as u,G as m,F as h,q as b}from"./vendor.cb63786a.js";const v={name:"FontColor",props:["editor"],components:{Popover:g,Tooltip:_},methods:{setBackgroundColor(t){t.name!="Default"?this.editor.chain().focus().toggleHighlight({color:t.hex}).run():this.editor.chain().focus().unsetHighlight().run()},setForegroundColor(t){t.name!="Default"?this.editor.chain().focus().setColor(t.hex).run():this.editor.chain().focus().unsetColor().run()}},computed:{foregroundColors(){return[{name:"Default",hex:"#1F272E"},{name:"Yellow",hex:"#ca8a04"},{name:"Orange",hex:"#ea580c"},{name:"Red",hex:"#dc2626"},{name:"Green",hex:"#16a34a"},{name:"Blue",hex:"#1579D0"},{name:"Purple",hex:"#9333ea"},{name:"Pink",hex:"#db2777"}]},backgroundColors(){return[{name:"Default",hex:null},{name:"Yellow",hex:"#fef9c3"},{name:"Orange",hex:"#ffedd5"},{name:"Red",hex:"#fee2e2"},{name:"Green",hex:"#dcfce7"},{name:"Blue",hex:"#D3E9FC"},{name:"Purple",hex:"#f3e8ff"},{name:"Pink",hex:"#fce7f3"}]}}},y={class:"p-2"},B=a("div",{class:"text-sm text-gray-700"},"Text Color",-1),P={class:"mt-1 grid grid-cols-8 gap-1"},F=["aria-label","onClick"],D=a("div",{class:"mt-2 text-sm text-gray-700"},"Background Color",-1),w={class:"mt-1 grid grid-cols-8 gap-1"},j=["aria-label","onClick"];function E(t,T,z,A,G,o){const i=d("Tooltip"),f=d("Popover");return n(),l(f,{transition:"default"},{target:r(({togglePopover:e,isOpen:s})=>[p(t.$slots,"default",C(k({onClick:()=>e(),isActive:s})))]),"body-main":r(()=>[a("div",y,[B,a("div",P,[(n(!0),c(h,null,u(o.foregroundColors,e=>(n(),l(i,{class:"flex",key:e.name,text:e.name},{default:r(()=>[a("button",{"aria-label":e.name,class:"flex h-5 w-5 items-center justify-center rounded border text-base",style:m({color:e.hex}),onClick:s=>o.setForegroundColor(e)}," A ",12,F)]),_:2},1032,["text"]))),128))]),D,a("div",w,[(n(!0),c(h,null,u(o.backgroundColors,e=>(n(),l(i,{class:"flex",key:e.name,text:e.name},{default:r(()=>[a("button",{"aria-label":e.name,class:b(["flex h-5 w-5 items-center justify-center rounded border text-base text-gray-900",e.hex?"border-transparent":"border-gray-200"]),style:m({backgroundColor:e.hex}),onClick:s=>o.setBackgroundColor(e)}," A ",14,j)]),_:2},1032,["text"]))),128))])])]),_:3})}var $=x(v,[["render",E]]);export{$ as default};
