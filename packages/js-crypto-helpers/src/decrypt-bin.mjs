#!/usr/bin/env node

import { Argument } from "./helpers/argument.mjs"
import { decrypt } from "./decrypt.mjs"
import { execSync } from "node:child_process"
import { fg, fx } from "@jrc03c/bash-colors"
import { parse } from "@jrc03c/js-text-tools"
import { prompt } from "@jrc03c/prompt"
import { safeWriteFileSync } from "./helpers/safe-write-file-sync.mjs"
import { showHelpText } from "./helpers/show-help-text.mjs"
import fs from "node:fs"

const { bright, dim } = fx
const { magenta, yellow } = fg

const helpArg = new Argument("h", "help", false)
const outfileArg = new Argument("o", "outfile", true)
const passwordArg = new Argument("p", "password", true)

const helpText = `
  Syntax:

    ${bright(magenta("decrypt [options] [item]"))}

  Options:

    ${yellow("--help, -h")} = show this help text again

    ${yellow(
      "--outfile, -o",
    )} = (optional) an output file to which to write the decrypted data; if not provided, then the decrypted data is just printed to stdout

    ${yellow(
      "--password, -p",
    )} = (optional) the password with which to decrypt the item; if not used, then the user will be prompted to input a password (hidden with asterisks)

    ${yellow("[item]")} = a file or some text

  Examples:

    ${dim("# decrypt the contents of a file")}
    decrypt path/to/myfile.txt

    ${dim(
      "# decrypt the contents of a file and save the result into another file",
    )}
    decrypt -o path/to/decrypted.txt path/to/myfile.txt

    ${dim("# decrypt some text with a given password")}
    decrypt -p "p455w0rd!" "Hello, world!"
    decrypt --password="p455w0rd!" "Hello, world!"

    ${dim("# decrypt some text and save the result into a file")}
    decrypt --outfile=path/to/decrypted.txt "Hello, world!"
  `

!(async () => {
  if (process.argv.length < 3 || helpArg.getValue()) {
    return showHelpText(helpText)
  }

  const outfile = outfileArg.getValue()
  const password = passwordArg.getValue() || (await prompt("Password:", true))

  let item = (() => {
    const item = process.argv.at(-1)

    if (fs.existsSync(item) && fs.statSync(item).isFile()) {
      return fs.readFileSync(item, "utf8")
    } else {
      return process.argv.at(-1)
    }
  })()

  try {
    item = parse(item)
  } catch (e) {
    // ...
  }

  const out = await decrypt(item, password)

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
