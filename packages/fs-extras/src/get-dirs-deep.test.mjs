import { config } from "./setup-and-teardown.mjs"
import { getDirsDeep } from "../src/get-dirs-deep.mjs"
import { set, sort } from "@jrc03c/js-math-tools"

test("tests that directories can be gotten deeply and asynchronously", async () => {
  config.setup()
  const results = [config.root].concat(await getDirsDeep(config.root))
  expect(results).toStrictEqual(sort(set(config.dirs)))
  config.teardown()
})

test("tests that directories can be gotten shallowly and asynchronously", async () => {
  config.setup()
  const depth = 3
  const results = [config.root].concat(await getDirsDeep(config.root, depth))

  results.forEach(result => {
    const parts = result
      .replaceAll(config.root, "")
      .split("/")
      .filter(p => p.length > 0)

    expect(parts.length).toBeLessThanOrEqualTo(depth)
  })

  config.teardown()
})
