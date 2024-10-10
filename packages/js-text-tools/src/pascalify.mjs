import { camelify } from "./camelify.mjs"

function pascalify(text) {
  const out = camelify(text)
  return out[0].toUpperCase() + out.slice(1)
}

export { pascalify }
