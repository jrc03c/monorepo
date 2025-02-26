import { unparse } from "./unparse.mjs"
import fs from "node:fs/promises"
import path from "node:path"

async function saveCSVInNode(file, df, config) {
  const raw = unparse(df, config)
  const dir = file.split(path.sep).slice(0, -1).join(path.sep)

  try {
    await fs.mkdir(dir, { recursive: true })
  } catch (e) {}

  await fs.writeFile(file, raw, { encoding: "utf8" })
}

export { saveCSVInNode }
