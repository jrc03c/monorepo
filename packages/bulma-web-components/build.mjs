import { execSync } from "node:child_process"
import { watch } from "@jrc03c/watch"
import process from "node:process"

function rebuild() {
  console.log("\n-----\n")
  console.log(`Rebuilding... (${new Date().toLocaleString()})`)

  try {
    execSync(`npx esbuild src/main.mjs --bundle --outfile=dist/bundle.js`, {
      encoding: "utf8",
    })

    console.log("\nDone! 🎉\n")
  } catch (e) {
    console.error(e)
  }
}

if (process.argv.indexOf("-w") > -1 || process.argv.indexOf("--watch") > -1) {
  watch({
    target: "src",
    exclude: ["bundle.css", "bundle.js", "node_modules"],
    created: rebuild,
    modified: rebuild,
    deleted: rebuild,
  })
}

rebuild()
