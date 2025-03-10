import { WebWorkerHelper } from "../src/index.mjs"

function createResultsElement(status, message) {
  const out = document.createElement("div")
  out.classList.add("result")

  if (status) {
    out.classList.add(status)
  } else {
    out.classList.add("animated")
  }

  out.innerHTML = `
    <div class="status"></div>
    <div id="message">${message}</div>
  `

  return out
}

!(async () => {
  const container = document.querySelector("#results")

  await (async () => {
    const description = "Tests that results can be returned correctly."
    const rel = createResultsElement(null, description)
    container.appendChild(rel)

    try {
      const helper = new WebWorkerHelper("worker-bundle.js", { type: "module" })
      const x = Math.random()
      const ytrue = x * 2
      const ypred = await helper.exec("double", x)

      if (ypred === ytrue) {
        rel.classList.add("success")
      } else {
        rel.classList.add("danger")
        rel.querySelector("#message").innerHTML +=
          ` (We expected to receive ${ytrue} but instead received ${ypred}!)`
      }
    } catch (e) {
      rel.classList.add("danger")
      rel.querySelector("#message").innerHTML = `${description} (ERROR: ${e})`
    }

    rel.classList.remove("animated")
  })()

  await (async () => {
    const description =
      "Tests that results can be returned correctly after some time has elapsed."

    const rel = createResultsElement(null, description)
    container.appendChild(rel)

    try {
      const helper = new WebWorkerHelper("worker-bundle.js", { type: "module" })
      const x = Math.random()
      const ytrue = x * 3
      const ypred = await helper.exec("triple-after-a-while", x)

      if (ypred === ytrue) {
        rel.classList.add("success")
      } else {
        rel.classList.add("danger")
        rel.querySelector("#message").innerHTML +=
          ` (We expected to receive ${ytrue} but instead received ${ypred}!)`
      }
    } catch (e) {
      rel.classList.add("danger")
      rel.querySelector("#message").innerHTML = `${description} (ERROR: ${e})`
    }

    rel.classList.remove("animated")
  })()

  await (async () => {
    const description = "Tests that progress callbacks work correctly."
    const rel = createResultsElement(null, description)
    container.appendChild(rel)

    try {
      const helper = new WebWorkerHelper("worker-bundle.js", { type: "module" })
      let progress = 0

      await helper.exec("run-progress-callbacks", null, p => {
        progress = p

        rel.querySelector("#message").innerHTML = `${description} (${(
          p * 100
        ).toFixed(2)}%)`
      })

      if (progress === 1) {
        rel.classList.add("success")
        rel.querySelector("#message").innerHTML = description
      } else {
        rel.classList.add("danger")
        rel.querySelector("#message").innerHTML +=
          ` (We expected to receive a final progress value of 1 but instead received ${progress}!)`
      }
    } catch (e) {
      rel.classList.add("danger")
      rel.querySelector("#message").innerHTML = `${description} (ERROR: ${e})`
    }

    rel.classList.remove("animated")
  })()

  await (async () => {
    const description =
      "Tests that errors are thrown when unknown signals are used."

    const rel = createResultsElement(null, description)
    container.appendChild(rel)

    try {
      const helper = new WebWorkerHelper("worker-bundle.js", { type: "module" })
      await helper.exec("does-not-exist")
      rel.classList.add("danger")
    } catch (e) {
      rel.classList.add("success")
    }

    rel.classList.remove("animated")
  })()

  await (async () => {
    const description =
      "Tests that workers can do multiple things simultaneously."

    const rel = createResultsElement(null, description)
    container.appendChild(rel)

    try {
      const helper = new WebWorkerHelper("worker-bundle.js", { type: "module" })
      const promises = []
      promises.push(helper.exec("do-thing-1"))
      promises.push(helper.exec("do-thing-2"))
      promises.push(helper.exec("do-thing-3"))
      const results = await Promise.all(promises)

      if (
        results.length === 3 &&
        results.includes("Thing 1 is finished!") &&
        results.includes("Thing 2 is finished!") &&
        results.includes("Thing 3 is finished!")
      ) {
        rel.classList.add("success")
      } else {
        rel.classList.add("danger")
      }
    } catch (e) {
      rel.classList.add("danger")
      rel.querySelector("#message").innerHTML = `${description} (ERROR: ${e})`
    }

    rel.classList.remove("animated")
  })()

  await (async () => {
    const description =
      "Tests that workers can be terminated by the main thread in mid-execution."

    const rel = createResultsElement(null, description)
    container.appendChild(rel)

    try {
      const helper = new WebWorkerHelper("worker-bundle.js", { type: "module" })
      setTimeout(() => helper.destroy(), 1000)
      await helper.exec("return-after-30-seconds")
      rel.classList.add("danger")
      rel.querySelector("#message").innerHTML =
        `${description} (The worker should've been terminated mid-execution, but it wasn't!)`
    } catch (e) {
      rel.classList.add("success")
    }

    rel.classList.remove("animated")
  })()

  await (async () => {
    const description =
      "Tests that workers can self-terminate in mid-execution."

    const rel = createResultsElement(null, description)
    container.appendChild(rel)

    try {
      const helper = new WebWorkerHelper("worker-bundle.js", { type: "module" })
      setTimeout(() => helper.destroy(), 1000)
      await helper.exec("return-after-30-seconds")
      rel.classList.add("danger")
      rel.querySelector("#message").innerHTML =
        `${description} (The worker should've been terminated mid-execution, but it wasn't!)`
    } catch (e) {
      rel.classList.add("success")
    }

    rel.classList.remove("animated")
  })()
})()
