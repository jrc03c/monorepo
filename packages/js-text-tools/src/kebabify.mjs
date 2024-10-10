import { strip } from "./helpers/strip.mjs"

function kebabify(text) {
  if (typeof text !== "string") {
    throw new Error("`text` must be a string!")
  }

  const words = strip(text).split(" ")

  if (words.length === 0) return ""
  if (words.length === 1) return words[0]

  return words.join("-")
}

export { kebabify }
