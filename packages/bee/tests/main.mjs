import * as Bee from "../src/index.mjs"

import {
  DataFrame,
  decycle,
  normal,
  range,
  Series,
} from "@jrc03c/js-math-tools"

import { expect, test } from "./fake-jest.js"
import { makeKey } from "@jrc03c/make-key"
import { pause } from "@jrc03c/pause"

async function runTests() {
  await test("that queens can only send commands when they have drones and are alive", async () => {
    const queen = new Bee.Queen()
    expect(queen.hasBeenDestroyed).toBe(false)
    expect(queen.isDead).toBe(false)

    await expect(async () => {
      queen.command("do-something")
    }).toThrowAsync()

    queen.addDrone("worker-bundle.js")
    const result = await queen.command("double", 234)
    expect(result).toBe(468)

    queen.destroy()
    expect(queen.hasBeenDestroyed).toBe(true)
    expect(queen.isDead).toBe(true)

    await expect(async () => {
      await queen.command("double", 345)
    }).toThrowAsync()
  })

  await test("that queens shut everything down immediately when destroyed", async () => {
    const queen = new Bee.Queen("worker-bundle.js")
    const drone = queen.hive[0]
    const start = new Date()
    const duration = 500
    setTimeout(() => queen.destroy(), 100)
    await queen.command("wait", duration)
    const stop = new Date()
    expect(stop - start).toBeLessThan(duration)

    expect(queen.isDead).toBe(true)
    expect(drone.isDead).toBe(true)

    await expect(async () => {
      await pause(1000)
      await drone.emit("double", 234)
    }).toThrowAsync()
  })

  await test("that drones shut down immediately when destroyed", async () => {
    const drone = new Bee.Drone("worker-bundle.js")

    await (async () => {
      let elapsedTime = 0

      const callback = event => {
        if (event.data.signal === "pulse-elapsed-time") {
          elapsedTime = event.data.payload
        }
      }

      globalThis.addEventListener("message", callback)
      drone.emit("pulse")

      await pause(250)
      drone.destroy()
      expect(elapsedTime).toBeLessThan(300)

      const finalElapsedTime = elapsedTime

      await pause(250)
      expect(elapsedTime).toBe(finalElapsedTime)
      globalThis.removeEventListener("message", callback)
    })()
  })

  await test("that all data types can be transmitted back and forth correctly", async () => {
    const queen = new Bee.Queen("worker-bundle.js")
    const selfReferencer = [2, 3, 4]
    selfReferencer.push(selfReferencer)

    let df = new DataFrame({
      ints: range(0, 100).map(() => Math.floor(Math.random() * 10 - 5)),
      floats: normal(100),
      strings: range(0, 100).map(() => makeKey(8)),
      bools: range(0, 100).map(() => (Math.random() < 0.5 ? true : false)),
      nans: range(0, 100).map(() =>
        Math.random() < 0.33 ? Infinity : Math.random() < 0.5 ? -Infinity : NaN,
      ),
      nones: range(0, 100).map(() => (Math.random() < 0.5 ? undefined : null)),
      symbols: range(0, 100).map(() => Symbol.for(makeKey(8))),
      dates: range(0, 100).map(
        () => new Date(Math.round(Math.random() * 999999999)),
      ),
    })

    const series = new Series(normal(100))

    const variables = [
      0,
      1,
      2.3,
      -2.3,
      Infinity,
      -Infinity,
      NaN,
      "foo",
      true,
      false,
      null,
      undefined,
      Symbol.for("Hello, world!"),
      [2, 3, 4],
      [
        [2, 3, 4],
        [5, 6, 7],
      ],
      { hello: "world" },
      selfReferencer,
      df,
      series,
    ]

    for (const vTrue of variables) {
      const vPred = await queen.command("send-it-right-back", vTrue)
      expect(vPred).toBe(decycle(vTrue))
    }

    class Person {
      constructor(name, age) {
        this.name = name
        this.age = age
      }
    }

    const alice = new Person("Alice", 23)
    const aliceTrue = { name: alice.name, age: alice.age }
    const alicePred = await queen.command("send-it-right-back", alice)
    expect(alicePred).toBe(aliceTrue)

    queen.destroy()
  })

  await test("that queens can have multiple drones in their hives", async () => {
    const queen = new Bee.Queen("worker-bundle.js", 5)
    const x = 234
    const yTrue = queen.hive.map(() => x * 2)
    const yPred = await queen.command("double", x)
    expect(yPred).toBe(yTrue)
    queen.destroy()
  })

  await test("that drones in the same hive don't share the same context (worker-side)", async () => {
    const queen = new Bee.Queen("worker-bundle.js", 5)
    await queen.command("set-random-number")
    const numbers = await queen.command("get-random-number")

    numbers.forEach((v1, i) => {
      numbers.forEach((v2, j) => {
        if (i !== j) {
          expect(v1 !== v2).toBe(true)
        }
      })
    })

    queen.destroy()
  })

  await test("that drones can do their own work without a queen", async () => {
    const drone = new Bee.Drone("worker-bundle.js")
    expect(await drone.emit("double", 12345)).toBe(24690)
    drone.destroy()
  })

  await test("that workers can initiate messages", async () => {
    // with a drone listener
    await (() => {
      return new Promise((resolve, reject) => {
        try {
          const drone = new Bee.Drone("worker-bundle.js")

          drone.on("message-initiated-by-worker", request => {
            expect(request.data).toBe("The worker says hi!")
            drone.destroy()
            resolve()
          })
        } catch (e) {
          return reject(e)
        }
      })
    })()

    // with a queen listener
    await (() => {
      return new Promise((resolve, reject) => {
        try {
          const queen = new Bee.Queen("worker-bundle.js")

          queen.on("message-initiated-by-worker", request => {
            expect(request.data).toBe("The worker says hi!")
            queen.destroy()
            resolve()
          })
        } catch (e) {
          return reject(e)
        }
      })
    })()
  })

  await test("that multiple callbacks can be added the same signal by a single drone", async () => {
    const drone = new Bee.Drone("worker-bundle.js")
    const results = []

    drone.on("called-you-back", (request, response) => {
      results.push(request.data)
      return response.send()
    })

    drone.on("called-you-back", (request, response) => {
      results.push(request.data * 2)
      return response.send()
    })

    drone.on("called-you-back", (request, response) => {
      results.push(request.data * 4)
      return response.send()
    })

    await drone.emit("call-me-back")
    results.sort()
    expect(results).toBe([234, 468, 936])
    drone.destroy()
  })

  await test("that the `on` method's returned unsubscribe function works as expected", async () => {
    // for drones
    await (async () => {
      const drone = new Bee.Drone("worker-bundle.js")
      let count = 0

      const unsub = drone.on("called-you-back", (request, response) => {
        count++
        return response.send()
      })

      for (let i = 0; i < 10; i++) {
        await drone.emit("call-me-back")
      }

      expect(count).toBe(10)
      unsub()

      for (let i = 0; i < 10; i++) {
        drone.emit("call-me-back")
      }

      setTimeout(() => {
        expect(count).toBe(10)
        drone.destroy()
      }, 250)
    })()

    // for queens
    await (async () => {
      const queen = new Bee.Queen("worker-bundle.js")
      let count = 0

      const unsub = queen.on("called-you-back", (request, response) => {
        count++
        return response.send()
      })

      for (let i = 0; i < 10; i++) {
        await queen.emit("call-me-back")
      }

      expect(count).toBe(10)
      unsub()

      for (let i = 0; i < 10; i++) {
        queen.emit("call-me-back")
      }

      setTimeout(() => {
        expect(count).toBe(10)
        queen.destroy()
      }, 250)
    })()
  })

  await test("that errors are thrown when attempting to write to read-only properties", () => {
    const queen = new Bee.Queen("worker-bundle.js")

    expect(() => {
      queen.id = "foobar"
    }).toThrow()

    expect(() => {
      queen.hasBeenDestroyed = true
    }).toThrow()

    expect(() => {
      queen.isDead = true
    }).toThrow()

    queen.destroy()
  })

  await test("that the queen can send commands to specific drones (i.e., not all drones)", async () => {
    // ...
    const queen = new Bee.Queen("worker-bundle.js", 5)
    const subset = queen.hive.slice(0, 3)
    const r = Math.random()
    const vals = []

    const unsub = queen.on("didnt-tell-the-others", (request, response) => {
      vals.push(request.data)
      return response.send()
    })

    await queen.command("dont-tell-the-others", r, subset)

    expect(vals.length).toBe(subset.length)
    vals.forEach(v => expect(v).toBe(r))
    unsub()

    const all = await queen.command("get-secret-message")
    expect(all.length).toBe(queen.hive.length)
    expect(all.filter(v => !!v).length).toBe(vals.length)

    queen.destroy()
  })

  await test("that the queen can listen to specific drones (i.e., not all drones)", async () => {
    const queen = new Bee.Queen("worker-bundle.js", 5)
    const subset = queen.hive.slice(3)
    let count = 0

    const unsub = queen.on(
      "message-from-some-drones",
      (request, response) => {
        count++
        return response.send()
      },
      subset,
    )

    await queen.command("some-call-back")
    await pause(1000)

    expect(count).toBe(subset.length)

    unsub()
    queen.destroy()
  })

  await test("that queens can send commands to drones that aren't in their hives", async () => {
    const queen = new Bee.Queen()
    const drone = new Bee.Drone("worker-bundle.js")
    const n = await queen.command("send-favorite-number", null, drone)
    expect(typeof n === "number" && n >= 0 && n <= 1).toBe(true)
    queen.destroy()
    drone.destroy()
  })

  await test("that queens can have drones from different worker scripts in their hives", async () => {
    const queen = new Bee.Queen()
    queen.addDrone("worker-bundle.js")
    queen.addDrone("worker2-bundle.js")
    const results = await queen.command("send-filename")
    expect(results.includes("worker.js")).toBe(true)
    expect(results.includes("worker2.js")).toBe(true)
    queen.destroy()
  })

  await test("that drones can be run as modules and use `import`", async () => {
    const queen = new Bee.Queen()
    queen.addDrone("worker3-bundle.js", { type: "module" })

    const result = await queen.command("add-some-numbers", {
      a: 234,
      b: 567,
    })

    expect(result).toBe(234 + 567)
  })

  const done = document.createElement("div")
  done.classList.add("result")
  done.classList.add("info")
  done.innerHTML = "DONE!"
  document.querySelector("#container").appendChild(done)
}

runTests()
