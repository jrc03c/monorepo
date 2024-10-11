import { strip } from "@jrc03c/js-text-tools"

function clean(s) {
  // remove apostrophes (but *not* single-quote marks);
  // note that this is english-specific!
  let matches = s.match(/[A-Za-z]'([A-Za-z]|\s)/g)

  while (matches) {
    matches.forEach(match => {
      s = s.replaceAll(match, match.replaceAll("'", ""))
    })

    matches = s.match(/[A-Za-z]'([A-Za-z]|\s)/g)
  }

  let out = strip(s.toLowerCase()).replaceAll(/\s/g, " ")

  while (out.includes("  ")) {
    out = out.replaceAll("  ", " ")
  }

  return out.trim()
}

export { clean }
