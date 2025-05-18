(() => {
  // node_modules/@jrc03c/make-key/src/index.mjs
  function makeKey(keyLength, charset, randomFn) {
    if (typeof keyLength !== "number" || isNaN(keyLength)) {
      throw new Error(
        "The first value passed into the `makeKey` function must be a number!"
      );
    }
    if (charset) {
      if (charset instanceof Array) {
        charset = charset.join("");
      }
      if (typeof charset !== "string") {
        throw new Error(
          "The second argument passed into the `makeKey` function must be a string or array of strings!"
        );
      }
    }
    randomFn = randomFn || Math.random;
    if (typeof randomFn !== "function") {
      throw new Error(
        "The third argument passed into the `makeKey` function must be a function!"
      );
    }
    let out = "";
    charset = charset || "abcdef1234567890";
    for (let i = 0; i < keyLength; i++) {
      out += charset[Math.floor(randomFn() * charset.length)];
    }
    return out;
  }

  // node_modules/@jrc03c/pause/src/index.mjs
  function pause(ms) {
    return new Promise((resolve, reject) => {
      try {
        const start = performance.now();
        return setTimeout(() => resolve(performance.now() - start), ms);
      } catch (e) {
        return reject(e);
      }
    });
  }

  // src/index.mjs
  var Queue = class {
    interval = null;
    isRunning = false;
    jobs = [];
    results = {};
    timeBetweenJobs = 100;
    constructor(timeBetweenJobs) {
      this.timeBetweenJobs = typeof timeBetweenJobs === "undefined" ? this.timeBetweenJobs : timeBetweenJobs;
    }
    append(fn) {
      const id = makeKey(8);
      this.jobs.push({ fn, id });
      this.start();
      return id;
    }
    async retrieve(id) {
      while (!this.results[id]) {
        await pause(10);
      }
      return this.results[id];
    }
    async process(fn) {
      const id = this.append(fn);
      return await this.retrieve(id);
    }
    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      let isProcessing = false;
      const process = async () => {
        if (isProcessing) return;
        isProcessing = true;
        if (!this.jobs || this.jobs.length === 0) {
          return this.stop();
        }
        const job = this.jobs.shift();
        const result = await job.fn();
        if (this.results) {
          this.results[job.id] = result;
        }
        isProcessing = false;
      };
      process();
      this.interval = setInterval(process, this.timeBetweenJobs);
      return this;
    }
    stop() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
      this.isRunning = false;
      return this;
    }
    destroy() {
      this.stop();
      this.jobs = null;
      this.results = null;
      this.interval = null;
      this.isRunning = null;
      this.timeBetweenJobs = null;
      return void 0;
    }
  };

  // src/iife.mjs
  if (typeof globalThis !== "undefined") {
    globalThis.Queue = Queue;
  }
})();
