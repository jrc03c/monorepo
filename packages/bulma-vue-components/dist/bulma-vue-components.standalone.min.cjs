(()=>{function a(e){let l=0,t;e=e||{};let s=e.data?e.data:function(){},n=e.mounted?e.mounted:function(){},r=e.unmounted?e.unmounted:function(){};return s.css||(s.css=""),e.data=function(){return s.bind(this)()},e.mounted=function(){n.bind(this)(),l++;let o=this.$root.$el.getRootNode();o===document&&(o=o.body),t||(t=document.createElement("style"),o.appendChild(t),t.innerHTML=this.css)},e.unmounted=function(){r.bind(this)(),l--;let o=this.$root.$el.getRootNode();if(o===document&&(o=o.body),l<1){if(t)try{o.removeChild(t)}catch{try{t.parentElement.removeChild(t)}catch{}}t=null}},e}typeof window<"u"&&(window.createVueComponentWithCSS=a);var i="",u=`
  <div class="block bulma-block">
    <slot></slot>
  </div>
`,d=a({name:"bulma-block",template:u,data(){return{css:i}}});var f="",m=`
  <div class="box bulma-box">
    <slot></slot>
  </div>
`,c=a({name:"bulma-box",template:m,data(){return{css:f}}});var p="",b=`
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
`,h=a({name:"bulma-button",template:b,props:{black:{type:Boolean,required:!1,default:()=>!1},danger:{type:Boolean,required:!1,default:()=>!1},dark:{type:Boolean,required:!1,default:()=>!1},ghost:{type:Boolean,required:!1,default:()=>!1},info:{type:Boolean,required:!1,default:()=>!1},light:{type:Boolean,required:!1,default:()=>!1},link:{type:Boolean,required:!1,default:()=>!1},primary:{type:Boolean,required:!1,default:()=>!1},success:{type:Boolean,required:!1,default:()=>!1},text:{type:Boolean,required:!1,default:()=>!1},warning:{type:Boolean,required:!1,default:()=>!1},white:{type:Boolean,required:!1,default:()=>!1}},data(){return{css:p}}});var B="",y=`
  <button class="delete"></button>
`,C=a({name:"bulma-delete",template:y,data(){return{css:B}}});})();
