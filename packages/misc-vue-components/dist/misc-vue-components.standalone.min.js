(()=>{function d(e){let t=0,i;e=e||{};let s=e.data?e.data:function(){},n=e.mounted?e.mounted:function(){},o=e.unmounted?e.unmounted:function(){};return s.css||(s.css=""),e.data=function(){return s.bind(this)()},e.mounted=function(){n.bind(this)(),t++;let h=this.$root.$el.getRootNode();h===document&&(h=h.body),i||(i=document.createElement("style"),h.appendChild(i),i.innerHTML=this.css)},e.unmounted=function(){o.bind(this)(),t--;let h=this.$root.$el.getRootNode();if(h===document&&(h=h.body),t<1){if(i)try{h.removeChild(i)}catch{try{i.parentElement.removeChild(i)}catch{}}i=null}},e}typeof window<"u"&&(window.createVueComponentWithCSS=d);function c(e){return new Promise((t,i)=>{try{let s=new Date;return setTimeout(()=>t(new Date-s),e)}catch(s){return i(s)}})}function y(e){let t=new Date,i=new Date;for(;i-t<e;)i=new Date;return new Date-t}typeof window<"u"&&(window.pause=c,window.pauseAsync=c,window.pauseSync=y);var z=`
  .x-context-menu {
    z-index: 999999999;
    background-color: rgb(235, 235, 235);
    position: fixed;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    font-size: 0.75rem;
    pointer-events: none;
    opacity: 0;
  }

  .x-context-menu .x-context-menu-items {
    min-width: 192px;
  }

  .x-context-menu:has(.x-context-menu-item.has-expanded-children)
    > .x-context-menu-items
    > .x-context-menu-item:not(.has-expanded-children) {
    opacity: 0.25;
  }

  .x-context-menu.is-visible {
    pointer-events: all;
    opacity: 1;
  }

  .x-context-menu .x-context-menu-item {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
    cursor: pointer;
    padding: 0.5rem;
    user-select: none;
    border-bottom: 2px solid rgb(215, 215, 215);
  }

  .x-context-menu .x-context-menu-item:last-child {
    border-bottom: 0;
  }

  .x-context-menu .x-context-menu-item:hover,
  .x-context-menu .x-context-menu-item.has-expanded-children {
    background-color: rgb(255, 255, 255);
  }

  .x-context-menu .x-context-menu-item:active {
    background-color: rgb(205, 205, 205);
  }

  .x-context-menu .context-menu-item-label  {
    width: 100%;
    flex-shrink: 999999;
  }

  .x-context-menu .x-context-menu-item-label-expand-arrow::after {
    content: "\u276F";
  }
`,b=`
  <div
    :class="{
      'has-open-submenu': !!hoveredItemWithChildren,
      'is-visible': isVisible,
    }"
    :style="computedStyle"
    @click.stop.prevent="() => {}"
    class="x-context-menu">
    <div class="x-context-menu-items" ref="itemsContainer">
      <div
        :class="{ 'has-expanded-children': hoveredItemWithChildren === item }"
        :key="item.label"
        @click="select(item)"
        @mouseenter="showChildren($event, item)"
        class="x-context-menu-item"
        v-for="item in items">
        <span class="x-context-menu-item-label">
          {{ item.label }}
        </span>

        <span
          class="x-context-menu-item-label-expand-arrow"
          v-if="item.children">
        </span>
      </div>
    </div>

    <x-context-menu
      :is-visible="true"
      :items="hoveredItemWithChildren.children"
      :x="hoveredItemWithChildrenX"
      :y="hoveredItemWithChildrenY"
      v-if="hoveredItemWithChildren">
    </x-context-menu>
  </div>
`,f=d({name:"x-context-menu",template:b,emits:["cancel","close","open","select"],props:{"is-visible":{type:Boolean,required:!0,default:()=>!1},items:{type:Array,required:!0,default:()=>[]},x:{type:Number,required:!0,default:()=>0},y:{type:Number,required:!0,default:()=>0}},data(){return{computedStyle:"",css:z,hoveredItemWithChildren:null,hoveredItemWithChildrenX:0,hoveredItemWithChildrenY:0,listenersHaveBeenAdded:!1}},computed:{isRoot(){return this.getRootContextMenu()===this.$el}},watch:{isVisible(){this.isVisible?this.$emit("open"):(this.$emit("close"),this.hoveredItemWithChildren=null,this.hoveredItemWithChildrenX=0,this.hoveredItemWithChildrenY=0)},x(){this.updateComputedStyle()},y(){this.updateComputedStyle()}},methods:{addListeners(){this.isRoot&&!this.listenersHaveBeenAdded&&(window.addEventListener("click",this.onClick),window.addEventListener("keydown",this.onKeyDown),this.listenersHaveBeenAdded=!0)},getParentContextMenu(){let e=this.$el;for(;e.parentElement;){if(e.parentElement.classList.contains("x-context-menu"))return e.parentElement;e=e.parentElement}return this.$el},getRootContextMenu(){let e=this.$el,t=this.$el;for(;e.parentElement;)e.parentElement.classList.contains("x-context-menu")&&(t=e.parentElement),e=e.parentElement;return t},onClick(){this.$emit("cancel")},onKeyDown(e){e.key==="Escape"&&this.$emit("cancel")},removeListeners(){this.listenersHaveBeenAdded&&(window.removeEventListener("click",this.onClick),window.removeEventListener("keydown",this.onKeyDown),this.listenersHaveBeenAdded=!1)},select(e){e.children||(e.action&&e.action(),this.$emit("select",e))},showChildren(e,t){this.hoveredItemWithChildren=null,this.hoveredItemWithChildrenX=0,this.hoveredItemWithChildrenY=0,t.children&&this.$nextTick(()=>{let i=this.$refs.itemsContainer.getBoundingClientRect(),s=e.target.getBoundingClientRect();this.hoveredItemWithChildren=t,this.hoveredItemWithChildrenX=i.x+i.width,this.hoveredItemWithChildrenY=i.y+s.y-i.y})},async updateComputedStyle(e){for(typeof e>"u"&&(e=!0);!this.$refs.itemsContainer;)await c(10);let t=this.x,i=this.y,s=this.$refs.itemsContainer.getBoundingClientRect();if(this.isRoot)t+s.width>window.innerWidth&&(t=window.innerWidth-s.width);else{let n=this.getParentContextMenu(),o=n.getBoundingClientRect(),h=n.querySelector(".x-context-menu-items").getBoundingClientRect();o.x+h.width+s.width>window.innerWidth&&(t=h.x-s.width)}i+s.height>window.innerHeight&&(i=window.innerHeight-s.height),this.computedStyle=`
        left: ${t}px;
        top: ${i}px;
      `,e&&this.$nextTick(()=>{this.updateComputedStyle(!1)})}},mounted(){this.addListeners(),this.$nextTick(()=>this.updateComputedStyle())},unmounted(){this.removeListeners()}});var B=`
  .x-draggable {
    position: absolute;
    left: 0;
    top: 0;
  }

  .x-draggable.has-grab-cursor {
    cursor: grab;
  }

  .x-draggable.has-grab-cursor:active {
    cursor: grabbing;
  }

  .x-draggable:active,
  .x-draggable:active * {
    user-select: none;
  }
`,_=`
  <div
    :class="{ 'has-grab-cursor': !isHLocked || !isVLocked }"
    @mousedown="onMouseDown"
    class="x-draggable">
    <slot></slot>
  </div>
`,m=d({name:"x-draggable",template:_,emits:["drag-end","drag-start","drag"],props:{"is-h-locked":{type:Boolean,required:!1,default:()=>!1},"is-v-locked":{type:Boolean,required:!1,default:()=>!1},x:{type:Number,required:!1,default:()=>0},y:{type:Number,required:!1,default:()=>0}},data(){return{css:B,isBeingDragged:!1,mouse:{x:0,y:0},x_:0,y_:0}},watch:{x(){this.x_=this.x,this.updateComputedStyle()},y(){this.y_=this.y,this.updateComputedStyle()}},methods:{onMouseDown(e){e.preventDefault(),e.stopPropagation(),!(this.isHLocked&&this.isVLocked)&&(this.isHLocked||(this.mouse.x=e.screenX),this.isVLocked||(this.mouse.y=e.screenY),this.isBeingDragged=!0,this.$emit("drag-start",this.$el.getBoundingClientRect()))},onMouseMove(e){if(!(this.isHLocked&&this.isVLocked)&&this.isBeingDragged){let t=e.screenX-this.mouse.x,i=e.screenY-this.mouse.y;this.isHLocked||(this.x_+=t,this.mouse.x=e.screenX),this.isVLocked||(this.y_+=i,this.mouse.y=e.screenY),this.updateComputedStyle(),this.$emit("drag",this.$el.getBoundingClientRect())}},onMouseUp(){if(this.isHLocked&&this.isVLocked)return;let e=this.isBeingDragged;this.isBeingDragged=!1,e&&this.$emit("drag-end",this.$el.getBoundingClientRect())},updateComputedStyle(e){(e||!this.isHLocked)&&(this.$el.style.left=this.x_+"px"),(e||!this.isVLocked)&&(this.$el.style.top=this.y_+"px")}},mounted(){this.x_=this.x,this.y_=this.y,this.updateComputedStyle(!0),window.addEventListener("mousemove",this.onMouseMove),window.addEventListener("mouseup",this.onMouseUp)},unmounted(){window.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("mouseup",this.onMouseUp)}});var C=`
  .x-frame {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-content: stretch;
    align-items: stretch;
    gap: 0;
  }

  .x-frame > *:not(.x-frame-divider) {
    box-sizing: border-box !important;
  }

  .x-frame.is-being-resized,
  .x-frame.is-being-resized * {
    user-select: none !important;
  }

  .x-frame-horizontal {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .x-frame-horizontal > *:not(.x-frame-divider) {
    overflow-x: hidden;
    width: 100%;
    flex-shrink: 999999;
  }

  .x-frame-horizontal > .x-frame-divider {
    cursor: col-resize;
    width: 16px;
    margin-left: -7px;
    margin-right: -7px;
  }

  .x-frame-horizontal > .x-frame-divider > .x-frame-divider-inner {
    background-color: gray;
    width: 2px;
    height: 100%;
    margin: 0 auto;
  }

  .x-frame.is-locked > .x-frame-divider {
    cursor: unset;
  }
`,L=`
  <div
    :class="{
      'is-being-resized': isBeingResized,
      'is-locked': isLocked,
    }"
    class="x-frame x-frame-horizontal">
    <slot></slot>
  </div>
`;function D(e){let t=0;return e.forEach(i=>t+=i),t}var g=d({name:"x-frame-horizontal",template:L,emits:["resize","resize-end","resize-start"],props:{"is-locked":{type:Boolean,required:!1,default:()=>!1},"max-width":{type:Number,required:!1,default:()=>1/0},"min-width":{type:Number,required:!1,default:()=>64}},data(){return{activeDividerIndex:0,css:C,isAddingDividers:!1,isBeingResized:!1,mouse:{x:0},observer:null,widths:[]}},methods:{onMouseDown(e,t){if(this.isLocked)return;this.isBeingResized=!0,this.activeDividerIndex=t;let i=Array.from(this.$el.children).filter(o=>!o.classList.contains("x-frame-divider")),s=i[this.activeDividerIndex],n=i[this.activeDividerIndex+1];this.$emit("resize-start",[s,n])},onMouseMove(e){let t,i;if(!this.isLocked&&this.isBeingResized){let s=e.pageX-this.mouse.x,n=[],o=[];Array.from(this.$el.children).forEach(r=>{r.classList.contains("x-frame-divider")?n.push(r):o.push(r)});let h=o[this.activeDividerIndex],a=o[this.activeDividerIndex+1];t=h,i=a;let l=h.getBoundingClientRect(),u=a.getBoundingClientRect();if(this.widths[this.activeDividerIndex]=l.width+s,this.widths[this.activeDividerIndex+1]=u.width-s,this.widths[this.activeDividerIndex]<this.minWidth){let r=this.widths[this.activeDividerIndex]-this.minWidth;this.widths[this.activeDividerIndex]-=r,this.widths[this.activeDividerIndex+1]+=r}if(this.widths[this.activeDividerIndex]>this.maxWidth){let r=this.widths[this.activeDividerIndex]-this.maxWidth;this.widths[this.activeDividerIndex]-=r,this.widths[this.activeDividerIndex+1]+=r}if(this.widths[this.activeDividerIndex+1]<this.minWidth){let r=this.widths[this.activeDividerIndex+1]-this.minWidth;this.widths[this.activeDividerIndex+1]-=r,this.widths[this.activeDividerIndex]+=r}if(this.widths[this.activeDividerIndex+1]>this.maxWidth){let r=this.widths[this.activeDividerIndex+1]-this.maxWidth;this.widths[this.activeDividerIndex+1]-=r,this.widths[this.activeDividerIndex]+=r}this.updateStyles()}this.mouse.x=e.pageX,this.isLocked||this.$emit("resize",[t,i])},onMouseUp(){if(this.isLocked)return;let e=this.isBeingResized;if(this.isBeingResized=!1,e){let t=Array.from(this.$el.children).filter(n=>!n.classList.contains("x-frame-divider")),i=t[this.activeDividerIndex],s=t[this.activeDividerIndex+1];this.$emit("resize-end",[i,s])}},onMutation(){this.isAddingDividers||(this.isAddingDividers=!0,Array.from(this.$el.children).forEach(e=>{e.classList.contains("x-frame-divider")&&this.$el.removeChild(e)}),Array.from(this.$el.children).slice(1).forEach((e,t)=>{let i=document.createElement("div");i.classList.add("x-frame-divider"),this.$el.insertBefore(i,e);let s=document.createElement("div");s.classList.add("x-frame-divider-inner"),i.appendChild(s),i.addEventListener("mousedown",n=>{this.onMouseDown(n,t)})}),this.$nextTick(()=>{this.updateStyles(),this.isAddingDividers=!1}))},updateStyles(){let e=this.$el.getBoundingClientRect(),t=[],i=[];Array.from(this.$el.children).forEach(n=>{n.classList.contains("x-frame-divider")?t.push(n):i.push(n)});let s=e.width-D(t.map(n=>n.getBoundingClientRect().width));i.forEach((n,o)=>{let h=this.widths[o]||s/i.length;this.widths[o]=h,n.style.width=`${h}px`})}},mounted(){this.observer=new MutationObserver(this.onMutation),this.observer.observe(this.$el,{childList:!0}),window.addEventListener("mousemove",this.onMouseMove),window.addEventListener("mouseup",this.onMouseUp),this.$nextTick(()=>{this.onMutation(),this.widths=Array.from(this.$el.children).filter(e=>!e.classList.contains("x-frame-divider")).map(e=>e.getBoundingClientRect().width),this.updateStyles()})},unmounted(){this.observer.disconnect(),window.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("mouseup",this.onMouseUp)}});var R=`
  .x-frame {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-content: stretch;
    align-items: stretch;
    gap: 0;
  }

  .x-frame > *:not(.x-frame-divider) {
    box-sizing: border-box !important;
  }

  .x-frame.is-being-resized,
  .x-frame.is-being-resized * {
    user-select: none !important;
  }

  .x-frame-vertical {
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .x-frame-vertical > *:not(.x-frame-divider) {
    height: 100%;
    flex-shrink: 999999;
    overflow-y: auto;
  }

  .x-frame-vertical > .x-frame-divider {
    cursor: row-resize;
    height: 16px;
    margin-top: -7px;
    margin-bottom: -7px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: center;
    align-items: center;
  }

  .x-frame-vertical > .x-frame-divider > .x-frame-divider-inner {
    background-color: gray;
    width: 100%;
    height: 2px;
  }

  .x-frame.is-locked > .x-frame-divider {
    cursor: unset;
  }
`,$=`
  <div
    :class="{
      'is-being-resized': isBeingResized,
      'is-locked': isLocked,
    }"
    class="x-frame x-frame-vertical">
    <slot></slot>
  </div>
`;function k(e){let t=0;return e.forEach(i=>t+=i),t}var v=d({name:"x-frame-vertical",template:$,emits:["resize","resize-end","resize-start"],props:{"is-locked":{type:Boolean,required:!1,default:()=>!1},"max-height":{type:Number,required:!1,default:()=>1/0},"min-height":{type:Number,required:!1,default:()=>64}},data(){return{activeDividerIndex:0,css:R,isAddingDividers:!1,isBeingResized:!1,mouse:{y:0},observer:null,heights:[]}},methods:{onMouseDown(e,t){if(this.isLocked)return;this.isBeingResized=!0,this.activeDividerIndex=t;let i=Array.from(this.$el.children).filter(o=>!o.classList.contains("x-frame-divider")),s=i[this.activeDividerIndex],n=i[this.activeDividerIndex+1];this.$emit("resize-start",[s,n])},onMouseMove(e){let t,i;if(!this.isLocked&&this.isBeingResized){let s=e.pageY-this.mouse.y,n=[],o=[];Array.from(this.$el.children).forEach(r=>{r.classList.contains("x-frame-divider")?n.push(r):o.push(r)});let h=o[this.activeDividerIndex],a=o[this.activeDividerIndex+1];t=h,i=a;let l=h.getBoundingClientRect(),u=a.getBoundingClientRect();if(this.heights[this.activeDividerIndex]=l.height+s,this.heights[this.activeDividerIndex+1]=u.height-s,this.heights[this.activeDividerIndex]<this.minHeight){let r=this.heights[this.activeDividerIndex]-this.minHeight;this.heights[this.activeDividerIndex]-=r,this.heights[this.activeDividerIndex+1]+=r}if(this.heights[this.activeDividerIndex]>this.maxHeight){let r=this.heights[this.activeDividerIndex]-this.maxHeight;this.heights[this.activeDividerIndex]-=r,this.heights[this.activeDividerIndex+1]+=r}if(this.heights[this.activeDividerIndex+1]<this.minHeight){let r=this.heights[this.activeDividerIndex+1]-this.minHeight;this.heights[this.activeDividerIndex+1]-=r,this.heights[this.activeDividerIndex]+=r}if(this.heights[this.activeDividerIndex+1]>this.maxHeight){let r=this.heights[this.activeDividerIndex+1]-this.maxHeight;this.heights[this.activeDividerIndex+1]-=r,this.heights[this.activeDividerIndex]+=r}this.updateStyles()}this.mouse.y=e.pageY,this.isLocked||this.$emit("resize",[t,i])},onMouseUp(){if(this.isLocked)return;let e=this.isBeingResized;if(this.isBeingResized=!1,e){let t=Array.from(this.$el.children).filter(n=>!n.classList.contains("x-frame-divider")),i=t[this.activeDividerIndex],s=t[this.activeDividerIndex+1];this.$emit("resize-end",[i,s])}},onMutation(){this.isAddingDividers||(this.isAddingDividers=!0,Array.from(this.$el.children).forEach(e=>{e.classList.contains("x-frame-divider")&&this.$el.removeChild(e)}),Array.from(this.$el.children).slice(1).forEach((e,t)=>{let i=document.createElement("div");i.classList.add("x-frame-divider"),this.$el.insertBefore(i,e);let s=document.createElement("div");s.classList.add("x-frame-divider-inner"),i.appendChild(s),i.addEventListener("mousedown",n=>{this.onMouseDown(n,t)})}),this.$nextTick(()=>{this.updateStyles(),this.isAddingDividers=!1}))},updateStyles(){let e=this.$el.getBoundingClientRect(),t=[],i=[];Array.from(this.$el.children).forEach(n=>{n.classList.contains("x-frame-divider")?t.push(n):i.push(n)});let s=e.height-k(t.map(n=>n.getBoundingClientRect().height));i.forEach((n,o)=>{let h=this.heights[o]||s/i.length;this.heights[o]=h,n.style.height=`${h}px`})}},mounted(){this.observer=new MutationObserver(this.onMutation),this.observer.observe(this.$el,{childList:!0}),window.addEventListener("mousemove",this.onMouseMove),window.addEventListener("mouseup",this.onMouseUp),this.$nextTick(()=>{this.onMutation(),this.heights=Array.from(this.$el.children).filter(e=>!e.classList.contains("x-frame-divider")).map(e=>e.getBoundingClientRect().height),this.updateStyles()})},unmounted(){this.observer.disconnect(),window.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("mouseup",this.onMouseUp)}});var I="",H=`
  <x-frame-horizontal
    :is-locked="isLocked"
    :max-width="maxSize"
    :min-width="minSize"
    @resize="$emit('resize', $event)"
    @resize-end="$emit('resize-end', $event)"
    @resize-start="$emit('resize-start', $event)"
    v-if="orientation === 'horizontal'">
    <slot></slot>
  </x-frame-horizontal>

  <x-frame-vertical
    :is-locked="isLocked"
    :max-height="maxSize"
    :min-height="minSize"
    @resize="$emit('resize', $event)"
    @resize-end="$emit('resize-end', $event)"
    @resize-start="$emit('resize-start', $event)"
    v-if="orientation === 'vertical'">
    <slot></slot>
  </x-frame-vertical>
`,p=d({name:"x-frame",template:H,emits:["resize","resize-end","resize-start"],components:{"x-frame-horizontal":g,"x-frame-vertical":v},props:{"is-locked":{type:Boolean,required:!1,default:()=>!1},"max-size":{type:Number,required:!1,default:()=>1/0},"min-size":{type:Number,required:!1,default:()=>64},orientation:{type:String,required:!1,default:()=>"horizontal"}},data(){return{css:I}}});var M="",E="",x=d({name:"x-menu",template:E,data(){return{css:M}}});var W=`
  .no-pointer-events,
  .no-pointer-events * {
    pointer-events: none;
  }
`,S=`
  <x-draggable
    :class="{ 'no-pointer-events': shouldPreventInternalPointerEvents }"
    :is-h-locked="isDragHLocked"
    :is-v-locked="isDragVLocked"
    :x="x_"
    :y="y_"
    @drag-end="onDragEnd"
    @drag-start="$emit('drag-start', $event)"
    @drag="$emit('drag', $event)"
    class="x-resizeable"
    ref="root">
    <slot></slot>
  </x-draggable>
`,w=d({name:"x-resizeable",template:S,emits:["drag-end","drag-start","drag","resize-end","resize-start","resize"],components:{"x-draggable":m},props:{height:{type:Number,required:!1,default:()=>256},"is-drag-h-locked":{type:Boolean,required:!1,default:()=>!1},"is-drag-v-locked":{type:Boolean,required:!1,default:()=>!1},"is-resize-bottom-locked":{type:Boolean,required:!1,default:()=>!1},"is-resize-left-locked":{type:Boolean,required:!1,default:()=>!1},"is-resize-right-locked":{type:Boolean,required:!1,default:()=>!1},"is-resize-top-locked":{type:Boolean,required:!1,default:()=>!1},"min-height":{type:Number,required:!1,default:()=>8},"min-width":{type:Number,required:!1,default:()=>8},width:{type:Number,required:!1,default:()=>256},x:{type:Number,required:!1,default:()=>0},y:{type:Number,required:!1,default:()=>0}},data(){return{anchoredLeftRightBorder:null,anchoredTopBottomBorder:null,borderWidth:10,css:W,height_:0,isBeingResizedHorizontally:!1,isBeingResizedVertically:!1,isHoveringOverBottomBorder:!1,isHoveringOverLeftBorder:!1,isHoveringOverRightBorder:!1,isHoveringOverTopBorder:!1,mouse:{x:0,y:0},shouldPreventInternalPointerEvents:!1,shouldScaleProportionally:!1,width_:0,x_:0,y_:0}},computed:{isCompletelyLocked(){return this.isResizeLeftLocked&&this.isResizeRightLocked&&this.isResizeTopLocked&&this.isResizeBottomLocked}},watch:{height(){this.height_=this.height,this.updateComputedStyle()},width(){this.width_=this.width,this.updateComputedStyle()},x(){this.x_=this.x},y(){this.y_=this.y}},methods:{onDragEnd(e){let t=this.$el.parentElement.getBoundingClientRect(),i=parseFloat(getComputedStyle(this.$el.parentElement).getPropertyValue("border-left").split("px")[0]),s=parseFloat(getComputedStyle(this.$el.parentElement).getPropertyValue("border-top").split("px")[0]);this.x_=e.x-t.x-i,this.y_=e.y-t.y-s,this.$emit("drag-end",e)},onKeyDown(e){this.isCompletelyLocked||e.key==="Shift"&&(this.shouldScaleProportionally=!0)},onKeyUp(e){this.isCompletelyLocked||e.key==="Shift"&&(this.shouldScaleProportionally=!1)},onMouseDown(e){if(this.isCompletelyLocked)return;let t=!1;this.isHoveringOverLeftBorder&&!this.isResizeLeftLocked&&(this.isBeingResizedHorizontally=!0,this.anchoredLeftRightBorder="right",t=!0),this.isHoveringOverRightBorder&&!this.isResizeRightLocked&&(this.isBeingResizedHorizontally=!0,this.anchoredLeftRightBorder="left",t=!0),this.isHoveringOverTopBorder&&!this.isResizeTopLocked&&(this.isBeingResizedVertically=!0,this.anchoredTopBottomBorder="bottom",t=!0),this.isHoveringOverBottomBorder&&!this.isResizeBottomLocked&&(this.isBeingResizedVertically=!0,this.anchoredTopBottomBorder="top",t=!0),t&&(e.preventDefault(),e.stopPropagation()),(this.isBeingResizedHorizontally||this.isBeingResizedVertically)&&this.$emit("resize-start",this.$el.getBoundingClientRect())},onMouseMove(e){if(!this.isCompletelyLocked)if(this.isBeingResizedHorizontally||this.isBeingResizedVertically){let t=this.width_/this.height_,i=e.movementX,s=e.movementY;if(this.shouldScaleProportionally&&this.isBeingResizedHorizontally&&this.isBeingResizedVertically){let n=Math.abs(i)>Math.abs(s);if(this.anchoredLeftRightBorder==="left")if(this.anchoredTopBottomBorder==="top")n?(this.width_+=i,this.height_=this.width_/t):(this.height_+=s,this.width_=this.height_*t),this.width_<this.minWidth&&(this.width_=this.minWidth,this.height_=this.width_/t),this.height_<this.minHeight&&(this.height_=this.minHeight,this.width_=this.height_*t);else{if(n?(this.width_+=i,this.height_=this.width_/t,this.y_-=i/t):(this.height_-=s,this.y_+=s,this.width_=this.height_*t),this.width_<this.minWidth){let o=this.minWidth-this.width_;this.width_=this.minWidth,this.height_=this.width_/t,this.y_-=o/t}if(this.height_<this.minHeight){let o=this.minHeight-this.height_;this.height_=this.minHeight,this.y_-=o,this.width_=this.height_*t}}else if(this.anchoredTopBottomBorder==="top"){if(n?(this.width_-=i,this.x_+=i,this.height_=this.width_/t):(this.height_+=s,this.width_=this.height_*t,this.x_-=s*t),this.width_<this.minWidth){let o=this.minWidth-this.width_;this.width_=this.minWidth,this.x_-=o,this.height_=this.width_/t}if(this.height_<this.minHeight){let o=this.minHeight-this.height_;this.height_=this.minHeight,this.width_=this.height_*t,this.x_-=o*t}}else{if(n?(this.width_-=i,this.x_+=i,this.height_=this.width_/t,this.y_+=i/t):(this.height_-=s,this.y_+=s,this.width_=this.height_*t,this.x_+=s*t),this.width_<this.minWidth){let o=this.minWidth-this.width_;this.width_=this.minWidth,this.x_-=o,this.height_=this.width_/t,this.y_-=o/t}if(this.height_<this.minHeight){let o=this.minHeight-this.height_;this.height_=this.minHeight,this.y_-=o,this.width_=this.height_*t,this.x_-=o*t}}}else{if(this.isBeingResizedHorizontally){if(this.anchoredLeftRightBorder==="left")this.width_+=i,this.width_=Math.max(this.width_,this.minWidth);else if(this.width_-=i,this.x_+=i,this.width_<this.minWidth){let n=this.minWidth-this.width_;this.width_+=n,this.x_-=n}}if(this.isBeingResizedVertically){if(this.anchoredTopBottomBorder==="top")this.height_+=s,this.height_=Math.max(this.height_,this.minHeight);else if(this.height_-=s,this.y_+=s,this.height_<this.minHeight){let n=this.minHeight-this.height_;this.height_+=n,this.y_-=n}}}this.updateComputedStyle(),e.preventDefault(),e.stopPropagation(),this.$emit("resize",this.$el.getBoundingClientRect())}else{this.isHoveringOverLeftBorder=!1,this.isHoveringOverRightBorder=!1,this.isHoveringOverTopBorder=!1,this.isHoveringOverBottomBorder=!1,this.shouldPreventInternalPointerEvents=!1;let t=this.$el.getBoundingClientRect(),i=t.x,s=t.x+t.width,n=t.y,o=t.y+t.height,h=!1;Math.abs(e.clientX-i)<this.borderWidth&&e.clientY>=n-this.borderWidth&&e.clientY<=o+this.borderWidth&&(this.isHoveringOverLeftBorder=!0,this.shouldPreventInternalPointerEvents=!0,h=!0),Math.abs(e.clientX-s)<this.borderWidth&&e.clientY>=n-this.borderWidth&&e.clientY<=o+this.borderWidth&&(this.isHoveringOverRightBorder=!0,this.shouldPreventInternalPointerEvents=!0,h=!0),Math.abs(e.clientY-n)<this.borderWidth&&e.clientX>=i-this.borderWidth&&e.clientX<=s+this.borderWidth&&(this.isHoveringOverTopBorder=!0,this.shouldPreventInternalPointerEvents=!0,h=!0),Math.abs(e.clientY-o)<this.borderWidth&&e.clientX>=i-this.borderWidth&&e.clientX<=s+this.borderWidth&&(this.isHoveringOverBottomBorder=!0,this.shouldPreventInternalPointerEvents=!0,h=!0),h&&(e.preventDefault(),e.stopPropagation()),this.updateComputedStyle()}},onMouseUp(){if(this.isCompletelyLocked)return;let e=this.isBeingResizedHorizontally||this.isBeingResizedVertically;this.isBeingResizedHorizontally=!1,this.isBeingResizedVertically=!1,this.isHoveringOverBorder=!1,e&&this.$emit("resize-end",this.$el.getBoundingClientRect())},updateComputedStyle(){let e=this.isHoveringOverLeftBorder&&!this.isResizeLeftLocked,t=this.isHoveringOverRightBorder&&!this.isResizeRightLocked,i=this.isHoveringOverTopBorder&&!this.isResizeTopLocked,s=this.isHoveringOverBottomBorder&&!this.isResizeBottomLocked;document.body.style.cursor="unset",(e||t)&&(document.body.style.cursor="ew-resize"),(i||s)&&(document.body.style.cursor="ns-resize"),e&&i&&(document.body.style.cursor="nwse-resize"),e&&s&&(document.body.style.cursor="nesw-resize"),t&&i&&(document.body.style.cursor="nesw-resize"),t&&s&&(document.body.style.cursor="nwse-resize"),this.$el.style.width=this.width_+"px",this.$el.style.minWidth=this.width_+"px",this.$el.style.maxWidth=this.width_+"px",this.$el.style.height=this.height_+"px",this.$el.style.minHeight=this.height_+"px",this.$el.style.maxHeight=this.height_+"px"}},mounted(){this.x_=this.x,this.y_=this.y,this.width_=this.width,this.height_=this.height,this.updateComputedStyle(),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),window.addEventListener("mousedown",this.onMouseDown),window.addEventListener("mousemove",this.onMouseMove),window.addEventListener("mouseup",this.onMouseUp)},unmounted(){window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),window.removeEventListener("mousedown",this.onMouseDown),window.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("mouseup",this.onMouseUp)}});typeof window<"u"&&(window.MiscVueComponents={ContextMenuComponent:f,DraggableComponent:m,FrameComponent:p,MenuComponent:x,ResizeableComponent:w});})();
