import { shuffle } from "../shuffle.mjs"

function seriesShuffle(series) {
  const out = series.copy()
  return out.get(shuffle(out.index))
}

export { seriesShuffle }
