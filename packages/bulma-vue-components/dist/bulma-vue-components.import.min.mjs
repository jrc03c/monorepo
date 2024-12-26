function u(t){let n=0,e;t=t||{};let i=t.data?t.data:function(){},d=t.mounted?t.mounted:function(){},r=t.unmounted?t.unmounted:function(){};return i.css||(i.css=""),t.data=function(){return i.bind(this)()},t.mounted=function(){d.bind(this)(),n++;let o=this.$root.$el.getRootNode();o===document&&(o=o.body),e||(e=document.createElement("style"),o.appendChild(e),e.innerHTML=this.css)},t.unmounted=function(){r.bind(this)(),n--;let o=this.$root.$el.getRootNode();if(o===document&&(o=o.body),n<1){if(e)try{o.removeChild(e)}catch{try{e.parentElement.removeChild(e)}catch{}}e=null}},t}typeof window<"u"&&(window.createVueComponentWithCSS=u);var s="",a=`
  <div class="box bulma-box">
    <slot></slot>
  </div>
`,l=u({name:"bulma-box",template:a,data(){return{css:s}}});export{l as BulmaBox};
