import { base64Decode } from "./base-64-decode.mjs"
import { base64Encode } from "./base-64-encode.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { isEqual } from "@jrc03c/js-math-tools"
import { parse, stringify } from "@jrc03c/js-text-tools"
import { randomString } from "./random-string.mjs"

test("tests that the `base64Decode` and `base64Encode` functions work as expected", () => {
  const charsetString =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~`!@#$%^&*()_+-={[}]|\\:;\"'<,>.?/"

  const charsetArray = charsetString.split("")

  for (let i = 0; i < 100; i++) {
    const x = randomString(256, charsetString)
    const y = base64Encode(x)
    const z = base64Decode(y)
    expect(y).not.toBe(x)
    expect(z).toBe(x)

    x.split("").forEach(char => {
      expect(charsetArray.indexOf(char)).toBeGreaterThan(-1)
    })

    y.split("").forEach(char => {
      expect(!!char.match(/([A-Za-z0-9]|\+|\/|=)/g)).toBe(true)
    })

    z.split("").forEach(char => {
      expect(charsetArray.indexOf(char)).toBeGreaterThan(-1)
    })
  }

  const variables = [
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
    [
      [2, 3, 4],
      [5, 6, 7],
    ],
    { hello: "world" },
    new Date(),
  ]

  variables.forEach(x => {
    const y = base64Encode(stringify(x))
    const z = parse(base64Decode(y))
    expect(isEqual(x, y)).toBe(false)
    expect(isEqual(x, z)).toBe(true)
  })

  // doesn't work on functions
  const dubble = x => x * 2

  expect(
    isEqual(dubble, parse(base64Decode(base64Encode(stringify(dubble))))),
  ).not.toBe(true)
})
