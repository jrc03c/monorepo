#!/usr/bin/env node
import { execSync } from "node:child_process"
import { fx } from "@jrc03c/bash-colors"
import fs from "node:fs"
import getFilesDeepSync from "./get-files-deep-sync.mjs"
import process from "node:process"

!(async () => {
  const files = (() => {
    if (process.argv.length > 2) {
      return Array.from(process.argv)
        .slice(2)
        .filter(f => !f.includes("node_modules") && f.match(/\.test\.[cm]?js$/))
    } else {
      return getFilesDeepSync(".").filter(
        f => !f.includes("node_modules") && f.match(/\.test\.[cm]?js$/),
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
