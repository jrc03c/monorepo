/* eslint-disable no-undef */
importScripts("../dist/bee.standalone.min.js")

const drone = new Bee.Drone()

drone.on("send-filename", (request, response) => {
  return response.send("worker2.js")
})
