(()=>{function t(e){let i=0,a;e=e||{};let s=e.data?e.data:function(){},u=e.mounted?e.mounted:function(){},m=e.unmounted?e.unmounted:function(){};return s.css||(s.css=""),e.data=function(){return s.bind(this)()},e.mounted=function(){u.bind(this)(),i++;let l=this.$root.$el.getRootNode();l===document&&(l=l.body),a||(a=document.createElement("style"),l.appendChild(a),a.innerHTML=this.css)},e.unmounted=function(){m.bind(this)(),i--;let l=this.$root.$el.getRootNode();if(l===document&&(l=l.body),i<1){if(a)try{l.removeChild(a)}catch{try{a.parentElement.removeChild(a)}catch{}}a=null}},e}typeof window<"u"&&(window.createVueComponentWithCSS=t);var d="",f=`
  <div class="block bulma-block">
    <slot></slot>
  </div>
`,g=t({name:"bulma-block",template:f,data(){return{css:d}}});var p="",b=`
  <div class="box bulma-box">
    <slot></slot>
  </div>
`,k=t({name:"bulma-box",template:b,data(){return{css:p}}});var h="",v=`
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
`,r=t({name:"bulma-icon",template:v,props:{brand:{type:Boolean,required:!1,default:()=>!1},name:{type:String,required:!0,default:()=>"exclamation-circle"},regular:{type:Boolean,required:!1,default:()=>!1},solid:{type:Boolean,required:!1,default:()=>!0}},data(){return{css:h,observer:null}},methods:{updateInnerClasses(){let e=Array.from(this.$el.classList);e.includes("is-medium")?this.$refs.inner.classList.add("la-lg"):this.$refs.inner.classList.remove("la-lg"),e.includes("is-large")?this.$refs.inner.classList.add("la-2x"):this.$refs.inner.classList.remove("la-2x")}},mounted(){this.observer=new MutationObserver(e=>{if(this.$refs.inner){for(let i of e)if(i.attributeName==="class"){this.updateInnerClasses();return}}}),this.observer.observe(this.$el,{attributes:!0,attributeFilter:["class"]}),this.$nextTick(()=>this.updateInnerClasses())},unmounted(){this.observer.disconnect()}});function n(e,i){let a=[];for(let s=e;s<i;s++)a.push(s);return a}var y=`
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
`,B=`
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
`,C=t({name:"bulma-breadcrumbs",emits:["click"],components:{"bulma-icon":r},template:B,props:{links:{type:Array,required:!1,default:()=>[]}},data(){return{css:y,activeLinkIndex:-1}},watch:{links:{deep:!0,handler(){this.activeLinkIndex=this.links.findIndex(e=>e.isActive)}}},methods:{range:n}});var x="",S=`
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
`,q=t({name:"bulma-button",template:S,props:{black:{type:Boolean,required:!1,default:()=>!1},danger:{type:Boolean,required:!1,default:()=>!1},dark:{type:Boolean,required:!1,default:()=>!1},ghost:{type:Boolean,required:!1,default:()=>!1},info:{type:Boolean,required:!1,default:()=>!1},light:{type:Boolean,required:!1,default:()=>!1},link:{type:Boolean,required:!1,default:()=>!1},primary:{type:Boolean,required:!1,default:()=>!1},success:{type:Boolean,required:!1,default:()=>!1},text:{type:Boolean,required:!1,default:()=>!1},warning:{type:Boolean,required:!1,default:()=>!1},white:{type:Boolean,required:!1,default:()=>!1}},data(){return{css:x}}});var j="",$=`
  <figure class="bulma-image image">
    <img :src="src" v-if="src">
    <slot v-else></slot>
  </figure>
`,o=t({name:"bulma-image",template:$,props:{src:{type:String,required:!1,default:()=>""}},data(){return{css:j}}});var w="",I=`
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
`,V=t({name:"bulma-card",components:{"bulma-image":o},template:I,props:{image:{type:String,required:!1,default:()=>""},"image-ratio-class":{type:String,required:!1,default:()=>"is-4by3"}},data(){return{css:w}}});var W="",A=`
  <button class="bulma-delete delete"></button>
`,c=t({name:"bulma-delete",template:A,data(){return{css:W}}});var L="",N=`
  <div class="bulma-notification notification">
    <bulma-delete
      @click="$emit('close', $event)"
      v-if="!permanent">
    </bulma-delete>
    
    <slot></slot>
  </div>
`,T=t({name:"bulma-notification",emits:["close"],components:{"bulma-delete":c},template:N,props:{permanent:{type:Boolean,required:!1,default:()=>!1}},data(){return{css:L}}});var D="",E=`
  <progress :value="value" class="bulma-progress progress" max="1">
    {{ value * 100 }}%
  </progress>
`,R=t({name:"bulma-progress",template:E,props:{value:{type:Number,required:!1,default:()=>0}},data(){return{css:D}}});var M="",P=`
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
`,F=t({name:"bulma-table",template:P,props:{columns:{type:Array,required:!1,default:()=>[]},index:{type:Array,required:!1,default:()=>[]},values:{type:Array,required:!1,default:()=>[]}},data(){return{css:M}},methods:{range:n}});var H=`
  .bulma-tag .bulma-icon {
    padding-right: 8px;
  }
`,O=`
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
`,z=t({name:"bulma-tags",emits:["click","delete"],components:{"bulma-icon":r},template:O,props:{tags:{type:Array,required:!0,default:()=>[]}},data(){return{css:H}},methods:{getDeleteClass(e){if(e.classes&&e.classes.length>0){let i=["is-danger","is-warning","is-success","is-primary","is-info","is-link","is-dark"],a=e.classes.filter(s=>i.includes(s));return a.length>0?{[a.at(-1)]:!0,"is-light":!0}:{}}else return{}},range:n}});})();
