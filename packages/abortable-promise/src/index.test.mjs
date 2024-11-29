import { AbortablePromise } from "./index.mjs"
import express from "express"

test("tests that `AbortablePromise` works well with `AbortController`", async () => {
  const abortableFetch = (url, options) => {
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

  const app = express()
  const returnTime = 500

  app.get("/", (request, response) => {
    setTimeout(() => response.send("Hello, world!"), returnTime)
  })

  const server = app.listen(0, () => {
    for (let i = 0; i < 100; i++) {
      let timeout, value

      const promise = abortableFetch(
        "http://localhost:" + server.address().port,
      )

      promise.then(response => {
        clearTimeout(timeout)
        response.text().then(v => (value = v))
      })

      promise.onAbort(v => {
        clearTimeout(timeout)
        value = v
      })

      const ms = Math.random() < 0.5 ? returnTime * 0.5 : returnTime * 1.5
      timeout = setTimeout(() => promise.abort("Goodbye, world!"), ms)

      setTimeout(() => {
        expect(value).toBe(
          ms < returnTime ? "Goodbye, world!" : "Hello, world!",
        )
      }, 1000)
    }

    setTimeout(() => server.close(), 1000)
  })
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
