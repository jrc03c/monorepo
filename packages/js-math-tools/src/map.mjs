function map(x, fn) {
  const out = new Array(x.length)

  for (let i = 0; i < x.length; i++) {
    out[i] = fn(x[i], i, x)
  }

  return out
}

export { map }
