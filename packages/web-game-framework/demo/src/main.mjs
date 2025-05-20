import {
  Component,
  // Mouse,
  // Point,
  // Rect,
  // Scene,
  SceneWithUpdateLoop,
  Thing,
  Vector2,
} from "../../src/index.mjs"

import { createHighDPICanvas } from "@jrc03c/create-high-dpi-canvas"

class CanvasComponent extends Component {
  canvas = null

  constructor(data) {
    super(...arguments)
    data = data || {}
    this.canvas = createHighDPICanvas(data.width, data.height)
  }
}

class DimensionsComponent extends Component {
  dimensions = null

  constructor(data) {
    super(...arguments)
    data = data || {}

    this.dimensions = new Vector2(
      data.dimensions ? data.dimensions.x : data.x,
      data.dimensions ? data.dimensions.y : data.y,
    )
  }

  get height() {
    return this.dimensions.y
  }

  set height(v) {
    this.dimensions.y = v
  }

  get width() {
    return this.dimensions.x
  }

  set width(v) {
    this.dimensions.x = v
  }
}

class PositionComponent extends Component {
  position = null

  constructor(data) {
    super(...arguments)
    data = data || {}

    this.position = new Vector2(
      data.position ? data.position.x : data.x,
      data.position ? data.position.y : data.y,
    )
  }
}

class Card extends Thing {
  static FontSize = 24

  static Symbol = {
    Clubs: "♣",
    Diamonds: "♦",
    Hearts: "♥",
    Spades: "♠",
  }

  static createDeck() {
    const out = []
    const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"]
    const suits = ["Clubs", "Diamonds", "Hearts", "Spades"]

    for (const value of values) {
      for (const suit of suits) {
        out.push(new Card({ suit, value }))
      }
    }

    out.push(new Card({ value: "Joker" }))
    out.push(new Card({ value: "Joker" }))
    return out
  }

  dimensionsComponent = null
  isActive = false
  isHovered = false
  positionComponent = null
  suit = null
  value = null

  constructor(data) {
    super(...arguments)
    data = data || {}

    this.dimensionsComponent = new DimensionsComponent({
      dimensions: data.dimensions || new Vector2({ x: 128, y: 192 }),
    })

    this.positionComponent = new PositionComponent({ position: data.position })
    this.suit = data.suit || this.suit
    this.value = data.value || this.value
  }

  get dimensions() {
    return this.dimensionsComponent.dimensions
  }

  set dimensions(v) {
    this.dimensionsComponent.dimensions = v
  }

  get height() {
    return this.dimensionsComponent.dimensions.y
  }

  set height(v) {
    this.dimensionsComponent.dimensions.y = v
  }

  get position() {
    return this.positionComponent.position
  }

  set position(v) {
    this.positionComponent.position = v
  }

  get symbol() {
    return Card.Symbol[this.suit]
  }

  set symbol(v) {
    this.suit = Object.keys(Card.Symbol).find(key => Card.Symbol[key] === v)
  }

  get width() {
    return this.dimensionsComponent.dimensions.x
  }

  set width(v) {
    this.dimensionsComponent.dimensions.x = v
  }

  draw(context) {
    const { dimensions, position } = this
    context.save()
    context.translate(position.x, position.y)

    context.fillStyle = this.isActive
      ? "rgb(240, 240, 240)"
      : this.isHovered
        ? "rgb(250, 250, 250)"
        : "white"

    context.strokeStyle = "black"
    context.lineWidth = 1
    context.fillRect(0, 0, dimensions.x, dimensions.y)
    context.strokeRect(0, 0, dimensions.x, dimensions.y)

    context.font = `${Card.FontSize}px monospace`
    context.textAlign = "center"
    context.textBaseline = "middle"

    if (this.suit === "Diamonds" || this.suit === "Hearts") {
      context.fillStyle = "red"
    } else {
      context.fillStyle = "black"
    }

    context.fillText(
      this.symbol,
      dimensions.x / 2,
      dimensions.y / 2 - Card.FontSize / 2,
    )

    context.fillText(
      this.value,
      dimensions.x / 2,
      dimensions.y / 2 + Card.FontSize / 2,
    )

    context.restore()
    return this
  }

  containsPoint(p) {
    const { dimensions, position } = this

    return (
      p.x >= position.x &&
      p.x <= position.x + dimensions.x &&
      p.y >= position.y &&
      p.y <= position.y + dimensions.y
    )
  }
}

class SolitaireEndScene extends SceneWithUpdateLoop {
  canvasComponent = null
  cards = []
  deltaTimes = []
  gravity = null
  velocities = []

  constructor() {
    super(...arguments)

    const width = window.innerWidth
    const height = window.innerHeight

    this.canvasComponent = new CanvasComponent({ width, height })
    const context = this.canvasComponent.canvas.getContext("2d")
    this.addComponent(this.canvasComponent)
    document.body.append(this.canvasComponent.canvas)

    const deck = Card.createDeck()
    this.cards = deck.filter(c => c.value === "A")

    const xstep = width / (this.cards.length + 1)

    this.cards.forEach((c, i) => {
      c.position.x = (i + 1) * xstep - c.dimensions.x / 2
      c.position.y = c.dimensions.y / 2
    })

    const scalar = 500
    this.deltaTimes = []
    this.gravity = new Vector2({ x: 0, y: 10 * scalar })
    this.velocities = this.cards.map(() => new Vector2())

    const reset = () => {
      this.cards.forEach((c, i) => {
        c.position.x = (i + 1) * xstep - c.dimensions.x / 2
        c.position.y = c.dimensions.y / 2
      })

      this.velocities.forEach(v => {
        v.x = (Math.random() * 2 - 1) * 1 * scalar
        v.y = (Math.random() * 2 - 1) * 2 * scalar
      })

      context.fillStyle = "green"
      context.fillRect(0, 0, width, height)
    }

    window.addEventListener("click", reset)
    reset()
  }

  update(deltaTime) {
    const { width, height } = this.canvasComponent.canvas
    const context = this.canvasComponent.canvas.getContext("2d")

    this.cards.forEach((card, i) => {
      const velocity = this.velocities[i]
      velocity.add(this.gravity.copy().scale(deltaTime))
      card.position.add(velocity.copy().scale(deltaTime))

      if (card.position.x < 0 || card.position.x + card.dimensions.x > width) {
        velocity.x *= -1

        if (card.position.x < 0) {
          card.position.x = 0
        }

        if (card.position.x + card.dimensions.x > width) {
          card.position.x = width - card.dimensions.x
        }
      }

      if (card.position.y + card.dimensions.y > height) {
        velocity.x *= 0.95
        velocity.y *= -0.67
        card.position.y = height - card.dimensions.y
      }

      card.draw(context)
    })

    this.deltaTimes.push(deltaTime)

    if (this.deltaTimes.length > 360) {
      this.deltaTimes.shift()
    }

    const deltaTimeMean =
      this.deltaTimes.reduce((sum, dt) => sum + dt, 0) / this.deltaTimes.length

    const fps = 1 / deltaTimeMean
    const text = `FPS: ${fps.toFixed(2)}`
    context.font = `12px monospace`
    context.fillStyle = "black"
    context.fillRect(0, 0, 256, 44)
    context.fillStyle = "white"
    context.textAlign = "left"
    context.textBaseline = "top"
    context.fillText(text, 16, 16)
  }
}

const scene = new SolitaireEndScene()
scene.start()
