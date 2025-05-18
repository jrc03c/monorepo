import { expect, test } from "@jrc03c/fake-jest"
import { makeKey } from "./index.mjs"
import { random, seed } from "@jrc03c/js-math-tools"

test("tests that random strings can be generated correctly", () => {
  const a = makeKey(123)
  expect(a.length).toBe(123)

  const b = makeKey(123)
  const c = makeKey(123)
  expect(b).not.toBe(c)

  seed(12345)
  const d = makeKey(123, null, random)
  seed(12345)
  const e = makeKey(123, null, random)
  expect(d).toBe(e)

  seed(12345)
  const f = makeKey(64, null, random)
  seed(12345)
  const g = makeKey(32, null, random)
  expect(f.includes(g)).toBe(true)
  expect(g.includes(f)).toBe(false)

  const charset = "Hello, world!"
  const h = makeKey(123, charset)

  h.split("").forEach(char => {
    expect(charset.includes(char)).toBe(true)
  })

  const i = makeKey(123, charset)
  expect(h).not.toBe(i)

  seed(12345)
  const j = makeKey(123, charset, random)
  seed(12345)
  const k = makeKey(123, charset, random)
  expect(j).toBe(k)
  seed(12345)
  expect(makeKey(123, "foobar", random)).not.toBe(k)

  seed(12345)
  const l = makeKey(64, charset, random)
  seed(12345)
  const m = makeKey(32, charset, random)
  expect(l.includes(m)).toBe(true)
  expect(m.includes(l)).toBe(false)
})
