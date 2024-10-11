import { AbstractPlotter } from "./abstract-plotter.mjs"
import { makeKey } from "@jrc03c/make-key"

class NodePlotter extends AbstractPlotter {
  constructor() {
    super()
    this.browserCommand = "xdg-open $FILE"
  }

  async show() {
    const { exec } = await import("node:child_process")
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
      path.join(cwd, "..", "src/public/index.html"),
      "utf8",
    )

    const minifiedScript = fs.readFileSync(
      path.join(cwd, "../dist/js-plot-tools.standalone.min.cjs"),
      "utf8",
    )

    let out = template
    const minifiedScriptPattern = `"<% minified-script %>"`
    const objPattern = `"<% obj %>"`

    if (out.includes(minifiedScriptPattern)) {
      out =
        out.substring(0, out.lastIndexOf(minifiedScriptPattern)) +
        minifiedScript +
        out.substring(
          out.lastIndexOf(minifiedScriptPattern) + minifiedScriptPattern.length,
        )
    }

    if (out.includes(objPattern)) {
      out =
        out.substring(0, out.lastIndexOf(objPattern)) +
        this.dehydrate() +
        out.substring(out.lastIndexOf(objPattern) + objPattern.length)
    }

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
