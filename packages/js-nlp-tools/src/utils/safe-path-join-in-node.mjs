import path from "node:path"

async function safePathJoinInNode() {
  return path.join(...arguments)
}

export { safePathJoinInNode }
