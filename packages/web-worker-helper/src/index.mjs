import { makeKey } from "@jrc03c/make-key"

function isInWorkerContext() {
  return (
    typeof WorkerGlobalScope !== "undefined" &&
    self instanceof WorkerGlobalScope
  )
}

class WebWorkerHelper {
  static Status = {
    CANCELLED: "CANCELLED",
    FAILED: "FAILED",
    FINISHED: "FINISHED",
    IN_PROGRESS: "IN_PROGRESS",
  }

  // main thread only
  rejects = []
  worker = null

  // worker only
  signals = []

  constructor(path, options) {
    if (path) {
      this.worker = new Worker(path, options)
    }

    if (isInWorkerContext()) {
      self.addEventListener("message", event => {
        console.log("Signal received:", event.data.signal)

        if (!this.signals.includes(event.data.signal)) {
          return self.postMessage({
            signal: event.data.signal,
            status: WebWorkerHelper.Status.FAILED,
            payload: `You tried to send a message with the signal "${event.data.signal}" to a worker, but no workers are listening for that signal!`,
          })
        }
      })
    }
  }

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

  // NOTE: This method should only be called in a web worker context (i.e., not in the main thread).
  on(signal, callback) {
    if (!isInWorkerContext()) {
      throw new Error(
        "The `WebWorkerHelper.on` method should only be invoked inside a web worker context!",
      )
    }

    const listener = async event => {
      if (event.data.signal === signal) {
        try {
          const result = await callback(event.data.payload, p => {
            self.postMessage({
              signal,
              status: WebWorkerHelper.Status.IN_PROGRESS,
              payload: p,
            })
          })

          self.postMessage({
            signal,
            status: WebWorkerHelper.Status.FINISHED,
            payload: result,
          })
        } catch (e) {
          self.postMessage({
            signal,
            status: WebWorkerHelper.Status.FAILED,
            payload: e,
          })
        }
      }
    }

    self.addEventListener("message", listener)
    this.signals.push(signal)

    return () => {
      if (this.signals.includes(signal)) {
        this.signals.splice(this.signals.indexOf(signal), 1)
      }

      self.removeEventListener("message", listener)
    }
  }
}

export { WebWorkerHelper }
