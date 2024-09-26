import vectorize from "./vectorize.js"

function apply(x, fn) {
  try {
    return fn(x)
  } catch (e) {
    return NaN
  }
}

export default vectorize(apply)
