import { afterAll, expect, test } from "@jrc03c/fake-jest"
import { isEqual } from "@jrc03c/js-math-tools"
import { NodeTimer } from "./timer-node.mjs"
import { pause } from "@jrc03c/pause"
import fs from "node:fs"

const files = []

test("tests that the `NodeTimer` class works as expected", async () => {
  // confirm that the timer autosaves
  await (async () => {
    const file = `temp/logs-${Math.random().toString().split(".").at(-1)}.json`
    files.push(file)

    const timer = new NodeTimer({
      path: file,
      shouldAutoSave: true,
      shouldLogToConsole: false,
    })

    for (let i = 0; i < 10; i++) {
      if (i > 0) {
        timer.stop(timer.events.at(-1))
      }

      timer.start("Event" + i)

      await pause(100)

      expect(fs.existsSync(file)).toBe(true)

      expect(fs.readFileSync(file, "utf8").trim()).toBe(
        JSON.stringify(timer.toObject(), null, 2).trim(),
      )
    }

    timer.stopAll()
    expect(fs.existsSync(file)).toBe(true)

    expect(fs.readFileSync(file, "utf8").trim()).toBe(
      JSON.stringify(timer.toObject(), null, 2).trim(),
    )
  })()

  // confirm that timer autosaving can be turned off
  await (async () => {
    const file = `temp/logs-${Math.random().toString().split(".").at(-1)}.json`
    files.push(file)

    const timer = new NodeTimer({
      path: file,
      shouldAutoSave: false,
      shouldLogToConsole: false,
    })

    for (let i = 0; i < 10; i++) {
      if (i > 0) {
        timer.stop(timer.events.at(-1))
      }

      timer.start("Event" + i)

      await pause(100)

      expect(fs.existsSync(file)).toBe(false)
    }

    timer.stopAll()

    expect(fs.existsSync(file)).toBe(false)

    timer.save()

    expect(fs.existsSync(file)).toBe(true)

    expect(fs.readFileSync(file, "utf8").trim()).toBe(
      JSON.stringify(timer.toObject(), null, 2).trim(),
    )
  })()

  // confirm that timers can be rehydrated from disk
  await (async () => {
    const file = `temp/logs-${Math.random().toString().split(".").at(-1)}.json`
    files.push(file)

    const timer1 = new NodeTimer({
      path: file,
      shouldAutoSave: true,
      shouldLogToConsole: false,
    })

    for (let i = 0; i < 10; i++) {
      timer1.start("Event" + i)
      await pause(10)
    }

    timer1.stopAll()

    const timer2 = NodeTimer.fromFile(file)
    expect(isEqual(timer2, timer1)).toBe(true)
  })()
})

afterAll(() => {
  files.forEach(file => {
    try {
      fs.unlinkSync(file)
    } catch (e) {}
  })
})
