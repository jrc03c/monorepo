import { range } from "@jrc03c/js-math-tools"
import { parse } from "./parse.mjs"
import * as fsx from "@jrc03c/fs-extras"

async function* streamLoadCSV(path, config) {
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

export { streamLoadCSV }
