import { parse } from "./parse.mjs"
import fs from "node:fs/promises"

async function loadCSVInNode(path, config) {
  const raw = await fs.readFile(path, { encoding: "utf8" })
  return parse(raw, config)
}

export { loadCSVInNode }
