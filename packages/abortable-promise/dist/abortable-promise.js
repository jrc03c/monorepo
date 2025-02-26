(() => {
  // src/index.mjs
  var AbortablePromise = class extends Promise {
    // These are just placeholders. They're useful for autocompletion purposes,
    // but they'll be overwritten by the constructor.
    wasAborted = false;
    wasRejected = false;
    wasResolved = false;
    constructor(fn) {
      let abortArgs;
      let onAbortCallbacks = [];
      let reject, resolve;
      let wasAborted = false;
      let wasRejected = false;
      let wasResolved = false;
      const onAbort = (callback) => {
        if (wasAborted) {
          callback(...abortArgs || {});
        } else {
          onAbortCallbacks.push(callback);
        }
      };
      const abort = function() {
        if (wasAborted || wasRejected || wasResolved) {
          return;
        }
        abortArgs = arguments;
        wasAborted = true;
        onAbortCallbacks.forEach((callback) => callback(...arguments));
      };
      super((res, rej) => {
        resolve = function() {
          if (wasAborted || wasRejected || wasResolved) {
            return;
          }
          wasResolved = true;
          res(...arguments);
        };
        reject = function() {
          if (wasAborted || wasRejected || wasResolved) {
            return;
          }
          wasRejected = true;
          rej(...arguments);
        };
        try {
          return fn(resolve, reject, abort, onAbort);
        } catch (e) {
          return reject(e);
        }
      });
      Object.defineProperty(this, "abort", {
        configurable: false,
        enumerable: true,
        writable: false,
        value: abort
      });
      Object.defineProperty(this, "onAbort", {
        configurable: false,
        enumerable: true,
        writable: false,
        value: onAbort
      });
      Object.defineProperty(this, "wasAborted", {
        configurable: false,
        enumerable: true,
        get: () => wasAborted,
        set: () => {
        }
      });
      Object.defineProperty(this, "wasRejected", {
        configurable: false,
        enumerable: true,
        get: () => wasRejected,
        set: () => {
        }
      });
      Object.defineProperty(this, "wasResolved", {
        configurable: false,
        enumerable: true,
        get: () => wasResolved,
        set: () => {
        }
      });
    }
    // These are just placeholders. They're useful for autocompletion purposes,
    // but they'll be overwritten by the constructor.
    abort() {
    }
    onAbort() {
    }
  };

  // src/iife.mjs
  if (typeof globalThis !== "undefined") {
    globalThis.AbortablePromise = AbortablePromise;
  }
})();
