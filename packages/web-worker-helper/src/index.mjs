import { makeKey } from "@jrc03c/make-key"

class WebWorkerHelper {
  // Define some status values that will be included in every message sent by
  // the worker.
  static Status = {
    CANCELLED: "CANCELLED",
    FAILED: "FAILED",
    FINISHED: "FINISHED",
    IN_PROGRESS: "IN_PROGRESS",
  }

  static isInWorkerContext() {
    return (
      typeof WorkerGlobalScope !== "undefined" &&
      globalThis instanceof WorkerGlobalScope
    )
  }

  // In the main thread, the helper keeps track of `reject` functions (i.e., of
  // the kind that are arguments of the function passed into the `Promise`
  // constructor). If the worker is terminated suddenly, then it will call all
  // of these functions to indicate the failure of all `Promise` instances.
  rejects = []

  // In the main thread, the helper also keeps a reference to its Worker
  // instance.
  worker = null

  // In the worker context (i.e., *not* in the main thread), the helper keeps
  // track of the signal names to which it has been subscribed. This allows it
  // to throw an error if the main thread tries to send a signal to which no
  // helpers are subscribed.
  signals = []

  constructor(path, options) {
    // The WebWorkerHelper class is designed to be used in *both* main thread
    // contexts *and* web worker contexts! This makes the API simpler and easier
    // to understand from the outside.
    //
    // Generally speaking, there are two roles a WebWorkerHelper can play:
    // "employer" and "employee". The "employer" role is played by helpers that
    // delegate work to be done; they do not actually do any work themselves.
    // The "employee" role is played by helpers that do whatever work has been
    // delegated to them. Helpers created in the main thread can only ever be
    // "employers"; but helpers created in worker contexts can play either role!
    // When a helper is created in a worker context to play an "employer" role,
    // the work it delegates will actually be done in a new, secondary worker
    // context (i.e., not the same context in which this helper itself lives)!
    //
    // Creating an "employer" helper requires passing a path into the
    // WebWorkerHelper constructor. The path is a string representing a worker
    // script URL.
    //
    // "Employee" helpers, on the other hand, need no path. They can simply be
    // constructed with `new WebWorkerHelper()`.
    //
    // Note that these roles are nowhere mentioned in the class's actual code.
    // That's because the role a helper plays is really defined by how you
    // use the helper in practice, not by any property defined on or enforced
    // by the instance. And, in fact, a single helper created in a worker
    // context can play both roles simultaneously!
    if (path) {
      this.worker = new Worker(path, options)
    }

    if (WebWorkerHelper.isInWorkerContext()) {
      globalThis.addEventListener("message", event => {
        if (!this.signals.includes(event.data.signal)) {
          return globalThis.postMessage({
            signal: event.data.signal,
            status: WebWorkerHelper.Status.FAILED,
            payload: `You tried to send a message with the signal "${event.data.signal}" to a worker, but no workers are listening for that signal!`,
          })
        }
      })
    }
  }

  // The `destroy` method is called on "employer" helpers to terminate all their
  // "employee" helpers' work immediately.
  destroy() {
    this.rejects.forEach(reject =>
      reject(
        "The worker instance was terminated by the WebWorkerHelper instance.",
      ),
    )

    this.rejects = []
    this.worker.terminate()
    this.worker = null
    return this
  }

  // The `exec` method is used by an "employer" helper to delegate work to its
  // "employee" helper. The `signal` argument is a string that represents the
  // name of an event for which the "employee" helper is listening. For
  // example, calling `helper.exec("whatever")` implies that the "employee"
  // helper is listening for an event called "whatever". (It will have started
  // listening for this event using its `on` method, which is defined below.)
  exec(signal, payload, progress) {
    return new Promise((resolve, reject) => {
      try {
        signal = signal || makeKey(8)

        const callback = event => {
          if (event.data.signal === signal) {
            // If the work has been cancelled, then show a warning and return the result on the assumption that nothing has gone wrong.
            if (event.data.status === WebWorkerHelper.Status.CANCELLED) {
              resolve(event.data.payload)

              console.warn(
                `A WebWorkerHelper process with signal "${signal}" was cancelled!`,
              )

              this.worker.removeEventListener("message", callback)

              if (this.rejects.includes(reject)) {
                this.rejects.splice(this.rejects.indexOf(reject), 1)
              }
            }

            // If the work has failed, then reject the results.
            else if (event.data.status === WebWorkerHelper.Status.FAILED) {
              reject(event.data.payload)
              this.worker.removeEventListener("message", callback)

              if (this.rejects.includes(reject)) {
                this.rejects.splice(this.rejects.indexOf(reject), 1)
              }
            }

            // If the work is finished *or* if the event does not include a status, then return the results.
            else if (
              event.data.status === WebWorkerHelper.Status.FINISHED ||
              !event.data.status
            ) {
              resolve(event.data.payload)
              this.worker.removeEventListener("message", callback)

              if (this.rejects.includes(reject)) {
                this.rejects.splice(this.rejects.indexOf(reject), 1)
              }
            }

            // If the work is still in progress, then call the progress callback function (if it exists).
            else if (event.data.status === WebWorkerHelper.Status.IN_PROGRESS) {
              if (progress) {
                progress(event.data.payload)
              }
            }
          }
        }

        this.worker.addEventListener("message", callback)
        this.worker.postMessage({ signal, payload })
        this.rejects.push(reject)
      } catch (e) {
        reject(e)

        if (this.rejects.includes(reject)) {
          this.rejects.splice(this.rejects.indexOf(reject), 1)
        }
      }
    })
  }

  // NOTE: This method should only be called in a web worker context (i.e., not
  // in the main thread).
  on(signal, callback) {
    if (!WebWorkerHelper.isInWorkerContext()) {
      throw new Error(
        "The `WebWorkerHelper.on` method should only be invoked inside a web worker context!",
      )
    }

    const listener = async event => {
      if (event.data.signal === signal) {
        try {
          const result = await callback(event.data.payload, p => {
            globalThis.postMessage({
              signal,
              status: WebWorkerHelper.Status.IN_PROGRESS,
              payload: p,
            })
          })

          globalThis.postMessage({
            signal,
            status: WebWorkerHelper.Status.FINISHED,
            payload: result,
          })
        } catch (e) {
          globalThis.postMessage({
            signal,
            status: WebWorkerHelper.Status.FAILED,
            payload: e,
          })
        }
      }
    }

    globalThis.addEventListener("message", listener)
    this.signals.push(signal)

    return () => {
      if (this.signals.includes(signal)) {
        this.signals.splice(this.signals.indexOf(signal), 1)
      }

      globalThis.removeEventListener("message", listener)
    }
  }
}

export { WebWorkerHelper }
