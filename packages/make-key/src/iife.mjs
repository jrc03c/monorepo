import { makeKey } from "./index.mjs"

if (typeof globalThis !== "undefined") {
  globalThis.makeKey = makeKey
}
