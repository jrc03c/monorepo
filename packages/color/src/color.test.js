const Color = require("./color.js")

test("tests that the Color class works as expected", () => {
  const c = new Color()
  c.rgb = [47, 188, 174]

  expect(Math.abs(c.hsl.h - 174)).toBeLessThan(1)
  expect(Math.abs(c.hsl.s - 0.6)).toBeLessThan(0.01)
  expect(Math.abs(c.hsl.l - 0.4625)).toBeLessThan(0.01)

  expect(Math.abs(c.hsv.h - 174)).toBeLessThan(1)
  expect(Math.abs(c.hsv.s - 0.75)).toBeLessThan(0.01)
  expect(Math.abs(c.hsv.v - 0.74)).toBeLessThan(0.01)

  expect(Math.abs(c.rgb.r - 47)).toBeLessThan(1)
  expect(Math.abs(c.rgb.g - 188)).toBeLessThan(1)
  expect(Math.abs(c.rgb.b - 174)).toBeLessThan(1)

  expect(c.hex.value).toBe("2fbcae")

  c.hsl = [123, 0.45, 0.67]
  expect(c.hsl.h).toBe(123)
  expect(c.hsl.s).toBe(0.45)
  expect(c.hsl.l).toBe(0.67)

  c.hsv = [234, 0.56, 0.78]
  expect(c.hsv.h).toBe(234)
  expect(c.hsv.s).toBe(0.56)
  expect(c.hsv.v).toBe(0.78)

  c.hex = "ffeedd"
  expect(c.hex.value).toBe("ffeedd")
})
