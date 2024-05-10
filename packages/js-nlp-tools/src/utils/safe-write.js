const { fs } = (() => {
  try {
    return {
      fs: require("node:fs"),
    }
  } catch (e) {
    return {}
  }
})()

const { isBrowser } = require("@jrc03c/js-math-tools")

const WE_ARE_IN_THE_BROWSER = isBrowser()

function safeWrite(file, contents) {
  if (WE_ARE_IN_THE_BROWSER) {
    localStorage.setItem(file, JSON.stringify(contents))
  } else {
    const dir = file.split("/").slice(0, -1).join("/")

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    fs.writeFileSync(file, JSON.stringify(contents), "utf8")
  }
}

module.exports = safeWrite
