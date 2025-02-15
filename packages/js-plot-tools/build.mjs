import { execSync } from "node:child_process"

function rebuild() {
  console.log("-----")
  console.log(`\nRebuilding... (${new Date().toLocaleString()})`)

  try {
    const baseCommand = "npx esbuild src/index.mjs --bundle"

    const commands = [
      "mkdir -p dist",
      "rm -rf dist/*",
      `${baseCommand} --platform=node --outfile=dist/js-plot-tools.require.cjs`,
      `${baseCommand} --platform=node --outfile=dist/js-plot-tools.require.min.cjs --minify`,
      `${baseCommand} --external:node:fs --external:node:path --external:node:child_process --outfile=dist/js-plot-tools.standalone.js`,
      `${baseCommand} --external:node:fs --external:node:path --external:node:child_process --outfile=dist/js-plot-tools.standalone.min.js --minify`,
      `${baseCommand} --external:node:fs --external:node:path --external:node:child_process --format=esm --outfile=dist/js-plot-tools.import.mjs`,
      `${baseCommand} --external:node:fs --external:node:path --external:node:child_process --format=esm --outfile=dist/js-plot-tools.import.min.mjs --minify`,
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
