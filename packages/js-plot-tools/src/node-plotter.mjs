import { AbstractPlotter } from "./abstract-plotter.mjs"
import { exec } from "node:child_process"
import { makeKey } from "@jrc03c/make-key"

class NodePlotter extends AbstractPlotter {
  constructor() {
    super()
    this.browserCommand = "xdg-open $FILE"
  }

  async show() {
    const fs = await import("node:fs")
    const path = await import("node:path")
    let cwd

    if (typeof __dirname !== "undefined") {
      cwd = __dirname
    }

    if (typeof cwd === "undefined") {
      try {
        cwd = import.meta.dirname
      } catch (e) {}
    }

    let tempDir

    try {
      tempDir = path.join(cwd, "temp")

      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true })
      }

      fs.mkdirSync(tempDir)
    } catch (e) {}

    const template = fs.readFileSync(
      path.join(cwd, "public/index.html"),
      "utf8",
    )

    const minifiedScript = fs.readFileSync(
      path.join(cwd, "../dist/js-plot-tools.js"),
      "utf8",
    )

    const out = template
      .replace("<% minified-script %>", minifiedScript)
      .replace("<% obj %>", this.dehydrate())

    const key = makeKey(8)
    const outfile = path.join(tempDir, `${key}.html`)
    fs.writeFileSync(outfile, out, "utf8")

    exec(
      `${this.browserCommand.replace("$FILE", `"file://${outfile}"`)}`,
      (error, stdout, stderr) => {
        if (error) console.log(error)
        if (stderr.trim().length > 0) console.log(stderr)
        console.log(stdout)
      },
    )

    return this
  }
}

export { NodePlotter }
