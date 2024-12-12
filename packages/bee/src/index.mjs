import { Drone } from "./drone.mjs"
import { isInWebWorker } from "./is-in-web-worker.mjs"
import { Queen } from "./queen.mjs"

const Bee = { Drone, isInWebWorker, Queen }

if (typeof globalThis !== "undefined") {
  globalThis.Bee = Bee
}

if (typeof window !== "undefined") {
  window.Bee = Bee
}

export { Bee }
