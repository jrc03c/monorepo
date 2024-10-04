import {
  CMYKToHSL,
  hexToHSL,
  HSLToCMYK,
  HSLToHex,
  HSLToHSV,
  HSLToRGB,
  HSVToHSL,
  RGBToHSL,
} from "./helpers/index.js"

class Color {
  static fromRGB(r, g, b) {
    const out = new Color()
    out.rgb = [r, g, b]
    return out
  }

  static fromHSL(h, s, l) {
    const out = new Color()
    out.hsl = [h, s, l]
    return out
  }

  static fromHSV(h, s, v) {
    const out = new Color()
    out.hsv = [h, s, v]
    return out
  }

  static fromHex(hex) {
    const out = new Color()
    out.hex = hex
    return out
  }

  static fromCMYK(c, m, y, k) {
    const out = new Color()
    out.cmyk = [c, m, y, k]
    return out
  }

  static random() {
    const out = new Color()
    out.hsl = [Math.random() * 360, Math.random(), Math.random()]
    return out
  }

  constructor() {
    let _hue = 0
    let _saturation = 1
    let _lightness = 0.5

    Object.defineProperty(this, "_hue", {
      configurable: false,
      enumerable: false,

      get() {
        return _hue
      },

      set(v) {
        if (isNaN(v) || v < 0 || v >= 360) {
          throw new Error(
            "The new `_hue` value must be a number in the range [0, 360)!",
          )
        }

        _hue = v - Math.floor(v / 360) * 360
      },
    })

    Object.defineProperty(this, "_saturation", {
      configurable: false,
      enumerable: false,

      get() {
        return _saturation
      },

      set(v) {
        if (isNaN(v) || v < 0 || v > 1) {
          throw new Error(
            "The new `_saturation` value must be a number in the range [0, 1]!",
          )
        }

        _saturation = v
      },
    })

    Object.defineProperty(this, "_lightness", {
      configurable: false,
      enumerable: false,

      get() {
        return _lightness
      },

      set(v) {
        if (isNaN(v) || v < 0 || v > 1) {
          throw new Error(
            "The new `_lightness` value must be a number in the range [0, 1]!",
          )
        }

        _lightness = v
      },
    })
  }

  get rgb() {
    const out = HSLToRGB(this._hue, this._saturation, this._lightness)

    out.toCSSString = function () {
      return `rgb(${out.r.toFixed(2)}, ${out.g.toFixed(2)}, ${out.b.toFixed(
        2,
      )})`
    }

    return out
  }

  set rgb(data) {
    if (typeof data === "object" && !(data instanceof Array)) {
      data = [data.r, data.g, data.b]
    }

    if (!(data instanceof Array)) {
      throw new Error(
        "The `rgb` property must be assigned with an array in the form [r, g, b] or with an object in the form {r: 0, g: 0, b: 0}!",
      )
    }

    const [r, g, b] = data
    const temp = RGBToHSL(r, g, b)
    this._hue = temp.h
    this._saturation = temp.s
    this._lightness = temp.l
  }

  get hsl() {
    const out = {
      h: this._hue,
      s: this._saturation,
      l: this._lightness,
    }

    out.toCSSString = function () {
      return `hsl(${out.h.toFixed(2)}deg, ${(out.s * 100).toFixed(2)}%, ${(
        out.l * 100
      ).toFixed(2)}%)`
    }

    return out
  }

  set hsl(data) {
    if (typeof data === "object" && !(data instanceof Array)) {
      data = [data.h, data.s, data.l]
    }

    if (!(data instanceof Array)) {
      throw new Error(
        "The `hsl` property must be assigned with an array in the form [h, s, l] or with an object in the form {h: 0, s: 0, l: 0}!",
      )
    }

    const [h, s, l] = data
    this._hue = h
    this._saturation = s
    this._lightness = l
  }

  get hsv() {
    const out = HSLToHSV(this._hue, this._saturation, this._lightness)

    out.toCSSString = function () {
      return `hsv(${out.h.toFixed(2)}deg, ${(out.s * 100).toFixed(2)}%, ${(
        out.v * 100
      ).toFixed(2)}%)`
    }

    return out
  }

  set hsv(data) {
    if (typeof data === "object" && !(data instanceof Array)) {
      data = [data.h, data.s, data.v]
    }

    if (!(data instanceof Array)) {
      throw new Error(
        "The `hsv` property must be assigned with an array in the form [h, s, v] or with an object in the form {h: 0, s: 0, v: 0}!",
      )
    }

    const [h, s, v] = data
    const temp = HSVToHSL(h, s, v)
    this._hue = temp.h
    this._saturation = temp.s
    this._lightness = temp.l
  }

  get hex() {
    const out = HSLToHex(this._hue, this._saturation, this._lightness)

    out.toCSSString = function () {
      return `#${out.value}`
    }

    return out
  }

  set hex(hex) {
    const { h, s, l } = hexToHSL(hex)
    this._hue = h
    this._saturation = s
    this._lightness = l
  }

  get cmyk() {
    const out = HSLToCMYK(this._hue, this._saturation, this._lightness)

    out.toCSSString = function () {
      return `cmyk(${(100 * out.c).toFixed(2)}%, ${(100 * out.m).toFixed(
        2,
      )}%, ${(100 * out.y).toFixed(2)}%, ${(100 * out.k).toFixed(2)}%)`
    }

    return out
  }

  set cmyk(data) {
    if (typeof data === "object" && !(data instanceof Array)) {
      data = [data.c, data.m, data.y, data.k]
    }

    if (!(data instanceof Array)) {
      throw new Error(
        "The `cmyk` property must be assigned with an array in the form [c, m, y, k] or with an object in the form {c: 0, m: 0, y: 0, k: 0}!",
      )
    }

    const [c, m, y, k] = data
    const temp = CMYKToHSL(c, m, y, k)
    this._hue = temp.h
    this._saturation = temp.s
    this._lightness = temp.l
  }
}

if (typeof window !== "undefined") {
  window.Color = Color
}

export default Color
