# Intro

A little library on which to build playing-card-based things.

# Installation

```bash
npm install --save @jrc03c/playing-cards
```

# Example usage

```js
import { Card, Deck } from "@jrc03c/playing-cards"

const card1 = new Card({ suit: Card.Suit.Spade, value: Card.Value.Ace })
const card2 = Card.random()

const deck = Deck.generate()
deck.shuffle()

const card3 = deck.random()
console.log(card1.value > card2.value)
console.log(card2.value > card3.value)
```

# API

## `Card`

### Properties

#### Static

##### `Name`

A dictionary for converting between values (numbers) and names (strings).

**Example:**

```js
console.log(Card.Name[2]) // "Two"
```

##### `Suit`

A dictionary for referencing suit names (strings). Includes the four typical suits (Club, Diamond, Heart, and Spade) as well as a "None" suit for Jokers. 

**Example:**

```js
console.log(Card.Suit.Spade) // "Spade"
```

##### `Symbol`

A dictionary for converting between suit names (strings) and suit symbols (strings). Includes the four typical suit symbols as well as a "∅" symbol corresponding to the "None" suit for Jokers.

**Example:**

```js
console.log(Card.Symbol.Spade) // "♠"
```

##### `Value`

A dictionary for converting between names (strings) and values (numbers). Is defined to be:

```js
{
  Joker: 0,
  Ace:   1,
  Two:   2,
  Three: 3,
  Four:  4,
  Five:  5,
  Six:   6,
  Seven: 7,
  Eight: 8,
  Nine:  9,
  Ten:   10,
  Jack:  11,
  Queen: 12,
  King:  13,
}
```

**Example:**

```js
console.log(Card.Value.Ace) // 1
```

#### Instance

##### `id` (read-only / getter)

A string containing the card's name and suit in the form:

```
`${name} of ${suit}s`
```

> **NOTE:** The `id` is the only time the suit name is pluralized (e.g. "Spades"). At all other times, the suit name is singular (e.g., "Spade").

**Example:**

```js
const card = new Card()
console.log(card.id) // "Ace of Spades"
```

##### `name` (read-only / getter)

A string representing the card's value as an English word.

**Example:**

```js
const card = new Card()
console.log(card.name) // "Ace"
```

##### `suit`

A string representing the card's suit name.

**Example:**

```js
const card = new Card()
console.log(card.suit) // "Spade"
```

##### `symbol` (read-only / getter)

A string representing the card's suit's symbol.

**Example:**

```js
const card = new Card()
console.log(card.symbol) // "♠"
```

##### `value`

A number representing the card's value.

**Example:**

```js
const card = new Card()
console.log(card.value) // 1
```

### Methods

#### Static

##### `static random(shouldIncludeJokers, randomFn)`

Returns a random card. Can optionally generate Jokers (though doesn't by default), and can optionally use a given random number generator function (though uses `Math.random` by default).

**Example:**

```js
import { isEqual, random, seed } from "@jrc03c/js-math-tools"

const card1 = Card.random()
const card2 = Card.random()
console.log(isEqual(card1, card2)) // false (probably)

seed(12345)
const card3 = Card.random(random)
seed(12345)
const card4 = Card.random(random)
console.log(isEqual(card3, card3)) // true
```

#### Instance

##### `copy`

Returns a new `Card` instance with the same suit and value as the original instance.

##### `toObject`

Returns a "plain" JS object containing the same properties as the instance.

**Example:**

```js
const card = new Card()
console.log(card.toObject())
// {
//   id: "Ace of Spades",
//   name: "Ace",
//   suit: "Spade",
//   symbol: "♠",
//   value: 1,
// }
```

## `Deck`

### Properties

### Methods