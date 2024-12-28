(()=>{function t(e){let o=0,s;e=e||{};let r=e.data?e.data:function(){},l=e.mounted?e.mounted:function(){},n=e.unmounted?e.unmounted:function(){};return r.css||(r.css=""),e.data=function(){return r.bind(this)()},e.mounted=function(){l.bind(this)(),o++;let a=this.$root.$el.getRootNode();a===document&&(a=a.body),s||(s=document.createElement("style"),a.appendChild(s),s.innerHTML=this.css)},e.unmounted=function(){n.bind(this)(),o--;let a=this.$root.$el.getRootNode();if(a===document&&(a=a.body),o<1){if(s)try{a.removeChild(s)}catch{try{s.parentElement.removeChild(s)}catch{}}s=null}},e}typeof window<"u"&&(window.createVueComponentWithCSS=t);var i="",u=`
  <div class="block bulma-block">
    <slot></slot>
  </div>
`,c=t({name:"bulma-block",template:u,data(){return{css:i}}});var m="",d=`
  <div class="box bulma-box">
    <slot></slot>
  </div>
`,f=t({name:"bulma-box",template:d,data(){return{css:m}}});var p="",h=`
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
`,b=t({name:"bulma-button",template:h,props:{black:{type:Boolean,required:!1,default:()=>!1},danger:{type:Boolean,required:!1,default:()=>!1},dark:{type:Boolean,required:!1,default:()=>!1},ghost:{type:Boolean,required:!1,default:()=>!1},info:{type:Boolean,required:!1,default:()=>!1},light:{type:Boolean,required:!1,default:()=>!1},link:{type:Boolean,required:!1,default:()=>!1},primary:{type:Boolean,required:!1,default:()=>!1},success:{type:Boolean,required:!1,default:()=>!1},text:{type:Boolean,required:!1,default:()=>!1},warning:{type:Boolean,required:!1,default:()=>!1},white:{type:Boolean,required:!1,default:()=>!1}},data(){return{css:p}}});var B="",g=`
  <button class="delete"></button>
`,y=t({name:"bulma-delete",template:g,data(){return{css:B}}});var C="",x=`
  <span class="icon">
    <i :class="{ ['la-' + name]: true }" class="las" ref="inner"></i>
  </span>
`,S=t({name:"bulma-icon",template:x,props:{name:{type:String,required:!0,default:()=>"exclamation-circle"}},data(){return{css:C,observer:null}},methods:{updateInnerClasses(){let e=Array.from(this.$el.classList);e.includes("is-medium")?this.$refs.inner.classList.add("la-lg"):this.$refs.inner.classList.remove("la-lg"),e.includes("is-large")?this.$refs.inner.classList.add("la-2x"):this.$refs.inner.classList.remove("la-2x")}},mounted(){this.observer=new MutationObserver(e=>{if(this.$refs.inner){for(let o of e)if(o.attributeName==="class"){this.updateInnerClasses();return}}}),this.observer.observe(this.$el,{attributes:!0,attributeFilter:["class"]}),this.$nextTick(()=>this.updateInnerClasses())},unmounted(){this.observer.disconnect()}});var v="",k=`
  <figure class="image">
    <img :src="src" v-if="src">
    <slot v-else></slot>
  </figure>
`,q=t({name:"bulma-image",template:k,props:{src:{type:String,required:!1,default:()=>""}},data(){return{css:v}}});})();
