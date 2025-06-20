import { expect, test } from "@jrc03c/fake-jest"
import { map } from "@jrc03c/js-math-tools"
import { unindent } from "./unindent.mjs"

test("tests that unindentation works as expected", () => {
  const a = "Hello, world!"
  const bTrue = a
  const bPred = unindent(a)
  expect(bPred).toBe(bTrue)

  const c = [
    "    Hello, world!",
    "        My name is Josh.",
    "  What's your name?",
  ].join("\n")

  const dTrue = map(c.split("\n"), line => line.substring(2)).join("\n")
  const dPred = unindent(c)
  expect(dPred).toBe(dTrue)

  const e = [
    "\t         \t  Hello, world!",
    "\tMy name is Josh",
    "\t  \t\t    Yep, that's all!",
  ].join("\n")

  const fTrue = map(e.split("\n"), line => line.substring(1)).join("\n")
  const fPred = unindent(e)
  expect(fPred).toBe(fTrue)

  const g = `
    *question: What's your name?
      Alice
      Bob
      Charlie
      Denise
      Something else...
  `

  const hTrue = `*question: What's your name?\n  Alice\n  Bob\n  Charlie\n  Denise\n  Something else...`
  const hPred = unindent(g).trim()
  expect(hPred).toBe(hTrue)
})
