import { Drone } from "./drone.mjs"
import { Queen } from "./queen.mjs"

const Bee = { Drone, Queen }

if (typeof globalThis !== "undefined") {
  globalThis.Bee = Bee
}

if (typeof window !== "undefined") {
  window.Bee = Bee
}

export { Bee }
