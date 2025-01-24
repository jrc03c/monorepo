var m=Object.defineProperty;var C=Object.getOwnPropertyDescriptor;var x=Object.getOwnPropertyNames;var S=Object.prototype.hasOwnProperty;var q=(e,s)=>{for(var a in s)m(e,a,{get:s[a],enumerable:!0})},j=(e,s,a,i)=>{if(s&&typeof s=="object"||typeof s=="function")for(let n of x(s))!S.call(e,n)&&n!==a&&m(e,n,{get:()=>s[n],enumerable:!(i=C(s,n))||i.enumerable});return e};var $=e=>j(m({},"__esModule",{value:!0}),e);var Z={};q(Z,{BulmaBlock:()=>d,BulmaBox:()=>f,BulmaBreadcrumbs:()=>g,BulmaButton:()=>p,BulmaCard:()=>b,BulmaDelete:()=>u,BulmaIcon:()=>r,BulmaImage:()=>c,BulmaNotification:()=>k,BulmaProgress:()=>h,BulmaTable:()=>v,BulmaTags:()=>y});module.exports=$(Z);function t(e){let s=0,a;e=e||{};let i=e.data?e.data:function(){},n=e.mounted?e.mounted:function(){},B=e.unmounted?e.unmounted:function(){};return i.css||(i.css=""),e.data=function(){return i.bind(this)()},e.mounted=function(){n.bind(this)(),s++;let l=this.$root.$el.getRootNode();l===document&&(l=l.body),a||(a=document.createElement("style"),l.appendChild(a),a.innerHTML=this.css)},e.unmounted=function(){B.bind(this)(),s--;let l=this.$root.$el.getRootNode();if(l===document&&(l=l.body),s<1){if(a)try{l.removeChild(a)}catch{try{a.parentElement.removeChild(a)}catch{}}a=null}},e}typeof window<"u"&&(window.createVueComponentWithCSS=t);var w="",I=`
  <div class="block bulma-block">
    <slot></slot>
  </div>
`,d=t({name:"bulma-block",template:I,data(){return{css:w}}});var V="",W=`
  <div class="box bulma-box">
    <slot></slot>
  </div>
`,f=t({name:"bulma-box",template:W,data(){return{css:V}}});var A="",L=`
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
`,r=t({name:"bulma-icon",template:L,props:{brand:{type:Boolean,required:!1,default:()=>!1},name:{type:String,required:!0,default:()=>"exclamation-circle"},regular:{type:Boolean,required:!1,default:()=>!1},solid:{type:Boolean,required:!1,default:()=>!0}},data(){return{css:A,observer:null}},methods:{updateInnerClasses(){let e=Array.from(this.$el.classList);e.includes("is-medium")?this.$refs.inner.classList.add("la-lg"):this.$refs.inner.classList.remove("la-lg"),e.includes("is-large")?this.$refs.inner.classList.add("la-2x"):this.$refs.inner.classList.remove("la-2x")}},mounted(){this.observer=new MutationObserver(e=>{if(this.$refs.inner){for(let s of e)if(s.attributeName==="class"){this.updateInnerClasses();return}}}),this.observer.observe(this.$el,{attributes:!0,attributeFilter:["class"]}),this.$nextTick(()=>this.updateInnerClasses())},unmounted(){this.observer.disconnect()}});function o(e,s){let a=[];for(let i=e;i<s;i++)a.push(i);return a}var N=`
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
`,T=`
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
`,g=t({name:"bulma-breadcrumbs",emits:["click"],components:{"bulma-icon":r},template:T,props:{links:{type:Array,required:!1,default:()=>[]}},data(){return{css:N,activeLinkIndex:-1}},watch:{links:{deep:!0,handler(){this.activeLinkIndex=this.links.findIndex(e=>e.isActive)}}},methods:{range:o}});var D="",E=`
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
`,p=t({name:"bulma-button",template:E,props:{black:{type:Boolean,required:!1,default:()=>!1},danger:{type:Boolean,required:!1,default:()=>!1},dark:{type:Boolean,required:!1,default:()=>!1},ghost:{type:Boolean,required:!1,default:()=>!1},info:{type:Boolean,required:!1,default:()=>!1},light:{type:Boolean,required:!1,default:()=>!1},link:{type:Boolean,required:!1,default:()=>!1},primary:{type:Boolean,required:!1,default:()=>!1},success:{type:Boolean,required:!1,default:()=>!1},text:{type:Boolean,required:!1,default:()=>!1},warning:{type:Boolean,required:!1,default:()=>!1},white:{type:Boolean,required:!1,default:()=>!1}},data(){return{css:D}}});var R="",M=`
  <figure class="bulma-image image">
    <img :src="src" v-if="src">
    <slot v-else></slot>
  </figure>
`,c=t({name:"bulma-image",template:M,props:{src:{type:String,required:!1,default:()=>""}},data(){return{css:R}}});var P="",F=`
  <div class="bulma-card card">
    <div class="card-image" v-if="image">
      <bulma-image
        :class="{ [imageRatioClass]: true }"
        :src="image">
      </bulma-image>
    </div>

    <div class="card-content">
      <slot name="content"></slot>
    </div>

    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
`,b=t({name:"bulma-card",components:{"bulma-image":c},template:F,props:{image:{type:String,required:!1,default:()=>""},"image-ratio-class":{type:String,required:!1,default:()=>"is-4by3"}},data(){return{css:P}}});var H="",O=`
  <button class="bulma-delete delete"></button>
`,u=t({name:"bulma-delete",template:O,data(){return{css:H}}});var z="",G=`
  <div class="bulma-notification notification">
    <bulma-delete
      @click="$emit('close', $event)"
      v-if="!permanent">
    </bulma-delete>
    
    <slot></slot>
  </div>
`,k=t({name:"bulma-notification",emits:["close"],components:{"bulma-delete":u},template:G,props:{permanent:{type:Boolean,required:!1,default:()=>!1}},data(){return{css:z}}});var J="",K=`
  <progress :value="value" class="bulma-progress progress" max="1">
    {{ value * 100 }}%
  </progress>
`,h=t({name:"bulma-progress",template:K,props:{value:{type:Number,required:!1,default:()=>0}},data(){return{css:J}}});var Q="",U=`
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
`,v=t({name:"bulma-table",template:U,props:{columns:{type:Array,required:!1,default:()=>[]},index:{type:Array,required:!1,default:()=>[]},values:{type:Array,required:!1,default:()=>[]}},data(){return{css:Q}},methods:{range:o}});var X=`
  .bulma-tag .bulma-icon {
    padding-right: 8px;
  }
`,Y=`
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
`,y=t({name:"bulma-tags",emits:["click","delete"],components:{"bulma-icon":r},template:Y,props:{tags:{type:Array,required:!0,default:()=>[]}},data(){return{css:X}},methods:{getDeleteClass(e){if(e.classes&&e.classes.length>0){let s=["is-danger","is-warning","is-success","is-primary","is-info","is-link","is-dark"],a=e.classes.filter(i=>s.includes(i));return a.length>0?{[a.at(-1)]:!0,"is-light":!0}:{}}else return{}},range:o}});0&&(module.exports={BulmaBlock,BulmaBox,BulmaBreadcrumbs,BulmaButton,BulmaCard,BulmaDelete,BulmaIcon,BulmaImage,BulmaNotification,BulmaProgress,BulmaTable,BulmaTags});
