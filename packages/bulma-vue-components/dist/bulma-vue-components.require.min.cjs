var l=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var b=Object.getOwnPropertyNames;var f=Object.prototype.hasOwnProperty;var h=(t,e)=>{for(var o in e)l(t,o,{get:e[o],enumerable:!0})},C=(t,e,o,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let u of b(e))!f.call(t,u)&&u!==o&&l(t,u,{get:()=>e[u],enumerable:!(i=c(e,u))||i.enumerable});return t};var p=t=>C(l({},"__esModule",{value:!0}),t);var V={};h(V,{BulmaBlock:()=>s,BulmaBox:()=>r,BulmaButton:()=>m});module.exports=p(V);function a(t){let e=0,o;t=t||{};let i=t.data?t.data:function(){},u=t.mounted?t.mounted:function(){},d=t.unmounted?t.unmounted:function(){};return i.css||(i.css=""),t.data=function(){return i.bind(this)()},t.mounted=function(){u.bind(this)(),e++;let n=this.$root.$el.getRootNode();n===document&&(n=n.body),o||(o=document.createElement("style"),n.appendChild(o),o.innerHTML=this.css)},t.unmounted=function(){d.bind(this)(),e--;let n=this.$root.$el.getRootNode();if(n===document&&(n=n.body),e<1){if(o)try{n.removeChild(o)}catch{try{o.parentElement.removeChild(o)}catch{}}o=null}},t}typeof window<"u"&&(window.createVueComponentWithCSS=a);var B="",x=`
  <div class="block bulma-block">
    <slot></slot>
  </div>
`,s=a({name:"bulma-block",template:x,data(){return{css:B}}});var S="",y=`
  <div class="box bulma-box">
    <slot></slot>
  </div>
`,r=a({name:"bulma-box",template:y,data(){return{css:S}}});var v="",k=`
  <button class="bulma-button button">
    <slot></slot>
  </button>
`,m=a({name:"bulma-button",template:k,data(){return{css:v}}});0&&(module.exports={BulmaBlock,BulmaBox,BulmaButton});
