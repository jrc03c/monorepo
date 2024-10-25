# Introduction

**create-high-dpi-canvas** provides a little helper function to make an HTML5 `<canvas>` element compatible with high-DPI screens.

# Installation

`npm install --save @jrc03c/create-high-dpi-canvas`

# Usage

Add to your page:

```html
<script src="dist/create-high-dpi-canvas.standalone.cjs"></script>
```

Or bundle:

```js
import { createHighDPICanvas } from "@jrc03c/create-high-dpi-canvas"
```

Then create a canvas!

```js
const width = 512
const height = 512
const canvas = createHighDPICanvas(width, height)

// add the canvas to the DOM:
document.body.appendChild(canvas)

// then draw something like you normally would:
const context = canvas.getContext("2d")
context.fillStyle = "red"
context.fillRect(0, 0, width, height)
```

The thing that's actually returned from the `createHighDPICanvas` function is a [Web Component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) that implements the [`HTMLCanvasElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) interface. That means that, although it's not technically an `HTMLCanvasElement`, it can generally be used as one. There's at least one little place where that doesn't work, and it's mentioned in the notes at the bottom of this document.

Since the returned element is a Web Component, it can be used in the page as any other element! For example, instead of creating a high-DPI canvas programmatically using the function as in the example above, you could insert a `<high-dpi-canvas>` element into your web page:

```html
<high-dpi-canvas></high-dpi-canvas>

<script src="dist/create-high-dpi-canvas.standalone.cjs"></script>
<script>
  const canvas = document.querySelector("high-dpi-canvas")
  canvas.width = 512
  canvas.height = 512

  // then draw something like you normally would:
  const context = canvas.getContext("2d")
  context.fillStyle = "red"
  context.fillRect(0, 0, width, height)
</script>
```

# API

## HighDPICanvasElement

This class inherits from [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) and implements the [`HTMLCanvasElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) interface. Therefore, I won't bother describing the superclass and interface methods here. Please consult the MDN docs for more info about those. Instead, what's listed below are the custom properties, methods, and events I added on top of the existing functionality.

### Properties

#### (static) `css`

A **string** representing CSS rules to be applied inside the element's shadow DOM. Its default value is:

```json
"
  canvas {
    margin: 0;
    padding: 0;
    border: 0;
  }
"
```

#### (static) `forwardedEvents`

An array of strings representing event names that are forwarded up from the canvas element inside the shadow DOM. For example, if the canvas inside the shadow DOM emits a `"contextlost"` event, then the `HighDPICanvasElement` will re-emit it. Its default value is:

```json
[
  "contextlost",
  "contextrestored",
  "webglcontextcreationerror",
  "webglcontextlost",
  "webglcontextrestored"
]
```

#### (static) `observedAttributes`

An array of strings representing HTML attribute names that the class will watch for changes. This property is part of the Web Components API. Read more about it [here](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#responding_to_attribute_changes).

#### (static) `tagName`

A string representing the name of the HTML element. Its value is `high-dpi-canvas`.

#### (static) `template`

A string representing the inner HTML of the shadow DOM. Its default value is simply `"<canvas></canvas>"`.

#### `_height`

A number representing the height of the element. Setting the value of this property will not trigger any resizing events, so only assign a value to this property if it's your intention to circumvent the event process.

#### `_width`

A number representing the width of the element. Setting the value of this property will not trigger any resizing events, so only assign a value to this property if it's your intention to circumvent the event process.

#### (getter & setter) `dimensions`

An array containing two numbers representing, respectively, the width and height of the element.

#### (getter) `element`

The canvas element that lives in the shadow DOM. Generally, you shouldn't interact with this property unless you know what you're doing. However, there's a caveat down in the notes section of the bottom of this document that mentions this property.

#### (getter & setter) `height`

A number representing the height of the element. Note that this value can accessed as an attribute using the `getAttribute` and `setAttribute` methods.

#### (getter & setter) `width`

A number representing the width of the element. Note that this value can accessed as an attribute using the `getAttribute` and `setAttribute` methods.

#### `eventListeners`

An array of objects matching the definition below that provide information about event listeners that have been added to various targets.

Definition:

```
{
  target : EventTarget,
  event : string,
  callback : function,
  remove : function,
}
```

You'll probably never need to interact with this property. Its purpose is to keep track of event listeners created by the `on` method and then to remove all of them when the `HighDPICanvasElement` is removed from the DOM. It does this automatically, so you shouldn't need to fiddle with this property.

#### `resizeObserver`

A [`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) instance that watches the element for size changes (either those introduced programmatically by setting the `width` or `height` properties or those applied indirectly via CSS rules). When the `resizeObserver` observes a change in the element's size, it calls the `onOuterResize` method, which then emits a "resize" event.

### Methods

#### `off(target : [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)), event : string, callback : function)`

Removes an event listener that was previously added to `target` that listened for the `event` event and called the `callback` function. This method is somewhat similar to calling the [`EventTarget.removeEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener) method except that the corresponding event listener info object is removed from the `eventListeners` array.

#### `on(target : [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)), event : string, callback : function, shouldRecordEventListenerInfo : boolean) : function`

Adds an event listener to `target` that listens for the `event` event and calls the `callback` function. This method provides roughly the same functionality as the [`EventTarget.addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) method, but with two exceptions. First, it returns a function that can be used to remove the event listener. Second, it creates an event listener info object and stores it in the `eventListeners` array (unless `shouldRecordEventListenerInfo` is `false`). When the `HighDPICanvasElement` is later removed from the DOM, all listeners in the `eventListeners` array are automatically removed.

For example:

```js
const canvas = createHighDPICanvas(512, 512)
document.body.appendChild(canvas)

const removeListener = canvas.on(window, "resize", () => {
  console.log("The window was resized!")
})

// Later, you can remove the listener by calling the returned function:
removeListener()

// Or by removing the element from the DOM:
document.body.removeChild(canvas)
```

#### `onOuterResize(shouldEmitEvent : boolean)`

Updates the properties of the canvas that lives in the shadow DOM and then emits a "resize" event (unless `shouldEmitEvent` is `false`).

This method is called automatically by the `resizeObserver` any time the element's size changes, so there are probably very few cases where it would make sense to call it manually.

### Events

#### `"resize"`

Is emitted any time the `HighDPICanvasElement` changes size. This can occur either when size changes are induced directly (i.e., by setting the `width` and `height` properties, or by setting the `"width"` and `"height"` attributes) or indirectly (e.g., when a CSS rule forces the element to change size).

## `createHighDPICanvas(width : number, height : number) : HighDPICanvasElement`

Returns a `HighDPICanvasElement` instance.

# Notes, Caveats, Known Issues, etc.

1. It's not currently possible to call _another_ canvas's `drawImage` method and pass a high-DPI canvas as the first argument. I'll try to fix that sometime. In the meantime, you can use the `.element` instance property to directly reference the canvas element that lives inside the `<high-dpi-canvas>` shadow DOM.
