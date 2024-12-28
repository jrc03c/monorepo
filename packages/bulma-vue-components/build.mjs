import { execSync } from "node:child_process"
import { watch } from "@jrc03c/watch"
import * as fsx from "@jrc03c/fs-extras"
import fs from "node:fs"
import process from "node:process"

async function rebuild() {
  console.log("\n-----\n")
  console.log(`Rebuilding... (${new Date().toLocaleString()})`)

  try {
    const esbuildCommand = "npx esbuild src/index.mjs --bundle"

    const commands = [
      "mkdir -p dist",
      "rm -rf dist/*",
      `${esbuildCommand} --platform=node --outfile=dist/bulma-vue-components.require.cjs`,
      `${esbuildCommand} --platform=node --outfile=dist/bulma-vue-components.require.min.cjs --minify`,
      `${esbuildCommand} --outfile=dist/bulma-vue-components.standalone.cjs`,
      `${esbuildCommand} --outfile=dist/bulma-vue-components.standalone.min.cjs --minify`,
      `${esbuildCommand} --format=esm --outfile=dist/bulma-vue-components.import.mjs`,
      `${esbuildCommand} --format=esm --outfile=dist/bulma-vue-components.import.min.mjs --minify`,
      `rm -rf demo/bundle*`,
      `npx esbuild demo/res/js/src/main.mjs --bundle --outfile=demo/res/js/bundle.js`,
      async () => {
        const docs = (await fsx.findAsync("src", f => f.endsWith(".html")))
          .toSorted()
          .map(f => `<article>${fs.readFileSync(f, "utf8")}</article>`)

        const template = fs.readFileSync("demo/index-template.html", "utf8")
        const out = template.replace("{{ content }}", docs.join("\n\n"))
        fs.writeFileSync("demo/index.html", out, "utf8")
      },
    ]

    for (const command of commands) {
      if (typeof command === "function") {
        await command()
      } else {
        execSync(command, { encoding: "utf8" })
      }
    }

    console.log("\nDone! 🎉\n")
  } catch (e) {
    console.error(e)
  }
}

if (process.argv.indexOf("-w") > -1 || process.argv.indexOf("--watch") > -1) {
  watch({
    target: ".",
    exclude: ["build.mjs", "bundle.css", "bundle.js", "dist", "node_modules"],
    created: rebuild,
    modified: rebuild,
    deleted: rebuild,
  })
}

rebuild()
