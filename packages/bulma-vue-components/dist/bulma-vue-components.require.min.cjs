var i=Object.defineProperty;var h=Object.getOwnPropertyDescriptor;var B=Object.getOwnPropertyNames;var g=Object.prototype.hasOwnProperty;var y=(e,t)=>{for(var a in t)i(e,a,{get:t[a],enumerable:!0})},C=(e,t,a,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let l of B(t))!g.call(e,l)&&l!==a&&i(e,l,{get:()=>t[l],enumerable:!(r=h(t,l))||r.enumerable});return e};var x=e=>C(i({},"__esModule",{value:!0}),e);var R={};y(R,{BulmaBlock:()=>u,BulmaBox:()=>m,BulmaButton:()=>c,BulmaDelete:()=>n,BulmaIcon:()=>d,BulmaImage:()=>f,BulmaNotification:()=>p});module.exports=x(R);function s(e){let t=0,a;e=e||{};let r=e.data?e.data:function(){},l=e.mounted?e.mounted:function(){},b=e.unmounted?e.unmounted:function(){};return r.css||(r.css=""),e.data=function(){return r.bind(this)()},e.mounted=function(){l.bind(this)(),t++;let o=this.$root.$el.getRootNode();o===document&&(o=o.body),a||(a=document.createElement("style"),o.appendChild(a),a.innerHTML=this.css)},e.unmounted=function(){b.bind(this)(),t--;let o=this.$root.$el.getRootNode();if(o===document&&(o=o.body),t<1){if(a)try{o.removeChild(a)}catch{try{a.parentElement.removeChild(a)}catch{}}a=null}},e}typeof window<"u"&&(window.createVueComponentWithCSS=s);var v="",S=`
  <div class="block bulma-block">
    <slot></slot>
  </div>
`,u=s({name:"bulma-block",template:S,data(){return{css:v}}});var k="",q=`
  <div class="box bulma-box">
    <slot></slot>
  </div>
`,m=s({name:"bulma-box",template:q,data(){return{css:k}}});var $="",w=`
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
`,c=s({name:"bulma-button",template:w,props:{black:{type:Boolean,required:!1,default:()=>!1},danger:{type:Boolean,required:!1,default:()=>!1},dark:{type:Boolean,required:!1,default:()=>!1},ghost:{type:Boolean,required:!1,default:()=>!1},info:{type:Boolean,required:!1,default:()=>!1},light:{type:Boolean,required:!1,default:()=>!1},link:{type:Boolean,required:!1,default:()=>!1},primary:{type:Boolean,required:!1,default:()=>!1},success:{type:Boolean,required:!1,default:()=>!1},text:{type:Boolean,required:!1,default:()=>!1},warning:{type:Boolean,required:!1,default:()=>!1},white:{type:Boolean,required:!1,default:()=>!1}},data(){return{css:$}}});var V="",W=`
  <button class="delete"></button>
`,n=s({name:"bulma-delete",template:W,data(){return{css:V}}});var I="",L=`
  <span class="icon">
    <i :class="{ ['la-' + name]: true }" class="las" ref="inner"></i>
  </span>
`,d=s({name:"bulma-icon",template:L,props:{name:{type:String,required:!0,default:()=>"exclamation-circle"}},data(){return{css:I,observer:null}},methods:{updateInnerClasses(){let e=Array.from(this.$el.classList);e.includes("is-medium")?this.$refs.inner.classList.add("la-lg"):this.$refs.inner.classList.remove("la-lg"),e.includes("is-large")?this.$refs.inner.classList.add("la-2x"):this.$refs.inner.classList.remove("la-2x")}},mounted(){this.observer=new MutationObserver(e=>{if(this.$refs.inner){for(let t of e)if(t.attributeName==="class"){this.updateInnerClasses();return}}}),this.observer.observe(this.$el,{attributes:!0,attributeFilter:["class"]}),this.$nextTick(()=>this.updateInnerClasses())},unmounted(){this.observer.disconnect()}});var N="",D=`
  <figure class="image">
    <img :src="src" v-if="src">
    <slot v-else></slot>
  </figure>
`,f=s({name:"bulma-image",template:D,props:{src:{type:String,required:!1,default:()=>""}},data(){return{css:N}}});var E="",M=`
  <div class="notification">
    <bulma-delete
      @click="$emit('close', $event)"
      v-if="!permanent">
    </bulma-delete>
    
    <slot></slot>
  </div>
`,p=s({name:"bulma-notification",emits:["close"],components:{"bulma-delete":n},template:M,props:{permanent:{type:Boolean,required:!1,default:()=>!1}},data(){return{css:E}}});0&&(module.exports={BulmaBlock,BulmaBox,BulmaButton,BulmaDelete,BulmaIcon,BulmaImage,BulmaNotification});
