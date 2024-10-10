import { isBrowser, range } from "@jrc03c/js-math-tools"
import { parse } from "./parse.mjs"

async function* streamLoadCSVFromDisk(path, config) {
  let fsx

  try {
    fsx = await import("@jrc03c/fs-extras")
  } catch (e) {
    console.error(e)
    return
  }

  const rowsPerChunk = config.rowsPerChunk || 100
  const stream = fsx.createFileStreamReader(path)
  let columns
  let rows = []
  let i = 0

  for await (const line of stream.read()) {
    if (!columns) {
      columns = line
    }

    rows.push(line)

    if (rows.length - 1 >= rowsPerChunk) {
      const raw = rows.join("\n")
      const df = parse(raw, config)

      if (!config.index) {
        df.index = range(i, i + rowsPerChunk).map(v => "row" + v.toString())
      }

      yield df
      rows = [columns]
      i += rowsPerChunk
    }
  }

  if (rows.length > 1) {
    const raw = rows.join("\n")
    const df = parse(raw, config)

    if (!config.index) {
      df.index = range(i, i + rows.length - 1).map(v => "row" + v.toString())
    }

    yield df
  }
}

function streamLoadCSV(path, config) {
  if (isBrowser()) {
    // ...
  } else {
    return streamLoadCSVFromDisk(path, config)
  }
}

export { streamLoadCSV }
