import { FileDB } from "./index.mjs"
import { afterAll, expect, test } from "@jrc03c/fake-jest"

import {
  forEach,
  isEqual,
  map,
  random,
  range,
} from "@jrc03c/js-math-tools"

import { makeKey } from "@jrc03c/make-key"
import fs from "node:fs"
import path from "node:path"

const TEST_DIRECTORY = path.join(import.meta.dirname, makeKey(8))
const db = new FileDB(TEST_DIRECTORY)
const otherDirs = []

test("tests that values can be randomly written and read", () => {
  const keyValuePairs = []

  for (let i = 0; i < 100; i++) {
    const pathLength = parseInt(Math.random() * 7 + 1)
    const keyParts = []

    for (let j = 0; j < pathLength; j++) {
      keyParts.push(makeKey(parseInt(Math.random() * 10 + 5)))
    }

    const key = "/" + keyParts.join("/")

    const value = (() => {
      const possibleValues = [
        Math.random(),
        makeKey(8),
        true,
        false,
        null,
        () => {},
        { hello: "world" },
        [1, 2, 3, 4, 5],
      ]

      return possibleValues[parseInt(Math.random() * possibleValues.length)]
    })()

    db.writeSync(key, value)
    keyValuePairs.push({ key, value })
  }

  for (let i = 0; i < keyValuePairs.length; i++) {
    const pair = keyValuePairs[i]
    const { key, value } = pair
    const actual = db.readSync(key)

    if (typeof value === "function") {
      expect(typeof actual === "undefined" || actual === null).toBe(true)
    } else {
      expect(isEqual(actual, value)).toBe(true)
    }
  }
})

test("tests that invalid keys throw errors", () => {
  function makeUglyKey() {
    const invalidChars = "~`!@#$%^&*()+={[}]|\\:;\"'<,>? "

    if (random() < 0.5) {
      return makeKey(8) + makeKey(8, invalidChars) + makeKey(8)
    } else {
      return (
        makeKey(8, invalidChars) +
        makeKey(8) +
        makeKey(8, invalidChars)
      )
    }
  }

  forEach(range(0, 100), () => {
    const uglyKey = makeUglyKey()
    const value = makeKey(64)

    expect(() => {
      db.writeSync(uglyKey, value)
    }).toThrow()

    expect(() => {
      db.readSync(uglyKey)
    }).toThrow()
  })

  expect(() => {
    db.writeSync("this has whitespace in it", "nope!")
  }).toThrow()

  expect(() => {
    db.readSync("this has whitespace in it", "nope!")
  }).toThrow()

  expect(() => {
    db.writeSync("this/has/./in/it", "nope!")
  }).toThrow()

  expect(() => {
    db.readSync("this/has/./in/it", "nope!")
  }).toThrow()

  expect(() => {
    db.writeSync("this/has/../in/it", "nope!")
  }).toThrow()

  expect(() => {
    db.readSync("this/has/../in/it", "nope!")
  }).toThrow()
})

test("tests that the asynchronous functionality works", async () => {
  const key = "/" + map(range(0, 5), () => makeKey(8)).join("/")
  const value = makeKey(64)
  let finishedWriting = false

  await db.write(key, value, null, () => {
    finishedWriting = true
  })

  expect(finishedWriting).toBe(true)
  const actual1 = await db.read(key)

  db.read(key, null, null, actual2 => {
    expect(isEqual(actual1, value)).toBe(true)
    expect(isEqual(actual2, value)).toBe(true)
  })
})

test("tests that arrays can be retrieved from disk", () => {
  // standard arrays
  const a = random(100)
  db.writeSync("/my/test/array", a)
  const b = db.readSync("/my/test/array")
  expect(isEqual(a, b)).toBe(true)
  expect(b instanceof Array).toBe(true)

  // arrays with missing values
  const c = [234, 345, null, undefined, "sneaky!"]
  db.writeSync("/my/second/test/array", c)
  const dTrue = []

  forEach(c, (v, i) => {
    if (v) dTrue[i] = v
  })

  const dPred = db.readSync("/my/second/test/array")
  expect(dPred).toStrictEqual(dTrue)

  // arrays with additional properties
  const e = ["a", "b", "c"]
  e.name = "The Alphabet"
  db.writeSync("/my/third/test/array", e)
  const f = db.readSync("/my/third/test/array")
  expect(isEqual(e, f)).toBe(true)
  expect(f instanceof Array).toBe(true)

  // non-arrays that quack like arrays
  const g = { 0: "yes", 1: "no", 2: "maybe", 3: "so" }
  db.writeSync("/arraylike-object", g)
  const h = db.readSync("/arraylike-object")

  expect(
    isEqual(
      map(Object.keys(g), key => g[key]),
      h,
    ),
  ).toBe(true)

  expect(h instanceof Array).toBe(true)

  // arrays with negative integer keys
  const i = [1, 3, 5, 7, 9]
  i[-1] = "eleven"
  const key = makeKey(8)
  db.writeSync("/" + key, i)
  const j = db.readSync("/" + key)
  expect(isEqual(i, j)).toBe(true)
  expect(j instanceof Array).toBe(true)

  // arrays written to disk without using filedb
  fs.mkdirSync(path.join(db.dbPath, "one-more-array-test"))
  const k = random(10)

  for (const i in k) {
    const value = k[i]

    fs.writeFileSync(
      path.join(db.dbPath, "one-more-array-test", i),
      value.toString(),
      "utf8",
    )
  }

  const l = db.readSync("/one-more-array-test")
  expect(isEqual(k, l)).toBe(true)
  expect(l instanceof Array).toBe(true)

  fs.rmSync(path.join(db.dbPath, "one-more-array-test"), {
    recursive: true,
    force: true,
  })
})

test("tests that files outside of the database path can't be read", () => {
  expect(() => {
    db.readSync("../../../foo/bar")
  }).toThrow()

  expect(() => {
    db.readSync("/test/$SOME_FOLDER")
  }).toThrow()

  expect(() => {
    db.readSync("/test/blah/../../$WHY")
  }).toThrow()

  expect(() => {
    db.readSync("~/secret")
  }).toThrow()
})

test("tests that malformed keys can't be read", () => {
  expect(() => {
    db.readSync("@#%^*!!!")
  }).toThrow()

  expect(() => {
    db.readSync("/how/ /about/ /this")
  }).toThrow()
})

test("tests that keys can be ignored when writing", () => {
  const keyToIgnore = makeKey(8)
  const data = {}
  data[keyToIgnore] = "ignored!"
  data["foobar"] = 234
  db.writeSync("/data/to/ignore/when/writing", data, [keyToIgnore])

  const read = db.readSync("/data/to/ignore/when/writing")
  expect(read["foobar"]).toBe(234)
  expect(typeof read[keyToIgnore] === "undefined").toBe(true)
})

test("tests that keys can be ignored when reading", () => {
  const data = {
    hello: "world",
    yesNo: "maybeSo",
  }

  db.writeSync("/data/to/ignore/when/reading", data)

  const pred = db.readSync("/data/to/ignore/when/reading", null, [/hello/g])
  expect(pred["yesNo"]).toBe("maybeSo")
  expect(typeof pred["hello"] === "undefined").toBe(true)
})

test("tests that very long keys can't be written", () => {
  expect(() => {
    db.writeSync(makeKey(9999), "does this work?")
  }).toThrow()
})

test("tests that instances can be forked", () => {
  const dir1 = makeKey(8)
  otherDirs.push(dir1)
  const db1 = new FileDB(dir1)
  const db2 = db1.fork()
  expect(db1.path).toBe(db2.path)

  const key1 = makeKey(8)
  const key2 = makeKey(8)
  const db3 = db2.fork(key1 + "/" + key2)
  expect(db3.path.includes(db2.path)).toBe(true)

  db3.writeSync("hello", "world")
  expect(db3.readSync("hello")).toBe("world")
  expect(db2.readSync(key1 + "/" + key2 + "/hello")).toBe("world")
})

afterAll(() => {
  fs.rmSync(TEST_DIRECTORY, { recursive: true, force: true })
  forEach(otherDirs, dir => fs.rmSync(dir, { recursive: true, force: true }))
})
