import { clean } from "../utils/clean.mjs"
import { defineReadOnlyProperty } from "../utils/define-read-only-property.mjs"
import { makeKey } from "@jrc03c/make-key"
import { removeDiacriticalMarks } from "../utils/remove-diacritical-marks.mjs"

class Document {
  _words = []
  hasBeenProcessed = false
  isCaseSensitive = false
  maxNGramLength = 5
  mostFrequentWord = null
  name = ""
  nGramCounts = {}
  raw = ""
  rawWithoutDiacriticalMarks = ""
  totalWordCount = 0

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

    if (data.rawWithoutDiacriticalMarks) {
      defineReadOnlyProperty(
        this,
        "rawWithoutDiacriticalMarks",
        data.rawWithoutDiacriticalMarks,
      )
    }

    if (data.totalWordCount) {
      defineReadOnlyProperty(this, "totalWordCount", data.totalWordCount)
    }

    if (data.words) {
      defineReadOnlyProperty(this, "_words", data.words)
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

    return this._words
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

    return this.nGramCounts[word] || 0
  }

  async process() {
    const shouldPreserveCase = this.isCaseSensitive
    const rawClean = clean(this.raw, shouldPreserveCase)
    const words = rawClean.split(" ")
    const uniqueWords = new Set()
    const counts = {}
    let mostFrequentWord = null
    let mostFrequentWordCount = 0

    // count n-grams
    for (let i = 0; i < words.length; i++) {
      for (let j = 1; j < this.maxNGramLength + 1; j++) {
        let phrase = words.slice(i, i + j).filter(v => !!v).join(" ")

        if (!this.isCaseSensitive) {
          phrase = phrase.toLowerCase()
        }

        if (!counts[phrase]) {
          counts[phrase] = 0
        }

        counts[phrase]++

        if (j === 1) {
          uniqueWords.add(phrase)

          if (counts[phrase] > mostFrequentWordCount){
            mostFrequentWordCount = counts[phrase]
            mostFrequentWord = phrase
          }
        }
      }
    }

    // note: the `Intl.Collator` instance is used for sorting the words without
    // regard to diacritical marks
    const ic = new Intl.Collator()

    defineReadOnlyProperty(
      this,
      "_words",
      Array.from(uniqueWords).toSorted(ic.compare),
    )

    defineReadOnlyProperty(this, "hasBeenProcessed", true)
    defineReadOnlyProperty(this, "mostFrequentWord", mostFrequentWord)
    defineReadOnlyProperty(this, "nGramCounts", counts)

    defineReadOnlyProperty(
      this,
      "rawWithoutDiacriticalMarks",
      removeDiacriticalMarks(this.raw),
    )

    defineReadOnlyProperty(this, "totalWordCount", words.length)
    return this
  }
}

export { Document }
