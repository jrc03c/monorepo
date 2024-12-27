var r=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var b=Object.prototype.hasOwnProperty;var h=(e,o)=>{for(var t in o)r(e,t,{get:o[t],enumerable:!0})},B=(e,o,t,n)=>{if(o&&typeof o=="object"||typeof o=="function")for(let s of p(o))!b.call(e,s)&&s!==t&&r(e,s,{get:()=>o[s],enumerable:!(n=c(o,s))||n.enumerable});return e};var y=e=>B(r({},"__esModule",{value:!0}),e);var V={};h(V,{BulmaBlock:()=>i,BulmaBox:()=>u,BulmaButton:()=>d,BulmaDelete:()=>f});module.exports=y(V);function l(e){let o=0,t;e=e||{};let n=e.data?e.data:function(){},s=e.mounted?e.mounted:function(){},m=e.unmounted?e.unmounted:function(){};return n.css||(n.css=""),e.data=function(){return n.bind(this)()},e.mounted=function(){s.bind(this)(),o++;let a=this.$root.$el.getRootNode();a===document&&(a=a.body),t||(t=document.createElement("style"),a.appendChild(t),t.innerHTML=this.css)},e.unmounted=function(){m.bind(this)(),o--;let a=this.$root.$el.getRootNode();if(a===document&&(a=a.body),o<1){if(t)try{a.removeChild(t)}catch{try{t.parentElement.removeChild(t)}catch{}}t=null}},e}typeof window<"u"&&(window.createVueComponentWithCSS=l);var C="",g=`
  <div class="block bulma-block">
    <slot></slot>
  </div>
`,i=l({name:"bulma-block",template:g,data(){return{css:C}}});var k="",x=`
  <div class="box bulma-box">
    <slot></slot>
  </div>
`,u=l({name:"bulma-box",template:x,data(){return{css:k}}});var q="",S=`
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
`,d=l({name:"bulma-button",template:S,props:{black:{type:Boolean,required:!1,default:()=>!1},danger:{type:Boolean,required:!1,default:()=>!1},dark:{type:Boolean,required:!1,default:()=>!1},ghost:{type:Boolean,required:!1,default:()=>!1},info:{type:Boolean,required:!1,default:()=>!1},light:{type:Boolean,required:!1,default:()=>!1},link:{type:Boolean,required:!1,default:()=>!1},primary:{type:Boolean,required:!1,default:()=>!1},success:{type:Boolean,required:!1,default:()=>!1},text:{type:Boolean,required:!1,default:()=>!1},warning:{type:Boolean,required:!1,default:()=>!1},white:{type:Boolean,required:!1,default:()=>!1}},data(){return{css:q}}});var w="",v=`
  <button class="delete"></button>
`,f=l({name:"bulma-delete",template:v,data(){return{css:w}}});0&&(module.exports={BulmaBlock,BulmaBox,BulmaButton,BulmaDelete});
