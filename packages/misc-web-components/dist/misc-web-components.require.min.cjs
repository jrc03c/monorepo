var i=Object.defineProperty;var a=Object.getOwnPropertyDescriptor;var d=Object.getOwnPropertyNames;var h=Object.prototype.hasOwnProperty;var m=(s,e)=>{for(var t in e)i(s,t,{get:e[t],enumerable:!0})},$=(s,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of d(e))!h.call(s,o)&&o!==t&&i(s,o,{get:()=>e[o],enumerable:!(n=a(e,o))||n.enumerable});return s};var u=s=>$(i({},"__esModule",{value:!0}),s);var p={};m(p,{BaseWebComponent:()=>r});module.exports=u(p);var r=class extends HTMLElement{static $css="";static $template="";static observedAttributes=[];$eventListeners=[];constructor(){super(...arguments);let e=this.attachShadow({mode:"open"});e.innerHTML=`
      <style>
        ${this.constructor.$css}
      </style>

      ${this.constructor.$template}
    `,this.$eventListeners=[]}$off(e,t,n){e.removeEventListener(t,n)}$on(e,t,n){e.addEventListener(t,n);let o=()=>e.removeEventListener(t,n),c={target:e,event:t,callback:n,remove:o};return this.$eventListeners.push(c),o}attributeChangedCallback(){}connectedCallback(){}disconnectedCallback(){this.$eventListeners.forEach(e=>{try{e.remove()}catch{}})}};typeof window<"u"&&(window.MiscVueComponents={BaseWebComponent:r});0&&(module.exports={BaseWebComponent});
