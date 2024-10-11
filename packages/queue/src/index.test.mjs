import { pause } from "@jrc03c/pause"
import { Queue } from "./index.mjs"

test("tests that queues work when no time is specified", async () => {
  const queue = new Queue()
  const start = new Date()

  const id1 = queue.append(() => 1)
  const id2 = queue.append(() => 2)
  const id3 = queue.append(() => 3)
  expect(queue.isRunning).toBe(true)

  const result1 = await queue.retrieve(id1)
  const elapsed1 = new Date() - start
  expect(result1).toBe(1)
  expect(elapsed1).toBeGreaterThanOrEqualTo(0)
  expect(elapsed1).toBeLessThan(25)

  const result2 = await queue.retrieve(id2)
  const elapsed2 = new Date() - start
  expect(result2).toBe(2)
  expect(elapsed2).toBeGreaterThanOrEqualTo(100)
  expect(elapsed2).toBeLessThan(125)

  const result3 = await queue.retrieve(id3)
  const elapsed3 = new Date() - start
  expect(result3).toBe(3)
  expect(elapsed3).toBeGreaterThanOrEqualTo(200)
  expect(elapsed3).toBeLessThan(225)

  await pause(200)
  expect(queue.isRunning).toBe(false)
  queue.destroy()
})

test("tests that queues work when a time is specified", async () => {
  const queue = new Queue(1234)
  const start = new Date()

  const id1 = queue.append(async () => {
    await pause(150)
    return "Hello, world!"
  })

  const id2 = queue.append(async () => {
    await pause(150)
    return "Goodbye, world!"
  })

  expect(queue.isRunning).toBe(true)

  const result1 = await queue.retrieve(id1)
  const elapsed1 = new Date() - start
  expect(result1).toBe("Hello, world!")
  expect(elapsed1).toBeGreaterThanOrEqualTo(150)
  expect(elapsed1).toBeLessThan(175)

  const result2 = await queue.retrieve(id2)
  const elapsed2 = new Date() - start
  expect(result2).toBe("Goodbye, world!")
  expect(elapsed2).toBeGreaterThanOrEqualTo(150 + 1234)
  expect(elapsed2).toBeLessThan(150 + 1234 + 25)

  await pause(1500)
  expect(queue.isRunning).toBe(false)
  queue.destroy()
})
