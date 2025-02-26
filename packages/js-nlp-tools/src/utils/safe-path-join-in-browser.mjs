async function safePathJoinInBrowser() {
  const args = Array.from(arguments)

  return args
    .map((arg, i) => {
      arg = arg.replace(/\/+/g, "/")

      if (i > 0) {
        arg = arg.replace(/^\//g, "")
      }

      arg = arg.replace(/\/$/g, "")
      return arg.trim()
    })
    .filter(arg => arg.length > 0)
    .join("/")
}

export { safePathJoinInBrowser }
