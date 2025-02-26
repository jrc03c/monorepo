import { execSync } from "node:child_process"
import { watch } from "@jrc03c/watch"
import process from "node:process"

function rebuild() {
  console.log("-----")
  console.log(`\nRebuilding... (${new Date().toLocaleString()})`)

  try {
    execSync(
      `npx esbuild src/iife.mjs --bundle --outfile=dist/base-web-component.js`,
      { encoding: "utf8" },
    )

    execSync(
      `npx esbuild src/iife.mjs --bundle --minify --outfile=dist/base-web-component.min.js`,
      { encoding: "utf8" },
    )

    console.log("\nDone! 🎉\n")
  } catch (e) {
    console.error(e)
  }
}

if (process.argv.includes("--watch") || process.argv.includes("-w")) {
  watch({
    target: "src",
    exclude: ["dist", "node_modules"],
    created: rebuild,
    modified: rebuild,
    deleted: rebuild,
  })
}

rebuild()
