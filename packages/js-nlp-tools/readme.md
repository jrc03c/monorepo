# Intro

This is a little set of JS natural language processing tools.

# Installation

```bash
npm install --save @jrc03c/js-nlp-tools
```

# Usage

```js
import { Corpus, Document } from "@jrc03c/js-nlp-tools"
import fs from "node:fs"

const doc1 = new Document({
  name: "Frankenstein",
  raw: fs.readFileSync("path/to/frankenstein.txt", "utf8"),
})

const doc2 = new Document({
  name: "Pride & Prejudice",
  raw: fs.readFileSync("path/to/pride-and-prejudice.txt", "utf8"),
})

const doc3 = new Document({
  name: "Moby Dick",
  raw: fs.readFileSync("path/to/moby-dick.txt", "utf8"),
})

const corpus = new Corpus({ docs })

corpus
  .process(progress => console.log(progress))
  .then(() => {
    corpus.docs.forEach(doc => {
      console.log(doc.name, corpus.computeTFIDFScore("frankenstein", doc))
    })
  })
```

# API

## `Corpus`

### Methods

#### `Corpus(data)` (constructor)

Returns a new `Corpus` instance. Can optionally take a `data` argument, which is an object with properties corresponding to `Corpus` instance properties (e.g., `docs`).

#### `computeIDFScore(word)`

Returns the inverse document frequency score for a given word. Is computed as:

```math
\text{IDF}(\text{word}) = \text{log}(N / n_t)
```

Where $N$ is the total number of documents in the corpus, and $n_t$ is the number of documents in which the word appears.

#### `computeTFScore(word, doc)`

Returns the term frequency score for a given word and document. Is computed as:

```math
\text{TF}(\text{word}) = 0.5 + 0.5 \frac{f_{t, d}}{\text{max}_{\{t'∈d\}} f_{t',d}}
```

Where $f_{t, d}$ is the number of times the word appears in the document, and $\text{max}_{\{t'∈d\}} f_{t',d}$ is the number of times the most frequently-occurring word appears in the document.

#### `computeTFIDFScore(word, doc)`

Returns the tf-idf score for a given word and document. Is computed as the term frequency score multiplied by the inverse document frequency score.

#### `process(progress)`

Returns a `Promise` that resolves once all documents in the corpus have been processed. Can optionally take a callback function that is passed the progress through the documents as a value between 0 and 1.

### Properties

#### `docs`

An array of `Document` instances.

#### `hasBeenProcessed`

A boolean indicating whether or not the instance's `process` method has been invoked (and completed).

## `Document`

### Methods

#### `Document(data)` (constructor)

Returns a new `Document` instance. Can optionally take a `data` object with properties corresponding to `Document` instance properties (e.g., `wordCounts`).

#### `getWordCount(word)`

Returns the number of times `word` (a string) appears in the document.

#### `process()`

Returns a `Promise` that resolves once the document has been processed (indexed).

### Properties

#### `hasBeenProcessed`

A boolean representing whether or not the instance's `process` method has been invoked (and completed).

#### `isCaseSensitive`

A boolean representing whether or not case should matter when indexing words.

#### `mostFrequentWord`

A string representing the word that appears most frequently in the document.

#### `name`

A string representing the name of the document. If no name is assigned via the data object passed into the constructor, then a random string will be assigned as the document's name.

#### `raw`

A string representing the raw text on which the document is based.

#### `totalWordCount`

A non-negative integer representing the total number of words in the document.

#### `wordCounts`

A dictionary that maps words (as strings) to the numbers of times those words appear in the document (as non-negative integers).

## Utility functions

### `clean(raw, shouldPreserveCase)`

Given `raw` (a string) and optionally `shouldPreserveCase` (a boolean), returns a copy of `raw` in which all punctuation has been removed and all whitespace characters have been replaced with spaces. By default, `shouldPreserveCase` is `false`.

### `defineReadOnlyProperty(object, name, value)`

Defines a read-only property called `name` on `object` with the value `value`. Returns `object`.

Note that any read-only properties defined this way will fail silently when new values are assigned to them. In other words, you won't be notified when any assignment attempts fail.
