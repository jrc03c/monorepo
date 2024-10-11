import { execSync } from "node:child_process"

function rebuild() {
  console.log("-----")
  console.log(`\nRebuilding... (${new Date().toLocaleString()})`)

  try {
    const baseCommand = "npx esbuild src/index.mjs --bundle"

    const commands = [
      "mkdir -p dist",
      "rm -rf dist/*",
      `${baseCommand} --platform=node --outfile=dist/js-nlp-tools.require.cjs`,
      `${baseCommand} --platform=node --outfile=dist/js-nlp-tools.require.min.cjs --minify`,
      `${baseCommand} --external:node:fs --external:node:path --outfile=dist/js-nlp-tools.standalone.cjs`,
      `${baseCommand} --external:node:fs --external:node:path --outfile=dist/js-nlp-tools.standalone.min.cjs --minify`,
      `${baseCommand} --external:node:fs --external:node:path --format=esm --outfile=dist/js-nlp-tools.import.mjs`,
      `${baseCommand} --external:node:fs --external:node:path --format=esm --outfile=dist/js-nlp-tools.import.min.mjs --minify`,
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
