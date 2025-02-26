import { WebWorkerHelper } from "../src/index.mjs"

!(async () => {
  const helper = new WebWorkerHelper("worker-bundle.js", { type: "module" })
  const x = Math.random()
  document.querySelector("#x-value").innerHTML = x

  const x2 = await helper.exec("double", x)
  const div2 = document.querySelector("#x-double")
  div2.style.display = "block"
  div2.querySelector("#x-double-result").innerHTML = x2

  const x3 = await helper.exec("triple", x)
  const div3 = document.querySelector("#x-triple")
  div3.style.display = "block"
  div3.querySelector("#x-triple-result").innerHTML = x3

  const div4 = document.querySelector("#some-long-operation")
  div4.style.display = "block"

  const progressBar = div4.querySelector("#some-long-operation-progress-bar")

  const result = await helper.exec("some-long-operation", x, p => {
    progressBar.value = p
    progressBar.innerHTML = p * 100 + "%"

    div4.querySelector("#some-long-operation-result").innerHTML =
      `Running "some-long-operation" ...`
  })

  progressBar.value = 1
  progressBar.innerHTML = "100%"

  div4.querySelector("#some-long-operation-result").innerHTML =
    `Result of "some-long-operation" = ${result}`

  try {
    await helper.exec("throw-an-error")
  } catch (e) {
    const div5 = document.querySelector("#error")
    div5.style.display = "block"
    div5.innerHTML = e
  }
})()
