import { fg, fx } from "@jrc03c/bash-colors"

class Expecter {
  constructor(value) {
    this.valenceIsPositive = true
    this.value = value
  }

  get not() {
    this.valenceIsPositive = !this.valenceIsPositive
    return this
  }

  toBe(other) {
    const valuesAreEquivalent =
      this.value === other ||
      (typeof this.value === "number" &&
        isNaN(this.value) &&
        typeof other === "number" &&
        isNaN(other))

    if (this.valenceIsPositive) {
      if (!valuesAreEquivalent) {
        throw new Error(
          `The value ${this.value} is supposed to be ${other}, but it's not!`,
        )
      }
    } else if (valuesAreEquivalent) {
      throw new Error(
        `The value ${this.value} is not supposed to be equal to ${other}, but it is!`,
      )
    }
  }

  toBeCloseTo(other) {
    const valuesAreClose = Math.abs(this.value - other) <= 1e-5

    if (this.valenceIsPositive) {
      if (!valuesAreClose) {
        throw new Error(
          `The value ${this.value} is supposed to be close to ${other}, but it's not!`,
        )
      }
    } else if (valuesAreClose) {
      throw new Error(
        `The value ${this.value} is not supposed to be close to ${other}, but it is!`,
      )
    }
  }

  toBeGreaterThan(other) {
    const thisValueIsGreaterThanOther = this.value > other

    if (this.valenceIsPositive) {
      if (!thisValueIsGreaterThanOther) {
        throw new Error(
          `The value ${this.value} is supposed to be greater than ${other}, but it's not!`,
        )
      }
    } else if (thisValueIsGreaterThanOther) {
      throw new Error(
        `The value ${this.value} is not supposed to be greater than ${other}, but it is!`,
      )
    }
  }

  toBeGreaterThanOrEqualTo(other) {
    const thisValueIsGreaterThanOrEqualToOther = this.value >= other

    if (this.valenceIsPositive) {
      if (!thisValueIsGreaterThanOrEqualToOther) {
        throw new Error(
          `The value ${this.value} is supposed to be greater than or equal to ${other}, but it's not!`,
        )
      }
    } else if (thisValueIsGreaterThanOrEqualToOther) {
      throw new Error(
        `The value ${this.value} is not supposed to be greater than or equal to ${other}, but it is!`,
      )
    }
  }

  toBeLessThan(other) {
    const thisValueIsLessThanOther = this.value < other

    if (this.valenceIsPositive) {
      if (!thisValueIsLessThanOther) {
        throw new Error(
          `The value ${this.value} is supposed to be less than ${other}, but it's not!`,
        )
      }
    } else if (thisValueIsLessThanOther) {
      throw new Error(
        `The value ${this.value} is not supposed to be less than ${other}, but it is!`,
      )
    }
  }

  toBeLessThanOrEqualTo(other) {
    const thisValueIsLessThanOrEqualToOther = this.value <= other

    if (this.valenceIsPositive) {
      if (!thisValueIsLessThanOrEqualToOther) {
        throw new Error(
          `The value ${this.value} is supposed to be less than or equal to ${other}, but it's not!`,
        )
      }
    } else if (thisValueIsLessThanOrEqualToOther) {
      throw new Error(
        `The value ${this.value} is not supposed to be less than or equal to ${other}, but it is!`,
      )
    }
  }

  toBeNaN() {
    const thisValueIsNaN = isNaN(this.value)

    if (this.valenceIsPositive) {
      if (!thisValueIsNaN) {
        throw new Error(
          `The value ${this.value} is supposed to be NaN, but it's not!`,
        )
      }
    } else if (thisValueIsNaN) {
      throw new Error(
        `The value ${this.value} is not supposed to be NaN, but it is!`,
      )
    }
  }

  toStrictEqual(other) {
    function helper(v1, v2) {
      if (v1 instanceof Array) {
        if (v2 instanceof Array) {
          if (v1.length !== v2.length) {
            return false
          }

          for (let i = 0; i < v1.length; i++) {
            if (!helper(v1[i], v2[i])) {
              return false
            }
          }
        } else {
          return false
        }
      } else {
        if (v2 instanceof Array) {
          return false
        } else if (v1 !== v2) {
          return false
        }
      }

      return true
    }

    const thisValueStrictEqualsOther = helper(this.value, other)

    if (this.valenceIsPositive) {
      if (!thisValueStrictEqualsOther) {
        throw new Error(
          `The two values are supposed to be strictly equivalent, but they're not!`,
        )
      }
    } else if (thisValueStrictEqualsOther) {
      throw new Error(
        `The two values are not supposed to be strictly equivalent, but they are!`,
      )
    }
  }

  toThrow() {
    let threwAnError = false

    try {
      const returned = this.value()

      if (returned instanceof Promise) {
        return returned
          .then(() => {
            if (this.valenceIsPositive) {
              throw new Error(
                "The function was supposed to throw an error, but it didn't!",
              )
            }
          })
          .catch(() => {
            if (!this.valenceIsPositive) {
              throw new Error(
                "The function was not supposed to throw an error, but it did!",
              )
            }
          })
      }
    } catch (e) {
      threwAnError = true
    }

    if (this.valenceIsPositive) {
      if (!threwAnError) {
        throw new Error(
          "The function was supposed to throw an error, but it didn't!",
        )
      }
    } else if (threwAnError) {
      throw new Error(
        "The function was not supposed to throw an error, but it did!",
      )
    }
  }
}

const afterAlls = []
const beforeAlls = []
const tests = []

export function afterAll(fn) {
  afterAlls.push(fn)
}

export function beforeAll(fn) {
  beforeAlls.push(fn)
}

export function expect(value) {
  return new Expecter(value)
}

export async function test(description, fn) {
  tests.push({ description, fn })
}

// {{ content }}

!(async () => {
  for (const fn of beforeAlls) {
    await fn()
  }

  for (const item of tests) {
    let passed = true

    try {
      await item.fn()
    } catch (e) {
      console.error(fx.dim(fg.red(e.stack)))
      passed = false
    }

    if (passed) {
      console.log(fx.bright(fg.green("PASS")), ":", item.description)
    } else {
      console.log(fx.bright(fg.red("FAIL")), ":", item.description)
    }
  }

  for (const fn of afterAlls) {
    await fn()
  }
})()
