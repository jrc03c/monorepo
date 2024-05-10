const { stringify } = require("@jrc03c/js-text-tools")

function getSize(x) {
  return new TextEncoder().encode(stringify(x)).length
}

module.exports = getSize
