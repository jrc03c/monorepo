function makeKey(n) {
  let out = ""
  const alpha = "abcdefghijklmnopqrstuvwxyz1234567890"

  for (let i = 0; i < n; i++) {
    out += alpha[parseInt(Math.random() * alpha.length)]
  }

  return out
}

module.exports = makeKey
