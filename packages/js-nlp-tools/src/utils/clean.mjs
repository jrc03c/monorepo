import { strip } from "@jrc03c/js-text-tools"

function clean(x, shouldPreserveCase) {
  shouldPreserveCase =
    typeof shouldPreserveCase === "undefined"
      ? false
      : shouldPreserveCase

  return strip(x.replaceAll(/\s/g, " "), shouldPreserveCase)
}

export { clean }
