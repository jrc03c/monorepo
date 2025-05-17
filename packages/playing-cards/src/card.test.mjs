import { Card } from "./card.mjs"
import { expect, test } from "@jrc03c/fake-jest"

test("tests that the `Card` class works as expected", () => {
  const a = new Card()
  expect(a.id).toBe("Ace of Spades")
  expect(a.name).toBe("Ace")
  expect(a.suit).toBe("Spade")
  expect(a.symbol).toBe("♠")
  expect(a.value).toBe(1)

  const b = new Card({ suit: Card.Suit.Heart, value: Card.Value.Seven })
  expect(b.id).toBe("Seven of Hearts")
  expect(b.name).toBe("Seven")
  expect(b.suit).toBe("Heart")
  expect(b.symbol).toBe("♥")
  expect(b.value).toBe(7)
})