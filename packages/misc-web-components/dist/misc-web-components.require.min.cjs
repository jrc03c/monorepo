var d=Object.defineProperty;var l=Object.getOwnPropertyDescriptor;var g=Object.getOwnPropertyNames;var p=Object.prototype.hasOwnProperty;var m=(i,t)=>{for(var s in t)d(i,s,{get:t[s],enumerable:!0})},x=(i,t,s,e)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of g(t))!p.call(i,o)&&o!==s&&d(i,o,{get:()=>t[o],enumerable:!(e=l(t,o))||e.enumerable});return i};var y=i=>x(d({},"__esModule",{value:!0}),i);var L={};m(L,{BaseComponent:()=>r,DraggableComponent:()=>h});module.exports=y(L);var r=class extends HTMLElement{static $css="";static $template="";static observedAttributes=[];$eventListeners=[];constructor(){super(...arguments);let t=this.attachShadow({mode:"open"});t.innerHTML=`
      <style>
        ${this.constructor.$css}
      </style>

      ${this.constructor.$template}
    `,this.$eventListeners=[]}$off(t,s,e){t.removeEventListener(s,e)}$on(t,s,e){t.addEventListener(s,e);let o=()=>t.removeEventListener(s,e),c={target:t,event:s,callback:e,remove:o};return this.$eventListeners.push(c),o}attributeChangedCallback(){}connectedCallback(){}disconnectedCallback(){this.$eventListeners.forEach(t=>{try{t.remove()}catch{}})}getAttribute(){let t=super.getAttribute(...arguments);try{return JSON.parse(t)}catch{return t}}};var f=`
  .x-draggable {
    position: absolute;
    left: 0;
    top: 0;
    cursor: grab;
  }

  .x-draggable:active,
  .x-draggable:active * {
    user-select: none;
  }

  .x-draggable.is-h-locked.is-v-locked {
    cursor: unset !important;
  }
`,k=`
  <div class="x-draggable">
    <slot></slot>
  </div>
`,n=class extends Event{x=0;y=0;width=0;height=0},a=class extends n{constructor(t,s){super("drag-start",s),this.x=t.x,this.y=t.y,this.width=t.width,this.height=t.height}},u=class extends n{constructor(t,s){super("drag",s),this.x=t.x,this.y=t.y,this.width=t.width,this.height=t.height}},$=class extends n{constructor(t,s){super("drag-end",s),this.x=t.x,this.y=t.y,this.width=t.width,this.height=t.height}},h=class extends r{static $css=f;static $template=k;static observedAttributes=r.observedAttributes.concat(["is-h-locked","is-v-locked","x","y"]);$isBeingDragged=!1;$mouse={x:0,y:0};$x_=0;$y_=0;get $isHLocked(){return this.getAttribute("is-h-locked")}get $isVLocked(){return this.getAttribute("is-v-locked")}get $root(){return this.shadowRoot.querySelector(".x-draggable")}$onMouseDown(t){t.preventDefault(),t.stopPropagation();let s=this.$isHLocked,e=this.$isVLocked;s&&e||(s||(this.$mouse.x=t.screenX),e||(this.$mouse.y=t.screenY),this.$isBeingDragged=!0,this.$root.style.cursor="grabbing",this.dispatchEvent(new a(this.$root.getBoundingClientRect())))}$onMouseMove(t){let s=this.$isHLocked,e=this.$isVLocked;if(!(s&&e)&&this.$isBeingDragged){let o=t.screenX-this.$mouse.x,c=t.screenY-this.$mouse.y;s||(this.$x_+=o,this.$mouse.x=t.screenX),e||(this.$y_+=c,this.$mouse.y=t.screenY),this.$updateComputedStyle(),this.dispatchEvent(new u(this.$root.getBoundingClientRect()))}}$onMouseUp(){let t=this.$isHLocked,s=this.$isVLocked;if(t&&s)return;let e=this.$isBeingDragged;this.$isBeingDragged=!1,this.$root.style.cursor="",e&&this.dispatchEvent(new $(this.$root.getBoundingClientRect()))}$updateComputedStyle(t){(t||!this.$isHLocked)&&(this.$root.style.left=this.$x_+"px"),(t||!this.$isVLocked)&&(this.$root.style.top=this.$y_+"px")}attributeChangedCallback(t,s,e){if(t==="is-h-locked"&&(e?this.$root.classList.add("is-h-locked"):this.$root.classList.remove("is-h-locked")),t==="is-v-locked"&&(e?this.$root.classList.add("is-v-locked"):this.$root.classList.remove("is-v-locked")),t==="x"){try{e=JSON.parse(e)}catch{}this.$x_=e,this.$updateComputedStyle()}if(t==="y"){try{e=JSON.parse(e)}catch{}this.$y_=e,this.$updateComputedStyle()}}connectedCallback(){let t=setInterval(()=>{let s=this.$root;s&&(clearInterval(t),this.$on(s,"mousedown",this.$onMouseDown.bind(this)),this.$on(window,"mousemove",this.$onMouseMove.bind(this)),this.$on(window,"mouseup",this.$onMouseUp.bind(this)),this.$x_=this.getAttribute("x"),this.$y_=this.getAttribute("y"),this.$updateComputedStyle(!0))},10);return super.connectedCallback(...arguments)}};customElements.define("x-draggable",h);typeof window<"u"&&(window.MiscVueComponents={BaseComponent:r,DraggableComponent:h});0&&(module.exports={BaseComponent,DraggableComponent});
