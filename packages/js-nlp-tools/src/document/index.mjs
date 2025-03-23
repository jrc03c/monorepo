import { clean } from "../utils/clean.mjs"
import { defineReadOnlyProperty } from "../utils/define-read-only-property.mjs"
import { makeKey } from "@jrc03c/make-key"

class Document {
  hasBeenProcessed = false
  isCaseSensitive = false
  mostFrequentWord = null
  name = ""
  raw = ""
  totalWordCount = 0
  wordCounts = {}

  constructor(data) {
    if (data.hasBeenProcessed) {
      defineReadOnlyProperty(this, "hasBeenProcessed", true)
    }

    defineReadOnlyProperty(
      this,
      "isCaseSensitive",
      typeof data.isCaseSensitive === "undefined"
        ? this.isCaseSensitive
        : data.isCaseSensitive,
    )

    if (data.mostFrequentWord) {
      defineReadOnlyProperty(this, "mostFrequentWord", data.mostFrequentWord)
    }

    defineReadOnlyProperty(this, "name", data.name || makeKey(8))

    if (data.raw) {
      defineReadOnlyProperty(this, "raw", data.raw)
    }

    if (data.totalWordCount) {
      defineReadOnlyProperty(this, "totalWordCount", data.totalWordCount)
    }

    if (data.wordCounts) {
      defineReadOnlyProperty(this, "wordCounts", data.wordCounts)
    }
  }

  get words() {
    if (!this.hasBeenProcessed) {
      throw new Error(
        "The `Document` instance has not yet been processed! Please invoke the instance's `process` method before calling the `getWordCount` method.",
      )
    }

    return Object.keys(this.wordCounts)
  }

  getWordCount(word) {
    if (!this.hasBeenProcessed) {
      throw new Error(
        "The `Document` instance has not yet been processed! Please invoke the instance's `process` method before calling the `getWordCount` method.",
      )
    }

    return this.wordCounts[word] || 0
  }

  async process() {
    const shouldPreserveCase = this.isCaseSensitive
    const rawClean = clean(this.raw, shouldPreserveCase)
    const words = rawClean.split(" ")
    const counts = {}
    let totalWordCount = 0
    let mostFrequentWord = null
    let mostFrequentWordCount = 0

    // count words
    for (let word of words) {
      if (!this.isCaseSensitive) {
        word = word.toLowerCase()
      }

      if (!counts[word]) {
        counts[word] = 0
      }

      counts[word]++
      totalWordCount++

      if (counts[word] > mostFrequentWordCount) {
        mostFrequentWordCount = counts[word]
        mostFrequentWord = word
      }
    }

    defineReadOnlyProperty(this, "hasBeenProcessed", true)
    defineReadOnlyProperty(this, "mostFrequentWord", mostFrequentWord)
    defineReadOnlyProperty(this, "totalWordCount", totalWordCount)
    defineReadOnlyProperty(this, "wordCounts", counts)
    return this
  }
}

export { Document }
