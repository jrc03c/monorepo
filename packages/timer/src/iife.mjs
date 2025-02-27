import { BrowserTimer } from "./timer-browser.mjs"

if (typeof globalThis !== "undefined") {
  globalThis.BrowserTimer = BrowserTimer
  globalThis.Timer = BrowserTimer
}
