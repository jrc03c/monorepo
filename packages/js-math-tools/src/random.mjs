import { assert } from "./assert.mjs"
import { copy } from "./copy.mjs"
import { isArray } from "./is-array.mjs"
import { isNumber } from "./is-number.mjs"
import { isUndefined } from "./is-undefined.mjs"
import { map } from "./map.mjs"
import { ndarray } from "./ndarray.mjs"
import { product } from "./product.mjs"
import { reshape } from "./reshape.mjs"

// This is an implementation of the xoshiro256++ algorithm:
// https://prng.di.unimi.it/xoshiro256plusplus.c
// It also includes the splitmix64 function for seeding from:
// https://rosettacode.org/wiki/Pseudo-random_numbers/Splitmix64

const MAX = Math.pow(2, 64)
const s = []
seed(Math.floor(Math.random() * MAX))

function splitmix64(state, n) {
  state = uint(state)

  function helper() {
    state += uint("0x9e3779b97f4a7c15")
    let z = copy(state)
    z = (z ^ (z >> BigInt(30))) * uint("0xbf58476d1ce4e5b9")
    z = (z ^ (z >> BigInt(27))) * uint("0x94d049bb133111eb")
    return z ^ (z >> BigInt(31))
  }

  const out = []
  for (let i = 0; i < n; i++) out.push(helper())
  return out
}

function uint(x) {
  return BigInt.asUintN(64, BigInt(x))
}

function rotl(x, k) {
  x = uint(x)
  k = BigInt(k)
  return uint(uint(x << k) | uint(x >> uint(BigInt(64) - k)))
}

export function seed(val) {
  if (typeof val === "bigint") {
    val = Number(val)
  }

  if (!isUndefined(val)) {
    assert(
      isNumber(val),
      "If passing a value into the `seed` function, then that value must be an integer!",
    )

    const temp = splitmix64(Math.floor(val), 4)
    s[0] = temp[0]
    s[1] = temp[1]
    s[2] = temp[2]
    s[3] = temp[3]
  } else {
    return copy(s)
  }
}

function next() {
  const result = uint(rotl(s[0] + s[3], 23) + s[0])
  const t = uint(s[1] << BigInt(17))
  s[2] = uint(s[2] ^ s[0])
  s[3] = uint(s[3] ^ s[1])
  s[1] = uint(s[1] ^ s[2])
  s[0] = uint(s[0] ^ s[3])
  s[2] = uint(s[2] ^ t)
  s[3] = rotl(s[3], 45)
  return Math.floor(Number(result)) / MAX
}

export function random(shape) {
  if (isUndefined(shape)) return next()
  if (!isArray(shape)) shape = [shape]
  return reshape(map(ndarray(product(shape)), next), shape)
}

// export { { random, seed } }
