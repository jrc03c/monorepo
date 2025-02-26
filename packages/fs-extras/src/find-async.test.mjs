import { config } from "./setup-and-teardown.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { findAsync } from "../src/find-async.mjs"
import { set, sort } from "@jrc03c/js-math-tools"
import fs from "node:fs"

test("tests that arbitrary files can be found asynchronously", async () => {
  config.setup()
  const fileTrue = config.files.random()
  const name = fileTrue.split("/").last
  const results = await findAsync(config.root, name)
  expect(results.length).toBe(1)
  expect(results[0]).toBe(fileTrue)
  config.teardown()
})

test("tests that arbitrary directories can be found asynchronously", async () => {
  config.setup()

  for (let i = 0; i < 100; i++) {
    const dirTrue = config.dirs.slice(1).random()
    const name = dirTrue.split("/").filter(p => p.length > 0).last
    const resultsTrue = sort(set(config.dirs.filter(d => d.includes(name))))

    const resultsPred = sort(
      set(
        await findAsync(config.root, path => {
          const stat = fs.lstatSync(path)
          return path.includes(name) && stat.isDirectory()
        }),
      ),
    )

    expect(resultsPred).toStrictEqual(resultsTrue)
  }

  config.teardown()
})
