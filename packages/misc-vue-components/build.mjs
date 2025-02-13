import { execSync } from "node:child_process"

function rebuild() {
  console.log("-----")
  console.log(`\nRebuilding... (${new Date().toLocaleString()})`)

  try {
    const baseCommand = "npx esbuild src/index.mjs --bundle"

    const commands = [
      "mkdir -p dist",
      "rm -rf dist/*",
      `${baseCommand} --platform=node --outfile=dist/misc-vue-components.require.cjs`,
      `${baseCommand} --platform=node --outfile=dist/misc-vue-components.require.min.cjs --minify`,
      `${baseCommand} --outfile=dist/misc-vue-components.standalone.js`,
      `${baseCommand} --outfile=dist/misc-vue-components.standalone.min.js --minify`,
      `${baseCommand} --format=esm --outfile=dist/misc-vue-components.import.mjs`,
      `${baseCommand} --format=esm --outfile=dist/misc-vue-components.import.min.mjs --minify`,
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
