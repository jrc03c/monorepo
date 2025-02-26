import * as Bee from "./index.mjs"

if (typeof globalThis !== "undefined") {
  globalThis.Bee = Bee
}
