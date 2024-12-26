function n(t){let i=0,e;t=t||{};let u=t.data?t.data:function(){},l=t.mounted?t.mounted:function(){},d=t.unmounted?t.unmounted:function(){};return u.css||(u.css=""),t.data=function(){return u.bind(this)()},t.mounted=function(){l.bind(this)(),i++;let o=this.$root.$el.getRootNode();o===document&&(o=o.body),e||(e=document.createElement("style"),o.appendChild(e),e.innerHTML=this.css)},t.unmounted=function(){d.bind(this)(),i--;let o=this.$root.$el.getRootNode();if(o===document&&(o=o.body),i<1){if(e)try{o.removeChild(e)}catch{try{e.parentElement.removeChild(e)}catch{}}e=null}},t}typeof window<"u"&&(window.createVueComponentWithCSS=n);var a="",r=`
  <div class="block bulma-block">
    <slot></slot>
  </div>
`,s=n({name:"bulma-block",template:r,data(){return{css:a}}});var c="",m=`
  <div class="box bulma-box">
    <slot></slot>
  </div>
`,f=n({name:"bulma-box",template:m,data(){return{css:c}}});export{s as BulmaBlock,f as BulmaBox};
