// src/index.mjs
import readline from "readline";
function repeat(text, n) {
  let out = "";
  for (let i = 0; i < n; i++) {
    out += text;
  }
  return out;
}
var Progress = class _Progress extends Array {
  static drawBar(i, n) {
    const isAPercent = typeof n === "undefined";
    i = isAPercent ? Math.round(100 * i) : i;
    n = isAPercent ? 100 : n;
    if (i < 0) {
      throw new Error("The progress bar value can't be less than 0%!");
    }
    if (i > n) {
      throw new Error("The progress bar value can't be greater than 100%!");
    }
    const right = isAPercent ? ` (${i}%)` : ` (${i} / ${n})`;
    const percent = i / n;
    const remainingColumns = process.stdout.columns - right.length;
    const done = parseInt(percent * remainingColumns);
    const notDone = remainingColumns - done;
    if (percent === 1) {
      readline.clearLine(process.stdout, 0);
    }
    readline.cursorTo(process.stdout, 0, null);
    process.stdout.write(repeat("\u2588", done) + repeat("\u2591", notDone) + right);
  }
  forEach(fn, otherThis) {
    for (let i = 0; i < this.length; i++) {
      const boundFn = fn.bind(otherThis || this);
      boundFn(this[i], i, this);
      _Progress.drawBar(i, this.length);
    }
    _Progress.drawBar(this.length, this.length);
    process.stdout.write("\n");
    return void 0;
  }
  map(fn, otherThis) {
    const out = [];
    const boundFn = fn.bind(otherThis || this);
    this.forEach((v, i, arr) => {
      out.push(boundFn(v, i, arr));
    });
    return out;
  }
  filter(fn, otherThis) {
    const out = [];
    const boundFn = fn.bind(otherThis || this);
    this.forEach((v, i, arr) => {
      if (boundFn(v, i, arr)) {
        out.push(v);
      }
    });
    return out;
  }
  reduce(fn, initialValue) {
    let out = initialValue || this[0];
    this.slice(initialValue ? 0 : 1).forEach((v) => {
      out = fn(out, v);
    });
    return out;
  }
};
function progress(x, y) {
  if (x instanceof Array) {
    return Progress.from(x);
  }
  if (typeof x === "number") {
    return Progress.drawBar(x, y);
  }
  throw new Error(
    "You must pass either (1) an array or (2) one or two numbers into the `progress` function!"
  );
}
export {
  progress
};
