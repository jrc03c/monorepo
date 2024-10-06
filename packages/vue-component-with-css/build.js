const { execSync } = require("child_process")
const process = require("process")
const watch = require("@jrc03c/watch")

function build() {
  try {
    console.log("\n==========\n")
    console.log(`Building... (${new Date().toLocaleString()})`)

    execSync(
      `npx esbuild src/index.js --bundle --outfile=dist/vue-component-with-css.js --minify`,
      { encoding: "utf8" }
    )

    execSync(
      `npx esbuild src/index.js --bundle --outfile=demo/vue-component-with-css.js --minify`,
      { encoding: "utf8" }
    )

    console.log("\nBuilt! 🎉\n")
  } catch (e) {
    console.log(e)
  }
}

if (process.argv.indexOf("--watch") > -1) {
  watch({
    target: "src",
    created: build,
    modified: build,
    deleted: build,
  })
}

build()
