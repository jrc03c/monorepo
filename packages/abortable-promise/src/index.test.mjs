import { AbortablePromise } from "./index.mjs"
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
        .then(response => resolve(response))
        .catch(() => {})

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
