import { flatten, isUndefined } from "@jrc03c/js-math-tools"

function wrap(raw, maxLineLength, wrappedLinePrefix) {
  if (typeof raw !== "string") {
    throw new Error(
      "The first argument to the `wrap` function must be a string!",
    )
  }

  maxLineLength = isUndefined(maxLineLength) ? 80 : maxLineLength

  if (isNaN(maxLineLength) || typeof maxLineLength !== "number") {
    throw new Error(
      "The second argument to the `wrap` function must be undefined, null, or an integer!",
    )
  }

  wrappedLinePrefix = wrappedLinePrefix || ""

  return flatten(
    raw.split("\n").map(line => {
      const out = []
      const indentation = line.match(/^\s*/g)[0]
      const unindentedLine = line.replace(indentation, "")
      let temp = indentation

      unindentedLine.split(" ").forEach(word => {
        const maybeSpace = temp.trim().length > 0 ? " " : ""

        if ((temp + maybeSpace + word).length >= maxLineLength) {
          out.push(temp)
          temp = indentation + wrappedLinePrefix + word
        } else {
          temp += maybeSpace + word
        }
      })

      if (temp.length > 0) {
        out.push(temp)
      }

      if (out.length === 0) {
        out.push("")
      }

      return out
    }),
  ).join("\n")
}

export { wrap }
