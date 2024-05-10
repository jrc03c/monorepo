test("subscribes and unsubscribes callbacks", () => {
  const Radio = require(".")
  const radio = new Radio()
  const fn1 = () => {}
  radio.subscribe("foo", fn1)
  expect(radio.subscriptions["foo"][0]).toBe(fn1)

  const fn2 = x => x * 2
  radio.subscribe("foo", fn2)
  expect(radio.subscriptions["foo"][1]).toBe(fn2)

  radio.unsubscribe("foo", fn1)
  expect(radio.subscriptions["foo"].indexOf(fn1)).toBe(-1)
  expect(radio.subscriptions["foo"][0]).toBe(fn2)

  radio.unsubscribe("foo", fn2)
  expect(radio.subscriptions["foo"].length).toBe(0)

  expect(() => {
    const fn3 = x => x * 3
    radio.unsubscribe("bar", fn3)
  }).not.toThrow()
})

test("broadcasts using callbacks", () => {
  const Radio = require(".")
  const radio = new Radio()
  let x = 5

  radio.subscribe("foo", () => {
    x *= 2
  })

  radio.broadcast("foo")
  radio.broadcast("foo")
  radio.broadcast("foo")
  expect(x).toBe(40)

  let name = "Josh"

  radio.subscribe("new-name", newName => {
    name = newName
  })

  radio.broadcast("new-name", "Ronald")
  expect(name).toBe("Ronald")
})

test("checks singleton identity", () => {
  const s1 = (() => {
    return require(".").singleton
  })()

  const s2 = (() => {
    return require(".").singleton
  })()

  expect(s1 === s2).toBe(true)
})
