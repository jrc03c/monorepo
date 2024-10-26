import { execSync } from "node:child_process"
import { watch } from "@jrc03c/watch"
import process from "node:process"

function rebuild() {
  console.log("-----")
  console.log(`\nRebuilding... (${new Date().toLocaleString()})`)

  try {
    const baseCommand = "npx esbuild src/index.mjs --bundle"

    const commands = [
      "mkdir -p dist",
      "rm -rf dist/*",
      `${baseCommand} --platform=node --outfile=dist/misc-web-components.require.cjs`,
      `${baseCommand} --platform=node --outfile=dist/misc-web-components.require.min.cjs --minify`,
      `${baseCommand} --outfile=dist/misc-web-components.standalone.cjs`,
      `${baseCommand} --outfile=dist/misc-web-components.standalone.min.cjs --minify`,
      `${baseCommand} --format=esm --outfile=dist/misc-web-components.import.mjs`,
      `${baseCommand} --format=esm --outfile=dist/misc-web-components.import.min.mjs --minify`,
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
