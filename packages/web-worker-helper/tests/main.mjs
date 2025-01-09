// import { WebWorkerHelper } from "../dist/web-worker-helper.import.mjs"

function createResultElement(status, message) {
  const out = document.createElement("div")
  out.classList.add("result")
  out.classList.add(status)

  out.innerHTML = `
    <div class="status"></div>
    <div>${message}</div>
  `

  return out
}

const container = document.querySelector("#results")

container.appendChild(createResultElement("success", "Hello, world!"))
container.appendChild(createResultElement("warning", "Uh...world?"))
container.appendChild(createResultElement("danger", "Goodbye, world!"))
container.appendChild(createResultElement("info", "This is a world!"))
