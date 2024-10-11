import { DataFrame } from "@jrc03c/js-math-tools"
import { unparse } from "../src/unparse.mjs"
import fs from "node:fs"
import path from "node:path"

test("tests that the test DataFrame can be converted to a CSV string correctly", () => {
  const stringTrue = fs
    .readFileSync(path.join(import.meta.dirname, "test.csv"), "utf8")
    .trim()

  const testData = JSON.parse(
    fs.readFileSync(path.join(import.meta.dirname, "test.json")),
  )

  const stringPred = unparse(new DataFrame(testData))
  expect(stringPred).toBe(stringTrue)
})
