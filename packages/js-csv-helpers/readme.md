# Intro

This is a little helper library to complement [@jrc03c/js-math-tools](https://github.com/jrc03c/js-math-tools) and [@jrc03c/js-data-science-helpers](https://github.com/jrc03c/js-data-science-helpers). It's a relatively thin wrapper around [`papaparse`](https://www.papaparse.com/). All it does is load CSV files or strings as `DataFrame` objects and save `DataFrame` objects as CSV files or strings.

# Installation

```bash
npm install --save https://github.com/jrc03c/js-csv-helpers
```

# Usage

Node & bundlers:

```js
const { loadCSV, saveCSV } = require("js-csv-helpers")

async function doStuff() {
  // load
  const df = await loadCSV("path/to/my-data.csv")

  // save
  await saveCSV("path/to/other-data.csv", df)
}

doStuff()
```

Browser:

```html
<script src="path/to/dist/js-csv-helpers"></script>
<script>
  const { loadCSV, saveCSV } = JSCSVHelpers

  async function doStuff() {
    // load
    const df = await loadCSV("path/to/my-data.csv")

    // save
    await saveCSV("path/to/other-data.csv", df)
  }

  doStuff()
</script>
```

> **NOTE:** Usage in both environments is basically identical except for one thing: In the browser, `saveCSV` takes a _filename_ and a `DataFrame`; but in Node, `saveCSV` takes a _path_ and a `DataFrame`. That's because the browser can only download files; it can't (in JS) specify where the files ought to be saved.

# API

## `loadCSV(path, config)`

Given a `path` (and optionally a [`config`](#configuration) object), this function returns a `Promise` that resolves to a `DataFrame`.

## `parse(csvString, config)`

Given a CSV string and a [`config`](#configuration) object, this function returns a `DataFrame` (synchronously).

## `saveCSV(path, df, config)`

Given a `path` and a `DataFrame` (`data`) (and optionally a [`config`](#configuration) object), this function returns a `Promise` that resolves to `undefined`.

## `streamLoadCSV(path, config)`

> **NOTE:** This function currently only works for streaming files from disk. I plan to add support for streaming files over the web but just haven't gotten to it yet.

Given a `path` and a [`config`](#configuration) object, this function returns chunks of a `DataFrame` asynchronously. A "chunk" just means a subset of the entire CSV file containing just a few rows. Chunks are returned in same order in which they appear in the CSV file; i.e., if you're streaming the file 10 rows at a time, then the first chunk will contain rows 1-10, the second chunk will contain rows 11-20, and so on. The number of rows in each chunk can be defined using a `rowsPerChunk` property on the `config` object.

For example, if I wanted to stream a large CSV 10 rows at a time, I'd do this:

```js
const { streamLoadCSV } = require("@jrc03c/js-csv-helpers")

!(async () => {
  const stream = streamLoadCSV("my-data.csv", {
    inferTypes: true,
    rowsPerChunk: 10,
  })

  for await (const chunk of stream) {
    chunk.print()
  }
})()
```

## `unparse(df, config)`

Given a `DataFrame` and a [`config`](#configuration) object, this function returns a CSV string (synchronously).

### Configuration

#### Loading & parsing

This library is basically a thin wrapper around [`papaparse`](https://www.papaparse.com/). Any configuration object you could pass into this library's functions will be passed directly into `papaparse`'s functions. See [their documentation](https://www.papaparse.com/docs) for more info.

As of today, Papa's default configuration values for parsing are:

```js
{
  beforeFirstChunk: undefined,
  chunk: undefined,
  chunkSize: undefined,
  comments: false,
  complete: undefined,
  delimiter: "",
  delimitersToGuess: [",", "\t", "|", ";", papa.RECORD_SEP, papa.UNIT_SEP],
  download: false,
  downloadRequestBody: undefined,
  downloadRequestHeaders: undefined,
  dynamicTyping: false,
  encoding: "",
  error: undefined,
  escapeChar: '"',
  fastMode: undefined,
  newline: "",
  preview: 0,
  quoteChar: '"',
  skipEmptyLines: false,
  step: undefined,
  transform: undefined,
  transformHeader: undefined,
  withCredentials: undefined,
  worker: false,

  // I've changed this value from the Papa defaults because, at least for my
  // purposes, I anticipate that most datasets will include a header row.
  header: true,

  // I'm adding this option in case a dataset has (or should have) an index
  // column (i.e., a first column filled with row names).
  index: false,

  // I'm also adding my own option to infer types using my `inferType` function
  // in @jrc03c/js-math-tools. Papa offers a "dynamicTyping" option, but I
  // think maybe mine is a little more extensive (i.e., I think it infers more
  // data types, but may not necessarily be more robust). I'm willing to be
  // wrong about that, though. By default, this value is set to `false`, which
  // means that the returned `DataFrame` will only contain strings.
  inferTypes: false,
}
```

This library only adds one extra option to the configuration object in the `loadCSV` function: setting `"inferTypes"` to `true` or `false` enables or disables dynamic type inference. By default, `papaparse` doesn't try to figure out what kinds of data your CSV file contains; it merely returns a matrix of strings. They provide an option called `"dynamicTyping"` which I think asks `papaparse` to try to infer data types, but I don't think it's quite as extensive as the one I've written here.

Here's an example of how to use it:

```js
// use this library's type inference
loadCSV("path/to/my-data.csv", { inferTypes: true })

// use papaparse's type inference
loadCSV("path/to/my-data.csv", { dynamicTyping: true })
```

#### Unparsing & saving

As of today, Papa's default configuration values for unparsing are:

```js
{
  columns: null,
  delimiter: ",",
  escapeChar: '"',
  header: true,
  quoteChar: '"',
  quotes: false,
  skipEmptyLines: false,

  // This is the only value that's been changed from Papa's defaults.
  newline: "\n",
}
```

Here's an example of how to use it:

```js
saveCSV("path/to/my-data.csv", myDataFrame, { delimiter: "\t" })
```
