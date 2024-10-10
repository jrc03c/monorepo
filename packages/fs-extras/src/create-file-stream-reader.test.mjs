import { createFileStreamReader } from "./create-file-stream-reader.mjs"
import { makeKey } from "@jrc03c/make-key"
import { random } from "@jrc03c/js-math-tools"
import fs from "node:fs"

const files = []

test("tests that the file stream reader works as expected", async () => {
  const numbers = random(1000)
  const file = makeKey(8) + ".txt"
  fs.writeFileSync(file, numbers.join("\n"), "utf8")
  files.push(file)

  const reader = await createFileStreamReader(file)
  let i = 0

  for await (const line of reader.read()) {
    expect(parseFloat(line)).toBe(numbers[i])
    i++
  }

  await reader.close()
  expect(i).toBe(numbers.length)
})

afterAll(() => {
  files.forEach(file => {
    fs.unlinkSync(file)
  })
})
