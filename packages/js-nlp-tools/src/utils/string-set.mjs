import { sort } from "@jrc03c/js-math-tools"

class StringSet extends Set {
  add(x) {
    if (typeof x !== "string") {
      throw new Error(`\`StringSet\` instances can only contain strings!`)
    }

    return super.add(x)
  }

  addAll(x) {
    x.forEach(v => this.add(v))
    return this
  }

  delete(x) {
    if (typeof x !== "string") {
      throw new Error(`\`StringSet\` instances can only contain strings!`)
    }

    return super.delete(x)
  }

  deleteAll(x) {
    x.forEach(v => this.delete(v))
    return this
  }

  has(x) {
    if (typeof x !== "string") {
      throw new Error(`\`StringSet\` instances can only contain strings!`)
    }

    return super.has(x)
  }

  hasAll(x) {
    return x.every(v => this.has(v))
  }

  toArray() {
    return Array.from(this)
  }

  toSortedArray() {
    return sort(this.toArray())
  }
}

export { StringSet }
