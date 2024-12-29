function t(e){let o=0,s;e=e||{};let r=e.data?e.data:function(){},i=e.mounted?e.mounted:function(){},u=e.unmounted?e.unmounted:function(){};return r.css||(r.css=""),e.data=function(){return r.bind(this)()},e.mounted=function(){i.bind(this)(),o++;let a=this.$root.$el.getRootNode();a===document&&(a=a.body),s||(s=document.createElement("style"),a.appendChild(s),s.innerHTML=this.css)},e.unmounted=function(){u.bind(this)(),o--;let a=this.$root.$el.getRootNode();if(a===document&&(a=a.body),o<1){if(s)try{a.removeChild(s)}catch{try{s.parentElement.removeChild(s)}catch{}}s=null}},e}typeof window<"u"&&(window.createVueComponentWithCSS=t);var m="",c=`
  <div class="block bulma-block">
    <slot></slot>
  </div>
`,d=t({name:"bulma-block",template:c,data(){return{css:m}}});var f="",p=`
  <div class="box bulma-box">
    <slot></slot>
  </div>
`,b=t({name:"bulma-box",template:p,data(){return{css:f}}});var h="",g=`
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
`,v=t({name:"bulma-button",template:g,props:{black:{type:Boolean,required:!1,default:()=>!1},danger:{type:Boolean,required:!1,default:()=>!1},dark:{type:Boolean,required:!1,default:()=>!1},ghost:{type:Boolean,required:!1,default:()=>!1},info:{type:Boolean,required:!1,default:()=>!1},light:{type:Boolean,required:!1,default:()=>!1},link:{type:Boolean,required:!1,default:()=>!1},primary:{type:Boolean,required:!1,default:()=>!1},success:{type:Boolean,required:!1,default:()=>!1},text:{type:Boolean,required:!1,default:()=>!1},warning:{type:Boolean,required:!1,default:()=>!1},white:{type:Boolean,required:!1,default:()=>!1}},data(){return{css:h}}});var y="",B=`
  <button class="delete"></button>
`,l=t({name:"bulma-delete",template:B,data(){return{css:y}}});var x="",C=`
  <span class="icon">
    <i :class="{ ['la-' + name]: true }" class="las" ref="inner"></i>
  </span>
`,S=t({name:"bulma-icon",template:C,props:{name:{type:String,required:!0,default:()=>"exclamation-circle"}},data(){return{css:x,observer:null}},methods:{updateInnerClasses(){let e=Array.from(this.$el.classList);e.includes("is-medium")?this.$refs.inner.classList.add("la-lg"):this.$refs.inner.classList.remove("la-lg"),e.includes("is-large")?this.$refs.inner.classList.add("la-2x"):this.$refs.inner.classList.remove("la-2x")}},mounted(){this.observer=new MutationObserver(e=>{if(this.$refs.inner){for(let o of e)if(o.attributeName==="class"){this.updateInnerClasses();return}}}),this.observer.observe(this.$el,{attributes:!0,attributeFilter:["class"]}),this.$nextTick(()=>this.updateInnerClasses())},unmounted(){this.observer.disconnect()}});var k="",q=`
  <figure class="image">
    <img :src="src" v-if="src">
    <slot v-else></slot>
  </figure>
`,$=t({name:"bulma-image",template:q,props:{src:{type:String,required:!1,default:()=>""}},data(){return{css:k}}});var w="",V=`
  <div class="notification">
    <bulma-delete
      @click="$emit('close', $event)"
      v-if="!permanent">
    </bulma-delete>
    
    <slot></slot>
  </div>
`,W=t({name:"bulma-notification",emits:["close"],components:{"bulma-delete":l},template:V,props:{permanent:{type:Boolean,required:!1,default:()=>!1}},data(){return{css:w}}});var I="",j=`
  <progress :value="value" class="progress" max="1">
    {{ value * 100 }}%
  </progress>
`,L=t({name:"bulma-progress",template:j,props:{value:{type:Number,required:!1,default:()=>0}},data(){return{css:I}}});function n(e,o){let s=[];for(let r=e;r<o;r++)s.push(r);return s}var N="",A=`
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
`,T=t({name:"bulma-table",template:A,props:{columns:{type:Array,required:!1,default:()=>[]},index:{type:Array,required:!1,default:()=>[]},values:{type:Array,required:!1,default:()=>[]}},data(){return{css:N}},methods:{range:n}});export{d as BulmaBlock,b as BulmaBox,v as BulmaButton,l as BulmaDelete,S as BulmaIcon,$ as BulmaImage,W as BulmaNotification,L as BulmaProgress,T as BulmaTable};
