#!/usr/bin/env node

import { Argument } from "./helpers/argument.mjs"
import { execSync } from "node:child_process"
import { fg, fx } from "@jrc03c/bash-colors"
import { randomString } from "./random-string.mjs"
import { safeWriteFileSync } from "./helpers/safe-write-file-sync.mjs"
import { showHelpText } from "./helpers/show-help-text.mjs"

const { bright, dim } = fx
const { magenta, yellow } = fg

const charsetArg = new Argument("c", "charset", true)
const helpArg = new Argument("h", "help", false)
const lengthArg = new Argument("l", "length", true)
const outfileArg = new Argument("o", "outfile", true)

if (helpArg.getValue()) {
  showHelpText(`
    Syntax:

      ${bright(magenta("random-string [options]"))}

    Options:

      ${yellow("--help, -h")} = show this help text again

      ${yellow(
        "--outfile, -o",
      )} = (optional) an output file to which to write the randomStringed data; if not provided, then the randomStringed data is just printed to stdout

      ${yellow(
        "--charset, -c",
      )} = (optional) a character set from which to construct the random string

      ${yellow(
        "--length, -l",
      )} = (optional) the length of the generated string; the default is 256

    Examples:

      ${dim("# generate a random string that is 256 characters in length")}
      random-string

      ${dim("# generate a random string that is 8 characters in length")}
      random-string -l 8

      ${dim("# generate a random string and save it to a file")}
      random-string --outfile=path/to/myfile.txt
  `)

  process.exit()
}

!(async () => {
  const outfile = outfileArg.getValue()
  const length = lengthArg.getValue()
  const charset = charsetArg.getValue()

  const out = randomString(length, charset)

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
