import { freeze } from "./index.mjs"

test("tests that one-dimensional arrays are correctly frozen", () => {
  const x = freeze([2, 3, 4])

  x[0] = 5
  expect(x[0]).toBe(2)

  expect(() => {
    x.push(5)
  }).not.toThrow()

  expect(() => {
    x.splice(0, 1)
  }).not.toThrow()

  delete x[0]
  expect(x[0]).toBe(2)

  expect(() => {
    Object.defineProperty(x, [0], {
      get() {
        return "foo"
      },
    })
  }).not.toThrow()

  expect(() => {
    Object.defineProperties(x, {
      hello: {
        get() {
          return "world"
        },
      },
    })
  }).not.toThrow()

  x.prototype = Number
  expect(x.prototype).toBe(undefined)

  expect(() => {
    x[0]
  }).not.toThrow()

  expect(x).toStrictEqual([2, 3, 4])
})

test("tests that two-dimensional arrays are correctly frozen", () => {
  const x = freeze([
    [2, 3, 4],
    [5, 6, 7],
  ])

  x[0] = "foo"
  expect(x[0]).toStrictEqual([2, 3, 4])

  x[0][0] = "foo"
  expect(x[0][0]).toBe(2)

  expect(() => {
    x.push(5)
  }).not.toThrow()

  expect(() => {
    x.splice(0, 1)
  }).not.toThrow()

  delete x[0]
  expect(x[0]).toStrictEqual([2, 3, 4])

  expect(() => {
    Object.defineProperty(x, 0, {
      get() {
        return "foo"
      },
    })
  }).not.toThrow()

  expect(() => {
    Object.defineProperties(x, {
      hello: {
        get() {
          return "world"
        },
      },
    })
  }).not.toThrow()

  x.prototype = Number
  expect(x.prototype).toBe(undefined)

  expect(() => {
    x[0]
  }).not.toThrow()

  expect(x).toStrictEqual([
    [2, 3, 4],
    [5, 6, 7],
  ])
})

test("tests that shallow objects are correctly frozen", () => {
  const x = freeze({ foo: "bar" })

  x.hello = "world"
  expect(x.hello).toBe(undefined)

  delete x.foo
  expect(x.foo).toBe("bar")

  expect(() => {
    Object.defineProperty(x, "hello", {
      get() {
        return "world"
      },
    })
  }).not.toThrow()

  expect(() => {
    Object.defineProperties(x, {
      hello: {
        get() {
          return "world"
        },
      },
    })
  }).not.toThrow()

  x.prototype = Number
  expect(x.prototype).toBe(undefined)

  expect(() => {
    x.foo
  }).not.toThrow()

  const y = { foo: "bar" }
  expect(typeof x).toBe(typeof y)
  expect(Object.keys(x)).toStrictEqual(Object.keys(y))

  Object.keys(x).forEach(key => {
    expect(x[key]).toBe(y[key])
  })
})

test("tests that deeply-nested objects are correctly frozen", () => {
  const x = freeze({
    foo: "bar",
    settings: { name: { first: "James", last: "Bond" } },
  })

  x.hello = "world"
  expect(x.hello).toBe(undefined)

  x.settings.name.first = "Julia"
  expect(x.settings.name.first).toBe("James")

  delete x.foo
  expect(x.foo).toBe("bar")

  delete x.settings.name.first
  expect(x.settings.name.first).toBe("James")

  expect(() => {
    Object.defineProperty(x, "hello", {
      get() {
        return "world"
      },
    })
  }).not.toThrow()

  expect(() => {
    Object.defineProperties(x, {
      hello: {
        get() {
          return "world"
        },
      },
    })
  }).not.toThrow()

  x.prototype = Number
  expect(x.prototype).toBe(undefined)

  expect(() => {
    x.foo
  }).not.toThrow()

  expect(() => {
    x.settings.name.first
  }).not.toThrow()

  const y = {
    foo: "bar",
    settings: { name: { first: "James", last: "Bond" } },
  }

  expect(typeof x).toBe(typeof y)
  expect(Object.keys(x)).toStrictEqual(Object.keys(y))
  expect(x.foo).toBe(y.foo)
  expect(x.settings.name.first).toBe(y.settings.name.first)
  expect(x.settings.name.last).toBe(y.settings.name.last)
})

test("tests that class instances are correctly frozen", () => {
  class Person {
    constructor(name, age) {
      this.name = name
      this.age = age
      this.friends = []
    }

    sayHi() {
      return `Hi! I'm ${this.name}!`
    }
  }

  let a = new Person("Alice", 23)
  let b = new Person("Bob", 45)
  let c = new Person("Charlize", 67)
  a.friends.push(b)
  a.friends.push(c)
  a = freeze(a)

  a.name = "Danielle"
  a.age = 89
  a.sayHi = () => "Go away!"

  a.friends[0].name = "Eric"
  a.friends[0].age = 100
  a.friends[1].sayHi = () => "Please leave me alone."
  delete a.friends[1].age

  expect(a instanceof Person).toBe(true)
  expect(a.name).toBe("Alice")
  expect(a.age).toBe(23)
  expect(a.sayHi()).toBe("Hi! I'm Alice!")
  expect(a.friends[0].name).toBe("Bob")
  expect(a.friends[0].age).toBe(45)
  expect(a.friends[1].sayHi()).toBe("Hi! I'm Charlize!")
  expect(a.friends[1].age).toBe(67)
})

test("tests that errors are thrown when we want them to be thrown", () => {
  const shouldThrowErrors = true
  const x = freeze([2, 3, 4], shouldThrowErrors)

  expect(() => {
    x[0] = 5
  }).toThrow()

  expect(() => {
    x.push(234)
  }).toThrow()

  expect(() => {
    delete x[0]
  }).toThrow()

  expect(() => {
    Object.defineProperty(x, "foo", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: "foo!",
    })
  }).toThrow()

  expect(() => {
    x.prototype = Object
  }).toThrow()
})
