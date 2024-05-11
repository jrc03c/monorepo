const reset = "\x1b[0m"

const color = {
  fx: {
    reset: x => reset + x + reset,
    bright: x => "\x1b[1m" + x + reset,
    dim: x => "\x1b[2m" + x + reset,
    underscore: x => "\x1b[4m" + x + reset,
    blink: x => "\x1b[5m" + x + reset,
    reverse: x => "\x1b[7m" + x + reset,
    hidden: x => "\x1b[8m" + x + reset,
  },
  fg: {
    black: x => "\x1b[30m" + x + reset,
    red: x => "\x1b[31m" + x + reset,
    green: x => "\x1b[32m" + x + reset,
    yellow: x => "\x1b[33m" + x + reset,
    blue: x => "\x1b[34m" + x + reset,
    magenta: x => "\x1b[35m" + x + reset,
    cyan: x => "\x1b[36m" + x + reset,
    white: x => "\x1b[37m" + x + reset,
  },
  bg: {
    black: x => "\x1b[40m" + x + reset,
    red: x => "\x1b[41m" + x + reset,
    green: x => "\x1b[42m" + x + reset,
    yellow: x => "\x1b[43m" + x + reset,
    blue: x => "\x1b[44m" + x + reset,
    magenta: x => "\x1b[45m" + x + reset,
    cyan: x => "\x1b[46m" + x + reset,
    white: x => "\x1b[47m" + x + reset,
  },
}

module.exports = color
