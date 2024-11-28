import { execSync } from "node:child_process"
import { watch } from "@jrc03c/watch"
import process from "node:process"

function rebuild() {
  console.log("\n-----\n")
  console.log(`Rebuilding... (${new Date().toLocaleString()})`)

  try {
    const commands = [
      "mkdir -p dist",
      "rm -rf dist/*",
      "npx esbuild src/index.mjs --bundle --minify --outfile=dist/breakable-promise.standalone.cjs",
      "npx esbuild src/index.mjs --bundle --minify --platform=node --outfile=dist/breakable-promise.require.cjs",
      "npx esbuild src/index.mjs --bundle --format=esm --minify --outfile=dist/breakable-promise.import.mjs",
    ]

    commands.forEach(command => {
      execSync(command, { encoding: "utf8" })
    })

    console.log("\nDone! 🎉\n")
  } catch (e) {
    console.error(e)
  }
}

if (process.argv.indexOf("-w") > -1 || process.argv.indexOf("--watch") > -1) {
  watch({
    target: "src",
    exclude: ["dist", "node_modules"],
    created: rebuild,
    modified: rebuild,
    deleted: rebuild,
  })
}

rebuild()
