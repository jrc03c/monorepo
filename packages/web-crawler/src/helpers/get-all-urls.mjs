import { extractUrlsFromCss } from "./extract-urls-from-css.mjs"
import { getAllElements } from "./get-all-elements.mjs"
import { getAttributeUrls } from "./get-attribute-urls.mjs"
import { set, sort } from "@jrc03c/js-math-tools"

function getAllUrls(url, dom, validAttributes) {
  return sort(
    set(
      getAllElements(dom).map(el => {
        if (el.tagName && el.tagName.toLowerCase() === "style") {
          return extractUrlsFromCss(url, el.innerHTML)
        } else {
          return getAttributeUrls(url, el, validAttributes)
        }
      }),
    ),
  )
}

export { getAllUrls }
