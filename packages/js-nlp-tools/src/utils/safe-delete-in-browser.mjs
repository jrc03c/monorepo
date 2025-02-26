async function safeDeleteInBrowser(x) {
  localStorage.removeItem(x)
}

export { safeDeleteInBrowser }
