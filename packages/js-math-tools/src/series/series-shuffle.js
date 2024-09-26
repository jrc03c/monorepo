import shuffle from "../shuffle.js"

function seriesShuffle(series) {
  const out = series.copy()
  return out.get(shuffle(out.index))
}

export default seriesShuffle
