import { expect, test } from "@jrc03c/fake-jest"
import { makeKey } from "./index.mjs"

test("tests that random strings can be generated correctly", () => {
  const a = makeKey(123)
  expect(a.length).toBe(123)

  const b = makeKey(123)
  const c = makeKey(123)
  expect(b).not.toBe(c)

  const charset = "Hello, world!"
  const d = makeKey(123, charset)

  d.split("").forEach(char => {
    expect(charset.includes(char)).toBe(true)
  })

  const e = makeKey(123, charset)
  expect(e).not.toBe(d)
})
