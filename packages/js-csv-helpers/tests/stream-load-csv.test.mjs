import { DataFrame, isEqual, isNumber, normal } from "@jrc03c/js-math-tools"
import { loadCSV } from "../src/load-csv.mjs"
import { makeKey } from "@jrc03c/make-key"
import { saveCSV } from "../src/save-csv.mjs"
import { streamLoadCSV } from "../src/stream-load-csv.mjs"
import fs from "node:fs"

const files = []

test("tests that the `streamLoadCSV` function works as expected", async () => {
  const rows = 100
  const cols = 5
  const filename = makeKey(8) + ".csv"
  files.push(filename)

  const x = new DataFrame(normal([rows, cols]))
  expect(isEqual(x.shape, [rows, cols])).toBe(true)
  await saveCSV(filename, x)
  expect(isEqual(await loadCSV(filename, { inferTypes: true }), x)).toBe(true)

  const rowsPerChunk = 10
  const stream = streamLoadCSV(filename, { inferTypes: true, rowsPerChunk })
  const temp = []

  for await (const chunk of stream) {
    expect(isEqual(chunk.shape, [rowsPerChunk, cols])).toBe(true)

    chunk.values.forEach(row => {
      row.forEach(v => {
        expect(isNumber(v)).toBe(true)
      })

      temp.push(row)
    })
  }

  expect(isEqual(temp, x.values)).toBe(true)
})

afterAll(() => {
  files.forEach(f => {
    fs.rmSync(f, { force: true })
  })
})
