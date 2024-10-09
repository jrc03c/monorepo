import { multiply } from "./multiply.mjs"

function scale() {
  return multiply(...arguments)
}

export { scale }
