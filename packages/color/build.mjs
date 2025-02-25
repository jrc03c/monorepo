import { execSync } from "node:child_process"

function rebuild() {
  console.log("-----")
  console.log(`\nRebuilding... (${new Date().toLocaleString()})`)

  try {
    execSync(`npx esbuild src/iife.mjs --bundle --outfile=dist/color.js`, {
      encoding: "utf8",
    })

    execSync(
      `npx esbuild src/iife.mjs --bundle --minify --outfile=dist/color.min.js`,
      {
        encoding: "utf8",
      },
    )

    console.log("\nDone! 🎉\n")
  } catch (e) {
    console.error(e)
  }
}

rebuild()
