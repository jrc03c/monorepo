function createVueComponentWithCSS(component) {
  let count = 0
  let styleElement

  component = component || {}

  const data = component.data ? component.data : function () {}
  const mounted = component.mounted ? component.mounted : function () {}
  const unmounted = component.unmounted ? component.unmounted : function () {}

  if (!data.css) data.css = ""

  component.data = function () {
    return data.bind(this)()
  }

  component.mounted = function () {
    mounted.bind(this)()

    count++

    let root = this.$root.$el.getRootNode()

    if (root === document) {
      root = root.body
    }

    if (!styleElement) {
      styleElement = document.createElement("style")
      root.appendChild(styleElement)
      styleElement.innerHTML = this.css
    }
  }

  component.unmounted = function () {
    unmounted.bind(this)()

    count--

    let root = this.$root.$el.getRootNode()

    if (root === document) {
      root = root.body
    }

    if (count < 1) {
      if (styleElement) {
        try {
          root.removeChild(styleElement)
        } catch (e) {
          try {
            styleElement.parentElement.removeChild(styleElement)
          } catch (e) {
            // ...
          }
        }
      }

      styleElement = null
    }
  }

  return component
}

if (typeof window !== "undefined") {
  window.createVueComponentWithCSS = createVueComponentWithCSS
}

export { createVueComponentWithCSS }
