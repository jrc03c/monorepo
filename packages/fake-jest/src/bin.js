#!/usr/bin/env node
import getFilesDeepSync from "./get-files-deep-sync.js"

console.log(
  getFilesDeepSync("../js-math-tools/src").filter(f => f.endsWith(".test.js")),
)
