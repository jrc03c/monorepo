import { execSync } from "node:child_process"
import { watch } from "@jrc03c/watch"

function rebuild() {
  console.log("-----")
  console.log(`\nRebuilding... (${new Date().toLocaleString()})`)

  try {
    execSync(`npx esbuild src/iife.mjs --bundle --outfile=dist/bee.js`, {
      encoding: "utf8",
    })

    execSync(
      `npx esbuild src/iife.mjs --bundle --minify --outfile=dist/bee.min.js`,
      { encoding: "utf8" },
    )

    execSync(`npx esbuild tests/main.mjs --bundle --outfile=tests/bundle.js`, {
      encoding: "utf8",
    })

    execSync(
      `npx esbuild tests/worker.js --bundle --outfile=tests/worker-bundle.js`,
      { encoding: "utf8" },
    )

    execSync(
      `npx esbuild tests/worker2.js --bundle --outfile=tests/worker2-bundle.js`,
      { encoding: "utf8" },
    )

    execSync(
      `npx esbuild tests/worker3.js --bundle --outfile=tests/worker3-bundle.js`,
      { encoding: "utf8" },
    )

    console.log("\nDone! 🎉\n")
  } catch (e) {
    console.error(e)
  }
}

if (process.argv.indexOf("-w") > -1 || process.argv.indexOf("--watch") > -1) {
  watch({
    target: "src",
    exclude: ["dist", "node_modules"],
    created: rebuild,
    modified: rebuild,
    deleted: rebuild,
  })
}

rebuild()
