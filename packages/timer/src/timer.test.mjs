import { expect, test } from "@jrc03c/fake-jest"
import { pause } from "@jrc03c/pause"
import { Timer } from "./timer.mjs"

test("tests that the base `Timer` class works as expected", async () => {
  const timer = new Timer({ shouldLogToConsole: false })

  expect(timer.events.length).toBe(0)
  expect(timer.shouldLogToConsole).toBe(false)

  const allEventsStart = new Date()

  // confirm that the timer can start events
  timer.start("Event1")
  const event1Start = new Date()
  expect(timer.events.length).toBe(1)
  expect(timer.events[0].name).toBe("Event1")
  expect(timer.events[0].timer).toBe(timer)
  expect(timer.events[0].duration).toBe(-1)

  timer.start("Event2")
  const event2Start = new Date()
  expect(timer.events.length).toBe(2)
  expect(timer.events[1].name).toBe("Event2")
  expect(timer.events[1].timer).toBe(timer)
  expect(timer.events[1].duration).toBe(-1)

  await pause(1000)

  // confirm that the timer can stop events
  expect(timer.events.length).toBe(2)
  expect(timer.events[0].name).toBe("Event1")
  expect(timer.events[0].timer).toBe(timer)
  expect(timer.events[0].duration).toBe(-1)

  timer.stop("Event2")
  const event2Duration = new Date() - event2Start
  expect(timer.events.length).toBe(2)
  expect(timer.events[1].name).toBe("Event2")
  expect(timer.events[1].timer).toBe(null)
  expect(Math.abs(timer.events[1].duration - event2Duration)).toBeLessThan(10)

  await pause(1000)

  timer.stop("Event1")
  const event1Duration = new Date() - event1Start
  expect(timer.events.length).toBe(2)
  expect(timer.events[0].name).toBe("Event1")
  expect(timer.events[0].timer).toBe(null)
  expect(Math.abs(timer.events[0].duration - event1Duration)).toBeLessThan(10)

  expect(timer.events[0].duration - timer.events[1].duration).toBeGreaterThan(
    990,
  )

  // confirm that calling a timer's `stop` method is functionally equivalent to
  // calling an event's `stop` method
  timer.start("Event3")
  const event4 = timer.start("Event4")

  await pause(1000)

  timer.stop("Event3")
  event4.stop()

  expect(timer.events.length).toBe(4)
  expect(timer.events[2].name).toBe("Event3")
  expect(timer.events[2].timer).toBe(null)
  expect(Math.abs(timer.events[2].duration - 1000)).toBeLessThan(10)

  expect(timer.events[3].name).toBe("Event4")
  expect(timer.events[3].timer).toBe(null)
  expect(Math.abs(timer.events[3].duration - 1000)).toBeLessThan(10)

  expect(Math.abs(timer.events[2].start - timer.events[3].start)).toBeLessThan(
    10,
  )

  expect(
    Math.abs(timer.events[2].duration - timer.events[3].duration),
  ).toBeLessThan(10)

  // confirm that the `stopAll` method will in fact stop all events
  timer.start("Event5")
  await pause(100)
  timer.start("Event6")
  await pause(100)
  timer.start("Event7")
  await pause(100)
  timer.stopAll()
  const allEventsDuration = new Date() - allEventsStart

  expect(timer.events.length).toBe(7)
  expect(timer.events.every(e => e.timer === null)).toBe(true)
  expect(timer.events.every(e => e.duration >= 100)).toBe(true)

  // confirm that the `totalTime` property returns correct values
  expect(Math.abs(timer.totalTime - allEventsDuration)).toBeLessThan(100)

  // confirm that the `toObject` method works as expected
  const obj = timer.toObject()
  expect(obj instanceof Timer).toBe(false)
  expect(typeof obj).toBe("object")
  expect(obj.events.length).toBe(timer.events.length)

  obj.events.forEach((e, i) => {
    expect(e.name).toBe(timer.events[i].name)
    expect(e.start).toBe(timer.events[i].start.getTime())
    expect(e.duration).toBe(timer.events[i].duration)
  })

  expect(obj.shouldLogToConsole).toBe(timer.shouldLogToConsole)
})
