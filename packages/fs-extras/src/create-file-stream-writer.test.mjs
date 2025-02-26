import { afterAll, expect, test } from "@jrc03c/fake-jest"
import { createFileStreamWriter } from "./create-file-stream-writer.mjs"
import { makeKey } from "@jrc03c/make-key"
import { random } from "@jrc03c/js-math-tools"
import fs from "node:fs"

const files = []

test("tests that the file stream writer works as expected", async () => {
  const numbers = random(1000)
  const file = makeKey(8) + ".txt"
  files.push(file)

  const writer = createFileStreamWriter(file)

  for (const n of numbers) {
    await writer.write(n + "\n")
  }

  await writer.close()

  const raw = fs.readFileSync(file, "utf8")

  raw.split("\n").forEach((line, i) => {
    line = line.trim()
    if (line.length === 0) return
    const n = parseFloat(line)
    expect(n).toBe(numbers[i])
  })
})

afterAll(() => {
  files.forEach(file => {
    fs.unlinkSync(file)
  })
})
