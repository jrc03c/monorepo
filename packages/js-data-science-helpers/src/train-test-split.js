const {
  assert,
  isArray,
  isBoolean,
  isDataFrame,
  isSeries,
  int,
  isNumber,
  isUndefined,
  range,
  set,
  shape,
  shuffle,
} = require("@jrc03c/js-math-tools")

function trainTestSplit() {
  const args = Array.from(arguments)
  const datasets = args.filter(a => isArray(a) || isDataFrame(a) || isSeries(a))

  const options =
    args.find(a => !datasets.includes(a) && typeof a === "object") || {}

  const shouldShuffle = isUndefined(options.shouldShuffle)
    ? true
    : options.shouldShuffle

  const testSize = isUndefined(options.testSize) ? 0.1 : options.testSize

  assert(
    isBoolean(shouldShuffle),
    "If passing an options object to the `trainTestSplit` function and including a `shouldShuffle` property on that object, then the value of that property must be a boolean!",
  )

  assert(
    isNumber(testSize) && testSize > 0 && testSize < 1,
    "If passing an options object to the `trainTestSplit` function and including a `testSize` property on that object, then the value of that property must be a number between 0 and 1 (exclusive on both ends)!",
  )

  assert(
    datasets.length > 0,
    "You must pass at least one dataset into the `trainTestSplit` function!",
  )

  const shapes = datasets.map(d => shape(d)[0])

  assert(
    set(shapes).length === 1,
    `All datasets passed into the \`trainTestSplit\` function must have the same length at their shallowest dimension! The lengths of the datasets you provided, though, are: ${shapes.join(
      ", ",
    )}`,
  )

  const out = []

  const index = shouldShuffle
    ? shuffle(range(0, shapes[0]))
    : range(0, shapes[0])

  const split = int((1 - testSize) * index.length)
  const trainIndex = index.slice(0, split)
  const testIndex = index.slice(split)

  datasets.forEach(d => {
    if (isDataFrame(d)) {
      out.push(d.get(trainIndex, null))
      out.push(d.get(testIndex, null))
    } else if (isSeries(d)) {
      out.push(d.get(trainIndex))
      out.push(d.get(testIndex))
    } else {
      const train = []
      const test = []

      d.forEach((v, i) => {
        if (trainIndex.includes(i)) {
          train.push(v)
        } else {
          test.push(v)
        }
      })

      out.push(train)
      out.push(test)
    }
  })

  return out
}

module.exports = trainTestSplit
