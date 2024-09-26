function isSeries(x) {
  try {
    return (
      !!x._symbol && x._symbol === Symbol.for("@jrc03c/js-math-tools/series")
    )
  } catch (e) {
    return false
  }
}

export default isSeries
