import { Card } from "./card.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { isEqual, random, seed } from "@jrc03c/js-math-tools"

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

  for (let i = 0; i < 100; i++) {
    const c = Card.random()
    expect(c.value).toBeGreaterThan(0)
    expect(Object.values(Card.Suit).includes(c.suit)).toBe(true)
    expect(c.suit).not.toBe("None")
  }

  seed(54321)
  const d1 = Card.random(false, random)
  seed(54321)
  const d2 = Card.random(false, random)
  expect(isEqual(d1, d2)).toBe(true)

  const e = new Card({ value: Card.Value.Joker })
  expect(e.id).toBe("Joker of Nones")
  expect(e.name).toBe("Joker")
  expect(e.suit).toBe("None")
  expect(e.symbol).toBe("∅")
  expect(e.value).toBe(0)

  const id = Math.random().toString()
  const name = Math.random().toString()
  const symbol = Math.random().toString()

  const f = new Card({
    id,
    name,
    suit: Card.Suit.None,
    symbol,
    value: Math.floor(Math.random() * 14),
  })

  expect(f.id).toBe(id)
  expect(f.name).toBe(name)
  expect(f.symbol).toBe(symbol)

  const g = Card.random()
  const gobj = g.toObject()
  expect(gobj.id).toBe(g.id)
  expect(gobj.name).toBe(g.name)
  expect(gobj.suit).toBe(g.suit)
  expect(gobj.symbol).toBe(g.symbol)
  expect(gobj.value).toBe(g.value)

  const h = Card.random()
  const i = h.copy()
  expect(isEqual(h, i)).toBe(true)
  expect(h === i).toBe(false)
})
