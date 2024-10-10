#!/usr/bin/env node
import { camelify } from "./camelify.mjs"
import { fg, fx } from "@jrc03c/bash-colors"
import { execSync } from "node:child_process"

const { bright } = fx
const { magenta, yellow } = fg

if (process.argv.length < 3) {
  console.log(`\n  The syntax is: ${bright(magenta("camelify <text>"))}\n`)
  process.exit(0)
}

const out = camelify(process.argv[2])
console.log(out)

try {
  execSync(`echo "${out}" | xsel -b`, { encoding: "utf8" })
} catch (e) {
  console.log(
    yellow(
      "NOTE: This tool can copy the resulting text to the clipboard automatically if you have `xsel` installed!",
    ),
  )
}
