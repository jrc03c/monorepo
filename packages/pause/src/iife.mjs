import { pause, pauseAsync, pauseSync } from "./index.mjs"

if (typeof globalThis !== "undefined") {
  globalThis.pause = pauseAsync
  globalThis.pauseAsync = pauseAsync
  globalThis.pauseSync = pauseSync
}
