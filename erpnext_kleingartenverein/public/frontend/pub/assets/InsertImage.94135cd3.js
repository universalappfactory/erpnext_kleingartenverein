import{_ as I,B as f,ag as D,ah as h,r as d,i as m,j as c,D as _,M as y,a9 as b,m as n,H as s,F as v,k as r,t as C,l as k,s as u}from"./vendor.31bbe92c.js";const w={name:"InsertImage",props:["editor"],expose:["openDialog"],data(){return{addImageDialog:{url:"",file:null,show:!1}}},components:{Button:f,Dialog:D},methods:{openDialog(){this.addImageDialog.show=!0},onImageSelect(t){let e=t.target.files[0];!e||(this.addImageDialog.file=e,h(e).then(i=>{this.addImageDialog.url=i}))},addImage(t){this.editor.chain().focus().setImage({src:t}).run(),this.reset()},reset(){this.addImageDialog=this.$options.data().addImageDialog}}},B={class:"relative cursor-pointer rounded-lg bg-gray-100 py-1 focus-within:bg-gray-200 hover:bg-gray-200"},x={class:"absolute inset-0 select-none px-2 py-1 text-base"},S=["src"];function V(t,e,i,N,a,o){const g=d("Button"),p=d("Dialog");return m(),c(v,null,[_(t.$slots,"default",y(b({onClick:o.openDialog}))),n(p,{options:{title:"Add Image"},modelValue:a.addImageDialog.show,"onUpdate:modelValue":e[2]||(e[2]=l=>a.addImageDialog.show=l),onAfterLeave:o.reset},{"body-content":s(()=>[r("label",B,[r("input",{type:"file",class:"w-full opacity-0",onChange:e[0]||(e[0]=(...l)=>o.onImageSelect&&o.onImageSelect(...l)),accept:"image/*"},null,32),r("span",x,C(a.addImageDialog.file?"Select another image":"Select an image"),1)]),a.addImageDialog.url?(m(),c("img",{key:0,src:a.addImageDialog.url,class:"mt-2 w-full rounded-lg"},null,8,S)):k("",!0)]),actions:s(()=>[n(g,{appearance:"primary",onClick:e[1]||(e[1]=l=>o.addImage(a.addImageDialog.url))},{default:s(()=>[u(" Insert Image ")]),_:1}),n(g,{onClick:o.reset},{default:s(()=>[u(" Cancel ")]),_:1},8,["onClick"])]),_:1},8,["modelValue","onAfterLeave"])],64)}var j=I(w,[["render",V]]);export{j as default};
