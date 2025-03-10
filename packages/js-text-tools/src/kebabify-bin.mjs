#!/usr/bin/env node
import { execSync } from "node:child_process"
import { fg, fx } from "@jrc03c/bash-colors"
import { kebabify } from "./kebabify.mjs"

const { bright } = fx
const { magenta, yellow } = fg

if (process.argv.length < 3) {
  console.log(`\n  The syntax is: ${bright(magenta("kebabify <text>"))}\n`)
  process.exit(0)
}

const out = kebabify(process.argv[2])
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
