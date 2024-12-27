var n=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var h=Object.getOwnPropertyNames;var b=Object.prototype.hasOwnProperty;var B=(e,t)=>{for(var s in t)n(e,s,{get:t[s],enumerable:!0})},y=(e,t,s,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let l of h(t))!b.call(e,l)&&l!==s&&n(e,l,{get:()=>t[l],enumerable:!(r=p(t,l))||r.enumerable});return e};var C=e=>y(n({},"__esModule",{value:!0}),e);var L={};B(L,{BulmaBlock:()=>i,BulmaBox:()=>u,BulmaButton:()=>d,BulmaDelete:()=>c,BulmaIcon:()=>f});module.exports=C(L);function a(e){let t=0,s;e=e||{};let r=e.data?e.data:function(){},l=e.mounted?e.mounted:function(){},m=e.unmounted?e.unmounted:function(){};return r.css||(r.css=""),e.data=function(){return r.bind(this)()},e.mounted=function(){l.bind(this)(),t++;let o=this.$root.$el.getRootNode();o===document&&(o=o.body),s||(s=document.createElement("style"),o.appendChild(s),s.innerHTML=this.css)},e.unmounted=function(){m.bind(this)(),t--;let o=this.$root.$el.getRootNode();if(o===document&&(o=o.body),t<1){if(s)try{o.removeChild(s)}catch{try{s.parentElement.removeChild(s)}catch{}}s=null}},e}typeof window<"u"&&(window.createVueComponentWithCSS=a);var x="",g=`
  <div class="block bulma-block">
    <slot></slot>
  </div>
`,i=a({name:"bulma-block",template:g,data(){return{css:x}}});var k="",S=`
  <div class="box bulma-box">
    <slot></slot>
  </div>
`,u=a({name:"bulma-box",template:S,data(){return{css:k}}});var v="",q=`
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
`,d=a({name:"bulma-button",template:q,props:{black:{type:Boolean,required:!1,default:()=>!1},danger:{type:Boolean,required:!1,default:()=>!1},dark:{type:Boolean,required:!1,default:()=>!1},ghost:{type:Boolean,required:!1,default:()=>!1},info:{type:Boolean,required:!1,default:()=>!1},light:{type:Boolean,required:!1,default:()=>!1},link:{type:Boolean,required:!1,default:()=>!1},primary:{type:Boolean,required:!1,default:()=>!1},success:{type:Boolean,required:!1,default:()=>!1},text:{type:Boolean,required:!1,default:()=>!1},warning:{type:Boolean,required:!1,default:()=>!1},white:{type:Boolean,required:!1,default:()=>!1}},data(){return{css:v}}});var $="",w=`
  <button class="delete"></button>
`,c=a({name:"bulma-delete",template:w,data(){return{css:$}}});var V="",W=`
  <span class="icon">
    <i :class="{ ['la-' + name]: true }" class="las" ref="inner"></i>
  </span>
`,f=a({name:"bulma-icon",template:W,props:{name:{type:String,required:!0,default:()=>"exclamation-circle"}},data(){return{css:V,observer:null}},methods:{updateInnerClasses(){let e=Array.from(this.$el.classList);e.includes("is-medium")?this.$refs.inner.classList.add("la-lg"):this.$refs.inner.classList.remove("la-lg"),e.includes("is-large")?this.$refs.inner.classList.add("la-2x"):this.$refs.inner.classList.remove("la-2x")}},mounted(){this.observer=new MutationObserver(e=>{if(this.$refs.inner){for(let t of e)if(t.attributeName==="class"){this.updateInnerClasses();return}}}),this.observer.observe(this.$el,{attributes:!0,attributeFilter:["class"]}),this.$nextTick(()=>this.updateInnerClasses())},unmounted(){this.observer.disconnect()}});0&&(module.exports={BulmaBlock,BulmaBox,BulmaButton,BulmaDelete,BulmaIcon});
