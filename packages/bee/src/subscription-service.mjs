import { makeKey } from "@jrc03c/make-key"
import { parse, stringify } from "@jrc03c/js-text-tools"

Array.prototype.remove = function (x) {
  let index = this.indexOf(x)

  while (index > -1) {
    this.splice(index, 1)
    index = this.indexOf(x)
  }

  return this
}

const alive = {}

class SubscriptionService {
  context = undefined
  rejects = []
  resolves = []
  unsubs = []

  constructor() {
    this.context = globalThis
    const id = makeKey(8)

    Object.defineProperty(this, "id", {
      configurable: false,
      enumerable: true,
      get: () => id,

      set() {
        throw new Error(
          `The \`id\` property of this SubscriptionService instance is read-only!`,
        )
      },
    })

    alive[this.id] = true
  }

  get hasBeenDestroyed() {
    return !alive[this.id]
  }

  set hasBeenDestroyed(value) {
    throw new Error(
      `The \`hasBeenDestroyed\` property of this SubscriptionService instance is read-only! To destroy this SubscriptionService instance, invoke its \`destroy\` method.`,
    )
  }

  destroy(error) {
    if (this.hasBeenDestroyed) {
      throw new Error(
        `This SubscriptionService instance has already been destroyed!`,
      )
    }

    delete alive[this.id]
    this.unsubs.forEach(unsub => unsub())

    if (error) {
      this.rejects.forEach(reject => reject(error))
    } else {
      this.resolves.forEach(resolve => resolve())
    }

    delete this.context
    delete this.rejects
    delete this.resolves
    delete this.unsubs
  }

  emit(signal, payload) {
    if (this.hasBeenDestroyed) {
      throw new Error(
        `This SubscriptionService instance has already been destroyed!`,
      )
    }

    return new Promise((resolve, reject) => {
      try {
        const cbid = makeKey(8)

        const callback = event => {
          if (event.data.signal === cbid) {
            this.context.removeEventListener("message", callback)
            this.resolves.remove(resolve)
            this.rejects.remove(reject)

            let out = event.data.payload

            try {
              out = parse(out)
            } catch (e) {
              // ...
            }

            return resolve(out)
          }
        }

        this.context.addEventListener("message", callback)
        this.resolves.push(resolve)
        this.rejects.push(reject)

        try {
          payload = stringify(payload)
        } catch (e) {
          // ...
        }

        this.context.postMessage({
          cbid,
          signal,
          payload,
        })
      } catch (e) {
        this.resolves.remove(resolve)
        this.rejects.remove(reject)
        return reject(e)
      }
    })
  }

  on(signal, callback) {
    if (this.hasBeenDestroyed) {
      throw new Error(
        `This SubscriptionService instance has already been destroyed!`,
      )
    }

    const inner = event => {
      if (event.data.signal === signal) {
        const cbid = event.data.cbid
        let payload = event.data.payload

        try {
          payload = parse(payload)
        } catch (e) {
          // ...
        }

        const request = { data: payload }

        const response = {
          send: result => {
            try {
              result = stringify(result)
            } catch (e) {
              // ...
            }

            if (!this.hasBeenDestroyed) {
              this.context.postMessage({
                signal: cbid,
                payload: result,
              })
            }
          },
        }

        callback(request, response)
      }
    }

    const unsub = () => {
      if (this.context) {
        this.context.removeEventListener("message", inner)
      }

      if (this.unsubs) {
        this.unsubs.remove(unsub)
      }
    }

    this.unsubs.push(unsub)
    this.context.addEventListener("message", inner)
    return unsub
  }
}

export { SubscriptionService }
