import { DataFrame, inferType, isEqual } from "@jrc03c/js-math-tools"
import { expect, test } from "@jrc03c/fake-jest"
import { loadCSV } from "../src/index-node.mjs"
import fs from "node:fs"
import path from "node:path"

test("tests that CSVs can be loaded from disk correctly", async () => {
  const testData = JSON.parse(
    fs.readFileSync(path.join(import.meta.dirname, "test.json")),
  )

  const dfTrue = new DataFrame(testData).apply(
    col => inferType(col.values).values,
  )

  const dfPred = await loadCSV(path.join(import.meta.dirname, "test.csv"), {
    inferTypes: true,
    header: true,
  })

  expect(isEqual(dfPred, dfTrue)).toBe(true)
})
