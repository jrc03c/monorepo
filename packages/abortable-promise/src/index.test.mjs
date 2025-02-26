import { AbortablePromise } from "./index.mjs"
import { afterAll, beforeAll, expect, test } from "@jrc03c/fake-jest"
import { pause } from "@jrc03c/pause"
import express from "express"

let server, isReady, port
const serverResponseTime = 500
const servedValue = "Hello, world!"
const abortValue = "Goodbye, world!"

function abortableFetch(url, options) {
  return new AbortablePromise((resolve, reject, abort, onAbort) => {
    try {
      const controller = new AbortController()

      fetch(url, { ...options, signal: controller.signal })
        .then(response => {
          if (response.status === 200) {
            resolve(response)
          } else {
            reject("Non-200 response status!")
          }
        })
        .catch(e => reject(e))

      onAbort(() => controller.abort())
    } catch (e) {
      return reject(e)
    }
  })
}

beforeAll(() => {
  const app = express()

  app.get("/", (request, response) => {
    setTimeout(() => response.send(servedValue), serverResponseTime)
  })

  app.get("/nope", (request, response) => {
    setTimeout(() => response.status(500).send(), serverResponseTime)
  })

  server = app.listen(0, () => {
    port = server.address().port
    isReady = true
  })
})

afterAll(() => {
  setTimeout(() => server.close(), 1000)
})

test("tests that `AbortablePromise` works well with `AbortController`", async () => {
  while (!isReady) {
    await pause(10)
  }

  for (let i = 0; i < 100; i++) {
    let timeout, value

    const ms =
      Math.random() < 0.5 ? 0.5 * serverResponseTime : 1.5 * serverResponseTime

    const promise = abortableFetch("http://localhost:" + port)

    promise.then(response => {
      clearTimeout(timeout)
      response.text().then(v => (value = v))
    })

    promise.onAbort(v => {
      clearTimeout(timeout)
      value = v
    })

    timeout = setTimeout(() => promise.abort(abortValue), ms)

    setTimeout(
      () => {
        expect(value).toBe(ms < serverResponseTime ? abortValue : servedValue)
      },
      1.5 * serverResponseTime + 250,
    )
  }
})

test("tests that `AbortablePromise` works well by itself", () => {
  function countToNSlowly(n) {
    return new AbortablePromise((resolve, reject, abort, onAbort) => {
      try {
        let counter = 0

        const interval = setInterval(() => {
          counter++

          if (counter >= n) {
            clearInterval(interval)
            return resolve(counter)
          }
        }, 100)

        onAbort(() => clearInterval(interval))
      } catch (e) {
        return reject(e)
      }
    })
  }

  for (let i = 0; i < 100; i++) {
    const n = Math.round(Math.random() * 10) + 5
    const promise = countToNSlowly(n)
    let value

    promise.then(() => {
      clearTimeout(timeout)
      value = "Completed!"
    })

    promise.onAbort(() => {
      clearTimeout(timeout)
      value = "Aborted!"
    })

    const ms = Math.random() < 0.5 ? n * 0.5 * 100 : n * 1.5 * 100
    let timeout = setTimeout(() => promise.abort(), ms)

    setTimeout(
      () => {
        expect(value).toBe(ms < n * 100 ? "Aborted!" : "Completed!")
      },
      Math.max(n * 100, ms) + 100,
    )
  }
})

test("tests that the standalone `abort` and `onAbort` functions work as expected", () => {
  function abortPrettySoon(value, abortValue) {
    return new AbortablePromise((resolve, reject, abort, onAbort) => {
      try {
        onAbort(v => (innerValue = v))
        abort(abortValue)
        resolve(value)
      } catch (e) {
        reject(e)
      }
    })
  }

  let innerValue, outerValue
  const promise = abortPrettySoon(12345, 54321)

  promise.then(v => (outerValue = v))
  promise.onAbort(v => (outerValue = v))

  setTimeout(() => {
    expect(outerValue).toBe(54321)
    expect(innerValue).toBe(54321)
    expect(promise.wasAborted).toBe(true)
  }, 1000)
})

test("tests that the members of `AbortablePromise` work as expected", async () => {
  while (!isReady) {
    await pause(10)
  }

  !(() => {
    let value
    const promiseToAbort = abortableFetch(`http://localhost:${port}`)

    expect(promiseToAbort.wasAborted).toBe(false)
    expect(promiseToAbort.wasRejected).toBe(false)
    expect(promiseToAbort.wasResolved).toBe(false)

    promiseToAbort.then(() => {
      clearTimeout(timeout)
      value = "Uh-oh!"
    })

    promiseToAbort.onAbort(v => {
      value = v
    })

    let timeout = setTimeout(() => promiseToAbort.abort(Math.random()), 100)

    setTimeout(() => {
      expect(typeof value).toBe("number")
      expect(value).toBeGreaterThanOrEqualTo(0)
      expect(value).toBeLessThanOrEqualTo(1)
      expect(promiseToAbort.wasAborted).toBe(true)
      expect(promiseToAbort.wasRejected).toBe(false)
      expect(promiseToAbort.wasResolved).toBe(false)
    }, 200)
  })()

  !(() => {
    let value
    const promiseToResolve = abortableFetch(`http://localhost:${port}`)

    expect(promiseToResolve.wasAborted).toBe(false)
    expect(promiseToResolve.wasRejected).toBe(false)
    expect(promiseToResolve.wasResolved).toBe(false)

    promiseToResolve.then(() => {
      value = "Resolved!"
    })

    promiseToResolve.catch(() => {
      value = "Uh-oh! (Rejected)"
    })

    promiseToResolve.onAbort(() => {
      value = "Uh-oh! (Aborted)"
    })

    setTimeout(() => {
      expect(value).toBe("Resolved!")
      expect(promiseToResolve.wasAborted).toBe(false)
      expect(promiseToResolve.wasRejected).toBe(false)
      expect(promiseToResolve.wasResolved).toBe(true)
    }, serverResponseTime + 250)
  })()

  !(() => {
    let value
    const promiseToReject = abortableFetch(`http://localhost:${port}/nope`)

    expect(promiseToReject.wasAborted).toBe(false)
    expect(promiseToReject.wasRejected).toBe(false)
    expect(promiseToReject.wasResolved).toBe(false)

    promiseToReject
      .then(() => {
        value = "Resolved. :("
      })
      .catch(() => {
        value = "Rejected! :)"
      })

    setTimeout(() => {
      expect(value).toBe("Rejected! :)")
      expect(promiseToReject.wasAborted).toBe(false)
      expect(promiseToReject.wasRejected).toBe(true)
      expect(promiseToReject.wasResolved).toBe(false)
    }, serverResponseTime + 250)
  })()
})
