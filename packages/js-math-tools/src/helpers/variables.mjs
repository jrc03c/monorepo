import { DataFrame, Series } from "../dataframe/index.mjs"

const selfReferencer = [2, 3, 4]
selfReferencer.push(selfReferencer)

const variables = [
  0,
  1,
  2.3,
  -2.3,
  234n,
  -234n,
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
  [
    [2, 3, 4],
    [5, 6, 7],
  ],
  x => x,
  function (x) {
    return x
  },
  { hello: "world" },
  new Date(),
  selfReferencer,
  new Series({ hello: [10, 20, 30, 40, 50] }),
  new DataFrame({ foo: [1, 2, 4, 8, 16], bar: [1, 3, 9, 27, 81] }),
]

export { variables }