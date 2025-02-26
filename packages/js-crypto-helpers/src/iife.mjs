import * as JSCryptoHelpers from "./index.mjs"

if (typeof globalThis !== "undefined") {
  globalThis.JSCryptoHelpers = JSCryptoHelpers
}
