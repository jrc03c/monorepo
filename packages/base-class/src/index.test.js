const BaseClass = require(".")

test("tests that the `BaseClass` class works as expected", () => {
  const a = new BaseClass()
  let fooWasEmitted = false

  a.on("foo", () => {
    fooWasEmitted = true
  })

  a.emit("foo")
  expect(fooWasEmitted).toBe(true)

  let barWasEmitted = false
  const b = new BaseClass()
  const barCallback = () => (barWasEmitted = true)
  const unsubscribeFromBar = b.on("bar", barCallback)
  unsubscribeFromBar()
  b.emit("bar")
  expect(barWasEmitted).toBe(false)
  expect(b.subscriptions["bar"].indexOf(barCallback)).toBeLessThan(0)

  const c = new BaseClass()
  let bazCount = 0

  c.on("baz", () => {
    bazCount++
  })

  c.emit("baz")
  const d = c.copy()
  d.emit("baz")
  expect(bazCount).toBe(2)

  const e = new BaseClass()
  let helloWasEmitted = false
  const helloCallback = () => (helloWasEmitted = true)
  e.on("hello", helloCallback)
  e.off("hello", helloCallback)
  e.emit("hello")
  expect(e.subscriptions["hello"].length).toBe(0)
  expect(helloWasEmitted).toBe(false)
  expect(() => e.emit("something-else")).not.toThrow()

  class Person extends BaseClass {
    constructor(data) {
      super()
      data = data || {}
      this.name = data.name || "Nobody"
      this.age = data.age || 0
    }

    toObject() {
      return {
        ...super.toObject(),
        name: this.name,
        age: this.age,
      }
    }
  }

  const p1 = new Person({ name: "Alice", age: 23 })
  const pCallback = () => p1.age++
  p1.on("increment-age", pCallback)
  const p2 = p1.copy()
  expect(p1.name).toBe("Alice")
  expect(p2.name).toBe("Alice")
  expect(p1.age).toBe(23)
  expect(p2.age).toBe(23)
  p1.emit("increment-age")
  expect(p1.age).toBe(24)
  expect(p2.age).toBe(23)
})
