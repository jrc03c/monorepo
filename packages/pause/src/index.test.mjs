import { pause } from "./index.mjs"

!(async () => {
  const start = performance.now()

  for (let i = 0; i < 100; i++) {
    const t = Math.floor(Math.random() * 100)
    const elapsed = await pause(t)

    if (typeof elapsed !== "number" || isNaN(elapsed)) {
      throw new Error(
        `The function was supposed to return a number representing the number of milliseconds that elapsed since the function was called, but instead it returned a ${typeof elapsed} value! (${elapsed})`,
      )
    }

    // there should be less than 10ms difference between the given time and the
    // actual elapsed time
    if (Math.abs(elapsed - t) > 10) {
      throw new Error(
        `The function was supposed to wait for ${t}ms, but instead it waited for ${elapsed}ms!`,
      )
    }
  }

  const seconds = (performance.now() - start) / 1000

  console.log(
    `🎉 All asynchronous tests passed! (${seconds.toFixed(2)} seconds)`,
  )
})()
