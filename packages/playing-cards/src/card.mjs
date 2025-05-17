class Card {
  static Name = {
    "0": "Joker",
    "1": "Ace",
    "2": "Two",
    "3": "Three",
    "4": "Four",
    "5": "Five",
    "6": "Six",
    "7": "Seven",
    "8": "Eight",
    "9": "Nine",
    "10": "Ten",
    "11": "Jack",
    "12": "Queen",
    "13": "King",
  }

  static Suit = {
    Club: "Club",
    Diamond: "Diamond",
    Heart: "Heart",
    None: "None",
    Spade: "Spade",
  }

  static Symbol = {
    Club: "♣",
    Diamond: "♦",
    Heart: "♥",
    None: "∅",
    Spade: "♠",
  }

  static Value = {
    Joker: 0,
    Ace: 1,
    Two: 2,
    Three: 3,
    Four: 4,
    Five: 5,
    Six: 6,
    Seven: 7,
    Eight: 8,
    Nine: 9,
    Ten: 10,
    Jack: 11,
    Queen: 12,
    King: 13,
  }

  static random(shouldIncludeJokers, randomFn) {
    randomFn = randomFn || Math.random

    const suits = Object.values(this.Value).filter(
      v => shouldIncludeJokers || v !== "None",
    )

    const values = Object.values(this.Value).filter(
      v => shouldIncludeJokers || v > 0,
    )

    const suit = suits[Math.floor(randomFn() * suits.length)]
    const value = values[Math.floor(randomFn() * suits.length)]

    return new Card({
      suit:
        value === this.Value.Joker
        ? this.Suit.Joker
        : suit,
      value,
    })
  }

  name = null
  suit = null
  symbol = null
  value = null

  constructor(data) {
    data = data || {}
    this.suit = data.suit || this.constructor.Suit.Spade
    this.value = data.value || this.constructor.Value.Ace
    this.name = data.name || this.constructor.Name[this.value]
    this.symbol = data.symbol || this.constructor.Symbol[this.suit]
  }

  get id() {
    return `${this.name} of ${this.suit}s`
  }
}

export { Card }
