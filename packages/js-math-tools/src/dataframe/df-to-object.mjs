import { forEach } from "../for-each.mjs"

function dfToObject(df) {
  const out = {}

  forEach(df.columns, col => {
    out[col] = df.get(col).values
  })

  return out
}

export { dfToObject }
