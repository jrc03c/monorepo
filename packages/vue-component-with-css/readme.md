# Intro

This package makes it easy to create "single-file" components in Vue 3, though without requiring a build step. The main difference is that these components don't use the standard Vue 3 single-file component syntax. Instead, the CSS is added as a property of the component's data.

# Installation

```bash
npm install --save https://github.com/jrc03c/vue-component-with-css
```

The import and bundle:

```node
const createVueComponentWithCSS = require("vue-component-with-css")
```

Or use as a global function (as a property of `window`).

# Usage

```html
<html>
  <head></head>
  <body>
    <div id="app"></div>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="path/to/vue-component-with-css/dist/vue-component-with-css.js"></script>
    <script>
      // create a "single-file" component with the styles defined in the data's
      // `css` property
      const MyComponent = createVueComponentWithCSS({
        template: `
          <div class="my-component">
            Hello from my component!
          </div>
        `

        data(){
          return {
            css: ".my-component { color: red; }",
          }
        },
      })

      // create an app using that component
      const app = Vue.createApp(MyComponent).mount("#app")
    </script>
  </body>
</html>
```

This works for both root-level objects that are used to create apps or objects that are used to create components for re-use. See the demo in the `/demo` folder for a fuller example.

# Notes & caveats

The main difference in functionality between this and standard Vue 3 components is that this does not provide _scoped_ CSS. If you have any ideas about how to do this easily, please let me know.
