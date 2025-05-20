import { expect, test } from "@jrc03c/fake-jest"
import { Scene } from "./index.mjs"

test("tests that the `Scene` class works as expected", () => {
  const a = new Scene()
  expect(a.isPaused).toBe(false)
  expect(a.isRunning).toBe(false)

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
})
