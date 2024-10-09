import { assert } from "../assert.mjs"
import { isUndefined } from "../is-undefined.mjs"
import { shuffle } from "../shuffle.mjs"

function dfShuffle(df, axis) {
  if (isUndefined(axis)) axis = 0

  assert(
    axis === 0 || axis === 1,
    "The `axis` parameter to the `shuffle` must be 0, 1, or undefined.",
  )

  return df.get(
    axis === 0 ? shuffle(df.index) : null,
    axis === 1 ? shuffle(df.columns) : null,
  )
}

export { dfShuffle }
