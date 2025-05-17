function pause(ms) {
  return new Promise((resolve, reject) => {
    try {
      const start = performance.now()
      return setTimeout(() => resolve(performance.now() - start), ms)
    } catch (e) {
      return reject(e)
    }
  })
}

export { pause }
