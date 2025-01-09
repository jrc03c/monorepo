import { pause } from "@jrc03c/pause"
import { WebWorkerHelper } from "../dist/web-worker-helper.import.mjs"

const helper = new WebWorkerHelper()

helper.on("double", x => {
  return x * 2
})

helper.on("triple-after-a-while", async x => {
  await pause(3000)
  return x * 3
})

helper.on("run-progress-callbacks", async (x, progress) => {
  let p = 0

  while (p < 1) {
    progress(p)
    p += Math.random() / 10
    await pause(250)
  }

  progress(1)
  return
})
