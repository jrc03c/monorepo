import { BaseClass } from "./index.mjs"

if (typeof globalThis !== "undefined") {
  globalThis.BaseClass = BaseClass
}
