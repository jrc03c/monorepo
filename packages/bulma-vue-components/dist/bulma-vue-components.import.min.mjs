function a(e){let l=0,t;e=e||{};let s=e.data?e.data:function(){},n=e.mounted?e.mounted:function(){},i=e.unmounted?e.unmounted:function(){};return s.css||(s.css=""),e.data=function(){return s.bind(this)()},e.mounted=function(){n.bind(this)(),l++;let o=this.$root.$el.getRootNode();o===document&&(o=o.body),t||(t=document.createElement("style"),o.appendChild(t),t.innerHTML=this.css)},e.unmounted=function(){i.bind(this)(),l--;let o=this.$root.$el.getRootNode();if(o===document&&(o=o.body),l<1){if(t)try{o.removeChild(t)}catch{try{t.parentElement.removeChild(t)}catch{}}t=null}},e}typeof window<"u"&&(window.createVueComponentWithCSS=a);var r="",u=`
  <div class="block bulma-block">
    <slot></slot>
  </div>
`,d=a({name:"bulma-block",template:u,data(){return{css:r}}});var f="",c=`
  <div class="box bulma-box">
    <slot></slot>
  </div>
`,m=a({name:"bulma-box",template:c,data(){return{css:f}}});var p="",b=`
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
`,h=a({name:"bulma-button",template:b,props:{black:{type:Boolean,required:!1,default:()=>!1},danger:{type:Boolean,required:!1,default:()=>!1},dark:{type:Boolean,required:!1,default:()=>!1},ghost:{type:Boolean,required:!1,default:()=>!1},info:{type:Boolean,required:!1,default:()=>!1},light:{type:Boolean,required:!1,default:()=>!1},link:{type:Boolean,required:!1,default:()=>!1},primary:{type:Boolean,required:!1,default:()=>!1},success:{type:Boolean,required:!1,default:()=>!1},text:{type:Boolean,required:!1,default:()=>!1},warning:{type:Boolean,required:!1,default:()=>!1},white:{type:Boolean,required:!1,default:()=>!1}},data(){return{css:p}}});export{d as BulmaBlock,m as BulmaBox,h as BulmaButton};
