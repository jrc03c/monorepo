var i=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var B=Object.getOwnPropertyNames;var x=Object.prototype.hasOwnProperty;var C=(e,s)=>{for(var a in s)i(e,a,{get:s[a],enumerable:!0})},S=(e,s,a,o)=>{if(s&&typeof s=="object"||typeof s=="function")for(let l of B(s))!x.call(e,l)&&l!==a&&i(e,l,{get:()=>s[l],enumerable:!(o=y(s,l))||o.enumerable});return e};var k=e=>S(i({},"__esModule",{value:!0}),e);var O={};C(O,{BulmaBlock:()=>u,BulmaBox:()=>m,BulmaButton:()=>c,BulmaDelete:()=>n,BulmaIcon:()=>d,BulmaImage:()=>f,BulmaNotification:()=>p,BulmaProgress:()=>b,BulmaTable:()=>g});module.exports=k(O);function t(e){let s=0,a;e=e||{};let o=e.data?e.data:function(){},l=e.mounted?e.mounted:function(){},v=e.unmounted?e.unmounted:function(){};return o.css||(o.css=""),e.data=function(){return o.bind(this)()},e.mounted=function(){l.bind(this)(),s++;let r=this.$root.$el.getRootNode();r===document&&(r=r.body),a||(a=document.createElement("style"),r.appendChild(a),a.innerHTML=this.css)},e.unmounted=function(){v.bind(this)(),s--;let r=this.$root.$el.getRootNode();if(r===document&&(r=r.body),s<1){if(a)try{r.removeChild(a)}catch{try{a.parentElement.removeChild(a)}catch{}}a=null}},e}typeof window<"u"&&(window.createVueComponentWithCSS=t);var q="",$=`
  <div class="block bulma-block">
    <slot></slot>
  </div>
`,u=t({name:"bulma-block",template:$,data(){return{css:q}}});var w="",V=`
  <div class="box bulma-box">
    <slot></slot>
  </div>
`,m=t({name:"bulma-box",template:V,data(){return{css:w}}});var W="",I=`
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
`,c=t({name:"bulma-button",template:I,props:{black:{type:Boolean,required:!1,default:()=>!1},danger:{type:Boolean,required:!1,default:()=>!1},dark:{type:Boolean,required:!1,default:()=>!1},ghost:{type:Boolean,required:!1,default:()=>!1},info:{type:Boolean,required:!1,default:()=>!1},light:{type:Boolean,required:!1,default:()=>!1},link:{type:Boolean,required:!1,default:()=>!1},primary:{type:Boolean,required:!1,default:()=>!1},success:{type:Boolean,required:!1,default:()=>!1},text:{type:Boolean,required:!1,default:()=>!1},warning:{type:Boolean,required:!1,default:()=>!1},white:{type:Boolean,required:!1,default:()=>!1}},data(){return{css:W}}});var j="",L=`
  <button class="delete"></button>
`,n=t({name:"bulma-delete",template:L,data(){return{css:j}}});var N="",A=`
  <span class="icon">
    <i :class="{ ['la-' + name]: true }" class="las" ref="inner"></i>
  </span>
`,d=t({name:"bulma-icon",template:A,props:{name:{type:String,required:!0,default:()=>"exclamation-circle"}},data(){return{css:N,observer:null}},methods:{updateInnerClasses(){let e=Array.from(this.$el.classList);e.includes("is-medium")?this.$refs.inner.classList.add("la-lg"):this.$refs.inner.classList.remove("la-lg"),e.includes("is-large")?this.$refs.inner.classList.add("la-2x"):this.$refs.inner.classList.remove("la-2x")}},mounted(){this.observer=new MutationObserver(e=>{if(this.$refs.inner){for(let s of e)if(s.attributeName==="class"){this.updateInnerClasses();return}}}),this.observer.observe(this.$el,{attributes:!0,attributeFilter:["class"]}),this.$nextTick(()=>this.updateInnerClasses())},unmounted(){this.observer.disconnect()}});var T="",D=`
  <figure class="image">
    <img :src="src" v-if="src">
    <slot v-else></slot>
  </figure>
`,f=t({name:"bulma-image",template:D,props:{src:{type:String,required:!1,default:()=>""}},data(){return{css:T}}});var E="",M=`
  <div class="notification">
    <bulma-delete
      @click="$emit('close', $event)"
      v-if="!permanent">
    </bulma-delete>
    
    <slot></slot>
  </div>
`,p=t({name:"bulma-notification",emits:["close"],components:{"bulma-delete":n},template:M,props:{permanent:{type:Boolean,required:!1,default:()=>!1}},data(){return{css:E}}});var P="",R=`
  <progress :value="value" class="progress" max="1">
    {{ value * 100 }}%
  </progress>
`,b=t({name:"bulma-progress",template:R,props:{value:{type:Number,required:!1,default:()=>0}},data(){return{css:P}}});function h(e,s){let a=[];for(let o=e;o<s;o++)a.push(o);return a}var F="",H=`
  <table class="table" v-if="values && values.length > 0">
    <thead v-if="columns && columns.length > 0">
      <tr>
        <th v-if="index && index.length > 0"></th>

        <th :key="j" v-for="j in range(0, columns.length)">
          <b>{{ columns[j] }}</b>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr :key="i" v-for="i in range(0, values.length)">
        <td v-if="index && index.length > 0">
          <b>{{ index[i] }}</b>
        </td>

        <td :key="j" v-for="j in range(0, values[i].length)">
          {{ values[i][j] }}
        </td>
      </tr>
    </tbody>
  </table>

  <table class="table" v-else>
    <slot></slot>
  </table>
`,g=t({name:"bulma-table",template:H,props:{columns:{type:Array,required:!1,default:()=>[]},index:{type:Array,required:!1,default:()=>[]},values:{type:Array,required:!1,default:()=>[]}},data(){return{css:F}},methods:{range:h}});0&&(module.exports={BulmaBlock,BulmaBox,BulmaButton,BulmaDelete,BulmaIcon,BulmaImage,BulmaNotification,BulmaProgress,BulmaTable});
