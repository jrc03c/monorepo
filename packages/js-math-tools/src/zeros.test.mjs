import { expect, test } from "@jrc03c/fake-jest"
import { set } from "./set.mjs"
import { shape } from "./shape.mjs"
import { zeros } from "./zeros.mjs"

test("gets a tensor of zeros", () => {
  const x = zeros([2, 3, 4, 5])
  expect(set(x)).toStrictEqual([0])
  expect(shape(x)).toStrictEqual([2, 3, 4, 5])
  expect(zeros([2n, 3n, 4n])).toStrictEqual(zeros([2, 3, 4]))
})

test("throws an error when attempting to get zeros with non-whole-number arguments", () => {
  expect(() => {
    zeros(-1)
  }).toThrow()

  expect(() => {
    zeros([-2, -3, -4])
  }).toThrow()

  expect(() => {
    zeros({})
  }).toThrow()

  expect(() => {
    zeros(true)
  }).toThrow()

  expect(() => {
    zeros(false)
  }).toThrow()

  expect(() => {
    zeros(null)
  }).toThrow()

  expect(() => {
    zeros(undefined)
  }).toThrow()

  expect(() => {
    zeros(() => {})
  }).toThrow()
})
