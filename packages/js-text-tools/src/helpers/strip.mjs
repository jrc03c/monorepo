import { punctuation } from "./punctuation.mjs"
import { replaceAll } from "./replace-all.mjs"

const doubleSpace = "  "
const singleSpace = " "

function strip(text, shouldPreserveCase) {
  if (typeof text !== "string") {
    throw new Error("`text` must be a string!")
  }

  let out = ""

  for (let i = 0; i < text.length; i++) {
    const char = shouldPreserveCase ? text[i] : text[i].toLowerCase()

    if (punctuation.includes(char)) {
      out += singleSpace
    } else {
      out += char
    }
  }

  while (out.includes(doubleSpace)) {
    out = replaceAll(out, doubleSpace, singleSpace)
  }

  return out.trim()
}

export { strip }
