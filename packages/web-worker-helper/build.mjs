import { execSync } from "node:child_process"
import { watch } from "@jrc03c/watch"

function rebuild() {
  console.log("-----")
  console.log(`\nRebuilding... (${new Date().toLocaleString()})`)

  try {
    execSync(
      `npx esbuild src/iife.mjs --bundle --outfile=dist/web-worker-helper.js`,
      { encoding: "utf8" },
    )

    execSync(
      `npx esbuild src/iife.mjs --bundle --minify --outfile=dist/web-worker-helper.min.js`,
      { encoding: "utf8" },
    )

    execSync(
      `npx esbuild demo/main.mjs --bundle --outfile=demo/bundle.js`,
      { encoding: "utf8" },
    )

    execSync(
      `npx esbuild demo/worker.mjs --bundle --outfile=demo/worker-bundle.js`,
      { encoding: "utf8" },
    )

    execSync(
      `npx esbuild tests/main.mjs --bundle --outfile=tests/bundle.js`,
      { encoding: "utf8" },
    )

    execSync(
      `npx esbuild tests/worker.mjs --bundle --outfile=tests/worker-bundle.js`,
      { encoding: "utf8" },
    )

    console.log("\nDone! 🎉\n")
  } catch (e) {
    console.error(e)
  }
}

if (process.argv.includes("--watch") || process.argv.includes("-w")) {
  watch({
    target: "src",
    exclude: ["dist", "node_modules"],
    created: rebuild,
    modified: rebuild,
    deleted: rebuild,
  })
}

rebuild()
