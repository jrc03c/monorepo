function t(e){let l=0,a;e=e||{};let s=e.data?e.data:function(){},c=e.mounted?e.mounted:function(){},u=e.unmounted?e.unmounted:function(){};return s.css||(s.css=""),e.data=function(){return s.bind(this)()},e.mounted=function(){c.bind(this)(),l++;let i=this.$root.$el.getRootNode();i===document&&(i=i.body),a||(a=document.createElement("style"),i.appendChild(a),a.innerHTML=this.css)},e.unmounted=function(){u.bind(this)(),l--;let i=this.$root.$el.getRootNode();if(i===document&&(i=i.body),l<1){if(a)try{i.removeChild(a)}catch{try{a.parentElement.removeChild(a)}catch{}}a=null}},e}typeof window<"u"&&(window.createVueComponentWithCSS=t);var m="",d=`
  <div class="block bulma-block">
    <slot></slot>
  </div>
`,f=t({name:"bulma-block",template:d,data(){return{css:m}}});var g="",p=`
  <div class="box bulma-box">
    <slot></slot>
  </div>
`,b=t({name:"bulma-box",template:p,data(){return{css:g}}});var h="",v=`
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
`,y=t({name:"bulma-button",template:v,props:{black:{type:Boolean,required:!1,default:()=>!1},danger:{type:Boolean,required:!1,default:()=>!1},dark:{type:Boolean,required:!1,default:()=>!1},ghost:{type:Boolean,required:!1,default:()=>!1},info:{type:Boolean,required:!1,default:()=>!1},light:{type:Boolean,required:!1,default:()=>!1},link:{type:Boolean,required:!1,default:()=>!1},primary:{type:Boolean,required:!1,default:()=>!1},success:{type:Boolean,required:!1,default:()=>!1},text:{type:Boolean,required:!1,default:()=>!1},warning:{type:Boolean,required:!1,default:()=>!1},white:{type:Boolean,required:!1,default:()=>!1}},data(){return{css:h}}});var k="",B=`
  <button class="bulma-delete delete"></button>
`,n=t({name:"bulma-delete",template:B,data(){return{css:k}}});var C="",x=`
  <span class="bulma-icon icon">
    <i :class="{ ['la-' + name]: true }" class="las" ref="inner"></i>
  </span>
`,r=t({name:"bulma-icon",template:x,props:{name:{type:String,required:!0,default:()=>"exclamation-circle"}},data(){return{css:C,observer:null}},methods:{updateInnerClasses(){let e=Array.from(this.$el.classList);e.includes("is-medium")?this.$refs.inner.classList.add("la-lg"):this.$refs.inner.classList.remove("la-lg"),e.includes("is-large")?this.$refs.inner.classList.add("la-2x"):this.$refs.inner.classList.remove("la-2x")}},mounted(){this.observer=new MutationObserver(e=>{if(this.$refs.inner){for(let l of e)if(l.attributeName==="class"){this.updateInnerClasses();return}}}),this.observer.observe(this.$el,{attributes:!0,attributeFilter:["class"]}),this.$nextTick(()=>this.updateInnerClasses())},unmounted(){this.observer.disconnect()}});var S="",j=`
  <figure class="bulma-image image">
    <img :src="src" v-if="src">
    <slot v-else></slot>
  </figure>
`,q=t({name:"bulma-image",template:j,props:{src:{type:String,required:!1,default:()=>""}},data(){return{css:S}}});var $="",w=`
  <div class="bulma-notification notification">
    <bulma-delete
      @click="$emit('close', $event)"
      v-if="!permanent">
    </bulma-delete>
    
    <slot></slot>
  </div>
`,V=t({name:"bulma-notification",emits:["close"],components:{"bulma-delete":n},template:w,props:{permanent:{type:Boolean,required:!1,default:()=>!1}},data(){return{css:$}}});var W="",I=`
  <progress :value="value" class="bulma-progress progress" max="1">
    {{ value * 100 }}%
  </progress>
`,L=t({name:"bulma-progress",template:I,props:{value:{type:Number,required:!1,default:()=>0}},data(){return{css:W}}});function o(e,l){let a=[];for(let s=e;s<l;s++)a.push(s);return a}var N="",T=`
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
`,A=t({name:"bulma-table",template:T,props:{columns:{type:Array,required:!1,default:()=>[]},index:{type:Array,required:!1,default:()=>[]},values:{type:Array,required:!1,default:()=>[]}},data(){return{css:N}},methods:{range:o}});var D=`
  .bulma-tag .bulma-icon {
    padding-right: 8px;
  }
`,E=`
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
`,M=t({name:"bulma-tags",emits:["click","delete"],components:{"bulma-icon":r},template:E,props:{tags:{type:Array,required:!0,default:()=>[]}},data(){return{css:D}},methods:{getDeleteClass(e){if(e.classes&&e.classes.length>0){let l=["is-danger","is-warning","is-success","is-primary","is-info","is-link","is-dark"],a=e.classes.filter(s=>l.includes(s));return a.length>0?{[a.at(-1)]:!0,"is-light":!0}:{}}else return{}},range:o}});export{f as BulmaBlock,b as BulmaBox,y as BulmaButton,n as BulmaDelete,r as BulmaIcon,q as BulmaImage,V as BulmaNotification,L as BulmaProgress,A as BulmaTable,M as BulmaTags};
