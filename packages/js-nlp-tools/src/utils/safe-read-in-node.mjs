import fs from "node:fs"

async function safeReadInNode(file) {
  const out = fs.readFileSync(file, "utf8")

  try {
    return JSON.parse(out)
  } catch (e) {
    return out
  }
}

export { safeReadInNode }
