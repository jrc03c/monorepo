import { execSync } from "node:child_process"
import { watch } from "@jrc03c/watch"
import process from "node:process"

function rebuild() {
  console.log("-----")
  console.log(`\nRebuilding... (${new Date().toLocaleString()})`)

  try {
    execSync(
      `npx esbuild src/iife.mjs --bundle --outfile=dist/custom-scroller.js`,
      { encoding: "utf8" }
    )

    execSync(
      `npx esbuild src/iife.mjs --bundle --minify --outfile=dist/custom-scroller.min.js`,
      { encoding: "utf8" }
    )

    console.log("\nDone! 🎉\n")
  } catch (e) {
    console.error(e)
  }
}

if (process.argv.includes("-w") || process.argv.includes("--watch")) {
  watch({
    target: "src",
    created: rebuild,
    modified: rebuild,
    deleted: rebuild,
  })
}

rebuild()
