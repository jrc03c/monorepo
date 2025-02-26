import { config } from "./setup-and-teardown.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { getFilesDeep } from "../src/get-files-deep.mjs"
import { set, sort } from "@jrc03c/js-math-tools"

test("tests that files can be gotten deeply and asynchronously", async () => {
  config.setup()
  const results = sort(set(await getFilesDeep(config.root)))

  expect(results).toStrictEqual(
    sort(
      set(config.files.concat(config.fileSymlinks).concat(config.dirSymlinks)),
    ),
  )

  config.teardown()
})

test("tests that files can be gotten shallowly and asynchronously", async () => {
  config.setup()
  const depth = 3
  const resultsPred = await getFilesDeep(config.root, depth)

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
