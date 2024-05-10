function pause(ms) {
  return new Promise((resolve, reject) => {
    try {
      return setTimeout(() => resolve(), ms)
    } catch (e) {
      return reject(e)
    }
  })
}

if (typeof module !== "undefined") {
  module.exports = pause
}

if (typeof window !== "undefined") {
  window.pause = pause
}
