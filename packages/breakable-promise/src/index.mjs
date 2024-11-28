class BreakablePromise extends Promise {
  constructor(fn) {
    let resolve, reject
    let hasBeenAborted = false
    let hasBeenRejected = false
    let hasBeenResolved = false
    const onAbortCallbacks = []

    const onAbort = callback => {
      onAbortCallbacks.push(callback)
    }

    const abort = function () {
      if (hasBeenAborted || hasBeenRejected || hasBeenResolved) {
        return
      }

      hasBeenAborted = true
      onAbortCallbacks.forEach(callback => callback(...arguments))
    }

    super((res, rej) => {
      resolve = function () {
        if (hasBeenResolved || hasBeenRejected) {
          return
        }

        hasBeenResolved = true
        res(...arguments)
      }

      reject = function () {
        if (hasBeenResolved || hasBeenRejected) {
          return
        }

        hasBeenRejected = true
        rej(...arguments)
      }

      try {
        return fn(resolve, reject, onAbort, abort)
      } catch (e) {
        return reject(e)
      }
    })

    Object.defineProperty(this, "hasBeenAborted", {
      configurable: false,
      enumerable: true,
      get: () => hasBeenAborted,
      set: () => {},
    })

    Object.defineProperty(this, "hasBeenRejected", {
      configurable: false,
      enumerable: true,
      get: () => hasBeenRejected,
      set: () => {},
    })

    Object.defineProperty(this, "hasBeenResolved", {
      configurable: false,
      enumerable: true,
      get: () => hasBeenResolved,
      set: () => {},
    })

    Object.defineProperty(this, "abort", {
      configurable: false,
      enumerable: true,
      writable: false,
      value: abort,
    })

    Object.defineProperty(this, "break", {
      configurable: false,
      enumerable: true,
      writable: false,
      value: abort,
    })

    Object.defineProperty(this, "cancel", {
      configurable: false,
      enumerable: true,
      writable: false,
      value: abort,
    })

    Object.defineProperty(this, "else", {
      configurable: false,
      enumerable: true,
      writable: false,
      value: callback => {
        onAbortCallbacks.push(callback)
        return this
      },
    })

    Object.defineProperty(this, "onAbort", {
      configurable: false,
      enumerable: true,
      writable: false,
      value: this.else,
    })
  }
}

export { BreakablePromise }
