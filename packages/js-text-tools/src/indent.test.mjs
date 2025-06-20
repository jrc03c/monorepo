import { expect, test } from "@jrc03c/fake-jest"
import { indent } from "./indent.mjs"
import { map } from "@jrc03c/js-math-tools"

test("tests that indentation works as expected", () => {
  const a = "Hello, world!"
  const bTrue = "    Hello, world!"
  const bPred = indent(a, "    ")
  expect(bPred).toBe(bTrue)

  const c = "Hello, world!"
  const dTrue = "\t\t\t\tHello, world!"
  const dPred = indent(c, "\t\t\t\t")
  expect(dPred).toBe(dTrue)

  const e = [
    "  Hello, world!",
    "\t\t  My name is Josh!",
    "    \t\t  What's your name?",
  ].join("\n")

  const fTrue = map(e.split("\n"), line => "!!!!!!" + line).join("\n")
  const fPred = indent(e, "!!!!!!")
  expect(fPred).toBe(fTrue)

  const g = `
    *question: What's your name?
      Alice
      Bob
      Charlie
      Denise
      Something else...
  `

  const hTrue = map(
    g.split("\n"),
    line => {
      if (line.trim().length > 0) {
        return "\t\t" + line
      } else {
        return line
      }
    },
  ).join("\n")

  const hPred = indent(g, "\t\t")
  expect(hPred).toBe(hTrue)
})
