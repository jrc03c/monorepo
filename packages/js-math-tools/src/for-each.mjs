function forEach(x, fn) {
  for (let i = 0; i < x.length; i++) {
    fn(x[i], i, x)
  }
}

export { forEach }
