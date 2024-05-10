const JSNLPTools = {
  Corpus: require("./corpus"),
  Document: require("./document"),
}

if (typeof module !== "undefined") {
  module.exports = JSNLPTools
}

if (typeof window !== "undefined") {
  window.JSNLPTools = JSNLPTools
}
