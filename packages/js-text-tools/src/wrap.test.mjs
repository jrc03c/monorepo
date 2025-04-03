import { expect, test } from "@jrc03c/fake-jest"
import { makeKey } from "@jrc03c/make-key"
import { flatten, range } from "@jrc03c/js-math-tools"
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

test("tests that only wrapped lines are prefixed correctly", () => {
  const x = [
    "The purpose of this paper is to characterize simple",
    "sabotage, to outline its possible effects, and to present suggestions",
    "for inciting and executing it. Sabotage varies from highly technical _coup de main_ acts that require detailed planning and the use of",
    "specially-trained operatives, to innumerable simple acts which the ordinary individual citizen-saboteur can perform. This paper is primarily concerned with the latter type. Simple sabotage does not require specially prepared tools or equipment; it is executed by an ordinary citizen who may or may not act individually and without the necessity for active connection with an organized group; and it is carried out in such a way as to involve a minimum danger of injury, detection, and reprisal.",
  ].join("\n")

  const maxLength = 80
  const prefix = ">> "

  const yTrue = [
    "The purpose of this paper is to characterize simple",
    "sabotage, to outline its possible effects, and to present suggestions",
    "for inciting and executing it. Sabotage varies from highly technical _coup de",
    ">> main_ acts that require detailed planning and the use of",
    "specially-trained operatives, to innumerable simple acts which the ordinary",
    ">> individual citizen-saboteur can perform. This paper is primarily concerned",
    ">> with the latter type. Simple sabotage does not require specially prepared",
    ">> tools or equipment; it is executed by an ordinary citizen who may or may not",
    ">> act individually and without the necessity for active connection with an",
    ">> organized group; and it is carried out in such a way as to involve a minimum",
    ">> danger of injury, detection, and reprisal.",
  ].join("\n")

  const yPred = wrap(x, maxLength, prefix)
  expect(yPred).toBe(yTrue)
})

test("tests that wrapping preserves empty lines", () => {
  const x = ["hello", "  ", "world", "\t", "  !!!", "", "\t\t???"].join("\n")
  const yTrue = x.slice()
  const yPred = wrap(x)
  expect(yPred).toBe(yTrue)
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
