import { fg, fx } from "@jrc03c/bash-colors"
import Expecter from "./expecter.js"

export async function afterAll(fn) {
  await fn()
}

export async function beforeAll(fn) {
  await fn()
}

export async function expect(value) {
  return new Expecter(value)
}

export async function test(description, fn) {
  let passed = true

  try {
    await fn()
  } catch (e) {
    console.error(fg.red(e))
    passed = false
  }

  if (passed) {
    console.log(fx.bright(fg.green("PASS")), ":", description)
  } else {
    console.log(fx.bright(fg.red("FAIL")), ":", description)
  }
}

globalThis.afterAll = afterAll
globalThis.beforeAll = beforeAll
globalThis.expect = expect
globalThis.test = test
