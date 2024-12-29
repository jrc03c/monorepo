var i=Object.defineProperty;var B=Object.getOwnPropertyDescriptor;var g=Object.getOwnPropertyNames;var y=Object.prototype.hasOwnProperty;var C=(e,s)=>{for(var a in s)i(e,a,{get:s[a],enumerable:!0})},v=(e,s,a,l)=>{if(s&&typeof s=="object"||typeof s=="function")for(let r of g(s))!y.call(e,r)&&r!==a&&i(e,r,{get:()=>s[r],enumerable:!(l=B(s,r))||l.enumerable});return e};var x=e=>v(i({},"__esModule",{value:!0}),e);var A={};C(A,{BulmaBlock:()=>u,BulmaBox:()=>m,BulmaButton:()=>c,BulmaDelete:()=>n,BulmaIcon:()=>d,BulmaImage:()=>f,BulmaNotification:()=>p,BulmaProgress:()=>b});module.exports=x(A);function t(e){let s=0,a;e=e||{};let l=e.data?e.data:function(){},r=e.mounted?e.mounted:function(){},h=e.unmounted?e.unmounted:function(){};return l.css||(l.css=""),e.data=function(){return l.bind(this)()},e.mounted=function(){r.bind(this)(),s++;let o=this.$root.$el.getRootNode();o===document&&(o=o.body),a||(a=document.createElement("style"),o.appendChild(a),a.innerHTML=this.css)},e.unmounted=function(){h.bind(this)(),s--;let o=this.$root.$el.getRootNode();if(o===document&&(o=o.body),s<1){if(a)try{o.removeChild(a)}catch{try{a.parentElement.removeChild(a)}catch{}}a=null}},e}typeof window<"u"&&(window.createVueComponentWithCSS=t);var S="",k=`
  <div class="block bulma-block">
    <slot></slot>
  </div>
`,u=t({name:"bulma-block",template:k,data(){return{css:S}}});var q="",$=`
  <div class="box bulma-box">
    <slot></slot>
  </div>
`,m=t({name:"bulma-box",template:$,data(){return{css:q}}});var w="",V=`
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
`,c=t({name:"bulma-button",template:V,props:{black:{type:Boolean,required:!1,default:()=>!1},danger:{type:Boolean,required:!1,default:()=>!1},dark:{type:Boolean,required:!1,default:()=>!1},ghost:{type:Boolean,required:!1,default:()=>!1},info:{type:Boolean,required:!1,default:()=>!1},light:{type:Boolean,required:!1,default:()=>!1},link:{type:Boolean,required:!1,default:()=>!1},primary:{type:Boolean,required:!1,default:()=>!1},success:{type:Boolean,required:!1,default:()=>!1},text:{type:Boolean,required:!1,default:()=>!1},warning:{type:Boolean,required:!1,default:()=>!1},white:{type:Boolean,required:!1,default:()=>!1}},data(){return{css:w}}});var W="",I=`
  <button class="delete"></button>
`,n=t({name:"bulma-delete",template:I,data(){return{css:W}}});var L="",N=`
  <span class="icon">
    <i :class="{ ['la-' + name]: true }" class="las" ref="inner"></i>
  </span>
`,d=t({name:"bulma-icon",template:N,props:{name:{type:String,required:!0,default:()=>"exclamation-circle"}},data(){return{css:L,observer:null}},methods:{updateInnerClasses(){let e=Array.from(this.$el.classList);e.includes("is-medium")?this.$refs.inner.classList.add("la-lg"):this.$refs.inner.classList.remove("la-lg"),e.includes("is-large")?this.$refs.inner.classList.add("la-2x"):this.$refs.inner.classList.remove("la-2x")}},mounted(){this.observer=new MutationObserver(e=>{if(this.$refs.inner){for(let s of e)if(s.attributeName==="class"){this.updateInnerClasses();return}}}),this.observer.observe(this.$el,{attributes:!0,attributeFilter:["class"]}),this.$nextTick(()=>this.updateInnerClasses())},unmounted(){this.observer.disconnect()}});var D="",E=`
  <figure class="image">
    <img :src="src" v-if="src">
    <slot v-else></slot>
  </figure>
`,f=t({name:"bulma-image",template:E,props:{src:{type:String,required:!1,default:()=>""}},data(){return{css:D}}});var M="",P=`
  <div class="notification">
    <bulma-delete
      @click="$emit('close', $event)"
      v-if="!permanent">
    </bulma-delete>
    
    <slot></slot>
  </div>
`,p=t({name:"bulma-notification",emits:["close"],components:{"bulma-delete":n},template:P,props:{permanent:{type:Boolean,required:!1,default:()=>!1}},data(){return{css:M}}});var R="",T=`
  <progress :value="value" class="progress" max="1">
    {{ value * 100 }}%
  </progress>
`,b=t({name:"bulma-progress",template:T,props:{value:{type:Number,required:!1,default:()=>0}},data(){return{css:R}}});0&&(module.exports={BulmaBlock,BulmaBox,BulmaButton,BulmaDelete,BulmaIcon,BulmaImage,BulmaNotification,BulmaProgress});
