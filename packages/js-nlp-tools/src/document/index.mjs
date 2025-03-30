import { clean } from "../utils/clean.mjs"
import { defineReadOnlyProperty } from "../utils/define-read-only-property.mjs"
import { makeKey } from "@jrc03c/make-key"

class Document {
  hasBeenProcessed = false
  isCaseSensitive = false
  maxNGramLength = 5
  mostFrequentWord = null
  name = ""
  nGramCounts = {}
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

    defineReadOnlyProperty(
      this,
      "maxNGramLength",
      data.maxNGramLength || this.maxNGramLength,
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

  get nGrams() {
    if (!this.hasBeenProcessed) {
      throw new Error(
        "The `Document` instance has not yet been processed! Please invoke the instance's `process` method before accessing the `nGrams` property.",
      )
    }

    return Object.keys(this.nGramCounts)
  }

  get words() {
    if (!this.hasBeenProcessed) {
      throw new Error(
        "The `Document` instance has not yet been processed! Please invoke the instance's `process` method before accessing the `words` property.",
      )
    }

    return Object.keys(this.wordCounts)
  }

  getNGramCount(phrase) {
    if (!this.hasBeenProcessed) {
      throw new Error(
        "The `Document` instance has not yet been processed! Please invoke the instance's `process` method before calling the `getNGramCount` method.",
      )
    }

    if (!this.isCaseSensitive) {
      phrase = phrase.toLowerCase()
    }

    return this.nGramCounts[phrase] || 0
  }

  getWordCount(word) {
    if (!this.hasBeenProcessed) {
      throw new Error(
        "The `Document` instance has not yet been processed! Please invoke the instance's `process` method before calling the `getWordCount` method.",
      )
    }

    if (!this.isCaseSensitive) {
      word = word.toLowerCase()
    }

    return this.wordCounts[word] || 0
  }

  async process() {
    const shouldPreserveCase = this.isCaseSensitive
    const rawClean = clean(this.raw, shouldPreserveCase)
    const words = rawClean.split(" ")
    const counts = {}
    const nGramCounts = {}
    let totalWordCount = 0
    let mostFrequentWord = null
    let mostFrequentWordCount = 0

    // count words
    for (let i = 0; i < words.length; i++) {
      let word = words[i]

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

      for (let j = 2; j < this.maxNGramLength + 1; j++) {
        let phrase = words.slice(i, i + j).filter(v => !!v).join(" ")

        if (!this.isCaseSensitive) {
          phrase = phrase.toLowerCase()
        }

        if (!nGramCounts[phrase]) {
          nGramCounts[phrase] = 0
        }

        nGramCounts[phrase]++
      }
    }

    defineReadOnlyProperty(this, "hasBeenProcessed", true)
    defineReadOnlyProperty(this, "mostFrequentWord", mostFrequentWord)
    defineReadOnlyProperty(this, "nGramCounts", nGramCounts)
    defineReadOnlyProperty(this, "totalWordCount", totalWordCount)
    defineReadOnlyProperty(this, "wordCounts", counts)
    return this
  }
}

export { Document }
