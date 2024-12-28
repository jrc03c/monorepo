var n=Object.defineProperty;var h=Object.getOwnPropertyDescriptor;var b=Object.getOwnPropertyNames;var B=Object.prototype.hasOwnProperty;var g=(e,t)=>{for(var s in t)n(e,s,{get:t[s],enumerable:!0})},y=(e,t,s,l)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of b(t))!B.call(e,r)&&r!==s&&n(e,r,{get:()=>t[r],enumerable:!(l=h(t,r))||l.enumerable});return e};var C=e=>y(n({},"__esModule",{value:!0}),e);var N={};g(N,{BulmaBlock:()=>i,BulmaBox:()=>u,BulmaButton:()=>c,BulmaDelete:()=>m,BulmaIcon:()=>d,BulmaImage:()=>f});module.exports=C(N);function a(e){let t=0,s;e=e||{};let l=e.data?e.data:function(){},r=e.mounted?e.mounted:function(){},p=e.unmounted?e.unmounted:function(){};return l.css||(l.css=""),e.data=function(){return l.bind(this)()},e.mounted=function(){r.bind(this)(),t++;let o=this.$root.$el.getRootNode();o===document&&(o=o.body),s||(s=document.createElement("style"),o.appendChild(s),s.innerHTML=this.css)},e.unmounted=function(){p.bind(this)(),t--;let o=this.$root.$el.getRootNode();if(o===document&&(o=o.body),t<1){if(s)try{o.removeChild(s)}catch{try{s.parentElement.removeChild(s)}catch{}}s=null}},e}typeof window<"u"&&(window.createVueComponentWithCSS=a);var x="",S=`
  <div class="block bulma-block">
    <slot></slot>
  </div>
`,i=a({name:"bulma-block",template:S,data(){return{css:x}}});var v="",k=`
  <div class="box bulma-box">
    <slot></slot>
  </div>
`,u=a({name:"bulma-box",template:k,data(){return{css:v}}});var q="",$=`
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
`,c=a({name:"bulma-button",template:$,props:{black:{type:Boolean,required:!1,default:()=>!1},danger:{type:Boolean,required:!1,default:()=>!1},dark:{type:Boolean,required:!1,default:()=>!1},ghost:{type:Boolean,required:!1,default:()=>!1},info:{type:Boolean,required:!1,default:()=>!1},light:{type:Boolean,required:!1,default:()=>!1},link:{type:Boolean,required:!1,default:()=>!1},primary:{type:Boolean,required:!1,default:()=>!1},success:{type:Boolean,required:!1,default:()=>!1},text:{type:Boolean,required:!1,default:()=>!1},warning:{type:Boolean,required:!1,default:()=>!1},white:{type:Boolean,required:!1,default:()=>!1}},data(){return{css:q}}});var w="",V=`
  <button class="delete"></button>
`,m=a({name:"bulma-delete",template:V,data(){return{css:w}}});var W="",I=`
  <span class="icon">
    <i :class="{ ['la-' + name]: true }" class="las" ref="inner"></i>
  </span>
`,d=a({name:"bulma-icon",template:I,props:{name:{type:String,required:!0,default:()=>"exclamation-circle"}},data(){return{css:W,observer:null}},methods:{updateInnerClasses(){let e=Array.from(this.$el.classList);e.includes("is-medium")?this.$refs.inner.classList.add("la-lg"):this.$refs.inner.classList.remove("la-lg"),e.includes("is-large")?this.$refs.inner.classList.add("la-2x"):this.$refs.inner.classList.remove("la-2x")}},mounted(){this.observer=new MutationObserver(e=>{if(this.$refs.inner){for(let t of e)if(t.attributeName==="class"){this.updateInnerClasses();return}}}),this.observer.observe(this.$el,{attributes:!0,attributeFilter:["class"]}),this.$nextTick(()=>this.updateInnerClasses())},unmounted(){this.observer.disconnect()}});var L="",E=`
  <figure class="image">
    <img :src="src" v-if="src">
    <slot v-else></slot>
  </figure>
`,f=a({name:"bulma-image",template:E,props:{src:{type:String,required:!1,default:()=>""}},data(){return{css:L}}});0&&(module.exports={BulmaBlock,BulmaBox,BulmaButton,BulmaDelete,BulmaIcon,BulmaImage});
