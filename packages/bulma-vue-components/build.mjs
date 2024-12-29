import { execSync } from "node:child_process"
import { watch } from "@jrc03c/watch"
import process from "node:process"

async function rebuild() {
  console.log("\n-----\n")
  console.log(`Rebuilding... (${new Date().toLocaleString()})`)

  try {
    const esbuildCommand = "npx esbuild res/js/src/lib/index.mjs --bundle"

    const commands = [
      "mkdir -p dist",
      "rm -rf dist/*",
      `${esbuildCommand} --platform=node --outfile=dist/bulma-vue-components.require.cjs`,
      `${esbuildCommand} --platform=node --outfile=dist/bulma-vue-components.require.min.cjs --minify`,
      `${esbuildCommand} --outfile=dist/bulma-vue-components.standalone.cjs`,
      `${esbuildCommand} --outfile=dist/bulma-vue-components.standalone.min.cjs --minify`,
      `${esbuildCommand} --format=esm --outfile=dist/bulma-vue-components.import.mjs`,
      `${esbuildCommand} --format=esm --outfile=dist/bulma-vue-components.import.min.mjs --minify`,
      `npx esbuild res/js/src/main.mjs --bundle --outfile=res/js/bundle.js`,
    ]

    for (const command of commands) {
      if (typeof command === "function") {
        await command()
      } else {
        execSync(command, { encoding: "utf8" })
      }
    }

    console.log("\nDone! 🎉\n")
  } catch (e) {
    console.error(e)
  }
}

if (process.argv.indexOf("-w") > -1 || process.argv.indexOf("--watch") > -1) {
  watch({
    target: ".",
    exclude: ["build.mjs", "bundle.css", "bundle.js", "dist", "node_modules"],
    created: rebuild,
    modified: rebuild,
    deleted: rebuild,
  })
}

rebuild()
