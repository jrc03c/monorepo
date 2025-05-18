import {
  add,
  correl,
  DataFrame,
  dropMissing,
  flatten,
  forEach,
  int,
  isEqual,
  map,
  normal,
  pow,
  random,
  range,
  scale,
  Series,
  set,
  shuffle,
} from "@jrc03c/js-math-tools"

import { convertToNumerical } from "./convert-to-numerical.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { makeKey } from "@jrc03c/make-key"

// generate data with these types:
//   - booleans
//   - dates from a small set
//   - dates that are completely random
//   - floats from a small set
//   - floats that are completely random
//   - integers from a small set
//   - integers that are completely random
//   - objects from a small set
//   - objects that are completely random
//   - strings from a small set
//   - strings that are completely random
// drop some random values
// duplicate some of the already-existing columns
// add some mostly empty columns
// add some completely empty columns
// add some columns with only 1 unique value
// add a few columns that are highly correlated with some of the float columns

test("tests that DataFrames can be converted to all numerical values correctly", () => {
  const n = 100

  const booleans = map(range(0, n), () => (random() < random() ? 1 : 0))

  const datesFromSmallSet = (() => {
    const datesSet = map(
      range(0, 5),
      () => new Date(int(random() * new Date().getTime())),
    )

    return shuffle(map(range(0, n), i => datesSet[i % datesSet.length]))
  })()

  const datesAllUnique = map(
    range(0, n),
    () => new Date(int(random() * new Date().getTime())),
  )

  const floatsFromSmallSet = (() => {
    const floatSet = normal(5)
    return shuffle(map(range(0, n), i => floatSet[i % floatSet.length]))
  })()

  const floatsAllUnique = normal(n)

  const intsFromSmallSet = (() => {
    const intSet = range(-3, 4)
    return shuffle(map(range(0, n), i => intSet[i % intSet.length]))
  })()

  const intsAllUnique = map(shuffle(range(0, n)), v => int(v - n / 2))

  const objectsFromSmallSet = (() => {
    const objectsSet = map(range(0, 10), () => ({
      x: random(),
      y: random(),
      z: random(),
    }))

    return shuffle(map(range(0, n), i => objectsSet[i % objectsSet.length]))
  })()

  const objectsAllUnique = map(range(0, n), () => ({
    x: random(),
    y: random(),
    z: random(),
  }))

  const stringsFromSmallSet = (() => {
    const stringSet = map(range(0, 5), () => makeKey(8))
    return shuffle(map(range(0, n), i => stringSet[i % stringSet.length]))
  })()

  const stringsAllUnique = map(range(0, n), () => makeKey(8))

  const nulls = map(range(0, n), () => shuffle([null, undefined, NaN])[0])

  let df = new DataFrame({
    booleans,
    datesFromSmallSet,
    datesAllUnique,
    floatsFromSmallSet,
    floatsAllUnique,
    intsFromSmallSet,
    intsAllUnique,
    objectsFromSmallSet,
    objectsAllUnique,
    stringsFromSmallSet,
    stringsAllUnique,
    nulls,
  })

  // randomly delete some values
  forEach(range(0, 0.05 * df.shape[0] * df.shape[1]), () => {
    const i = int(random() * df.shape[0])
    const j = int(random() * df.shape[1])
    df.values[i][j] = shuffle([null, undefined, NaN])[0]
  })

  // duplicate some existing columns
  forEach(range(0, 3), () => {
    const colName = df.columns[int(random() * df.columns.length)]
    df = df.assign(colName + " (duplicate)", df.get(null, colName).values)
  })

  // add some columns that are mostly missing values
  forEach(range(0, 3), i => {
    const threshold = random() * 0.5

    df = df.assign(
      "floatsWithLotsMissing" + i,
      map(normal(n), v => (random() < threshold ? v : NaN)),
    )
  })

  // add some columns with 1 unique value
  map(range(0, 3), () => {
    const colName = df.columns[int(random() * df.columns.length)]
    const value = df.get(colName).values[0]

    df = df.assign(
      makeKey(8) + " (1 unique)",
      map(range(0, n), () => value),
    )
  })

  // add some columns that are partially correlated with the existing float
  // columns
  map(range(-5, 5), i => {
    const noiseScale = pow(2, i)
    const colName = `floatsAllUnique + ${noiseScale.toFixed(4)} * noise`
    df = df.assign(colName, add(floatsAllUnique, scale(noiseScale, normal(n))))
  })

  // convert to numerical data
  const dfCleaned = convertToNumerical(df)

  // check that the resulting DataFrame contains only numbers and NaNs
  forEach(flatten(dfCleaned.values), v => {
    expect(typeof v).toBe("number")
  })

  // check that no columns are very highly correlated
  dfCleaned.apply(col1 => {
    dfCleaned.apply(col2 => {
      if (col1.name !== col2.name && !isEqual(col1.values, col2.values)) {
        const r = correl(col1, col2)

        if (!isNaN(r)) {
          expect(r).toBeLessThan(0.99999)
        }
      }
    })
  })

  // check that no columns have more than 15 missing values
  dfCleaned.apply(col => {
    const nonMissingValues = dropMissing(col.values)
    expect(col.values.length - nonMissingValues.length).toBeLessThan(15)
  })

  // check that no columns have a single unique value
  dfCleaned.apply(col => {
    const valuesSet = set(dropMissing(col.values))
    if (valuesSet.length === 1) col.print()
    expect(valuesSet.length).toBeGreaterThan(1)
  })

  // check that columns containing small sets of values have been one-hot
  // encoded
  const oneHotColumns = [
    "datesFromSmallSet",
    "floatsFromSmallSet",
    "intsFromSmallSet",
    "objectsFromSmallSet",
    "stringsFromSmallSet",
  ]

  forEach(oneHotColumns, colName => {
    expect(dfCleaned.columns.includes(colName)).toBe(false)
  })

  const bigIntsOnly = new DataFrame({
    foo: map(random(100), v => BigInt(Math.round(v * 100))),
    bar: map(random(100), v => BigInt(Math.round(v * 100))),
  })

  expect(isEqual(bigIntsOnly, convertToNumerical(bigIntsOnly))).toBe(true)

  const bigIntsOnly2 = bigIntsOnly.assign("baz", bigIntsOnly.get("bar").values)

  expect(
    isEqual(bigIntsOnly.values, convertToNumerical(bigIntsOnly2).values),
  ).toBe(true)
})

test("throws an error when attempting to convertToNumerical non-DataFrames", () => {
  const wrongs = [
    0,
    1,
    2.3,
    -2.3,
    Infinity,
    -Infinity,
    NaN,
    "foo",
    true,
    false,
    null,
    undefined,
    Symbol.for("Hello, world!"),
    [2, 3, 4],
    x => x,
    function (x) {
      return x
    },
    { hello: "world" },
    new Series({ hello: [10, 20, 30, 40, 50] }),
  ]

  forEach(wrongs, item => {
    expect(() => convertToNumerical(item)).toThrow()
  })
})
