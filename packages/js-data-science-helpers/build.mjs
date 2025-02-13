import { execSync } from "node:child_process"

function rebuild() {
  console.log("-----")
  console.log(`\nRebuilding... (${new Date().toLocaleString()})`)

  try {
    const baseCommand = "npx esbuild src/index.mjs --bundle"

    const commands = [
      "mkdir -p dist",
      "rm -rf dist/*",
      `${baseCommand} --platform=node --outfile=dist/js-data-science-helpers.require.cjs`,
      `${baseCommand} --platform=node --outfile=dist/js-data-science-helpers.require.min.cjs --minify`,
      `${baseCommand} --outfile=dist/js-data-science-helpers.standalone.js`,
      `${baseCommand} --outfile=dist/js-data-science-helpers.standalone.min.js --minify`,
      `${baseCommand} --format=esm --outfile=dist/js-data-science-helpers.import.mjs`,
      `${baseCommand} --format=esm --outfile=dist/js-data-science-helpers.import.min.mjs --minify`,
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
