#!/usr/bin/env node
import { exec } from "node:child_process"
import { makeKey } from "./index.mjs"

const args = process.argv.slice(2)

if (args.length === 0) {
  console.log("SYNTAX: key <length> <charset>")
  process.exit(0)
}

const keyLength = parseInt(args[0])
const charset = args[1]
const key = makeKey(keyLength, charset)
console.log(key)

try {
  exec(`echo -n "${key}" | xsel -b`, () => {})
} catch (e) {}
