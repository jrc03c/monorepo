#!/usr/bin/env node
import { exec } from "node:child_process"
import { makeKey } from "./src/index.mjs"

const args = process.argv.slice(2)

if (args.length === 0) {
  console.log("You must specify a key length.")
  process.exit(0)
}

const keyLength = parseInt(args[0])
let keySeed, charset

if (args.length === 2) {
  if (!isNaN(parseInt(args[1]))) {
    keySeed = parseInt(args[1])
  } else {
    charset = args[1]
  }
} else if (args.length > 2) {
  keySeed = parseInt(args[1])
  charset = args[2]
}

const key = makeKey(keyLength, keySeed, charset)
console.log(key)

try {
  exec(`echo -n "${key}" | xsel -b`, () => {})
} catch (e) {}
