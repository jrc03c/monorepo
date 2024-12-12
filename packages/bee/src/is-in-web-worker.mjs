function isInWebWorker() {
  return (
    typeof self !== "undefined" &&
    typeof WorkerGlobalScope !== "undefined" &&
    // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope
  )
}

export { isInWebWorker }
