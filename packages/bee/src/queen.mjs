import { Drone } from "./drone.mjs"
import { SubscriptionService } from "./subscription-service.mjs"

class Queen extends SubscriptionService {
  hive = []

  constructor(path, n) {
    super()

    if (path) {
      n = n || 1
      this.addDrones(path, n)
    }
  }

  get isDead() {
    return this.hasBeenDestroyed
  }

  set isDead(value) {
    throw new Error(
      `The \`isDead\` property of this Queen instance is read-only! To destroy this Queen instance, invoke her \`destroy\` method.`,
    )
  }

  addDrone(path) {
    if (this.isDead) {
      throw new Error("The queen is dead!")
    }

    const drone = new Drone(path)
    this.hive.push(drone)
    return drone
  }

  addDrones(path, n) {
    const out = []

    for (let i = 0; i < n; i++) {
      out.push(this.addDrone(path))
    }

    return out
  }

  removeDrone(drone) {
    if (this.isDead) {
      throw new Error("The queen is dead!")
    }

    drone.destroy()
    this.hive.remove(drone)
    return this
  }

  removeDrones(drones) {
    drones.forEach(drone => this.removeDrone(drone))
    return this
  }

  on(signal, callback, specificDrones) {
    if (
      typeof specificDrones !== "undefined" &&
      specificDrones instanceof Drone
    ) {
      specificDrones = [specificDrones]
    }

    const unsubs = (specificDrones || this.hive).map(drone => {
      return drone.on(signal, callback)
    })

    const unsub = () => unsubs.forEach(unsub => unsub())
    this.unsubs.push(unsub)
    return unsub
  }

  emit(signal, payload, specificDrones) {
    if (this.isDead) {
      throw new Error("The queen is dead!")
    }

    if (
      typeof specificDrones !== "undefined" &&
      specificDrones instanceof Drone
    ) {
      specificDrones = [specificDrones]
    }

    const drones = specificDrones || this.hive

    if (drones.length === 0) {
      throw new Error(
        `The queen issued a "${signal}" command, but there are no drones in the hive!`,
      )
    }

    return new Promise((resolve, reject) => {
      try {
        const results = new Array(drones.length)

        const promises = drones.map((drone, i) => {
          return new Promise((resolve, reject) => {
            try {
              this.resolves.push(resolve)
              this.rejects.push(reject)

              drone.emit(signal, payload).then(result => {
                if (!this.hasBeenDestroyed) {
                  this.resolves.remove(resolve)
                  this.rejects.remove(reject)
                  results[i] = result
                  resolve()
                }
              })
            } catch (e) {
              this.resolves.remove(resolve)
              this.rejects.remove(reject)
              return reject(e)
            }
          })
        })

        this.resolves.push(resolve)
        this.rejects.push(reject)

        Promise.all(promises).then(() => {
          if (!this.hasBeenDestroyed) {
            this.resolves.remove(resolve)
            this.rejects.remove(reject)

            if (results.length === 1) {
              return resolve(results[0])
            } else {
              return resolve(results)
            }
          }
        })
      } catch (e) {
        this.resolves.remove(resolve)
        this.rejects.remove(reject)
        return reject(e)
      }
    })
  }

  command() {
    return this.emit(...arguments)
  }

  destroy(error) {
    if (this.isDead) {
      throw new Error("The queen is dead!")
    }

    const out = super.destroy(error)

    this.hive.forEach(drone => {
      drone.destroy(error)
    })

    delete this.hive
    return out
  }
}

export { Queen }
