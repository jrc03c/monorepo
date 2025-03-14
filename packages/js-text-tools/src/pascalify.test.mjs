import { expect, test } from "@jrc03c/fake-jest"
import { pascalify } from "./pascalify.mjs"

test("tests `pascalify`", () => {
  expect(pascalify("foobarbaz")).toBe("Foobarbaz")

  expect(pascalify("Hello, world! My name is Josh!")).toBe(
    "HelloWorldMyNameIsJosh",
  )

  expect(pascalify("'42 is the number thou shalt count!'")).toBe(
    "42IsTheNumberThouShaltCount",
  )

  expect(pascalify("I don't like you.")).toBe("IDontLikeYou")

  expect(pascalify("howAboutNow")).toBe("HowAboutNow")

  expect(pascalify("heresAnotherOne_YesOrNo-orMaybeSo")).toBe(
    "HeresAnotherOneYesOrNoOrMaybeSo",
  )
})
