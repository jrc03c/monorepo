function filter(x, fn) {
  const out = []

  for (let i = 0; i < x.length; i++) {
    if (fn(x[i], i, x)) {
      out.push(x[i])
    }
  }

  return out
}

export { filter }
