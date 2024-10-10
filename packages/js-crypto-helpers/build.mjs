import { execSync } from "node:child_process"

function rebuild() {
  console.log("-----")
  console.log(`\nRebuilding... (${new Date().toLocaleString()})`)

  try {
    const baseCommand = "npx esbuild src/index.mjs --bundle"

    const commands = [
      "mkdir -p dist",
      "rm -rf dist/*",
      `${baseCommand} --platform=node --outfile=dist/js-crypto-helpers.require.cjs`,
      `${baseCommand} --platform=node --outfile=dist/js-crypto-helpers.require.min.cjs --minify`,
      `${baseCommand} --outfile=dist/js-crypto-helpers.standalone.cjs`,
      `${baseCommand} --outfile=dist/js-crypto-helpers.standalone.min.cjs --minify`,
      `${baseCommand} --format=esm --outfile=dist/js-crypto-helpers.import.mjs`,
      `${baseCommand} --format=esm --outfile=dist/js-crypto-helpers.import.min.mjs --minify`,
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
