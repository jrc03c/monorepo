import { pause } from "./index.mjs"

if (typeof globalThis !== "undefined") {
  globalThis.pause = pause
}
