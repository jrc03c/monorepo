import { Card } from "./card.mjs"
import { Deck } from "./deck.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { isEqual, random, seed } from "@jrc03c/js-math-tools"

test("tests that the `Deck` class works as expected", () => {
  const a = new Deck()
  expect(a instanceof Array).toBe(true)
  expect(a.length).toBe(0)

  const b = Deck.generate()
  expect(b instanceof Array).toBe(true)
  expect(b.length).toBe(52)
  expect(b.every(v => v instanceof Card)).toBe(true)

  const c = Deck.generate()
  expect(isEqual(b, c)).toBe(true)
  c.shuffle()
  expect(isEqual(b, c)).toBe(false)

  const d = Deck.generate()
  const e = Deck.generate()
  seed(54321)
  d.shuffle(random)
  seed(54321)
  e.shuffle(random)
  expect(isEqual(d, e)).toBe(true)
  expect(isEqual(b, d)).toBe(false)

  const f = Deck.generate()
  const fcard1 = f.random()
  f.splice(f.indexOf(fcard1), 1)
  const fcard2 = f.random()
  expect(isEqual(fcard1, fcard2)).toBe(false)
  seed(54321)
  const fcard3 = f.random(random)
  seed(54321)
  const fcard4 = f.random(random)
  expect(isEqual(fcard3, fcard4)).toBe(true)

  const g = Deck.generate({ shouldIncludeJokers: true })
  expect(g.filter(v => v.name === "Joker").length).toBe(2)

  const h = Deck.generate()
  h.shuffle()
  expect(h instanceof Deck).toBe(true)
  expect(h.every(v => v instanceof Card)).toBe(true)
  expect(h.toObject() instanceof Array).toBe(true)
  expect(h.toObject() instanceof Deck).toBe(false)
  expect(h.toObject().some(v => v instanceof Card)).toBe(false)

  const i = h.copy()
  expect(isEqual(h, i)).toBe(true)
  expect(h === i).toBe(false)
})