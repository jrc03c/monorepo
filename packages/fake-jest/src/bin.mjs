#!/usr/bin/env node
import { execSync } from "node:child_process"
import { fx } from "@jrc03c/bash-colors"
import fs from "node:fs"
import getFilesDeepSync from "./get-files-deep-sync.mjs"
import process from "node:process"

const TEST_FILE_PATTERN = /\.test\.[cm]?js$/

const isATestFile =
  f => !f.includes("node_modules") && f.match(TEST_FILE_PATTERN)

!(async () => {
  const files = (() => {
    if (process.argv.length > 2) {
      const args = Array.from(process.argv).slice(2)
      const out = []

      for (const arg of args) {
        const stat = fs.statSync(arg)

        if (stat.isDirectory()) {
          out.push(...getFilesDeepSync(arg).filter(isATestFile))
        } else if (isATestFile(arg)) {
          out.push(arg)
        }
      }

      return out
    } else {
      return getFilesDeepSync(".").filter(
        f => !f.includes("node_modules") && f.match(TEST_FILE_PATTERN),
      )
    }
  })()

  for (const file of files) {
    try {
      const width = Math.min(process.stdout.columns, 80)
      console.log(("=").repeat(width))
      console.log(fx.bright(file))
      console.log(("=").repeat(width))
      console.log(execSync(`node "${file}"`, { encoding: "utf8" }).trim())
    } catch (e) {
      console.error(e)
    }
  }
})()
