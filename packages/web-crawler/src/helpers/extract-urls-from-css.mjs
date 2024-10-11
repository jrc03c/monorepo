import { absolutifyUrl } from "./absolutify-url.mjs"
import { set, sort } from "@jrc03c/js-math-tools"

function extractUrlsFromCss(url, css) {
  return sort(
    set(
      (css.match(/url\(.*?\)/g) || []).map(v =>
        absolutifyUrl(
          url,
          v
            .replace("url(", "")
            .replace(")", "")
            .replaceAll("'", "")
            .replaceAll('"', ""),
        ),
      ),
    ),
  )
}

export { extractUrlsFromCss }
