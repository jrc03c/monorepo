(()=>{var n=class extends HTMLElement{static $css="";static $template="";static observedAttributes=[];$eventListeners=[];constructor(){super(...arguments);let e=this.attachShadow({mode:"open"});e.innerHTML=`
      <style>
        ${this.constructor.$css}
      </style>

      ${this.constructor.$template}
    `,this.$eventListeners=[]}$off(e,t,s){e.removeEventListener(t,s)}$on(e,t,s){e.addEventListener(t,s);let o=()=>e.removeEventListener(t,s),r={target:e,event:t,callback:s,remove:o};return this.$eventListeners.push(r),o}attributeChangedCallback(){}connectedCallback(){}disconnectedCallback(){this.$eventListeners.forEach(e=>{try{e.remove()}catch{}})}};typeof window<"u"&&(window.MiscVueComponents={BaseComponent:n});})();
