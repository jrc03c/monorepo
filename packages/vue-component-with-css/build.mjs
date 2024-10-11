import { execSync } from "node:child_process"

function rebuild() {
  console.log("-----")
  console.log(`\nRebuilding... (${new Date().toLocaleString()})`)

  try {
    const baseCommand = "npx esbuild src/index.mjs --bundle"

    const commands = [
      "mkdir -p dist",
      "rm -rf dist/*",
      `${baseCommand} --platform=node --outfile=dist/vue-component-with-css.require.cjs`,
      `${baseCommand} --platform=node --outfile=dist/vue-component-with-css.require.min.cjs --minify`,
      `${baseCommand} --outfile=dist/vue-component-with-css.standalone.cjs`,
      `${baseCommand} --outfile=dist/vue-component-with-css.standalone.min.cjs --minify`,
      `${baseCommand} --format=esm --outfile=dist/vue-component-with-css.import.mjs`,
      `${baseCommand} --format=esm --outfile=dist/vue-component-with-css.import.min.mjs --minify`,
    ]

    commands.forEach(command => {
      execSync(command, { encoding: "utf8" })
    })

    console.log("\nDone! 🎉\n")
  } catch (e) {
    console.error(e)
  }
}

rebuild()
