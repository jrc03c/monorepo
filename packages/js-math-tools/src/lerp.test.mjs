import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { flatten } from "./flatten.mjs"
import { isEqual } from "./is-equal.mjs"
import { lerp } from "./lerp.mjs"
import { map } from "./map.mjs"
import { normal } from "./normal.mjs"
import { random } from "./random.mjs"
import { reshape } from "./reshape.mjs"

test("tests that linear interpolations can be computed correctly", () => {
  expect(lerp(2, 3, 0.5)).toBe(2.5)
  expect(lerp(-6, -10, 0.5)).toBe(-8)

  const a = normal(100)
  const b = 5
  const c = 0.25
  const d = normal(100)
  const e = random(100)

  expect(
    isEqual(
      lerp(a, b, c),
      map(a, v => lerp(v, b, c)),
    ),
  ).toBe(true)

  expect(
    isEqual(
      lerp(b, a, c),
      map(a, v => lerp(b, v, c)),
    ),
  ).toBe(true)

  expect(
    isEqual(
      lerp(a, d, e),
      map(a, (v, i) => lerp(v, d[i], e[i])),
    ),
  ).toBe(true)

  const f = new Series(normal(100))
  const g = new Series(normal(100))
  const h = new Series(normal(100))

  expect(
    isEqual(lerp(f, g, h), new Series(lerp(f.values, g.values, h.values))),
  ).toBe(true)

  const i = new DataFrame(normal([10, 10]))
  const j = new DataFrame(normal([10, 10]))
  const k = new DataFrame(normal([10, 10]))

  expect(
    isEqual(lerp(i, j, k), new DataFrame(lerp(i.values, j.values, k.values))),
  ).toBe(true)

  const l = normal([2, 3, 4, 5])
  const m = normal([2, 3, 4, 5])
  const n = normal([2, 3, 4, 5])

  expect(
    isEqual(
      lerp(l, m, n),
      reshape(lerp(flatten(l), flatten(m), flatten(n)), [2, 3, 4, 5]),
    ),
  ).toBe(true)

  expect(lerp(0n, 10n, 0.3)).toBe(3n)
  expect(lerp(100n, 200n, 0.5)).toBe(150n)

  const wrongs = [
    NaN,
    "foo",
    true,
    false,
    null,
    undefined,
    Symbol.for("Hello, world!"),
    x => x,
    function (x) {
      return x
    },
    { hello: "world" },
  ]

  for (let i = 0; i < 100; i++) {
    const a = wrongs[parseInt(random() * wrongs.length)]
    const b = wrongs[parseInt(random() * wrongs.length)]
    const c = wrongs[parseInt(random() * wrongs.length)]
    expect(lerp(a, b, c)).toBeNaN()
  }
})
