import { expect, test } from "@jrc03c/fake-jest"
import { replaceAll } from "./replace-all.mjs"

test("tests `replaceAll`", () => {
  expect(replaceAll("foobar", "o", "z")).toBe("fzzbar")
  expect(replaceAll("Hello, world!", "!", "?")).toBe("Hello, world?")
})
