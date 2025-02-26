import { freeze } from "./index.mjs"

if (typeof globalThis !== "undefined") {
  globalThis.freeze = freeze
}
