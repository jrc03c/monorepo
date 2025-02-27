import { downloadJSONFile } from "../download-text-file.mjs"
import { Timer } from "./index.mjs"

class BrowserTimer extends Timer {
  static DEFAULT_LOCAL_STORAGE_KEY = "logs"

  static async fromLocalStorage(options) {
    const key = options.localStorageKey || this.DEFAULT_LOCAL_STORAGE_KEY
  }

  localStorageKey = null
  shouldSaveToLocalStorage = true

  constructor(options) {
    options = options || {}
    super(options)

    this.localStorageKey =
      options.localStorageKey || this.constructor.DEFAULT_LOCAL_STORAGE_KEY

    this.shouldSaveToLocalStorage =
      typeof options.shouldSaveToLocalStorage === "undefined"
        ? this.shouldSaveToLocalStorage
        : options.shouldSaveToLocalStorage
  }

  download(filename) {
    filename = filename || "logs.json"
    downloadJSONFile(filename, this.splits)
    return this
  }

  mark() {
    const out = super.mark(...arguments)

    if (this.shouldSaveToLocalStorage) {
      localStorage.setItem(
        this.localStorageKey,
        JSON.stringify(this.splits, null, 2),
      )
    }

    return out
  }
}

export { BrowserTimer }
