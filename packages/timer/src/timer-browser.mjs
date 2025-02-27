import { Timer } from "./index.mjs"

class BrowserTimer extends Timer {
  localStorageKey = "LOGS"
  shouldSaveToLocalStorage = true

  constructor(options) {
    options = options || {}
    super(options)

    this.localStorageKey = options.localStorageKey || this.localStorageKey

    this.shouldSaveToLocalStorage =
      typeof options.shouldSaveToLocalStorage === "undefined"
        ? this.shouldSaveToLocalStorage
        : options.shouldSaveToLocalStorage
  }

  download(filename) {
    const a = document.createElement("a")

    a.href =
      "data:application/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(this.toObject()))

    a.download = filename
    a.dispatchEvent(new MouseEvent("click"))
    return this
  }

  save() {
    if (this.shouldSaveToLocalStorage) {
      localStorage.setItem(
        this.localStorageKey,
        JSON.stringify(this.toObject()),
      )
    }

    return this
  }

  start() {
    const out = super.start(...arguments)
    this.save()
    return out
  }

  stop() {
    const out = super.stop(...arguments)
    this.save()
    return out
  }
}

export { BrowserTimer }
