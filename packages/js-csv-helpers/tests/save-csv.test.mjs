import { afterAll, expect, test } from "@jrc03c/fake-jest"
import { DataFrame } from "@jrc03c/js-math-tools"
import { saveCSV } from "../src/index-node.mjs"
import fs from "node:fs"
import path from "node:path"

const fileTrue = path.join(import.meta.dirname, "test.csv")
const filePred = path.join(import.meta.dirname, "test-saved.csv")

test("tests that CSVs can be written correctly to disk", async () => {
  const stringTrue = fs.readFileSync(fileTrue, "utf8").trim()

  const testData = JSON.parse(
    fs.readFileSync(path.join(import.meta.dirname, "test.json")),
  )

  const df = new DataFrame(testData)

  await saveCSV(filePred, df)

  const stringPred = fs.readFileSync(filePred, "utf8").trim()
  expect(stringPred).toBe(stringTrue)
})

afterAll(() => {
  fs.unlinkSync(filePred)
})
