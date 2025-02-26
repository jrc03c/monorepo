import * as Bee from "../src/index.mjs"
const drone = new Bee.Drone()

drone.on("send-filename", (request, response) => {
  return response.send("worker2.js")
})
