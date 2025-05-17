import { Card } from "./card.mjs"
import { Deck } from "./deck.mjs"
import { expect, test } from "@jrc03c/fake-jest"

test("tests that the `Deck` class works as expected", () => {
  const a = new Deck()
  expect(a instanceof Array).toBe(true)
  expect(a.length).toBe(52)
  expect(a.every(v => v instanceof Card)).toBe(true)
})