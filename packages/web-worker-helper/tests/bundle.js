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

  // src/index.mjs
  var WebWorkerHelper = class _WebWorkerHelper {
    static Status = {
      CANCELLED: "CANCELLED",
      FAILED: "FAILED",
      FINISHED: "FINISHED",
      IN_PROGRESS: "IN_PROGRESS"
    };
    static isInWorkerContext() {
      return typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
    }
    // main thread only
    rejects = [];
    worker = null;
    // worker only
    signals = [];
    constructor(path, options) {
      if (path) {
        this.worker = new Worker(path, options);
      }
      if (_WebWorkerHelper.isInWorkerContext()) {
        self.addEventListener("message", (event) => {
          if (!this.signals.includes(event.data.signal)) {
            return self.postMessage({
              signal: event.data.signal,
              status: _WebWorkerHelper.Status.FAILED,
              payload: `You tried to send a message with the signal "${event.data.signal}" to a worker, but no workers are listening for that signal!`
            });
          }
        });
      }
    }
    destroy() {
      this.rejects.forEach(
        (reject) => reject(
          "The worker instance was terminated by the WebWorkerHelper instance."
        )
      );
      this.rejects = [];
      this.worker.terminate();
      this.worker = null;
      return this;
    }
    exec(signal, payload, progress) {
      return new Promise((resolve, reject) => {
        try {
          signal = signal || makeKey(8);
          const callback = (event) => {
            if (event.data.signal === signal) {
              if (event.data.status === _WebWorkerHelper.Status.CANCELLED) {
                resolve(event.data.payload);
                console.warn(
                  `A WebWorkerHelper process with signal "${signal}" was cancelled!`
                );
                this.worker.removeEventListener("message", callback);
                if (this.rejects.includes(reject)) {
                  this.rejects.splice(this.rejects.indexOf(reject), 1);
                }
              } else if (event.data.status === _WebWorkerHelper.Status.FAILED) {
                reject(event.data.payload);
                this.worker.removeEventListener("message", callback);
                if (this.rejects.includes(reject)) {
                  this.rejects.splice(this.rejects.indexOf(reject), 1);
                }
              } else if (event.data.status === _WebWorkerHelper.Status.FINISHED || !event.data.status) {
                resolve(event.data.payload);
                this.worker.removeEventListener("message", callback);
                if (this.rejects.includes(reject)) {
                  this.rejects.splice(this.rejects.indexOf(reject), 1);
                }
              } else if (event.data.status === _WebWorkerHelper.Status.IN_PROGRESS) {
                if (progress) {
                  progress(event.data.payload);
                }
              }
            }
          };
          this.worker.addEventListener("message", callback);
          this.worker.postMessage({ signal, payload });
          this.rejects.push(reject);
        } catch (e) {
          reject(e);
          if (this.rejects.includes(reject)) {
            this.rejects.splice(this.rejects.indexOf(reject), 1);
          }
        }
      });
    }
    // NOTE: This method should only be called in a web worker context (i.e., not in the main thread).
    on(signal, callback) {
      if (!_WebWorkerHelper.isInWorkerContext()) {
        throw new Error(
          "The `WebWorkerHelper.on` method should only be invoked inside a web worker context!"
        );
      }
      const listener = async (event) => {
        if (event.data.signal === signal) {
          try {
            const result = await callback(event.data.payload, (p) => {
              self.postMessage({
                signal,
                status: _WebWorkerHelper.Status.IN_PROGRESS,
                payload: p
              });
            });
            self.postMessage({
              signal,
              status: _WebWorkerHelper.Status.FINISHED,
              payload: result
            });
          } catch (e) {
            self.postMessage({
              signal,
              status: _WebWorkerHelper.Status.FAILED,
              payload: e
            });
          }
        }
      };
      self.addEventListener("message", listener);
      this.signals.push(signal);
      return () => {
        if (this.signals.includes(signal)) {
          this.signals.splice(this.signals.indexOf(signal), 1);
        }
        self.removeEventListener("message", listener);
      };
    }
  };

  // tests/main.mjs
  function createResultsElement(status, message) {
    const out = document.createElement("div");
    out.classList.add("result");
    if (status) {
      out.classList.add(status);
    } else {
      out.classList.add("animated");
    }
    out.innerHTML = `
    <div class="status"></div>
    <div id="message">${message}</div>
  `;
    return out;
  }
  !(async () => {
    const container = document.querySelector("#results");
    await (async () => {
      const description = "Tests that results can be returned correctly.";
      const rel = createResultsElement(null, description);
      container.appendChild(rel);
      try {
        const helper = new WebWorkerHelper("worker-bundle.js", { type: "module" });
        const x = Math.random();
        const ytrue = x * 2;
        const ypred = await helper.exec("double", x);
        if (ypred === ytrue) {
          rel.classList.add("success");
        } else {
          rel.classList.add("danger");
          rel.querySelector("#message").innerHTML += ` (We expected to receive ${ytrue} but instead received ${ypred}!)`;
        }
      } catch (e) {
        rel.classList.add("danger");
        rel.querySelector("#message").innerHTML = `${description} (ERROR: ${e})`;
      }
      rel.classList.remove("animated");
    })();
    await (async () => {
      const description = "Tests that results can be returned correctly after some time has elapsed.";
      const rel = createResultsElement(null, description);
      container.appendChild(rel);
      try {
        const helper = new WebWorkerHelper("worker-bundle.js", { type: "module" });
        const x = Math.random();
        const ytrue = x * 3;
        const ypred = await helper.exec("triple-after-a-while", x);
        if (ypred === ytrue) {
          rel.classList.add("success");
        } else {
          rel.classList.add("danger");
          rel.querySelector("#message").innerHTML += ` (We expected to receive ${ytrue} but instead received ${ypred}!)`;
        }
      } catch (e) {
        rel.classList.add("danger");
        rel.querySelector("#message").innerHTML = `${description} (ERROR: ${e})`;
      }
      rel.classList.remove("animated");
    })();
    await (async () => {
      const description = "Tests that progress callbacks work correctly.";
      const rel = createResultsElement(null, description);
      container.appendChild(rel);
      try {
        const helper = new WebWorkerHelper("worker-bundle.js", { type: "module" });
        let progress = 0;
        await helper.exec("run-progress-callbacks", null, (p) => {
          progress = p;
          rel.querySelector("#message").innerHTML = `${description} (${(p * 100).toFixed(2)}%)`;
        });
        if (progress === 1) {
          rel.classList.add("success");
          rel.querySelector("#message").innerHTML = description;
        } else {
          rel.classList.add("danger");
          rel.querySelector("#message").innerHTML += ` (We expected to receive a final progress value of 1 but instead received ${progress}!)`;
        }
      } catch (e) {
        rel.classList.add("danger");
        rel.querySelector("#message").innerHTML = `${description} (ERROR: ${e})`;
      }
      rel.classList.remove("animated");
    })();
    await (async () => {
      const description = "Tests that errors are thrown when unknown signals are used.";
      const rel = createResultsElement(null, description);
      container.appendChild(rel);
      try {
        const helper = new WebWorkerHelper("worker-bundle.js", { type: "module" });
        await helper.exec("does-not-exist");
        rel.classList.add("danger");
      } catch (e) {
        rel.classList.add("success");
      }
      rel.classList.remove("animated");
    })();
    await (async () => {
      const description = "Tests that workers can do multiple things simultaneously.";
      const rel = createResultsElement(null, description);
      container.appendChild(rel);
      try {
        const helper = new WebWorkerHelper("worker-bundle.js", { type: "module" });
        const promises = [];
        promises.push(helper.exec("do-thing-1"));
        promises.push(helper.exec("do-thing-2"));
        promises.push(helper.exec("do-thing-3"));
        const results = await Promise.all(promises);
        if (results.length === 3 && results.includes("Thing 1 is finished!") && results.includes("Thing 2 is finished!") && results.includes("Thing 3 is finished!")) {
          rel.classList.add("success");
        } else {
          rel.classList.add("danger");
        }
      } catch (e) {
        rel.classList.add("danger");
        rel.querySelector("#message").innerHTML = `${description} (ERROR: ${e})`;
      }
      rel.classList.remove("animated");
    })();
    await (async () => {
      const description = "Tests that workers can be terminated by the main thread in mid-execution.";
      const rel = createResultsElement(null, description);
      container.appendChild(rel);
      try {
        const helper = new WebWorkerHelper("worker-bundle.js", { type: "module" });
        setTimeout(() => helper.destroy(), 1e3);
        await helper.exec("return-after-30-seconds");
        rel.classList.add("danger");
        rel.querySelector("#message").innerHTML = `${description} (The worker should've been terminated mid-execution, but it wasn't!)`;
      } catch (e) {
        rel.classList.add("success");
      }
      rel.classList.remove("animated");
    })();
    await (async () => {
      const description = "Tests that workers can self-terminate in mid-execution.";
      const rel = createResultsElement(null, description);
      container.appendChild(rel);
      try {
        const helper = new WebWorkerHelper("worker-bundle.js", { type: "module" });
        setTimeout(() => helper.destroy(), 1e3);
        await helper.exec("return-after-30-seconds");
        rel.classList.add("danger");
        rel.querySelector("#message").innerHTML = `${description} (The worker should've been terminated mid-execution, but it wasn't!)`;
      } catch (e) {
        rel.classList.add("success");
      }
      rel.classList.remove("animated");
    })();
  })();
})();
