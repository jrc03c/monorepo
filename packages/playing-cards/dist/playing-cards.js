(() => {
  // src/card.mjs
  var Card = class _Card {
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
      "13": "King"
    };
    static Suit = {
      Club: "Club",
      Diamond: "Diamond",
      Heart: "Heart",
      None: "None",
      Spade: "Spade"
    };
    static Symbol = {
      Club: "\u2663",
      Diamond: "\u2666",
      Heart: "\u2665",
      None: "\u2205",
      Spade: "\u2660"
    };
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
      King: 13
    };
    static random(shouldIncludeJokers, randomFn) {
      randomFn = randomFn || Math.random;
      const suits = Object.values(this.Suit).filter(
        (v) => shouldIncludeJokers || v !== "None"
      );
      const values = Object.values(this.Value).filter(
        (v) => shouldIncludeJokers || v > 0
      );
      const suit = suits[Math.floor(randomFn() * suits.length)];
      const value = values[Math.floor(randomFn() * values.length)];
      return new _Card({
        suit: value === this.Value.Joker ? this.Suit.None : suit,
        value
      });
    }
    suit = null;
    value = null;
    constructor(data) {
      data = data || {};
      this.suit = data.suit || this.constructor.Suit.Spade;
      this.value = data.value ?? this.constructor.Value.Ace;
      if (!data.suit && this.value === this.constructor.Value.Joker) {
        this.suit = this.constructor.Suit.None;
      }
    }
    get id() {
      return `${this.name} of ${this.suit}s`;
    }
    get name() {
      return this.constructor.Name[this.value];
    }
    set name(v) {
      throw new Error("The `name` property of a `Card` instance is read-only!");
    }
    get symbol() {
      return this.constructor.Symbol[this.suit];
    }
    set symbol(v) {
      throw new Error("The `symbol` property of a `Card` instance is read-only!");
    }
    toObject() {
      return {
        id: this.id,
        name: this.name,
        suit: this.suit,
        symbol: this.symbol,
        value: this.value
      };
    }
  };

  // src/deck.mjs
  var Deck = class _Deck extends Array {
    static generate(options) {
      options = options || {};
      const shouldIncludeJokers = options.shouldIncludeJokers || false;
      const CardClass = options.CardClass || Card;
      const suits = Object.values(CardClass.Suit).filter(
        (s) => s !== CardClass.Suit.None
      );
      const values = Object.values(CardClass.Value).filter(
        (v) => v !== CardClass.Value.Joker
      );
      const out = new _Deck();
      suits.forEach((suit) => {
        values.forEach((value) => {
          out.push(new CardClass({ suit, value }));
        });
      });
      if (shouldIncludeJokers) {
        out.push(new CardClass({ value: CardClass.Value.Joker }));
        out.push(new CardClass({ value: CardClass.Value.Joker }));
      }
      return out;
    }
    random(randomFn) {
      randomFn = randomFn || Math.random;
      return this[Math.floor(randomFn() * this.length)];
    }
    shuffle(randomFn) {
      randomFn = randomFn || Math.random;
      for (let i = 0; i < this.length; i++) {
        const j = Math.floor(randomFn() * this.length);
        const k = Math.floor(randomFn() * this.length);
        const buffer = this[j];
        this[j] = this[k];
        this[k] = buffer;
      }
    }
    toObject() {
      return Array.from(this.map((c) => c.toObject()));
    }
  };

  // src/iife.mjs
  var PlayingCards = { Card, Deck };
  globalThis.PlayingCards = PlayingCards;
})();
