import { filter, map } from "@jrc03c/js-math-tools"

function unindent(text) {
  const lines = text.split("\n")

  const indentations = map(
    filter(lines, line => line.trim().length > 0),
    line => line.split("").findIndex(char => !char.match(/\s/g)),
  )

  const minIndentation = Math.min(...indentations)
  return map(lines, line => line.substring(minIndentation)).join("\n")
}

export { unindent }
