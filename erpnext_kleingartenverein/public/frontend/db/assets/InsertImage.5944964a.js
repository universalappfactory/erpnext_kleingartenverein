import{_ as f,B as I,N as h,O as D,b as g,v as _,H as y,L as v,e as n,z as l,F as C,r as m,o as c,j as r,t as b,p as w,l as u}from"./vendor.ad568f60.js";const B={name:"InsertImage",props:["editor"],expose:["openDialog"],data(){return{addImageDialog:{url:"",file:null,show:!1}}},components:{Button:I,Dialog:h},methods:{openDialog(){this.addImageDialog.show=!0},onImageSelect(t){let e=t.target.files[0];!e||(this.addImageDialog.file=e,D(e).then(i=>{this.addImageDialog.url=i}))},addImage(t){this.editor.chain().focus().setImage({src:t}).run(),this.reset()},reset(){this.addImageDialog=this.$options.data().addImageDialog}}},k={class:"relative cursor-pointer rounded-lg bg-gray-100 py-1 focus-within:bg-gray-200 hover:bg-gray-200"},x={class:"absolute inset-0 select-none px-2 py-1 text-base"},S=["src"],V=u(" Insert Image "),N=u(" Cancel ");function A(t,e,i,L,a,o){const d=m("Button"),p=m("Dialog");return c(),g(C,null,[_(t.$slots,"default",y(v({onClick:o.openDialog}))),n(p,{options:{title:"Add Image"},modelValue:a.addImageDialog.show,"onUpdate:modelValue":e[2]||(e[2]=s=>a.addImageDialog.show=s),onAfterLeave:o.reset},{"body-content":l(()=>[r("label",k,[r("input",{type:"file",class:"w-full opacity-0",onChange:e[0]||(e[0]=(...s)=>o.onImageSelect&&o.onImageSelect(...s)),accept:"image/*"},null,32),r("span",x,b(a.addImageDialog.file?"Select another image":"Select an image"),1)]),a.addImageDialog.url?(c(),g("img",{key:0,src:a.addImageDialog.url,class:"mt-2 w-full rounded-lg"},null,8,S)):w("",!0)]),actions:l(()=>[n(d,{appearance:"primary",onClick:e[1]||(e[1]=s=>o.addImage(a.addImageDialog.url))},{default:l(()=>[V]),_:1}),n(d,{onClick:o.reset},{default:l(()=>[N]),_:1},8,["onClick"])]),_:1},8,["modelValue","onAfterLeave"])],64)}var z=f(B,[["render",A]]);export{z as default};
