function pauseAsync(ms) {
  return new Promise((resolve, reject) => {
    try {
      const start = new Date()
      return setTimeout(() => resolve(new Date() - start), ms)
    } catch (e) {
      return reject(e)
    }
  })
}

function pauseSync(ms) {
  const start = new Date()
  let now = new Date()

  while (now - start < ms) {
    now = new Date()
  }

  return new Date() - start
}

export { pauseAsync as pause, pauseAsync, pauseSync }
