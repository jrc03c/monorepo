import { absolutifyUrl } from "./absolutify-url.mjs"
import { isUndefined, set, sort } from "@jrc03c/js-math-tools"

function getAttributeUrls(url, el, included) {
  if (!isUndefined(included) && !(included instanceof Array)) {
    throw new Error(
      "The third argument passed into the `getAttributeUrls` must be undefined, null, or an array of strings representing valid attribute names! To use all possible attributes, pass undefined or null.",
    )
  }

  return sort(
    set(
      el
        .getAttributeNames()
        .filter(a => !included || included.includes(a))
        .map(a => el.getAttribute(a))
        .map(v =>
          v
            .toString()
            .split(";")
            .map(v =>
              v
                .split(",")
                .map(v =>
                  v
                    .split(" ")
                    .map(v =>
                      v.split(/\s/g).map(v => absolutifyUrl(url, v.trim())),
                    ),
                ),
            ),
        ),
    ),
  )
}

export { getAttributeUrls }
