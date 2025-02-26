import { expect, test } from "@jrc03c/fake-jest"
import { makeKey } from "@jrc03c/make-key"
import { range } from "@jrc03c/js-math-tools"
import { wrap } from "./wrap.mjs"

test("tests that line lengths are correctly constrained", () => {
  const text = range(0, 1000)
    .map(() => makeKey(8))
    .join(" ")

  const maxLineLengths = [40, 80, 120]

  maxLineLengths.forEach(maxLineLength => {
    const wrapped = wrap(text, maxLineLength)

    wrapped.split("\n").forEach(line => {
      expect(line.length).toBeLessThanOrEqualTo(maxLineLength)
    })
  })
})

test("tests that wrapping preserves indentation", () => {
  const text =
    "\t\tLorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mollis tellus eu mi condimentum, a congue ipsum luctus. Donec vel suscipit dolor, vitae faucibus massa. Curabitur rhoncus semper tortor et mattis. Nullam laoreet lobortis nibh eget viverra. Nam molestie risus vitae ante placerat convallis. Pellentesque quis tristique dui. Vivamus efficitur mi erat, nec gravida felis posuere at. Donec sapien ipsum, viverra et aliquam quis, posuere ac ligula. Aenean egestas tincidunt mauris, in hendrerit tortor malesuada id. Proin viverra sodales ex eu fermentum. Aenean nisl ipsum, tristique venenatis massa eget, tempor facilisis felis. Praesent aliquam sem vitae arcu porta commodo. Aliquam tempor sollicitudin dapibus. Nulla ullamcorper orci eu ultricies cursus."

  const wrapped1 = wrap(text, 40)
  const lines1 = wrapped1.split("\n")

  lines1.forEach(line => {
    expect(line.startsWith("\t\t")).toBe(true)
    expect(line.length).toBeLessThanOrEqualTo(40)
  })
})

test("tests that hanging indents / wrapped line prefixes work correctly", () => {
  const prefix = ">> "
  const maxLength = 80

  const ytrue = range(0, 10)
    .map(i => {
      const line = ((i > 0 ? prefix : "") + makeKey(maxLength))
        .slice(0, maxLength)
        .split("")

      for (let i = 0; i < 0.25 * line.length; i++) {
        const index = Math.floor(Math.random() * line.length)

        if (
          index >= prefix.length &&
          line[index - 1] !== " " &&
          line[index + 1] !== " "
        ) {
          line[index] = " "
        }
      }

      return line.join("")
    })
    .join("\n")

  const x = ytrue
    .split("\n")
    .map(line => line.replace(prefix, ""))
    .join(" ")

  const ypred = wrap(x, maxLength, prefix)
  expect(ypred).toBe(ytrue)
})

test("tests that errors are thrown at appropriate times", () => {
  const rights = [
    ["Hello, world!", null],
    ["Hello, world!", undefined],
  ]

  rights.forEach(pair => {
    expect(() => {
      wrap(pair[0], pair[1])
    }).not.toThrow()
  })

  expect(() => {
    wrap("Hello, world!")
  }).not.toThrow()

  const wrongs = [
    [234, 80],
    [true, 80],
    [false, 80],
    [null, 80],
    [undefined, 80],
    [{}, 80],
    [[], 80],
    [() => {}, 80],
    ["Hello, world!", "foobar"],
    ["Hello, world!", true],
    ["Hello, world!", false],
    ["Hello, world!", {}],
    ["Hello, world!", []],
    ["Hello, world!", () => {}],
  ]

  wrongs.forEach(pair => {
    expect(() => {
      wrap(pair[0], pair[1])
    }).toThrow()
  })
})
