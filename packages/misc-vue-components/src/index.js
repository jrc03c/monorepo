const MiscVueComponents = {
  ContextMenu: require("./context-menu"),
  Draggable: require("./draggable"),
  Frame: require("./frame"),
  Resizeable: require("./resizeable"),
}

if (typeof module !== "undefined") {
  module.exports = MiscVueComponents
}

if (typeof window !== "undefined") {
  window.MiscVueComponents = MiscVueComponents
}
