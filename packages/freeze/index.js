function freeze(x) {
  if (typeof x === "object") {
    Object.keys(x).forEach(key => {
      x[key] = freeze(x[key])
    })

    return Object.freeze(x)
  } else {
    return x
  }
}

if (typeof module !== "undefined") {
  module.exports = freeze
}

if (typeof window !== "undefined") {
  window.freeze = freeze
}
