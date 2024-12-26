(() => {
  // node_modules/@jrc03c/vue-component-with-css/dist/vue-component-with-css.import.mjs
  function createVueComponentWithCSS(component) {
    let count = 0;
    let styleElement;
    component = component || {};
    const data = component.data ? component.data : function() {
    };
    const mounted = component.mounted ? component.mounted : function() {
    };
    const unmounted = component.unmounted ? component.unmounted : function() {
    };
    if (!data.css)
      data.css = "";
    component.data = function() {
      return data.bind(this)();
    };
    component.mounted = function() {
      mounted.bind(this)();
      count++;
      let root = this.$root.$el.getRootNode();
      if (root === document) {
        root = root.body;
      }
      if (!styleElement) {
        styleElement = document.createElement("style");
        root.appendChild(styleElement);
        styleElement.innerHTML = this.css;
      }
    };
    component.unmounted = function() {
      unmounted.bind(this)();
      count--;
      let root = this.$root.$el.getRootNode();
      if (root === document) {
        root = root.body;
      }
      if (count < 1) {
        if (styleElement) {
          try {
            root.removeChild(styleElement);
          } catch (e) {
            try {
              styleElement.parentElement.removeChild(styleElement);
            } catch (e2) {
            }
          }
        }
        styleElement = null;
      }
    };
    return component;
  }
  if (typeof window !== "undefined") {
    window.createVueComponentWithCSS = createVueComponentWithCSS;
  }

  // src/elements/block.mjs
  var css = (
    /* css */
    ``
  );
  var template = (
    /* html */
    `
  <div class="block bulma-block">
    <slot></slot>
  </div>
`
  );
  var BulmaBlock = createVueComponentWithCSS({
    name: "bulma-block",
    template,
    data() {
      return {
        css
      };
    }
  });

  // src/elements/box.mjs
  var css2 = (
    /* css */
    ``
  );
  var template2 = (
    /* html */
    `
  <div class="box bulma-box">
    <slot></slot>
  </div>
`
  );
  var BulmaBox = createVueComponentWithCSS({
    name: "bulma-box",
    template: template2,
    data() {
      return {
        css: css2
      };
    }
  });
})();
