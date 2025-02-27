import { Timer } from "./timer.mjs"

class BrowserTimer extends Timer {
  static DEFAULT_LOCAL_STORAGE_KEY = "timer"

  static fromLocalStorage(key) {
    key = key || this.DEFAULT_LOCAL_STORAGE_KEY
    const raw = localStorage.getItem(key)

    if (!raw) {
      throw new Error(
        `No timer was saved under the \`localStorage\` key "${key}"!`,
      )
    }

    const options = JSON.parse(raw)
    return new BrowserTimer(options)
  }

  static async fromURL(url) {
    const response = await fetch(url)
    const raw = await response.text()

    if (response.status === 200) {
      const options = JSON.parse(raw)
      return new BrowserTimer(options)
    } else {
      throw new Error(`Non-200 status: "${raw}"`)
    }
  }

  localStorageKey = BrowserTimer.DEFAULT_LOCAL_STORAGE_KEY
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
    filename = filename || "timer-events.json"
    const a = document.createElement("a")

    a.href =
      "data:application/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(this.toObject(), null, 2))

    a.download = filename
    a.dispatchEvent(new MouseEvent("click"))
    return this
  }

  save() {
    if (this.shouldSaveToLocalStorage) {
      localStorage.setItem(
        this.localStorageKey,
        JSON.stringify(this.toObject(), null, 2),
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

  toObject() {
    return {
      ...super.toObject(),
      localStorageKey: this.localStorageKey,
      shouldSaveToLocalStorage: this.shouldSaveToLocalStorage,
    }
  }
}

export { BrowserTimer }
