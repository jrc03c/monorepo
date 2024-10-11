/* eslint-disable no-undef */
importScripts("../dist/bee.standalone.min.js")

const drone = new Bee.Drone()

drone.on("double", (request, response) => {
  return response.send(request.data * 2)
})

drone.on("wait", (request, response) => {
  setTimeout(() => response.send(), request.data)
})

drone.on("send-it-right-back", (request, response) => {
  return response.send(request.data)
})

drone.on("pulse", (request, response) => {
  const start = new Date()

  setInterval(() => {
    globalThis.postMessage({
      signal: "pulse-elapsed-time",
      payload: new Date() - start,
    })
  }, 10)

  response.send()
})

drone.on("set-random-number", (request, response) => {
  globalThis.randomNumber = Math.random()
  return response.send()
})

drone.on("get-random-number", (request, response) => {
  return response.send(globalThis.randomNumber)
})

drone.on("call-me-back", async (request, response) => {
  await drone.emit("called-you-back", 234)
  return response.send()
})

let secretMessageFromQueen

drone.on("dont-tell-the-others", async (request, response) => {
  secretMessageFromQueen = request.data
  await drone.emit("didnt-tell-the-others", secretMessageFromQueen)
  return response.send()
})

drone.on("get-secret-message", (request, response) => {
  return response.send(secretMessageFromQueen)
})

drone.on("some-call-back", async (request, response) => {
  drone.emit("message-from-some-drones")
  return response.send()
})

drone.on("send-favorite-number", (request, response) => {
  return response.send(Math.random())
})

drone.on("send-filename", (request, response) => {
  return response.send("worker.js")
})

setTimeout(() => {
  drone.propose("message-initiated-by-worker", "The worker says hi!")
}, 500)
