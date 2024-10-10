import { MathError, max, min, range } from "@jrc03c/js-math-tools"

class AbstractPlotter {
  constructor() {
    this.instructions = []
    this.shouldDrawAxes = true
    this.shouldDrawAxisTicks = true
    this.shouldSetBoundsAutomatically = true
    this.padding = 25
  }

  clear() {
    this.instructions = []
    return this
  }

  dehydrate() {
    return JSON.stringify(this)
  }

  setBounds(xmin, xmax, ymin, ymax) {
    this.shouldSetBoundsAutomatically = false

    this.instructions.push({
      action: "set-bounds",
      data: { xmin, ymin, xmax, ymax },
    })

    return this
  }

  scatter(x, y) {
    this.instructions.push({
      action: "draw",
      type: "scatter",
      data: { x, y },
    })

    return this
  }

  line(x, y) {
    this.instructions.push({
      action: "draw",
      type: "line",
      data: { x, y },
    })

    return this
  }

  hist(values, bins) {
    bins = bins || 20

    const xmin = min(values)
    const xmax = max(values)
    const xrange = xmax - xmin
    const xstep = xrange / bins
    const x = range(xmin, xmax, xstep)
    const y = []

    for (let i = 0; i < x.length; i++) {
      const count = values.filter(v => v >= x[i] && v < x[i] + xstep).length
      y.push(count)
    }

    this.instructions.push({
      action: "draw",
      type: "hist",
      data: { x, y },
    })

    return this
  }

  show() {
    throw new MathError(
      "The `show` method must be overridden in a concrete class!",
    )
  }
}

export { AbstractPlotter }
