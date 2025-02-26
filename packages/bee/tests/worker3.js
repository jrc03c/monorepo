import * as Bee from "../src/index.mjs"
import { add } from "./add.js"

const drone = new Bee.Drone()

drone.on("add-some-numbers", (request, response) => {
  return response.send(add(request.data.a, request.data.b))
})
