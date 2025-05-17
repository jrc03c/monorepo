import { Card } from "./card.mjs"

class Deck extends Array {
  static generate(options) {
    options = options || {}
    const shouldIncludeJokers = options.shouldIncludeJokers || false
    const CardClass = options.CardClass || Card

    const suits = Object.values(CardClass.Suit).filter(
      s => s !== CardClass.Suit.None,
    )

    const values = Object.values(CardClass.Value).filter(
      v => v !== CardClass.Value.Joker,
    )

    const out = new Deck()

    suits.forEach(suit => {
      values.forEach(value => {
        out.push(new CardClass({ suit, value }))
      })
    })

    if (shouldIncludeJokers) {
      out.push(new CardClass({ value: CardClass.Value.Joker }))
      out.push(new CardClass({ value: CardClass.Value.Joker }))
    }

    return out
  }

  random(randomFn) {
    randomFn = randomFn || Math.random
    return this[Math.floor(randomFn() * this.length)]
  }

  shuffle(randomFn) {
    randomFn = randomFn || Math.random

    for (let i = 0; i < this.length; i++) {
      const j = Math.floor(randomFn() * this.length)
      const k = Math.floor(randomFn() * this.length)
      const buffer = this[j]
      this[j] = this[k]
      this[k] = buffer
    }
  }
}

export { Deck }