test("tests that fake-jest works at all!", () => {
  expect(5).toBe(5)
})

test("tests the `toBe` method!", () => {
  expect(5).toBe(5)
  expect(5).not.toBe(6)
  expect(NaN).toBe(NaN)
})

test("tests the `toBeCloseTo` method", () => {
  expect(5).toBeCloseTo(5.0000000001)
  expect(5).not.toBeCloseTo(6)
  expect(5).toBeCloseTo(6, 10)
})

test("tests the `toBeGreaterThan` method", () => {
  expect(5).toBeGreaterThan(4)
  expect(5).not.toBeGreaterThan(5)
  expect(5).not.toBeGreaterThan(6)
})

test("tests the `toBeGreaterThanOrEqualTo` method", () => {
  expect(5).toBeGreaterThanOrEqualTo(4)
  expect(5).toBeGreaterThanOrEqualTo(5)
  expect(5).not.toBeGreaterThanOrEqualTo(6)
})

test("tests the `toBeLessThan` method", () => {
  expect(5).not.toBeLessThan(4)
  expect(5).not.toBeLessThan(5)
  expect(5).toBeLessThan(6)
})

test("tests the `toBeLessThanOrEqualTo` method", () => {
  expect(5).not.toBeLessThanOrEqualTo(4)
  expect(5).toBeLessThanOrEqualTo(5)
  expect(5).toBeLessThanOrEqualTo(6)
})

test("tests the `toBeNaN` method", () => {
  expect(NaN).toBeNaN()
  expect("foo").toBeNaN()
  expect(5).not.toBeNaN()
})

test("tests the `toStrictEqual` method", () => {
  const a = [
    [2, 3, 4],
    [5, 6, 7],
  ]

  const b = [
    [2, 3, 4],
    [5, 6, 7],
  ]

  const c = [
    [-2, -3, -4],
    [-5, -6, -7],
  ]

  expect(a).toStrictEqual(b)
  expect(b).toStrictEqual(a)
  expect(a).not.toStrictEqual(c)
  expect(c).not.toStrictEqual(a)
})

test("tests the `toThrow` method", () => {
  expect(() => {
    throw new Error()
  }).toThrow()

  expect(() => {
    const x = {}
    x.foo()
  }).toThrow()

  expect(() => {
    Math.random()
  }).not.toThrow()
})

beforeAll(() => {
  console.log("This should be printed before anything else happens!")
})

afterAll(() => {
  console.log("This should be printed after everything else is done!")
})
