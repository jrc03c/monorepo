import { AbortablePromise } from "./index.mjs"

if (typeof globalThis !== "undefined") {
  globalThis.AbortablePromise = AbortablePromise
}
