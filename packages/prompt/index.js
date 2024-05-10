const process = require("process")
const readline = require("readline")

function prompt(text, isHidden, callback) {
  if (arguments.length === 2) {
    if (typeof arguments[1] === "function") {
      callback = isHidden
      isHidden = false
    }
  }

  return new Promise((resolve, reject) => {
    try {
      if (!text.match(/\s$/g)) {
        text += " "
      }

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      })

      rl.question(text, response => {
        if (callback) callback(response)
        resolve(response)
        rl.close()
      })

      if (isHidden) {
        rl._writeToOutput = function (s) {
          if (s === "\r\n") {
            rl.output.write(s)
          } else {
            rl.output.write("*")
          }
        }
      }
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = prompt
