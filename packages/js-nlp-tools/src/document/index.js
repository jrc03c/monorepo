const { clean, isWholeNumber, StringSet } = require("../utils")

const {
  createType,
  defineTypedProperty,
} = require("@jrc03c/js-type-experiments")

const { hash } = require("@jrc03c/js-crypto-helpers")
const { set } = require("@jrc03c/js-math-tools")
const makeKey = require("@jrc03c/make-key")
const WordCountMap = require("./word-count-map")

const WholeNumberType = createType("WholeNumber", isWholeNumber)

class Document {
  constructor(data) {
    data = data || {}

    defineTypedProperty(this, "cleaned", "string")
    this.cleaned = data.cleaned || ""

    defineTypedProperty(this, "hasBeenIndexed", "boolean")
    this.hasBeenIndexed = data.hasBeenIndexed || false

    defineTypedProperty(this, "id", "string")
    this.id = data.id || ""

    defineTypedProperty(this, "maxNgramLength", WholeNumberType)

    this.maxNgramLength =
      typeof data.maxNgramLength === "undefined"
        ? Infinity
        : data.maxNgramLength

    defineTypedProperty(this, "name", "string")
    this.name = data.name || makeKey(32)

    defineTypedProperty(this, "ngrams", StringSet)
    this.ngrams = new StringSet(data.ngrams || [])

    defineTypedProperty(this, "raw", "string")
    this.raw = data.raw || ""

    defineTypedProperty(this, "totalWordCount", WholeNumberType)
    this.totalWordCount = data.totalWordCount || 0

    defineTypedProperty(this, "wordCounts", WordCountMap)
    this.wordCounts = new WordCountMap(data.wordCounts || {})

    defineTypedProperty(this, "words", StringSet)
    this.words = new StringSet(data.words || [])
  }

  getWordCount(word) {
    if (!this.hasBeenIndexed) {
      throw new Error(
        `The document "${this.name}" has not yet been indexed! Please invoke its \`index\` method before doing anything else with it.`,
      )
    }

    return this.wordCounts.get(word) || 0
  }

  async index(progress) {
    this.id = await hash(this.raw)
    this.cleaned = clean(this.raw)

    const allWords = this.cleaned.split(" ")
    this.totalWordCount = allWords.length

    const unsortedWordSet = set(allWords)
    this.words = new StringSet(unsortedWordSet)

    allWords.forEach((word, i) => {
      const count = this.wordCounts.get(word)

      if (typeof count === "undefined") {
        this.wordCounts.set(word, 1)
      } else {
        this.wordCounts.set(word, count + 1)
      }

      if (progress) progress((0.5 * i) / allWords.length)
    })

    const nMax = Math.min(unsortedWordSet.length, this.maxNgramLength)

    for (let n = 2; n <= nMax; n++) {
      for (let i = 0; i < unsortedWordSet.length - n; i++) {
        const phrase = unsortedWordSet.slice(i, i + n).join(" ")
        this.ngrams.add(phrase)

        if (progress) {
          progress(0.5 + 0.5 * ((n + i / (unsortedWordSet.length - n)) / nMax))
        }
      }
    }

    if (progress) progress(1)
    this.hasBeenIndexed = true
    return this
  }

  stringify() {
    return JSON.stringify(this.toObject(), ...arguments)
  }

  toObject() {
    return {
      cleaned: this.cleaned,
      hasBeenIndexed: this.hasBeenIndexed,
      id: this.id,
      maxNgramLength: this.maxNgramLength,
      name: this.name,
      ngrams: this.ngrams.toSortedArray(),
      raw: this.raw,
      totalWordCount: this.totalWordCount,
      wordCounts: this.wordCounts.toObject(),
      words: this.words.toSortedArray(),
    }
  }
}

module.exports = Document
