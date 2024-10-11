import { config } from "./setup-and-teardown.mjs"
import { getDirsDeepSync } from "../src/get-dirs-deep-sync.mjs"
import { set, sort } from "@jrc03c/js-math-tools"

test("tests that directories can be gotten deeply and synchronously", () => {
  config.setup()
  const results = [config.root].concat(getDirsDeepSync(config.root))
  expect(results).toStrictEqual(sort(set(config.dirs)))
  config.teardown()
})

test("tests that directories can be gotten shallowly and synchronously", () => {
  config.setup()
  const depth = 3
  const resultsPred = [config.root].concat(getDirsDeepSync(config.root, depth))

  const resultsTrue = config.dirs.filter(dir => {
    const parts = dir
      .replaceAll(config.root, "")
      .split("/")
      .filter(p => p.length > 0)

    return parts.length <= depth
  })

  expect(sort(set(resultsPred))).toStrictEqual(sort(set(resultsTrue)))
  config.teardown()
})
