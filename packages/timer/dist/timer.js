(() => {
  // src/timer-event.mjs
  var TimerEvent = class {
    duration = -1;
    name = "Untitled timer event";
    start = /* @__PURE__ */ new Date();
    timer = null;
    constructor(options) {
      options = options || {};
      this.duration = typeof options.duration === "undefined" ? this.duration : options.duration;
      this.name = options.name || this.name;
      this.start = options.start || this.start;
      this.timer = options.timer || this.timer;
      if (typeof this.start === "number") {
        this.start = new Date(this.start);
      }
    }
    stop() {
      if (this.timer) {
        this.timer.stop(this);
      } else {
        this.duration = /* @__PURE__ */ new Date() - this.start;
      }
      return this;
    }
    toObject() {
      const start = this.start.getTime();
      return {
        duration: this.duration,
        name: this.name,
        start,
        stop: start + this.duration
      };
    }
  };

  // src/timer.mjs
  var Timer = class {
    events = [];
    shouldLogToConsole = true;
    constructor(options) {
      options = options || {};
      this.events = options.events ? options.events.map((e) => new TimerEvent(e)) : this.events;
      this.shouldLogToConsole = typeof options.shouldLogToConsole === "undefined" ? this.shouldLogToConsole : options.shouldLogToConsole;
    }
    get totalTime() {
      let firstTime = Infinity;
      let lastTime = -Infinity;
      this.events.forEach((event) => {
        if (event.timer === this) {
          return;
        }
        const start = event.start.getTime();
        const stop = start + event.duration;
        if (start < firstTime) {
          firstTime = start;
        }
        if (stop > lastTime) {
          lastTime = stop;
        }
      });
      return lastTime - firstTime;
    }
    start(name) {
      const now = /* @__PURE__ */ new Date();
      const event = new TimerEvent({
        name,
        start: now,
        timer: this
      });
      if (this.shouldLogToConsole) {
        console.log(`${now.toLocaleString()} | START: ${name}`);
      }
      this.events.push(event);
      return event;
    }
    stop(event) {
      event = event instanceof TimerEvent ? event : this.events.find((e) => e.name === event && e.timer === this);
      if (!event) {
        throw new Error(`No running event with name "${event}" could be found!`);
      }
      event.timer = null;
      event.stop();
      if (this.shouldLogToConsole) {
        console.log(
          `${(/* @__PURE__ */ new Date()).toLocaleString()} | STOP: ${event.name} (duration: ${event.duration} ms)`
        );
      }
      return this;
    }
    stopAll() {
      for (const event of this.events) {
        if (event.timer === this) {
          this.stop(event);
        }
      }
      return this;
    }
    toObject() {
      return {
        events: this.events.map((e) => e.toObject()),
        shouldLogToConsole: this.shouldLogToConsole
      };
    }
  };

  // src/timer-browser.mjs
  var BrowserTimer = class _BrowserTimer extends Timer {
    static DEFAULT_LOCAL_STORAGE_KEY = "timer";
    static fromLocalStorage(key) {
      key = key || this.DEFAULT_LOCAL_STORAGE_KEY;
      const raw = localStorage.getItem(key);
      if (!raw) {
        throw new Error(
          `No timer was saved under the \`localStorage\` key "${key}"!`
        );
      }
      const options = JSON.parse(raw);
      return new _BrowserTimer(options);
    }
    static async fromURL(url) {
      const response = await fetch(url);
      const raw = await response.text();
      if (response.status === 200) {
        const options = JSON.parse(raw);
        return new _BrowserTimer(options);
      } else {
        throw new Error(`Non-200 status: "${raw}"`);
      }
    }
    localStorageKey = _BrowserTimer.DEFAULT_LOCAL_STORAGE_KEY;
    shouldSaveToLocalStorage = true;
    constructor(options) {
      options = options || {};
      super(options);
      this.localStorageKey = options.localStorageKey || this.localStorageKey;
      this.shouldSaveToLocalStorage = typeof options.shouldSaveToLocalStorage === "undefined" ? this.shouldSaveToLocalStorage : options.shouldSaveToLocalStorage;
    }
    download(filename) {
      filename = filename || "timer-events.json";
      const a = document.createElement("a");
      a.href = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.toObject(), null, 2));
      a.download = filename;
      a.dispatchEvent(new MouseEvent("click"));
      return this;
    }
    save() {
      if (this.shouldSaveToLocalStorage) {
        localStorage.setItem(
          this.localStorageKey,
          JSON.stringify(this.toObject(), null, 2)
        );
      }
      return this;
    }
    start() {
      const out = super.start(...arguments);
      this.save();
      return out;
    }
    stop() {
      const out = super.stop(...arguments);
      this.save();
      return out;
    }
    toObject() {
      return {
        ...super.toObject(),
        localStorageKey: this.localStorageKey,
        shouldSaveToLocalStorage: this.shouldSaveToLocalStorage
      };
    }
  };

  // src/iife.mjs
  if (typeof globalThis !== "undefined") {
    globalThis.BrowserTimer = BrowserTimer;
    globalThis.Timer = BrowserTimer;
  }
})();
