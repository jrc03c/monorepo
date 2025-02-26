async function safeWriteInBrowser(file, contents) {
  localStorage.setItem(file, JSON.stringify(contents))
}

export { safeWriteInBrowser }
