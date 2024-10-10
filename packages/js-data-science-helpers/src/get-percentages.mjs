import { isNumber, stats } from "@jrc03c/js-math-tools"

function getPercentages(x, shouldIgnoreNaNs) {
  const results = stats(x, { shouldDropNaNs: shouldIgnoreNaNs })
  const n = shouldIgnoreNaNs ? results.nWithoutNaNs : results.n

  return results.counts.values
    .filter(v => isNumber(v) || !shouldIgnoreNaNs)
    .map(v => {
      const c = results.counts.get(v)
      return { value: v, count: c, percentage: c / n }
    })
}

export { getPercentages }
