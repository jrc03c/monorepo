#!/usr/bin/env node
import { fg, fx } from "@jrc03c/bash-colors"
import { indent } from "./indent.mjs"
import { unindent } from "./unindent.mjs"
import { wrap } from "./wrap.mjs"
import fs from "node:fs"
import path from "node:path"

const { bright } = fx
const { cyan, magenta } = fg

const helpMessage = wrap(
  indent(
    unindent(`
      The syntax is:

        ${bright(magenta("indent <file> <chars>"))}

      Example:

        ${cyan('indent somefile.txt " >> "')}

      Use \`indent --help\` to show this message again.
    `),
    "  ",
  ),
)

try {
  if (process.argv.length <= 3) {
    console.log(helpMessage)
    process.exit()
  }

  if (process.argv.indexOf("--help") > -1) {
    console.log(helpMessage)
    process.exit()
  }

  const file = path.resolve(process.argv[2])
  const raw = fs.readFileSync(file, "utf8")
  const chars = process.argv[3]
  const out = indent(raw, chars)
  console.log(out)
} catch (e) {
  console.log(e)
  console.log("============================")
  console.log(helpMessage)
}