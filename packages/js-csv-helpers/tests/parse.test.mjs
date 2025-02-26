import { DataFrame, inferType, isEqual } from "@jrc03c/js-math-tools"
import { expect, test } from "@jrc03c/fake-jest"
import { parse } from "../src/index-node.mjs"
import fs from "node:fs"
import path from "node:path"

test("tests that the test CSV string can be parsed correctly", () => {
  // NOTE: The way I constructed this test was:
  //
  // 1) I generated a pandas DataFrame with a bunch of random and missing
  //    values in Python.
  // 2) I used the pandas DataFrame `to_json` method to save the DataFrame to
  //    disk.
  // 3) I imported the JSON in Node and cleaned up the object a bit so that it
  //    ended up in a form that could be easily used to create js-math-tools
  //    DataFrames.
  // 4) I added a bit where all number values would be trimmed to 10 decimal
  //    places. That's because the JSON outputted by pandas and the original
  //    CSV had different numbers of decimal places.
  //
  // So, once both data sets were imported, parsed, and had had their types
  // inferred, they were identical.

  const dataTrue = new DataFrame(
    JSON.parse(
      fs.readFileSync(path.join(import.meta.dirname, "test.json"), "utf8"),
    ),
  ).apply(col => {
    const results = inferType(col.values).values

    if (results.type === "number") {
      results.values = results.values.map(v => parseFloat(v.toFixed(10)))
    }

    return results.values
  })

  const dataPred = parse(
    fs.readFileSync(path.join(import.meta.dirname, "test.csv"), "utf8"),
    {
      header: true,
    },
  ).apply(col => {
    const results = inferType(col.values).values

    if (results.type === "number") {
      results.values = results.values.map(v => parseFloat(v.toFixed(10)))
    }

    return results.values
  })

  expect(isEqual(dataPred, dataTrue)).toBe(true)
})
