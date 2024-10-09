import { execSync } from "node:child_process"

function rebuild() {
  console.log("-----")
  console.log(`\nRebuilding... (${new Date().toLocaleString()})`)

  try {
    const baseCommand = "npx esbuild src/index.mjs --bundle"

    const commands = [
      `${baseCommand} --platform=node --outfile=dist/custom-scroller.require.cjs`,
      `${baseCommand} --outfile=dist/custom-scroller.standalone.cjs`,
      `${baseCommand} --format=esm --outfile=dist/custom-scroller.import.mjs`,
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
