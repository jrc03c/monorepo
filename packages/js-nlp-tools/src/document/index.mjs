import { clean } from "../utils/clean.mjs"
import { defineReadOnlyProperty } from "../utils/define-read-only-property.mjs"
import { makeKey } from "@jrc03c/make-key"

class Document {
  isCaseSensitive = false
  mostFrequentWord = null
  name = ""
  raw = ""
  totalWordCount = 0
  wordCounts = {}

  constructor(data) {
    defineReadOnlyProperty(this, "name", data.name || makeKey(8))
    defineReadOnlyProperty(this, "raw", data.raw)

    defineReadOnlyProperty(
      this,
      "isCaseSensitive",
      typeof data.isCaseSensitive === "undefined"
        ? false
        : data.isCaseSensitive,
    )
  }

  get words() {
    return Object.keys(this.wordCounts)
  }

  getWordCount(word) {
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

    defineReadOnlyProperty(this, "mostFrequentWord", mostFrequentWord)
    defineReadOnlyProperty(this, "totalWordCount", totalWordCount)
    defineReadOnlyProperty(this, "wordCounts", counts)
    return this
  }
}

export { Document }
