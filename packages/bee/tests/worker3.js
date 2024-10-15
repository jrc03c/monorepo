import { add } from "./add.js"
import { Bee } from "../dist/bee.import.min.mjs"

const drone = new Bee.Drone()

drone.on("add-some-numbers", (request, response) => {
  return response.send(add(request.data.a, request.data.b))
})
