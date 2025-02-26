import { Queue } from "./index.mjs"

if (typeof globalThis !== "undefined") {
  globalThis.Queue = Queue
}
