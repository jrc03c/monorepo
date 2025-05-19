import { expect, test } from "@jrc03c/fake-jest"
import { Scene } from "./index.mjs"

test("tests that the `Scene` class works as expected", () => {
  const a = new Scene()
  expect(a.isPaused).toBe(false)
  expect(a.isRunning).toBe(false)

  let startTriggerCount = 0
  let pauseTriggerCount = 0
  let unpauseTriggerCount = 0
  let stopTriggerCount = 0
  let destroyTriggerCount = 0

  a.on("start", () => (startTriggerCount += 1))
  a.on("pause", () => (pauseTriggerCount += 1))
  a.on("unpause", () => (unpauseTriggerCount += 1))
  a.on("stop", () => (stopTriggerCount += 1))
  a.on("destroy", () => (destroyTriggerCount += 1))

  a.start()
  expect(a.isPaused).toBe(false)
  expect(a.isRunning).toBe(true)
  
  a.pause()
  expect(a.isPaused).toBe(true)
  expect(a.isRunning).toBe(true)
  
  a.unpause()
  expect(a.isPaused).toBe(false)
  expect(a.isRunning).toBe(true)

  a.stop()
  expect(a.isPaused).toBe(false)
  expect(a.isRunning).toBe(false)

  a.start()
  a.pause()
  a.stop()
  expect(a.isPaused).toBe(true)
  expect(a.isRunning).toBe(false)

  a.destroy()
  expect(startTriggerCount).toBe(2)
  expect(pauseTriggerCount).toBe(2)
  expect(unpauseTriggerCount).toBe(1)
  expect(stopTriggerCount).toBe(2)
  expect(destroyTriggerCount).toBe(1)
})