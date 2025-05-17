import { Card } from "./card.mjs"
import { expect, test } from "@jrc03c/fake-jest"

test("tests that the `Card` class works as expected", () => {
  const a = new Card()
  expect(a.name).toBe("Ace")
  expect(a.suit).toBe("Spade")
  expect(a.symbol).toBe("♠")
  expect(a.value).toBe(1)
})