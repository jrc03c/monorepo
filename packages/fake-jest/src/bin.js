#!/usr/bin/env node
import { execSync } from "node:child_process"
import colors from "@jrc03c/bash-colors"
import fs from "node:fs"
import getFilesDeepSync from "./get-files-deep-sync.js"
import process from "node:process"

function multiplyString(s, n) {
  let out = ""
  for (let i = 0; i < n; i++) out += s
  return out
}

!(async () => {
  const files = (() => {
    if (process.argv.length > 2) {
      return Array.from(process.argv)
        .slice(2)
        .filter(f => !f.includes("node_modules") && f.endsWith(".test.js"))
    } else {
      return getFilesDeepSync(".").filter(
        f => !f.includes("node_modules") && f.endsWith(".test.js"),
      )
    }
  })()

  const lib = import.meta.filename.replace("bin.js", "index.js")
  const libRaw = fs.readFileSync(lib, "utf8")

  for (const file of files) {
    const fileRaw = fs.readFileSync(file, "utf8")
    const newFile = file.split(".").slice(0, -1).join(".") + ".foo.js"
    const newFileRaw = libRaw.replace("// {{ content }}", fileRaw)
    fs.writeFileSync(newFile, newFileRaw, "utf8")

    try {
      const width = Math.min(process.stdout.columns, 80)
      console.log(multiplyString("=", width))
      console.log(colors.fx.bright(file))
      console.log(multiplyString("=", width))
      console.log(execSync(`node "${newFile}"`, { encoding: "utf8" }).trim())
    } catch (e) {
      console.error(e)
    }

    fs.unlinkSync(newFile)
  }
})()
