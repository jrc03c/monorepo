import { expect, test } from "@jrc03c/fake-jest"
import { pause } from "@jrc03c/pause"
import { SceneWithUpdateLoop } from "./scene-with-update-loop.mjs"

test("tests that the `SceneWithUpdateLoop` class works as expected", async () => {
  const a = new SceneWithUpdateLoop()
  expect(a.lastUpdateTime).toBe(undefined)

  let updateCount = 0
  a.on("update", () => (updateCount += 1))

  a.start()
  await pause(100)

  const time1 = a.lastUpdateTime

  await pause(100)

  const time2 = a.lastUpdateTime

  await pause(100)

  const time3 = a.lastUpdateTime

  expect(time2).toBeGreaterThan(time1)
  expect(time3).toBeGreaterThan(time2)

  const lastUpdateCount = updateCount

  a.destroy()
  expect(a.isRunning).toBe(null)
  expect(a.lastUpdateTime).toBe(null)

  await pause(100)
  expect(updateCount).toBeGreaterThan(0)
  expect(updateCount).toBe(lastUpdateCount)
})
