import { WebWorkerHelper } from "./index.mjs"

if (typeof globalThis !== "undefined") {
  globalThis.WebWorkerHelper = WebWorkerHelper
}
