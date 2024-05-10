function leftPad(s, n) {
  let out = s.slice()
  while (out.length < n) out = "0" + out
  return out
}

module.exports = leftPad
