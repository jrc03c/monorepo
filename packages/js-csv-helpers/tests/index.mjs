import {
  assert,
  DataFrame,
  inferType,
  isEqual,
} from "../node_modules/@jrc03c/js-math-tools/src/index.mjs"

import {
  loadCSV,
  parse,
  saveCSV,
  unparse,
} from "../src/index-browser.mjs"

async function test(desc, fn) {
  const container = document.getElementById("results")

  try {
    const nonNullStatus = await fn()

    if (nonNullStatus) {
      results.innerHTML += /* html */ `
        <li class="warned">
          🟡 <b>WARNED:</b> "${desc}"

          <ul class="normal">
            <li>
              ${nonNullStatus}
            </li>
          </ul>
        </li>
      `
    } else {
      results.innerHTML += /* html */ `
        <li class="passed">
          🟢 <b>PASSED:</b> "${desc}"
        </li>
      `
    }
  } catch (e) {
    results.innerHTML += /* html */ `
      <li class="failed">
        🔴 <b>FAILED:</b> "${desc}"

        <ul class="normal">
          <li>
            ${e}
          </li>
        </ul>
      </li>
    `
  }
}

function expect(v1) {
  return {
    toBe(v2) {
      assert(
        isEqual(v1, v2),
        `These two values were supposed to match: ${v1} vs. ${v2}`,
      )
    },
  }
}

async function runAllTests() {
  await test("tests that CSVs can be loaded from URLs correctly", async () => {
    const response = await fetch("test.json")
    const data = await response.json()

    const dfTrue = new DataFrame(data).apply(
      col => inferType(col.values).values,
    )

    const dfPred = await loadCSV("test.csv", {
      inferTypes: true,
      header: true,
    })

    expect(isEqual(dfPred, dfTrue)).toBe(true)
  })

  await test("tests that the test CSV string can be parsed correctly", async () => {
    // NOTE: The way I constructed this test was:
    //
    // 1) I generated a pandas DataFrame with a bunch of random and missing
    //    values in Python.
    // 2) I used the pandas DataFrame `to_json` method to save the DataFrame to
    //    disk.
    // 3) I imported the JSON in Node and cleaned up the object a bit so that it
    //    ended up in a form that could be easily used to create js-math-tools
    //    DataFrames.
    // 4) I added a bit where all number values would be trimmed to 10 decimal
    //    places. That's because the JSON outputted by pandas and the original
    //    CSV had different numbers of decimal places.
    //
    // So, once both data sets were imported, parsed, and had had their types
    // inferred, they were identical.

    const response1 = await fetch("test.json")
    const data = await response1.json()

    const dataTrue = new DataFrame(data).apply(col => {
      const results = inferType(col.values).values

      if (results.type === "number") {
        results.values = results.values.map(v =>
          parseFloat(v.toFixed(10)),
        )
      }

      return results.values
    })

    const response2 = await fetch("test.csv")
    const raw = await response2.text()

    const dataPred = parse(raw, {
      header: true,
    }).apply(col => {
      const results = inferType(col.values).values

      if (results.type === "number") {
        results.values = results.values.map(v =>
          parseFloat(v.toFixed(10)),
        )
      }

      return results.values
    })

    expect(isEqual(dataPred, dataTrue)).toBe(true)
  })

  await test("tests that CSVs can be downloaded correctly", async () => {
    const response = await fetch("test.json")
    const data = await response.json()
    const df = new DataFrame(data)
    await saveCSV("data.csv", df)
    return "Check the downloaded `data.csv` file to make sure it matches `tests/test.csv`!"
  })

  await test("tests that the test DataFrame can be converted to a CSV string correctly", async () => {
    const response1 = await fetch("test.csv")
    const raw = await response1.text()
    const stringTrue = raw.trim()

    const response2 = await fetch("test.json")
    const data = await response2.json()
    const stringPred = unparse(new DataFrame(data))

    expect(stringPred).toBe(stringTrue)
  })
}

runAllTests()
