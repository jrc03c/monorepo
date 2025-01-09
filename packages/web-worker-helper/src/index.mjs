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

  worker = null

  constructor(path, options) {
    if (path) {
      this.worker = new Worker(path, options)
    }
  }

  destroy() {
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
              console.warn(
                `A WebWorkerHelper process with signal "${signal}" was cancelled!`,
              )

              resolve(event.data.payload)
              this.worker.removeEventListener("message", callback)
            }

            // If the work has failed, then reject the results.
            else if (event.data.status === WebWorkerHelper.Status.FAILED) {
              reject(event.data.payload)
              this.worker.removeEventListener("message", callback)
            }

            // If the work is finished *or* if the event does not include a status, then return the results.
            else if (
              event.data.status === WebWorkerHelper.Status.FINISHED ||
              !event.data.status
            ) {
              resolve(event.data.payload)
              this.worker.removeEventListener("message", callback)
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
      } catch (e) {
        return reject(e)
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

    self.addEventListener("message", async event => {
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
    })
  }
}

export { WebWorkerHelper }
