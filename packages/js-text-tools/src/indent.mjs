import { map } from "@jrc03c/js-math-tools"

function indent(text, chars) {
  chars = chars || ""

  return map(
    text.split("\n"),
    line => {
      if (line.trim().length > 0) {
        return chars + line
      } else {
        return line
      }
    },
  ).join("\n")
}

export { indent }
