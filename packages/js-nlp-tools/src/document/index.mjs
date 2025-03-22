import { clean } from "../utils/clean.mjs"
import { defineReadOnlyProperty } from "../utils/define-read-only-property.mjs"

class Document {
  isCaseSensitive = false
  raw = ""
  totalWordCount = 0
  wordCounts = {}

  constructor(data) {
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

  getTFScore(word) {
    return this.wordCounts[word] / this.totalWordCount
  }

  async process() {
    const shouldPreserveCase = this.isCaseSensitive
    const rawClean = clean(this.raw, shouldPreserveCase)
    const words = rawClean.split(" ")
    const counts = {}
    let totalWordCount = 0

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
    }

    defineReadOnlyProperty(this, "wordCounts", counts)
    defineReadOnlyProperty(this, "totalWordCount", totalWordCount)
    return this
  }
}

export { Document }
