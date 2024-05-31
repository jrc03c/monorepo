const { isString } = require("@jrc03c/js-math-tools")
const { stringify } = require("@jrc03c/js-text-tools")

function base64Encode(x) {
  if (!isString(x)) {
    x = stringify(x)
  }

  return btoa(encodeURIComponent(x))
}

module.exports = base64Encode
