async function safeReadInBrowser(file) {
  const out = localStorage.getItem(file)

  try {
    return JSON.parse(out)
  } catch (e) {
    return out
  }
}

export { safeReadInBrowser }
