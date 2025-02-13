var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.mjs
var index_exports = {};
__export(index_exports, {
  Color: () => Color
});
module.exports = __toCommonJS(index_exports);

// src/helpers/rgb-to-hsl.mjs
function RGBToHSL(r, g, b) {
  if (isNaN(r) || r < 0 || r > 255) {
    throw new Error("RGB values must be in the range [0, 255]!");
  }
  if (isNaN(g) || g < 0 || g > 255) {
    throw new Error("RGB values must be in the range [0, 255]!");
  }
  if (isNaN(b) || b < 0 || b > 255) {
    throw new Error("RGB values must be in the range [0, 255]!");
  }
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const range = max - min;
  const midrange = (max + min) / 2;
  const hue = range === 0 ? 0 : max === r ? 60 * (0 + (g - b) / range) : max === g ? 60 * (2 + (b - r) / range) : max === b ? 60 * (4 + (r - g) / range) : NaN;
  const saturation = midrange === 0 || midrange === 1 ? 0 : (max - midrange) / Math.min(midrange, 1 - midrange);
  const lightness = midrange;
  return { h: hue - Math.floor(hue / 360) * 360, s: saturation, l: lightness };
}

// src/helpers/cmyk-to-hsl.mjs
function CMYKToHSL(c, m, y, k) {
  const values = [c, m, y, k];
  values.forEach((v) => {
    if (isNaN(v) || v < 0 || v > 1) {
      throw new Error("CMYK values must all be in the range [0, 1]!");
    }
  });
  const r = 255 * (1 - c) * (1 - k);
  const g = 255 * (1 - m) * (1 - k);
  const b = 255 * (1 - y) * (1 - k);
  return RGBToHSL(r, g, b);
}

// src/helpers/hex-to-hsl.mjs
function hexToHSL(hex) {
  if (typeof hex !== "string") {
    throw new Error("Hex values must be strings!");
  }
  hex = hex.replaceAll("#", "").trim();
  if (hex.length !== 6) {
    throw new Error("Hex values must be 6 in length!");
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return RGBToHSL(r, g, b);
}

// src/helpers/hsl-to-rgb.mjs
function HSLToRGB(h, s, l) {
  if (isNaN(h) || h < 0 || h >= 360) {
    throw new Error(
      "HSL values must be in the ranges [0, 360), [0, 1], and [0, 1] respectively!"
    );
  }
  if (isNaN(s) || s < 0 || s > 1) {
    throw new Error(
      "HSL values must be in the ranges [0, 360), [0, 1], and [0, 1] respectively!"
    );
  }
  if (isNaN(l) || l < 0 || l > 1) {
    throw new Error(
      "HSL values must be in the ranges [0, 360), [0, 1], and [0, 1] respectively!"
    );
  }
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hPrime = h / 60;
  const x = c * (1 - Math.abs(hPrime % 2 - 1));
  let temp;
  if (hPrime >= 0 && hPrime < 1) {
    temp = [c, x, 0];
  } else if (hPrime >= 1 && hPrime < 2) {
    temp = [x, c, 0];
  } else if (hPrime >= 2 && hPrime < 3) {
    temp = [0, c, x];
  } else if (hPrime >= 3 && hPrime < 4) {
    temp = [0, x, c];
  } else if (hPrime >= 4 && hPrime < 5) {
    temp = [x, 0, c];
  } else {
    temp = [c, 0, x];
  }
  const m = l - c / 2;
  const r = (temp[0] + m) * 255;
  const g = (temp[1] + m) * 255;
  const b = (temp[2] + m) * 255;
  return { r, g, b };
}

// src/helpers/hsl-to-cmyk.mjs
function HSLToCMYK(h, s, l) {
  const { r, g, b } = HSLToRGB(h, s, l);
  const r_ = r / 255;
  const g_ = g / 255;
  const b_ = b / 255;
  const k = 1 - Math.max(r_, g_, b_);
  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 0 };
  } else {
    const c = (1 - r_ - k) / (1 - k);
    const m = (1 - g_ - k) / (1 - k);
    const y = (1 - b_ - k) / (1 - k);
    return { c, m, y, k };
  }
}

// src/helpers/left-pad.mjs
function leftPad(s, n) {
  let out = s.slice();
  while (out.length < n) out = "0" + out;
  return out;
}

// src/helpers/hsl-to-hex.mjs
function HSLToHex(h, s, l) {
  if (isNaN(h) || h < 0 || h >= 360) {
    throw new Error(
      "HSL values must be in the ranges [0, 360), [0, 1], and [0, 1] respectively!"
    );
  }
  if (isNaN(s) || s < 0 || s > 1) {
    throw new Error(
      "HSL values must be in the ranges [0, 360), [0, 1], and [0, 1] respectively!"
    );
  }
  if (isNaN(l) || l < 0 || l > 1) {
    throw new Error(
      "HSL values must be in the ranges [0, 360), [0, 1], and [0, 1] respectively!"
    );
  }
  const { r, g, b } = HSLToRGB(h, s, l);
  const rHex = leftPad(parseInt(r).toString(16), 2);
  const gHex = leftPad(parseInt(g).toString(16), 2);
  const bHex = leftPad(parseInt(b).toString(16), 2);
  return { value: `${rHex}${gHex}${bHex}` };
}

// src/helpers/hsl-to-hsv.mjs
function HSLToHSV(h, s, l) {
  if (isNaN(h) || h < 0 || h >= 360) {
    throw new Error(
      "HSL values must be in the ranges [0, 360), [0, 1], and [0, 1] respectively!"
    );
  }
  if (isNaN(s) || s < 0 || s > 1) {
    throw new Error(
      "HSL values must be in the ranges [0, 360), [0, 1], and [0, 1] respectively!"
    );
  }
  if (isNaN(l) || l < 0 || l > 1) {
    throw new Error(
      "HSL values must be in the ranges [0, 360), [0, 1], and [0, 1] respectively!"
    );
  }
  const value = l + s * Math.min(l, 1 - l);
  const saturation = value === 0 ? 0 : 2 * (1 - l / value);
  return { h, s: saturation, v: value };
}

// src/helpers/hsv-to-hsl.mjs
function HSVToHSL(h, s, v) {
  if (isNaN(h) || h < 0 || h >= 360) {
    throw new Error(
      "HSV values must be in the ranges [0, 360), [0, 1], and [0, 1] respectively!"
    );
  }
  if (isNaN(s) || s < 0 || s > 1) {
    throw new Error(
      "HSV values must be in the ranges [0, 360), [0, 1], and [0, 1] respectively!"
    );
  }
  if (isNaN(v) || v < 0 || v > 1) {
    throw new Error(
      "HSV values must be in the ranges [0, 360), [0, 1], and [0, 1] respectively!"
    );
  }
  const lightness = v * (1 - s / 2);
  const saturation = lightness === 0 || lightness === 1 ? 0 : (v - lightness) / Math.min(lightness, 1 - lightness);
  return { h, s: saturation, l: lightness };
}

// src/index.mjs
var Color = class _Color {
  static fromRGB(r, g, b) {
    const out = new _Color();
    out.rgb = [r, g, b];
    return out;
  }
  static fromHSL(h, s, l) {
    const out = new _Color();
    out.hsl = [h, s, l];
    return out;
  }
  static fromHSV(h, s, v) {
    const out = new _Color();
    out.hsv = [h, s, v];
    return out;
  }
  static fromHex(hex) {
    const out = new _Color();
    out.hex = hex;
    return out;
  }
  static fromCMYK(c, m, y, k) {
    const out = new _Color();
    out.cmyk = [c, m, y, k];
    return out;
  }
  static random() {
    const out = new _Color();
    out.hsl = [Math.random() * 360, Math.random(), Math.random()];
    return out;
  }
  constructor() {
    let _hue = 0;
    let _saturation = 1;
    let _lightness = 0.5;
    Object.defineProperty(this, "_hue", {
      configurable: false,
      enumerable: false,
      get() {
        return _hue;
      },
      set(v) {
        if (isNaN(v) || v < 0 || v >= 360) {
          throw new Error(
            "The new `_hue` value must be a number in the range [0, 360)!"
          );
        }
        _hue = v - Math.floor(v / 360) * 360;
      }
    });
    Object.defineProperty(this, "_saturation", {
      configurable: false,
      enumerable: false,
      get() {
        return _saturation;
      },
      set(v) {
        if (isNaN(v) || v < 0 || v > 1) {
          throw new Error(
            "The new `_saturation` value must be a number in the range [0, 1]!"
          );
        }
        _saturation = v;
      }
    });
    Object.defineProperty(this, "_lightness", {
      configurable: false,
      enumerable: false,
      get() {
        return _lightness;
      },
      set(v) {
        if (isNaN(v) || v < 0 || v > 1) {
          throw new Error(
            "The new `_lightness` value must be a number in the range [0, 1]!"
          );
        }
        _lightness = v;
      }
    });
  }
  get rgb() {
    const out = HSLToRGB(this._hue, this._saturation, this._lightness);
    out.toCSSString = function() {
      return `rgb(${out.r.toFixed(2)}, ${out.g.toFixed(2)}, ${out.b.toFixed(
        2
      )})`;
    };
    return out;
  }
  set rgb(data) {
    if (typeof data === "object" && !(data instanceof Array)) {
      data = [data.r, data.g, data.b];
    }
    if (!(data instanceof Array)) {
      throw new Error(
        "The `rgb` property must be assigned with an array in the form [r, g, b] or with an object in the form {r: 0, g: 0, b: 0}!"
      );
    }
    const [r, g, b] = data;
    const temp = RGBToHSL(r, g, b);
    this._hue = temp.h;
    this._saturation = temp.s;
    this._lightness = temp.l;
  }
  get hsl() {
    const out = {
      h: this._hue,
      s: this._saturation,
      l: this._lightness
    };
    out.toCSSString = function() {
      return `hsl(${out.h.toFixed(2)}deg, ${(out.s * 100).toFixed(2)}%, ${(out.l * 100).toFixed(2)}%)`;
    };
    return out;
  }
  set hsl(data) {
    if (typeof data === "object" && !(data instanceof Array)) {
      data = [data.h, data.s, data.l];
    }
    if (!(data instanceof Array)) {
      throw new Error(
        "The `hsl` property must be assigned with an array in the form [h, s, l] or with an object in the form {h: 0, s: 0, l: 0}!"
      );
    }
    const [h, s, l] = data;
    this._hue = h;
    this._saturation = s;
    this._lightness = l;
  }
  get hsv() {
    const out = HSLToHSV(this._hue, this._saturation, this._lightness);
    out.toCSSString = function() {
      return `hsv(${out.h.toFixed(2)}deg, ${(out.s * 100).toFixed(2)}%, ${(out.v * 100).toFixed(2)}%)`;
    };
    return out;
  }
  set hsv(data) {
    if (typeof data === "object" && !(data instanceof Array)) {
      data = [data.h, data.s, data.v];
    }
    if (!(data instanceof Array)) {
      throw new Error(
        "The `hsv` property must be assigned with an array in the form [h, s, v] or with an object in the form {h: 0, s: 0, v: 0}!"
      );
    }
    const [h, s, v] = data;
    const temp = HSVToHSL(h, s, v);
    this._hue = temp.h;
    this._saturation = temp.s;
    this._lightness = temp.l;
  }
  get hex() {
    const out = HSLToHex(this._hue, this._saturation, this._lightness);
    out.toCSSString = function() {
      return `#${out.value}`;
    };
    return out;
  }
  set hex(hex) {
    const { h, s, l } = hexToHSL(hex);
    this._hue = h;
    this._saturation = s;
    this._lightness = l;
  }
  get cmyk() {
    const out = HSLToCMYK(this._hue, this._saturation, this._lightness);
    out.toCSSString = function() {
      return `cmyk(${(100 * out.c).toFixed(2)}%, ${(100 * out.m).toFixed(
        2
      )}%, ${(100 * out.y).toFixed(2)}%, ${(100 * out.k).toFixed(2)}%)`;
    };
    return out;
  }
  set cmyk(data) {
    if (typeof data === "object" && !(data instanceof Array)) {
      data = [data.c, data.m, data.y, data.k];
    }
    if (!(data instanceof Array)) {
      throw new Error(
        "The `cmyk` property must be assigned with an array in the form [c, m, y, k] or with an object in the form {c: 0, m: 0, y: 0, k: 0}!"
      );
    }
    const [c, m, y, k] = data;
    const temp = CMYKToHSL(c, m, y, k);
    this._hue = temp.h;
    this._saturation = temp.s;
    this._lightness = temp.l;
  }
};
if (typeof window !== "undefined") {
  window.Color = Color;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Color
});
