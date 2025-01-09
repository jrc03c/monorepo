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

helper.on("do-thing-1", async () => {
  await pause(Math.random() * 500 + 500)
  return "Thing 1 is finished!"
})

helper.on("do-thing-2", async () => {
  await pause(Math.random() * 500 + 500)
  return "Thing 2 is finished!"
})

helper.on("do-thing-3", async () => {
  await pause(Math.random() * 500 + 500)
  return "Thing 3 is finished!"
})

helper.on("return-after-30-seconds", async () => {
  await pause(30000)
})
