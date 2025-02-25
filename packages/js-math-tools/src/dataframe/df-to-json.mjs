import { dfToJSONString } from "./df-to-json-string.mjs"

async function dfToJSON(df, axis) {
  return JSON.parse(dfToJSONString(df, axis))
}

export { dfToJSON }
