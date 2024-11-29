import { AbortablePromise } from "./index.mjs"
import express from "express"

test("tests that `AbortablePromise` works well with `AbortController`", async () => {
  const abortableFetch = (url, options) => {
    return new AbortablePromise((resolve, reject, abort, onAbort) => {
      try {
        const controller = new AbortController()

        fetch(url, { ...options, signal: controller.signal })
          .then(resolve)
          .catch(() => {})

        onAbort(() => controller.abort())
      } catch (e) {
        return reject(e)
      }
    })
  }

  const app = express()

  app.get("/", (request, response) => {
    setTimeout(() => response.send("Hello, world!"), 1000)
  })

  const server = app.listen(0, () => {
    let timeout, value

    const promise = abortableFetch("http://localhost:" + server.address().port)

    promise.then(response => {
      clearTimeout(timeout)
      server.close()
      response.then(v => (value = v))
    })

    promise.onAbort(v => {
      clearTimeout(timeout)
      server.close()
      value = v
    })

    timeout = setTimeout(() => promise.abort("Goodbye, world!"), 500)

    setTimeout(() => {
      expect(value).toBe("Goodbye, world!")
    }, 1250)
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

  const promise = countToNSlowly(5)
  let value

  promise.then(() => {
    clearTimeout(timeout)
    value = "Completed!"
  })

  promise.onAbort(() => {
    clearTimeout(timeout)
    value = "Aborted!"
  })

  let timeout = setTimeout(() => promise.abort(), 300)

  setTimeout(() => {
    expect(value).toBe("Aborted!")
  }, 750)
})
