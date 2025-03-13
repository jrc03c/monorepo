// This script just installs the most up-to-date versions of my packages in each
// project in this repo. To use:
//
// cd packages/some-package
// node ../../update-package.mjs
//
// After this, you'll still need to run the usual build, test, and publish
// processes.

import { execSync } from "node:child_process"
import fs from "node:fs"

const data = JSON.parse(fs.readFileSync("package.json", "utf8"))

if (data.dependencies) {
  const deps = Object.keys(data.dependencies).filter(key => key.includes("@jrc03c"))
  const command = `npm install --save ${deps.map(d => d + "@latest").join(" ")}`
  console.log(command)
  execSync(command, { encoding: "utf8" })
}

if (data.devDependencies) {
  const deps = Object.keys(data.devDependencies).filter(key => key.includes("@jrc03c"))
  const command = `npm install --save-dev ${deps.map(d => d + "@latest").join(" ")}`
  console.log(command)
  execSync(command, { encoding: "utf8" })
}
