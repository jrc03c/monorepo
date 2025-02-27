(() => {
  // src/timer-event.mjs
  var TimerEvent = class {
    duration = -1;
    name = "Untitled timer event";
    start = /* @__PURE__ */ new Date();
    timer = null;
    constructor(options) {
      options = options || {};
      this.duration = options.duration || this.duration;
      this.name = options.name || this.name;
      this.start = options.start || this.start;
      this.timer = options.timer || this.timer;
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
      this.shouldLogToConsole = typeof options.shouldLogToConsole === "undefined" ? this.shouldLogToConsole : options.shouldLogToConsole;
    }
    get totalTime() {
      let firstEvent = this.events[0];
      let lastEvent = this.events[0];
      this.events.forEach((event) => {
        if (event.start < firstEvent.start) {
          firstEvent = event;
        }
        if (event.start + event.duration > lastEvent.start + lastEvent.duration) {
          lastEvent = event;
        }
      });
      return lastEvent.start + lastEvent.duration - firstEvent.start;
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
    toObject() {
      return {
        events: this.events.map((e) => e.toObject()),
        shouldLogToConsole: this.shouldLogToConsole
      };
    }
  };

  // src/timer-browser.mjs
  var BrowserTimer = class extends Timer {
    localStorageKey = "LOGS";
    shouldSaveToLocalStorage = true;
    constructor(options) {
      options = options || {};
      super(options);
      this.localStorageKey = options.localStorageKey || this.localStorageKey;
      this.shouldSaveToLocalStorage = typeof options.shouldSaveToLocalStorage === "undefined" ? this.shouldSaveToLocalStorage : options.shouldSaveToLocalStorage;
    }
    download(filename) {
      const a = document.createElement("a");
      a.href = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.toObject()));
      a.download = filename;
      a.dispatchEvent(new MouseEvent("click"));
      return this;
    }
    save() {
      if (this.shouldSaveToLocalStorage) {
        localStorage.setItem(
          this.localStorageKey,
          JSON.stringify(this.toObject())
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
  };

  // src/iife.mjs
  if (typeof globalThis !== "undefined") {
    globalThis.BrowserTimer = BrowserTimer;
    globalThis.Timer = BrowserTimer;
  }
})();
