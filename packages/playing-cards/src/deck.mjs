import { Card } from "./card.mjs"

class Deck extends Array {
  static generateCards(shouldIncludeJokers, CardClass) {
    CardClass = CardClass || Card

    const suits = Object.values(CardClass.Suit).filter(
      s => s !== CardClass.Suit.None,
    )

    const values = Object.values(CardClass.Value).filter(
      v => v !== CardClass.Value.Joker,
    )

    const out = []

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

  constructor(data) {
    super()
    data = data || {}

    this.push(
      ...(
        data.cards
        || this.constructor.generateCards(
          data.shouldIncludeJokers,
          data.CardClass,
        )
      ),
    )
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