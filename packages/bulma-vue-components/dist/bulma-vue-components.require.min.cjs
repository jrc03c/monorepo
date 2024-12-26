var i=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var p=Object.prototype.hasOwnProperty;var b=(e,o)=>{for(var t in o)i(e,t,{get:o[t],enumerable:!0})},h=(e,o,t,n)=>{if(o&&typeof o=="object"||typeof o=="function")for(let l of m(o))!p.call(e,l)&&l!==t&&i(e,l,{get:()=>o[l],enumerable:!(n=c(o,l))||n.enumerable});return e};var B=e=>h(i({},"__esModule",{value:!0}),e);var w={};b(w,{BulmaBlock:()=>r,BulmaBox:()=>u,BulmaButton:()=>d});module.exports=B(w);function s(e){let o=0,t;e=e||{};let n=e.data?e.data:function(){},l=e.mounted?e.mounted:function(){},f=e.unmounted?e.unmounted:function(){};return n.css||(n.css=""),e.data=function(){return n.bind(this)()},e.mounted=function(){l.bind(this)(),o++;let a=this.$root.$el.getRootNode();a===document&&(a=a.body),t||(t=document.createElement("style"),a.appendChild(t),t.innerHTML=this.css)},e.unmounted=function(){f.bind(this)(),o--;let a=this.$root.$el.getRootNode();if(a===document&&(a=a.body),o<1){if(t)try{a.removeChild(t)}catch{try{t.parentElement.removeChild(t)}catch{}}t=null}},e}typeof window<"u"&&(window.createVueComponentWithCSS=s);var y="",g=`
  <div class="block bulma-block">
    <slot></slot>
  </div>
`,r=s({name:"bulma-block",template:g,data(){return{css:y}}});var k="",x=`
  <div class="box bulma-box">
    <slot></slot>
  </div>
`,u=s({name:"bulma-box",template:x,data(){return{css:k}}});var C="",q=`
  <button
    :class="{
      'is-black': black,
      'is-danger': danger,
      'is-dark': dark,
      'is-ghost': ghost,
      'is-info': info,
      'is-light': light,
      'is-link': link,
      'is-primary': primary,
      'is-success': success,
      'is-text': text,
      'is-warning': warning,
      'white': white,
    }"
    class="bulma-button button">
    <slot></slot>
  </button>
`,d=s({name:"bulma-button",template:q,props:{black:{type:Boolean,required:!1,default:()=>!1},danger:{type:Boolean,required:!1,default:()=>!1},dark:{type:Boolean,required:!1,default:()=>!1},ghost:{type:Boolean,required:!1,default:()=>!1},info:{type:Boolean,required:!1,default:()=>!1},light:{type:Boolean,required:!1,default:()=>!1},link:{type:Boolean,required:!1,default:()=>!1},primary:{type:Boolean,required:!1,default:()=>!1},success:{type:Boolean,required:!1,default:()=>!1},text:{type:Boolean,required:!1,default:()=>!1},warning:{type:Boolean,required:!1,default:()=>!1},white:{type:Boolean,required:!1,default:()=>!1}},data(){return{css:C}}});0&&(module.exports={BulmaBlock,BulmaBox,BulmaButton});
