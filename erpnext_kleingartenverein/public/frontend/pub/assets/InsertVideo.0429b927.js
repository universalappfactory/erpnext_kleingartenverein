import{_,B as k,ag as v,ai as C,r,i as u,j as c,D as h,M as B,a9 as x,m as a,H as l,F as y,k as w,s as n,t as U,I as F,l as p}from"./vendor.31bbe92c.js";const I={name:"InsertImage",props:["editor"],expose:["openDialog"],data(){return{addVideoDialog:{url:"",file:null,show:!1}}},components:{Button:k,Dialog:v,FileUploader:C},methods:{openDialog(){this.addVideoDialog.show=!0},onVideoSelect(i){let o=i.target.files[0];!o||(this.addVideoDialog.file=o)},addVideo(i){this.editor.chain().focus().insertContent(`<video src="${i}"></video>`).run(),this.reset()},reset(){this.addVideoDialog=this.$options.data().addVideoDialog}}},N={class:"flex items-center space-x-2"},S=["src"];function b(i,o,A,j,e,t){const s=r("Button"),g=r("FileUploader"),V=r("Dialog");return u(),c(y,null,[h(i.$slots,"default",B(x({onClick:t.openDialog}))),a(V,{options:{title:"Add Video"},modelValue:e.addVideoDialog.show,"onUpdate:modelValue":o[2]||(o[2]=d=>e.addVideoDialog.show=d),onAfterLeave:t.reset},{"body-content":l(()=>[a(g,{"file-types":"video/*",onSuccess:o[0]||(o[0]=d=>e.addVideoDialog.url=d.file_url)},{default:l(({file:d,progress:f,uploading:m,openFileSelector:D})=>[w("div",N,[a(s,{onClick:D},{default:l(()=>[n(U(m?`Uploading ${f}%`:e.addVideoDialog.url?"Change Video":"Upload Video"),1)]),_:2},1032,["onClick"]),e.addVideoDialog.url?(u(),F(s,{key:0,onClick:()=>{e.addVideoDialog.url=null,e.addVideoDialog.file=null}},{default:l(()=>[n(" Remove ")]),_:2},1032,["onClick"])):p("",!0)])]),_:1}),e.addVideoDialog.url?(u(),c("video",{key:0,src:e.addVideoDialog.url,class:"mt-2 w-full rounded-lg",type:"video/mp4",controls:""},null,8,S)):p("",!0)]),actions:l(()=>[a(s,{appearance:"primary",onClick:o[1]||(o[1]=d=>t.addVideo(e.addVideoDialog.url))},{default:l(()=>[n(" Insert Video ")]),_:1}),a(s,{onClick:t.reset},{default:l(()=>[n("Cancel")]),_:1},8,["onClick"])]),_:1},8,["modelValue","onAfterLeave"])],64)}var P=_(I,[["render",b]]);export{P as default};
