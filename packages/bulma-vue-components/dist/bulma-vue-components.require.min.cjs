var u=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var B=Object.getOwnPropertyNames;var C=Object.prototype.hasOwnProperty;var x=(e,s)=>{for(var a in s)u(e,a,{get:s[a],enumerable:!0})},S=(e,s,a,l)=>{if(s&&typeof s=="object"||typeof s=="function")for(let o of B(s))!C.call(e,o)&&o!==a&&u(e,o,{get:()=>s[o],enumerable:!(l=k(s,o))||l.enumerable});return e};var j=e=>S(u({},"__esModule",{value:!0}),e);var J={};x(J,{BulmaBlock:()=>m,BulmaBox:()=>d,BulmaButton:()=>f,BulmaDelete:()=>n,BulmaIcon:()=>r,BulmaImage:()=>g,BulmaNotification:()=>p,BulmaProgress:()=>b,BulmaTable:()=>h,BulmaTags:()=>v});module.exports=j(J);function t(e){let s=0,a;e=e||{};let l=e.data?e.data:function(){},o=e.mounted?e.mounted:function(){},y=e.unmounted?e.unmounted:function(){};return l.css||(l.css=""),e.data=function(){return l.bind(this)()},e.mounted=function(){o.bind(this)(),s++;let i=this.$root.$el.getRootNode();i===document&&(i=i.body),a||(a=document.createElement("style"),i.appendChild(a),a.innerHTML=this.css)},e.unmounted=function(){y.bind(this)(),s--;let i=this.$root.$el.getRootNode();if(i===document&&(i=i.body),s<1){if(a)try{i.removeChild(a)}catch{try{a.parentElement.removeChild(a)}catch{}}a=null}},e}typeof window<"u"&&(window.createVueComponentWithCSS=t);var q="",$=`
  <div class="block bulma-block">
    <slot></slot>
  </div>
`,m=t({name:"bulma-block",template:$,data(){return{css:q}}});var w="",V=`
  <div class="box bulma-box">
    <slot></slot>
  </div>
`,d=t({name:"bulma-box",template:V,data(){return{css:w}}});var W="",I=`
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
`,f=t({name:"bulma-button",template:I,props:{black:{type:Boolean,required:!1,default:()=>!1},danger:{type:Boolean,required:!1,default:()=>!1},dark:{type:Boolean,required:!1,default:()=>!1},ghost:{type:Boolean,required:!1,default:()=>!1},info:{type:Boolean,required:!1,default:()=>!1},light:{type:Boolean,required:!1,default:()=>!1},link:{type:Boolean,required:!1,default:()=>!1},primary:{type:Boolean,required:!1,default:()=>!1},success:{type:Boolean,required:!1,default:()=>!1},text:{type:Boolean,required:!1,default:()=>!1},warning:{type:Boolean,required:!1,default:()=>!1},white:{type:Boolean,required:!1,default:()=>!1}},data(){return{css:W}}});var L="",N=`
  <button class="bulma-delete delete"></button>
`,n=t({name:"bulma-delete",template:N,data(){return{css:L}}});var T="",A=`
  <span class="bulma-icon icon">
    <i :class="{ ['la-' + name]: true }" class="las" ref="inner"></i>
  </span>
`,r=t({name:"bulma-icon",template:A,props:{name:{type:String,required:!0,default:()=>"exclamation-circle"}},data(){return{css:T,observer:null}},methods:{updateInnerClasses(){let e=Array.from(this.$el.classList);e.includes("is-medium")?this.$refs.inner.classList.add("la-lg"):this.$refs.inner.classList.remove("la-lg"),e.includes("is-large")?this.$refs.inner.classList.add("la-2x"):this.$refs.inner.classList.remove("la-2x")}},mounted(){this.observer=new MutationObserver(e=>{if(this.$refs.inner){for(let s of e)if(s.attributeName==="class"){this.updateInnerClasses();return}}}),this.observer.observe(this.$el,{attributes:!0,attributeFilter:["class"]}),this.$nextTick(()=>this.updateInnerClasses())},unmounted(){this.observer.disconnect()}});var D="",E=`
  <figure class="bulma-image image">
    <img :src="src" v-if="src">
    <slot v-else></slot>
  </figure>
`,g=t({name:"bulma-image",template:E,props:{src:{type:String,required:!1,default:()=>""}},data(){return{css:D}}});var M="",P=`
  <div class="bulma-notification notification">
    <bulma-delete
      @click="$emit('close', $event)"
      v-if="!permanent">
    </bulma-delete>
    
    <slot></slot>
  </div>
`,p=t({name:"bulma-notification",emits:["close"],components:{"bulma-delete":n},template:P,props:{permanent:{type:Boolean,required:!1,default:()=>!1}},data(){return{css:M}}});var R="",F=`
  <progress :value="value" class="bulma-progress progress" max="1">
    {{ value * 100 }}%
  </progress>
`,b=t({name:"bulma-progress",template:F,props:{value:{type:Number,required:!1,default:()=>0}},data(){return{css:R}}});function c(e,s){let a=[];for(let l=e;l<s;l++)a.push(l);return a}var H="",O=`
  <table class="bulma-table table" v-if="values && values.length > 0">
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
`,h=t({name:"bulma-table",template:O,props:{columns:{type:Array,required:!1,default:()=>[]},index:{type:Array,required:!1,default:()=>[]},values:{type:Array,required:!1,default:()=>[]}},data(){return{css:H}},methods:{range:c}});var z=`
  .bulma-tag .bulma-icon {
    padding-right: 8px;
  }
`,G=`
  <div class="bulma-tags field is-grouped is-grouped-multiline">
    <div :key="i" class="control" v-for="i in range(0, tags.length)">
      <div class="tags has-addons">
        <!-- string tag, clickable -->
        <a
          @click="$emit('click', tags[i])"
          class="bulma-tag tag"
          v-if="typeof tags[i] === 'string' && !!tags[i].click">
          {{ tags[i] }}
        </a>

        <!-- string tag, not clickable -->
        <span
          class="bulma-tag tag"
          v-if="typeof tags[i] === 'string' && !tags[i].click">
          {{ tags[i] }}
        </span>

        <!-- object tag with classes, clickable -->
        <a
          :class="
            (tags[i].classes || [])
              .reduce(
                (a, b) => { a[b] = true; return a },
                {}
              )
          "
          @click="$emit('click', tags[i])"
          class="bulma-tag tag"
          v-if="!!tags[i].name && !!tags[i].click">
          <bulma-icon
            :name="tags[i].icon"
            v-if="tags[i].icon">
          </bulma-icon>

          {{ tags[i].name }}
        </a>

        <!-- object tag with classes, not clickable -->
        <span
          :class="
            (tags[i].classes || [])
              .reduce(
                (a, b) => { a[b] = true; return a },
                {}
              )
          "
          class="bulma-tag tag"
          v-if="!!tags[i].name && !tags[i].click">
          <bulma-icon
            :name="tags[i].icon"
            v-if="tags[i].icon">
          </bulma-icon>

          {{ tags[i].name }}
        </span>

        <!-- object tag with multiple names and classes, clickable -->
        <a
          :class="{ [tags[i].classes[j]]: true }"
          :key="j"
          @click="$emit('click', tags[i])"
          class="bulma-tag tag"
          v-for="j in range(0, tags[i].names.length)"
          v-if="!!tags[i].names && !!tags[i].click">
          <bulma-icon
            :name="tags[i].icons[j]"
            v-if="tags[i].icons && tags[i].icons.length > 0">
          </bulma-icon>

          {{ tags[i].names[j] }}
        </a>

        <!-- object tag with multiple names and classes, not clickable -->
        <span
          :class="{ [tags[i].classes[j]]: true }"
          :key="j"
          class="bulma-tag tag"
          v-for="j in range(0, tags[i].names.length)"
          v-if="!!tags[i].names && !tags[i].click">
          <bulma-icon
            :name="tags[i].icons[j]"
            v-if="tags[i].icons && tags[i].icons.length > 0">
          </bulma-icon>

          {{ tags[i].names[j] }}
        </span>

        <a
          :class="getDeleteClass(tags[i])"
          @click="$emit('delete', tags[i])"
          class="bulma-tag is-delete tag"
          v-if="!!tags[i].delete">
        </a>
      </div>
    </div>
  </div>
`,v=t({name:"bulma-tags",emits:["click","delete"],components:{"bulma-icon":r},template:G,props:{tags:{type:Array,required:!0,default:()=>[]}},data(){return{css:z}},methods:{getDeleteClass(e){if(e.classes&&e.classes.length>0){let s=["is-danger","is-warning","is-success","is-primary","is-info","is-link","is-dark"],a=e.classes.filter(l=>s.includes(l));return a.length>0?{[a.at(-1)]:!0,"is-light":!0}:{}}else return{}},range:c}});0&&(module.exports={BulmaBlock,BulmaBox,BulmaButton,BulmaDelete,BulmaIcon,BulmaImage,BulmaNotification,BulmaProgress,BulmaTable,BulmaTags});
