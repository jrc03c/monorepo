import { Card } from "./card.mjs"
import { Deck } from "./deck.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { isEqual, random, seed } from "@jrc03c/js-math-tools"

test("tests that the `Deck` class works as expected", () => {
  const a = Deck.generate()
  expect(a instanceof Array).toBe(true)
  expect(a.length).toBe(52)
  expect(a.every(v => v instanceof Card)).toBe(true)

  const b = Deck.generate()
  expect(isEqual(a, b)).toBe(true)
  b.shuffle()
  expect(isEqual(a, b)).toBe(false)

  const c = Deck.generate()
  const d = Deck.generate()
  seed(54321)
  c.shuffle(random)
  seed(54321)
  d.shuffle(random)
  expect(isEqual(c, d)).toBe(true)
  expect(isEqual(a, c)).toBe(false)

  const e = Deck.generate()
  const ecard1 = e.random()
  const ecard2 = e.random()
  expect(isEqual(ecard1, ecard2)).toBe(false)
  seed(54321)
  const ecard3 = e.random(random)
  seed(54321)
  const ecard4 = e.random(random)
  expect(isEqual(ecard3, ecard4)).toBe(true)

  const f = Deck.generate({ shouldIncludeJokers: true })
  expect(f.filter(v => v.name === "Joker").length).toBe(2)
})