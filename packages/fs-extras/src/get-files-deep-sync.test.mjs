import { config } from "./setup-and-teardown.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { getFilesDeepSync } from "../src/get-files-deep-sync.mjs"
import { set, sort } from "@jrc03c/js-math-tools"
import fs from "node:fs"

test("tests that files can be gotten deeply and synchronously", () => {
  config.setup()
  const results = sort(set(getFilesDeepSync(config.root)))

  expect(results).toStrictEqual(
    sort(
      set(config.files.concat(config.fileSymlinks).concat(config.dirSymlinks)),
    ),
  )

  config.teardown()
})

test("tests that files can be gotten shallowly and synchronously", () => {
  config.setup()
  const depth = 3
  const resultsPred = getFilesDeepSync(config.root, depth)

  const resultsTrue = config.files
    .concat(config.fileSymlinks)
    .concat(config.dirSymlinks)
    .filter(file => {
      const parts = file
        .replaceAll(config.root, "")
        .split("/")
        .filter(p => p.length > 0)

      return parts.length <= depth
    })

  expect(sort(set(resultsPred))).toStrictEqual(sort(set(resultsTrue)))
  config.teardown()
})

test("tests that symlinks are included", () => {
  config.setup()
  const files = sort(set(getFilesDeepSync(config.root)))
  expect(files.some(f => fs.lstatSync(f).isSymbolicLink())).toBe(true)
  config.teardown()
})
