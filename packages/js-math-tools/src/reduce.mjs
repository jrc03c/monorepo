function reduce(x, fn, out) {
  for (let i = 0; i < x.length; i++) {
    out = fn(out, x[i], i, x)
  }

  return out
}

export { reduce }
