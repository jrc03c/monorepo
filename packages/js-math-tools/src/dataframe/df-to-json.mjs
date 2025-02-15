import { dfToJSONString } from "./df-to-json-string.mjs"
import { MathError } from "../math-error.mjs"

async function dfToJSON(df, filename, axis) {
  const out = dfToJSONString(df, axis)
  let downloadedInBrowser = false
  let wroteToDiskInNode = false
  let browserError, nodeError

  // browser
  try {
    let newFilename = filename

    if (filename.includes("/")) {
      const parts = filename.split("/")
      newFilename = parts[parts.length - 1]
    }

    const a = document.createElement("a")
    a.href = `data:application/json;charset=utf-8,${encodeURIComponent(out)}`
    a.download = newFilename
    a.dispatchEvent(new MouseEvent("click"))

    downloadedInBrowser = true
  } catch (e) {
    browserError = e
  }

  // node
  try {
    const fs = await import("node:fs")
    const path = await import("node:path")
    fs.writeFileSync(path.resolve(filename), out, "utf8")
    wroteToDiskInNode = true
  } catch (e) {
    nodeError = e
  }

  if (!downloadedInBrowser && !wroteToDiskInNode) {
    if (typeof window !== "undefined") {
      throw new MathError(browserError)
    } else if (typeof module !== "undefined") {
      throw new MathError(nodeError)
    } else {
      throw new MathError(
        "I don't know what's going wrong, but it doesn't seem like you're in Node or the browser, and we couldn't download and/or write the file to disk!",
      )
    }
  }

  return df
}

export { dfToJSON }
