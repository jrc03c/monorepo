import { execSync } from "node:child_process"
import { watch } from "@jrc03c/watch"

function rebuild() {
  console.log("-----")
  console.log(`\nRebuilding... (${new Date().toLocaleString()})`)

  try {
    const commands = [
      "mkdir -p dist",
      "rm -rf dist/*",
      `npx esbuild src/index.mjs --bundle --platform=node --outfile=dist/web-worker-helper.require.cjs`,
      `npx esbuild src/index.mjs --bundle --outfile=dist/web-worker-helper.standalone.js`,
      `npx esbuild src/index.mjs --bundle --format=esm --outfile=dist/web-worker-helper.import.mjs`,
    ]

    commands.forEach(command => {
      execSync(command, { encoding: "utf8" })
    })

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
