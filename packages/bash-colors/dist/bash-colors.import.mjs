// src/index.mjs
var reset = "\x1B[0m";
var bg = {
  black: (x) => "\x1B[40m" + x + reset,
  red: (x) => "\x1B[41m" + x + reset,
  green: (x) => "\x1B[42m" + x + reset,
  yellow: (x) => "\x1B[43m" + x + reset,
  blue: (x) => "\x1B[44m" + x + reset,
  magenta: (x) => "\x1B[45m" + x + reset,
  cyan: (x) => "\x1B[46m" + x + reset,
  white: (x) => "\x1B[47m" + x + reset
};
var fg = {
  black: (x) => "\x1B[30m" + x + reset,
  red: (x) => "\x1B[31m" + x + reset,
  green: (x) => "\x1B[32m" + x + reset,
  yellow: (x) => "\x1B[33m" + x + reset,
  blue: (x) => "\x1B[34m" + x + reset,
  magenta: (x) => "\x1B[35m" + x + reset,
  cyan: (x) => "\x1B[36m" + x + reset,
  white: (x) => "\x1B[37m" + x + reset
};
var fx = {
  reset: (x) => reset + x + reset,
  bright: (x) => "\x1B[1m" + x + reset,
  dim: (x) => "\x1B[2m" + x + reset,
  underscore: (x) => "\x1B[4m" + x + reset,
  blink: (x) => "\x1B[5m" + x + reset,
  reverse: (x) => "\x1B[7m" + x + reset,
  hidden: (x) => "\x1B[8m" + x + reset
};
export {
  bg,
  fg,
  fx
};
