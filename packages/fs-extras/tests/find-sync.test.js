const { set, sort } = require("@jrc03c/js-math-tools")
const config = require("./setup-and-teardown.js")
const findSync = require("../src/find-sync.js")
const fs = require("fs")

test("tests that arbitrary files can be found synchronously", () => {
  config.setup()
  const fileTrue = config.files.random()
  const name = fileTrue.split("/").last
  const results = findSync(config.root, name)
  expect(results.length).toBe(1)
  expect(results[0]).toBe(fileTrue)
  config.teardown()
})

test("tests that arbitrary directories can be found synchronously", () => {
  config.setup()

  for (let i = 0; i < 100; i++) {
    const dirTrue = config.dirs.slice(1).random()
    const name = dirTrue.split("/").filter(p => p.length > 0).last
    const resultsTrue = sort(set(config.dirs.filter(d => d.includes(name))))

    const resultsPred = sort(
      set(
        findSync(config.root, path => {
          const stat = fs.lstatSync(path)
          return path.includes(name) && stat.isDirectory()
        })
      )
    )

    expect(resultsPred).toStrictEqual(resultsTrue)
  }

  config.teardown()
})
