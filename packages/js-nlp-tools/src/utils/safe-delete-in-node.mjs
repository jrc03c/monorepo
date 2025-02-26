import fs from "node:fs"

async function safeDeleteInNode(x) {
  fs.rmSync(x, { recursive: true, force: true })
}

export { safeDeleteInNode }
