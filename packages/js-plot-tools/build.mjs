import { execSync } from "node:child_process"

function rebuild() {
  console.log("-----")
  console.log(`\nRebuilding... (${new Date().toLocaleString()})`)

  try {
    const baseCommand = "npx esbuild src/index.mjs --bundle"

    const commands = [
      "mkdir -p dist",
      "rm -rf dist/*",
      `${baseCommand} --external:fs,path --platform=node --outfile=dist/js-plot-tools.require.cjs`,
      `${baseCommand} --external:fs,path --platform=node --outfile=dist/js-plot-tools.require.min.cjs --minify`,
      `${baseCommand} --external:fs,path --platform=node --outfile=dist/js-plot-tools.standalone.cjs`,
      `${baseCommand} --external:fs,path --platform=node --outfile=dist/js-plot-tools.standalone.min.cjs --minify`,
      `${baseCommand} --external:fs,path --platform=node --format=esm --outfile=dist/js-plot-tools.import.mjs`,
      `${baseCommand} --external:fs,path --platform=node --format=esm --outfile=dist/js-plot-tools.import.min.mjs --minify`,
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
