import { WebWorkerHelper } from "../dist/web-worker-helper.import.mjs"

function pause(ms) {
  return new Promise((resolve, reject) => {
    try {
      return setTimeout(() => resolve(), ms)
    } catch (e) {
      return reject(e)
    }
  })
}

const helper = new WebWorkerHelper()

helper.on("double", x => {
  return x * 2
})

helper.on("triple", x => {
  return x * 3
})

helper.on("some-long-operation", async (x, progress) => {
  let counter = 0
  const counterMax = 1

  while (counter < counterMax) {
    progress(counter / counterMax)
    counter += Math.random() / 10
    await pause(250)
  }

  return 42
})

helper.on("throw-an-error", () => {
  throw new Error(
    "The web worker threw this error merely for demonstration purposes. Don't worry about it. 😁",
  )
})
