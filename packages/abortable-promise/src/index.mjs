class AbortablePromise extends Promise {
  wasAborted = false
  wasRejected = false
  wasResolved = false

  constructor(fn) {
    let onAbortCallbacks = []
    let reject, resolve
    let wasAborted = false
    let wasRejected = false
    let wasResolved = false

    const onAbort = callback => {
      onAbortCallbacks.push(callback)
    }

    const abort = function () {
      if (wasAborted || wasRejected || wasResolved) {
        return
      }

      wasAborted = true
      onAbortCallbacks.forEach(callback => callback(...arguments))
    }

    super((res, rej) => {
      resolve = function () {
        if (wasAborted || wasRejected || wasResolved) {
          return
        }

        wasResolved = true
        res(...arguments)
      }

      reject = function () {
        if (wasAborted || wasRejected || wasResolved) {
          return
        }

        wasRejected = true
        rej(...arguments)
      }

      try {
        return fn(resolve, reject, abort, onAbort)
      } catch (e) {
        return reject(e)
      }
    })

    Object.defineProperty(this, "abort", {
      configurable: false,
      enumerable: true,
      writable: false,
      value: abort,
    })

    Object.defineProperty(this, "onAbort", {
      configurable: false,
      enumerable: true,
      writable: false,
      value: onAbort,
    })

    Object.defineProperty(this, "wasAborted", {
      configurable: false,
      enumerable: true,
      get: () => wasAborted,
      set: () => {},
    })

    Object.defineProperty(this, "wasRejected", {
      configurable: false,
      enumerable: true,
      get: () => wasRejected,
      set: () => {},
    })

    Object.defineProperty(this, "wasResolved", {
      configurable: false,
      enumerable: true,
      get: () => wasResolved,
      set: () => {},
    })
  }

  abort() {}

  onAbort() {}
}

export { AbortablePromise }
