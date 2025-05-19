import { execSync } from "node:child_process"
import { watch } from "@jrc03c/watch"
import process from "node:process"

function rebuild() {
  console.log("\n-----\n")
  console.log(`Rebuilding... (${new Date().toLocaleString()})`)

  try {
    execSync(
      `npx esbuild src/iife.mjs --bundle --outfile=dist/web-game-framework.js`,
      { encoding: "utf8" },
    )

    execSync(
      `npx esbuild src/iife.mjs --bundle --minify --outfile=dist/web-game-framework.min.js`,
      { encoding: "utf8" },
    )

    execSync(
      `npx esbuild demo/src/main.mjs --bundle --outfile=demo/bundle.js`,
      { encoding: "utf8" },
    )

    console.log("\nDone! 🎉\n")
  } catch (e) {
    console.error(e)
  }
}

if (process.argv.indexOf("-w") > -1 || process.argv.indexOf("--watch") > -1) {
  watch({
    target: ".",
    include: ["demo/src", "src"],
    created: rebuild,
    modified: rebuild,
    deleted: rebuild,
  })
}

rebuild()
