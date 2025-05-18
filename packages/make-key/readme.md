# Intro

**make-key** generates alphanumeric strings of arbitrary length.

# Node / browser

## Installation

```bash
npm install --save https://github.com/jrc03c/make-key
```

## Usage

Node / bundlers:

```js
import { makeKey } from "@jrc03c/make-key"
console.log(makeKey(32))
// "33189046179171bfb492577f0fdca4ca"
```

Browser:

```html
<script src="path/to/@jrc03c/make-key/dist/make-key.min.js"></script>
<script>
  // (`makeKey` is available in the global scope)
  console.log(makeKey(32))
  // "8v1101x1whevcm1cgdhuq90e12549xri"
</script>
```

## API

### `makeKey(length, charset, randomFn)`

Returns a random string of length `length`. Can optionally accept:

- `charset` = a string (or an array of strings) defining the characters from which to generate the new string; uses `abcdef1234567890` by default
- `randomFn` = a random number generation function; uses `Math.random` by default

# CLI

## Installation

```bash
git clone https://github.com/jrc03c/make-key
cd make-key
npm link
```

Optionally, you can install `xsel` to have the key be copied automatically to the clipboard:

```bash
sudo apt-get install -y xsel
```

## Usage

```bash
key 32
# e1123ab8eff4082147cef3adc030769d

key 32 foobar
# aaoobrrforfbbfoofffooffroaoofaba
```

## API

### `key <length> <charset>`

These arguments mean the same thing as in the Node / browser API.
