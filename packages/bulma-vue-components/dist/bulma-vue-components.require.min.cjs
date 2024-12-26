var d=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var f=Object.prototype.hasOwnProperty;var b=(t,o)=>{for(var e in o)d(t,e,{get:o[e],enumerable:!0})},h=(t,o,e,u)=>{if(o&&typeof o=="object"||typeof o=="function")for(let i of m(o))!f.call(t,i)&&i!==e&&d(t,i,{get:()=>o[i],enumerable:!(u=c(o,i))||u.enumerable});return t};var C=t=>h(d({},"__esModule",{value:!0}),t);var y={};b(y,{BulmaBlock:()=>a,BulmaBox:()=>r});module.exports=C(y);function l(t){let o=0,e;t=t||{};let u=t.data?t.data:function(){},i=t.mounted?t.mounted:function(){},s=t.unmounted?t.unmounted:function(){};return u.css||(u.css=""),t.data=function(){return u.bind(this)()},t.mounted=function(){i.bind(this)(),o++;let n=this.$root.$el.getRootNode();n===document&&(n=n.body),e||(e=document.createElement("style"),n.appendChild(e),e.innerHTML=this.css)},t.unmounted=function(){s.bind(this)(),o--;let n=this.$root.$el.getRootNode();if(n===document&&(n=n.body),o<1){if(e)try{n.removeChild(e)}catch{try{e.parentElement.removeChild(e)}catch{}}e=null}},t}typeof window<"u"&&(window.createVueComponentWithCSS=l);var x="",B=`
  <div class="block bulma-block">
    <slot></slot>
  </div>
`,a=l({name:"bulma-block",template:B,data(){return{css:x}}});var S="",p=`
  <div class="box bulma-box">
    <slot></slot>
  </div>
`,r=l({name:"bulma-box",template:p,data(){return{css:S}}});0&&(module.exports={BulmaBlock,BulmaBox});
