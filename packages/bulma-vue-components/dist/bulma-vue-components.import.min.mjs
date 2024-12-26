function n(t){let u=0,o;t=t||{};let a=t.data?t.data:function(){},i=t.mounted?t.mounted:function(){},l=t.unmounted?t.unmounted:function(){};return a.css||(a.css=""),t.data=function(){return a.bind(this)()},t.mounted=function(){i.bind(this)(),u++;let e=this.$root.$el.getRootNode();e===document&&(e=e.body),o||(o=document.createElement("style"),e.appendChild(o),o.innerHTML=this.css)},t.unmounted=function(){l.bind(this)(),u--;let e=this.$root.$el.getRootNode();if(e===document&&(e=e.body),u<1){if(o)try{e.removeChild(o)}catch{try{o.parentElement.removeChild(o)}catch{}}o=null}},t}typeof window<"u"&&(window.createVueComponentWithCSS=n);var s="",r=`
  <div class="block bulma-block">
    <slot></slot>
  </div>
`,m=n({name:"bulma-block",template:r,data(){return{css:s}}});var d="",c=`
  <div class="box bulma-box">
    <slot></slot>
  </div>
`,b=n({name:"bulma-box",template:c,data(){return{css:d}}});var f="",h=`
  <button class="bulma-button button">
    <slot></slot>
  </button>
`,C=n({name:"bulma-button",template:h,data(){return{css:f}}});export{m as BulmaBlock,b as BulmaBox,C as BulmaButton};
