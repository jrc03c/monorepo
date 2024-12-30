var u=Object.defineProperty;var B=Object.getOwnPropertyDescriptor;var x=Object.getOwnPropertyNames;var C=Object.prototype.hasOwnProperty;var S=(e,s)=>{for(var a in s)u(e,a,{get:s[a],enumerable:!0})},q=(e,s,a,i)=>{if(s&&typeof s=="object"||typeof s=="function")for(let n of x(s))!C.call(e,n)&&n!==a&&u(e,n,{get:()=>s[n],enumerable:!(i=B(s,n))||i.enumerable});return e};var j=e=>q(u({},"__esModule",{value:!0}),e);var U={};S(U,{BulmaBlock:()=>m,BulmaBox:()=>d,BulmaBreadcrumbs:()=>f,BulmaButton:()=>g,BulmaDelete:()=>c,BulmaIcon:()=>r,BulmaImage:()=>p,BulmaNotification:()=>b,BulmaProgress:()=>k,BulmaTable:()=>h,BulmaTags:()=>v});module.exports=j(U);function t(e){let s=0,a;e=e||{};let i=e.data?e.data:function(){},n=e.mounted?e.mounted:function(){},y=e.unmounted?e.unmounted:function(){};return i.css||(i.css=""),e.data=function(){return i.bind(this)()},e.mounted=function(){n.bind(this)(),s++;let l=this.$root.$el.getRootNode();l===document&&(l=l.body),a||(a=document.createElement("style"),l.appendChild(a),a.innerHTML=this.css)},e.unmounted=function(){y.bind(this)(),s--;let l=this.$root.$el.getRootNode();if(l===document&&(l=l.body),s<1){if(a)try{l.removeChild(a)}catch{try{a.parentElement.removeChild(a)}catch{}}a=null}},e}typeof window<"u"&&(window.createVueComponentWithCSS=t);var $="",w=`
  <div class="block bulma-block">
    <slot></slot>
  </div>
`,m=t({name:"bulma-block",template:w,data(){return{css:$}}});var I="",V=`
  <div class="box bulma-box">
    <slot></slot>
  </div>
`,d=t({name:"bulma-box",template:V,data(){return{css:I}}});var W="",A=`
  <span class="bulma-icon icon">
    <i
      :class="{
        ['la-' + name]: true,
        lab: brand,
        lar: regular,
        las: solid,
      }"
      ref="inner">
    </i>
  </span>
`,r=t({name:"bulma-icon",template:A,props:{brand:{type:Boolean,required:!1,default:()=>!1},name:{type:String,required:!0,default:()=>"exclamation-circle"},regular:{type:Boolean,required:!1,default:()=>!1},solid:{type:Boolean,required:!1,default:()=>!0}},data(){return{css:W,observer:null}},methods:{updateInnerClasses(){let e=Array.from(this.$el.classList);e.includes("is-medium")?this.$refs.inner.classList.add("la-lg"):this.$refs.inner.classList.remove("la-lg"),e.includes("is-large")?this.$refs.inner.classList.add("la-2x"):this.$refs.inner.classList.remove("la-2x")}},mounted(){this.observer=new MutationObserver(e=>{if(this.$refs.inner){for(let s of e)if(s.attributeName==="class"){this.updateInnerClasses();return}}}),this.observer.observe(this.$el,{attributes:!0,attributeFilter:["class"]}),this.$nextTick(()=>this.updateInnerClasses())},unmounted(){this.observer.disconnect()}});function o(e,s){let a=[];for(let i=e;i<s;i++)a.push(i);return a}var L=`
  nav.breadcrumb ul li.is-excess a {
    color: hsl(0, 0%, 86%) ; /* grey-lighter */
  }

  nav.breadcrumb ul li a .bulma-icon {
    margin-left: -0.25em !important;
    margin-right: 0.25em !important;
  }

  nav.breadcrumb ul li.is-active a .bulma-icon {
    border-bottom: 2px solid transparent;
  }

  nav.breadcrumb ul li.is-active a span:not(.bulma-icon) {
    border-bottom: 2px solid var(--bulma-breadcrumb-item-active-color);
  }
`,N=`
  <nav aria-label="breadcrumbs" class="breadcrumb">
    <ul v-if="links && links.length > 0">
      <li
        :class="{
          'is-active': links[i].isActive,
          'is-excess': i > this.activeLinkIndex,
        }"
        :key="links[i].label"
        v-for="i in range(0, links.length)">
        <router-link
          :to="links[i].path"
          @click="$emit('click', links[i])"
          aria-current="page"
          v-if="links[i].isActive">
          <bulma-icon
            :brand="links[i].icon.brand"
            :name="
              typeof links[i].icon === 'string'
                ? links[i].icon
                : links[i].icon.name
            "
            :regular="links[i].icon.regular"
            :solid="
              typeof links[i].icon.solid === 'undefined'
                ? !links[i].icon.brand && !links[i].icon.regular
                : links[i].solid
            "
            v-if="links[i].icon">
          </bulma-icon>

          <span>{{ links[i].label }}</span>
        </router-link>

        <router-link
          :to="links[i].path"
          @click="$emit('click', links[i])"
          v-else>
          <bulma-icon
            :brand="links[i].icon.brand"
            :name="
              typeof links[i].icon === 'string'
                ? links[i].icon
                : links[i].icon.name
            "
            :regular="links[i].icon.regular"
            :solid="
              typeof links[i].icon.solid === 'undefined'
                ? !links[i].icon.brand && !links[i].icon.regular
                : links[i].solid
            "
            v-if="links[i].icon">
          </bulma-icon>
          
          <span>{{ links[i].label }}</span>
        </router-link>
      </li>
    </ul>

    <slot v-else></slot>
  </nav>
`,f=t({name:"bulma-breadcrumbs",emits:["click"],components:{"bulma-icon":r},template:N,props:{links:{type:Array,required:!1,default:()=>[]}},data(){return{css:L,activeLinkIndex:-1}},watch:{links:{deep:!0,handler(){this.activeLinkIndex=this.links.findIndex(e=>e.isActive)}}},methods:{range:o}});var T="",D=`
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
`,g=t({name:"bulma-button",template:D,props:{black:{type:Boolean,required:!1,default:()=>!1},danger:{type:Boolean,required:!1,default:()=>!1},dark:{type:Boolean,required:!1,default:()=>!1},ghost:{type:Boolean,required:!1,default:()=>!1},info:{type:Boolean,required:!1,default:()=>!1},light:{type:Boolean,required:!1,default:()=>!1},link:{type:Boolean,required:!1,default:()=>!1},primary:{type:Boolean,required:!1,default:()=>!1},success:{type:Boolean,required:!1,default:()=>!1},text:{type:Boolean,required:!1,default:()=>!1},warning:{type:Boolean,required:!1,default:()=>!1},white:{type:Boolean,required:!1,default:()=>!1}},data(){return{css:T}}});var E="",M=`
  <button class="bulma-delete delete"></button>
`,c=t({name:"bulma-delete",template:M,data(){return{css:E}}});var P="",R=`
  <figure class="bulma-image image">
    <img :src="src" v-if="src">
    <slot v-else></slot>
  </figure>
`,p=t({name:"bulma-image",template:R,props:{src:{type:String,required:!1,default:()=>""}},data(){return{css:P}}});var F="",H=`
  <div class="bulma-notification notification">
    <bulma-delete
      @click="$emit('close', $event)"
      v-if="!permanent">
    </bulma-delete>
    
    <slot></slot>
  </div>
`,b=t({name:"bulma-notification",emits:["close"],components:{"bulma-delete":c},template:H,props:{permanent:{type:Boolean,required:!1,default:()=>!1}},data(){return{css:F}}});var O="",z=`
  <progress :value="value" class="bulma-progress progress" max="1">
    {{ value * 100 }}%
  </progress>
`,k=t({name:"bulma-progress",template:z,props:{value:{type:Number,required:!1,default:()=>0}},data(){return{css:O}}});var G="",J=`
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
`,h=t({name:"bulma-table",template:J,props:{columns:{type:Array,required:!1,default:()=>[]},index:{type:Array,required:!1,default:()=>[]},values:{type:Array,required:!1,default:()=>[]}},data(){return{css:G}},methods:{range:o}});var K=`
  .bulma-tag .bulma-icon {
    padding-right: 8px;
  }
`,Q=`
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
`,v=t({name:"bulma-tags",emits:["click","delete"],components:{"bulma-icon":r},template:Q,props:{tags:{type:Array,required:!0,default:()=>[]}},data(){return{css:K}},methods:{getDeleteClass(e){if(e.classes&&e.classes.length>0){let s=["is-danger","is-warning","is-success","is-primary","is-info","is-link","is-dark"],a=e.classes.filter(i=>s.includes(i));return a.length>0?{[a.at(-1)]:!0,"is-light":!0}:{}}else return{}},range:o}});0&&(module.exports={BulmaBlock,BulmaBox,BulmaBreadcrumbs,BulmaButton,BulmaDelete,BulmaIcon,BulmaImage,BulmaNotification,BulmaProgress,BulmaTable,BulmaTags});
