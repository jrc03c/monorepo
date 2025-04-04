import { copy } from "../copy.mjs"

function dfCopy(DataFrame, df) {
  if (df.isEmpty) return new DataFrame()
  const out = new DataFrame(copy(df.values))
  out.columns = df.columns.slice()
  out.index = df.index.slice()
  return out
}

export { dfCopy }
