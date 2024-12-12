import { execSync } from "node:child_process"
import { watch } from "@jrc03c/watch"

function rebuild() {
  console.log("-----")
  console.log(`\nRebuilding... (${new Date().toLocaleString()})`)

  try {
    const baseCommand = "npx esbuild src/index.mjs --bundle"

    const commands = [
      "mkdir -p dist",
      "rm -rf dist/*",
      `${baseCommand} --platform=node --outfile=dist/bee.require.cjs`,
      `${baseCommand} --platform=node --outfile=dist/bee.require.min.cjs --minify`,
      `${baseCommand} --outfile=dist/bee.standalone.js`,
      `${baseCommand} --outfile=dist/bee.standalone.min.js --minify`,
      `${baseCommand} --format=esm --outfile=dist/bee.import.mjs`,
      `${baseCommand} --format=esm --outfile=dist/bee.import.min.mjs --minify`,
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
