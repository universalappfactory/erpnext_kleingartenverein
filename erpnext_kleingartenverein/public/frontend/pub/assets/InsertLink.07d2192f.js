import{_ as d,B as p,U as g,V as L,r as i,i as m,j as f,D,M as h,S as c,l as a,H as l,F as v,G as V,q as w}from"./vendor.4d780664.js";const x={name:"InsertLink",props:["editor"],components:{Button:p,Input:g,Dialog:L},data(){return{setLinkDialog:{url:"",show:!1}}},methods:{openDialog(){let t=this.editor.getAttributes("link").href;t&&(this.setLinkDialog.url=t),this.setLinkDialog.show=!0},setLink(t){t===""?this.editor.chain().focus().extendMarkRange("link").unsetLink().run():this.editor.chain().focus().extendMarkRange("link").setLink({href:t}).run(),this.setLinkDialog.show=!1,this.setLinkDialog.url=""},reset(){this.setLinkDialog=this.$options.data().setLinkDialog}}};function _(t,e,B,y,o,s){const r=i("Input"),u=i("Button"),k=i("Dialog");return m(),f(v,null,[D(t.$slots,"default",h(c({onClick:s.openDialog}))),a(k,{options:{title:"Set Link"},modelValue:o.setLinkDialog.show,"onUpdate:modelValue":e[3]||(e[3]=n=>o.setLinkDialog.show=n),onAfterLeave:s.reset},{"body-content":l(()=>[a(r,{type:"text",label:"URL",modelValue:o.setLinkDialog.url,"onUpdate:modelValue":e[0]||(e[0]=n=>o.setLinkDialog.url=n),onKeydown:e[1]||(e[1]=V(n=>s.setLink(n.target.value),["enter"]))},null,8,["modelValue"])]),actions:l(()=>[a(u,{appearance:"primary",onClick:e[2]||(e[2]=n=>s.setLink(o.setLinkDialog.url))},{default:l(()=>[w(" Save ")]),_:1})]),_:1},8,["modelValue","onAfterLeave"])],64)}var R=d(x,[["render",_]]);export{R as default};
