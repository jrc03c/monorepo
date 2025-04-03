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
      const indentation = line.match(/^\s*/)
      let temp = ""

      for (let i = 0; i < line.length; i++) {
        const char = line[i]

        if (temp.length >= maxLineLength) {
          out.push(temp)
          temp = indentation + wrappedLinePrefix + char
        } else {
          temp += char
        }
      }

      if (temp.length > 0) {
        out.push(temp)
      }

      return out
    }),
  ).join("\n")

  // const out = []

  // raw.split("\n").forEach(line => {
  //   if (line.trim().length === 0) {
  //     return out.push("")
  //   }

  //   const indentation = line.split(/[^\s]/g)[0]

  //   const words = line.replace(indentation, "").split(" ")
  //   let temp = (out.length > 0 ? wrappedLinePrefix : "") + indentation

  //   words.forEach(word => {
  //     const newTemp = temp + (temp.trim().length > 0 ? " " : "") + word

  //     if (newTemp.length > maxLineLength) {
  //       out.push(temp)
  //       temp = (out.length > 0 ? wrappedLinePrefix : "") + indentation + word
  //     } else {
  //       temp = newTemp
  //     }
  //   })

  //   if (temp.length > 0) {
  //     out.push(temp)
  //   }
  // })

  // return out.join("\n")
}

export { wrap }
