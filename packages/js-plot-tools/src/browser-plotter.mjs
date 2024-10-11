import {
  abs,
  ceil,
  clamp,
  floor,
  log,
  max,
  min,
  pow,
  range,
  remap,
} from "@jrc03c/js-math-tools"

import { AbstractPlotter } from "./abstract-plotter.mjs"

function getTickSize(xrange) {
  const xpow10 = floor(log(abs(xrange)) / log(10))
  const a = pow(10, xpow10)
  const b = a / 2
  const c = b / 2

  let closest = a
  let score = Infinity
  const options = [a, b, c]

  options.forEach(v => {
    const s = pow(xrange / v - 10, 2)

    if (s < score) {
      score = s
      closest = v
    }
  })

  return closest
}

function getMultiplesOfXBetweenAAndB(x, a, b) {
  if (b < a) {
    const buffer = a
    a = b
    b = buffer
  }

  const start = ceil(a / x) * x
  const stop = floor(b / x) * x
  return range(start - x, stop + x * 2, x).filter(v => v !== 0)
}

class BrowserPlotter extends AbstractPlotter {
  constructor(element) {
    super()

    if (typeof element === "string") {
      this.element = document.querySelector(element)
    } else if (element instanceof HTMLElement) {
      this.element = element
    } else {
      this.element = document.body
    }

    this.left = -1
    this.right = 1
    this.bottom = -1
    this.top = 1
  }

  static hydrate(obj) {
    const plot = new BrowserPlotter()
    plot.instructions = obj.instructions
    plot.shouldDrawAxes = obj.shouldDrawAxes
    plot.shouldDrawAxisTicks = obj.shouldDrawAxisTicks
    plot.shouldSetBoundsAutomatically = obj.shouldSetBoundsAutomatically
    plot.padding = obj.padding
    return plot
  }

  show() {
    const { width, height } = this.element.getBoundingClientRect()
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    this.element.appendChild(canvas)

    const context = canvas.getContext("2d")
    context.fillStyle = "rgb(245, 245, 245)"
    context.fillRect(0, 0, width, height)

    if (this.instructions.length === 0) {
      return this
    }

    // get all points (for bounds setting and tick mark drawing)
    const drawInstructions = this.instructions
      .filter(i => i.action === "draw")
      .map(i => {
        if (i.type === "hist") {
          return {
            data: {
              x: i.data.x,
              y: [0, max(i.data.y)],
            },
          }
        } else {
          return i
        }
      })

    const allXValues = drawInstructions.map(i => i.data.x || [])
    const allYValues = drawInstructions.map(i => i.data.y || [])

    // set bounds automatically
    if (this.shouldSetBoundsAutomatically) {
      this.left = min(allXValues)
      this.right = max(allXValues)
      this.bottom = min(allYValues)
      this.top = max(allYValues)
    }

    // set bounds manually
    else {
      const setBoundsInstructions = this.instructions.filter(
        i => i.action === "set-bounds",
      )

      const instruction =
        setBoundsInstructions[setBoundsInstructions.length - 1]

      this.left = instruction.data.xmin
      this.right = instruction.data.xmax
      this.bottom = instruction.data.ymin
      this.top = instruction.data.ymax
    }

    if (this.left === this.right) {
      this.left -= 1
      this.right += 1
    }

    if (this.top === this.bottom) {
      this.top += 1
      this.bottom -= 1
    }

    // draw axes
    if (this.shouldDrawAxes) {
      context.strokeStyle = "black"
      context.lineWidth = 2

      const xZero = remap(
        0,
        this.left,
        this.right,
        this.padding,
        width - this.padding,
      )

      const yZero = remap(
        0,
        this.bottom,
        this.top,
        height - this.padding,
        this.padding,
      )

      context.beginPath()
      context.moveTo(xZero, this.padding)
      context.lineTo(xZero, height - this.padding)
      context.moveTo(this.padding, yZero)
      context.lineTo(width - this.padding, yZero)
      context.stroke()

      if (this.shouldDrawAxisTicks) {
        const xmin = this.left
        const xmax = this.right
        const xrange = xmax - xmin

        const xtick = getTickSize(xrange)
        const xticks = getMultiplesOfXBetweenAAndB(xtick, xmin, xmax)

        const ymin = this.bottom
        const ymax = this.top
        const yrange = ymax - ymin

        const ytick = getTickSize(yrange)
        const yticks = getMultiplesOfXBetweenAAndB(ytick, ymin, ymax)

        context.fillStyle = "black"
        context.font = "10px monospace"
        context.textAlign = "center"
        context.textBaseline = "middle"

        xticks.forEach(tick => {
          const x = remap(
            tick,
            this.left,
            this.right,
            this.padding,
            width - this.padding,
          )

          const y = clamp(
            remap(
              0,
              this.bottom,
              this.top,
              height - this.padding,
              this.padding,
            ),
            this.padding,
            height - this.padding,
          )

          context.beginPath()
          context.moveTo(x, y - 4)
          context.lineTo(x, y + 4)
          context.stroke()

          context.fillText(tick.toString(), x, y - 10)
        })

        context.textAlign = "left"

        yticks.forEach(tick => {
          const x = clamp(
            remap(0, this.left, this.right, this.padding, width - this.padding),
            this.padding,
            width - this.padding,
          )

          const y = remap(
            tick,
            this.bottom,
            this.top,
            height - this.padding,
            this.padding,
          )

          context.beginPath()
          context.moveTo(x - 4, y)
          context.lineTo(x + 4, y)
          context.stroke()

          context.fillText(tick.toString(), x + 10, y)
        })
      }
    }

    // set colors
    let lastAngle = 0
    const angleStep = 110

    // run all instructions
    this.instructions.forEach(instruction => {
      // draw
      if (instruction.action === "draw") {
        // scatter plots
        if (instruction.type === "scatter") {
          context.fillStyle = `hsl(${lastAngle}deg, 100%, 33%)`
          lastAngle += angleStep

          const x = instruction.data.x.map(v => {
            return remap(
              v,
              this.left,
              this.right,
              this.padding,
              width - this.padding,
            )
          })

          const y = instruction.data.y.map(v => {
            return remap(
              v,
              this.bottom,
              this.top,
              height - this.padding,
              this.padding,
            )
          })

          for (let i = 0; i < x.length; i++) {
            context.beginPath()
            context.arc(x[i], y[i], 2, 0, Math.PI * 2, false)
            context.fill()
          }
        }

        // line plots
        else if (instruction.type === "line") {
          context.strokeStyle = `hsl(${lastAngle}deg, 100%, 50%)`
          context.lineWidth = 2
          lastAngle += angleStep

          const x = instruction.data.x.map(v => {
            return remap(
              v,
              this.left,
              this.right,
              this.padding,
              width - this.padding,
            )
          })

          const y = instruction.data.y.map(v => {
            return remap(
              v,
              this.bottom,
              this.top,
              height - this.padding,
              this.padding,
            )
          })

          context.beginPath()

          for (let i = 0; i < x.length - 1; i++) {
            context.moveTo(x[i], y[i])
            context.lineTo(x[i + 1], y[i + 1])
          }

          context.stroke()
        }

        // histograms
        else if (instruction.type === "hist") {
          context.fillStyle = `hsla(${lastAngle}deg, 100%, 50%, 0.5)`
          context.strokeStyle = "black"
          lastAngle += angleStep

          const w = remap(
            instruction.data.x[1] - instruction.data.x[0],
            0,
            this.right - this.left,
            0,
            width - 2 * this.padding,
          )

          console.log("w:", w)

          for (let i = 0; i < instruction.data.x.length; i++) {
            const x = remap(
              instruction.data.x[i],
              this.left,
              this.right,
              this.padding,
              width - this.padding,
            )

            const h = remap(
              instruction.data.y[i],
              0,
              max(instruction.data.y),
              0,
              height - 2 * this.padding,
            )

            context.fillRect(x, height - this.padding - h, w, h)
            context.strokeRect(x, height - this.padding - h, w, h)
          }
        }
      }
    })

    return this
  }
}

if (typeof window !== "undefined") {
  window.plot = new BrowserPlotter()
  window.Plotter = BrowserPlotter
}

export { BrowserPlotter }
