import { parse } from "./parse.mjs"

async function loadCSVInBrowser(path, config) {
  const response = await fetch(path)
  const raw = await response.text()
  return parse(raw, config)
}

export { loadCSVInBrowser }
