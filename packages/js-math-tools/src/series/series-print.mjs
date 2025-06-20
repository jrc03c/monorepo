import { copy } from "../copy.mjs"
import { forEach } from "../for-each.mjs"
import { range } from "../range.mjs"

function seriesPrint(series) {
  let temp = series.copy()
  const maxRows = typeof window === "undefined" ? 20 : 10

  if (temp.index.length > maxRows) {
    temp = temp.get(
      range(0, maxRows / 2).concat(
        range(temp.index.length - maxRows / 2, temp.index.length),
      ),
    )

    const tempIndex = copy(temp.index)
    tempIndex.splice(Math.floor(tempIndex.length / 2), 0, "...")
    temp.values.push("...")
    temp.index.push("...")
    temp = temp.get(tempIndex)
  }

  const out = {}

  forEach(temp.values, (value, i) => {
    const obj = {}
    obj[temp.name] = value
    out[temp.index[i]] = obj
  })

  console.table(out)
  console.log("Shape:", series.shape, "\n")
  return series
}

export { seriesPrint }
