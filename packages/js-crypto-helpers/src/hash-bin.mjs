#!/usr/bin/env node

import { Argument } from "./helpers/argument.mjs"
import { execSync } from "node:child_process"
import { fg, fx } from "@jrc03c/bash-colors"
import { hash } from "./hash.mjs"
import { safeWriteFileSync } from "./helpers/safe-write-file-sync.mjs"
import { showHelpText } from "./helpers/show-help-text.mjs"
import fs from "node:fs"

const { bright, dim } = fx
const { magenta, yellow } = fg

const helpArg = new Argument("h", "help", false)
const outfileArg = new Argument("o", "outfile", true)
const saltArg = new Argument("s", "salt", true)

if (process.argv.length < 3 || helpArg.getValue()) {
  showHelpText(`
    Syntax:

      ${bright(magenta("hash [options] [item]"))}

    Options:

      ${yellow("--help, -h")} = show this help text again

      ${yellow(
        "--outfile, -o",
      )} = (optional) an output file to which to write the hashed data; if not provided, then the hashed data is just printed to stdout

      ${yellow(
        "--salt, -s",
      )} = (optional) a salt string to be appended to the item before hashing

      ${yellow("[item]")} = a file or some text

    Examples:

      ${dim("# hash the contents of a file")}
      hash path/to/myfile.txt

      ${dim("# hash some text")}
      hash "Hello, world!"
  `)

  process.exit()
}

!(async () => {
  const outfile = outfileArg.getValue()
  const salt = saltArg.getValue()

  const item = (() => {
    const item = process.argv.at(-1)

    if (fs.existsSync(item) && fs.statfsSync(item).isFile()) {
      return fs.readFileSync(item, "utf8")
    } else {
      return process.argv.at(-1)
    }
  })()

  const out = await hash(item + salt)

  if (outfile) {
    safeWriteFileSync(outfile, out, "utf8")
  } else {
    console.log(out)

    try {
      execSync(`echo "${out}" | xsel -b`, { encoding: "utf8" })
    } catch (e) {
      // ...
    }
  }
})()
