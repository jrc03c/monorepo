import { cosineSimilarity } from "../utils/cosine-similarity.mjs"

import {
  createType,
  createTypedArray,
  defineTypedProperty,
} from "@jrc03c/js-type-experiments"

import { Document } from "../document/index.mjs"
import { isWholeNumber } from "../utils/is-whole-number.mjs"
import { StringSet } from "../utils/string-set.mjs"

const WholeNumberType = createType("WholeNumber", isWholeNumber)

const Scoring = {
  TF_BINARY: "TF_BINARY",
  TF_RAW_COUNT: "TF_RAW_COUNT",
  TF_TERM_FREQUENCY: "TF_TERM_FREQUENCY",
  TF_LOG_NORMALIZATION: "TF_LOG_NORMALIZATION",
  TF_DOUBLE_NORMALIZATION_K: "TF_DOUBLE_NORMALIZATION_K",
  IDF_UNARY: "IDF_UNARY",
  IDF_INVERSE_DOCUMENT_FREQUENCY: "IDF_INVERSE_DOCUMENT_FREQUENCY",
  IDF_INVERSE_DOCUMENT_FREQUENCY_SMOOTH:
    "IDF_INVERSE_DOCUMENT_FREQUENCY_SMOOTH",
  IDF_INVERSE_DOCUMENT_FREQUENCY_MAX: "IDF_INVERSE_DOCUMENT_FREQUENCY_MAX",
  IDF_PROBABILISTIC_INVERSE_DOCUMENT_FREQUENCY:
    "IDF_PROBABILISTIC_INVERSE_DOCUMENT_FREQUENCY",
}

const ScoringType = createType("Scoring", v => !!Scoring[v])

const ZeroToOneNumberType = createType(
  "ZeroToOneNumber",
  v => typeof v === "number" && !isNaN(v) && v >= 0 && v <= 1,
)

class Corpus {
  static Scoring = Scoring

  constructor(data) {
    data = data || {}

    const docs = createTypedArray(Document).from(
      data.docs ? data.docs.map(doc => new Document(doc)) : [],
    )

    defineTypedProperty(this, "docs", docs.constructor)
    this.docs = docs

    defineTypedProperty(this, "hasBeenIndexed", "boolean")
    this.hasBeenIndexed = data.hasBeenIndexed || false

    defineTypedProperty(this, "maxNgramLength", WholeNumberType)

    this.maxNgramLength =
      typeof data.maxNgramLength === "undefined" ? 0 : data.maxNgramLength

    defineTypedProperty(this, "name", "string")
    this.name = data.name || "Untitled corpus"

    defineTypedProperty(this, "ngrams", StringSet)
    this.ngrams = new StringSet(data.ngrams || [])

    defineTypedProperty(this, "words", StringSet)
    this.words = new StringSet(data.words || [])

    defineTypedProperty(this, "tfScoringMethod", ScoringType)
    this.tfScoringMethod = data.tfScoringMethod || Scoring.TF_LOG_NORMALIZATION

    defineTypedProperty(
      this,
      "tfScoringDoubleNormalizationK",
      ZeroToOneNumberType,
    )

    this.tfScoringDoubleNormalizationK =
      typeof data.tfScoringDoubleNormalizationK === "undefined"
        ? 0.5
        : data.tfScoringDoubleNormalizationK

    defineTypedProperty(this, "idfScoringMethod", ScoringType)

    this.idfScoringMethod =
      data.idfScoringMethod || Scoring.IDF_INVERSE_DOCUMENT_FREQUENCY_SMOOTH
  }

  computeDocumentSimilarity(doc1, doc2) {
    if (!this.hasBeenIndexed) {
      throw new Error(
        `The corpus "${this.name}" has not yet been indexed! Please invoke its \`index\` method before doing anything else with it.`,
      )
    }

    const vec1 = []
    const vec2 = []

    this.words.forEach(word => {
      vec1.push(this.computeTFIDFScore(word, doc1))
      vec2.push(this.computeTFIDFScore(word, doc2))
    })

    return cosineSimilarity(vec1, vec2)
  }

  computeIDFScore(word) {
    if (!this.hasBeenIndexed) {
      throw new Error(
        `The corpus "${this.name}" has not yet been indexed! Please invoke its \`index\` method before doing anything else with it.`,
      )
    }

    if (this.idfScoringMethod === Scoring.IDF_UNARY) {
      return 1
    }

    const df = this.docs.filter(doc => doc.getWordCount(word) > 0).length

    if (this.idfScoringMethod === Scoring.IDF_INVERSE_DOCUMENT_FREQUENCY) {
      return Math.log(this.docs.length / (df + 1))
    }

    if (
      this.idfScoringMethod === Scoring.IDF_INVERSE_DOCUMENT_FREQUENCY_SMOOTH
    ) {
      return Math.log(this.docs.length / (df + 1)) + 1
    }

    if (this.idfScoringMethod === Scoring.IDF_INVERSE_DOCUMENT_FREQUENCY_MAX) {
      let maxDf = 0

      this.words.toArray().forEach(word => {
        const tempDf = this.docs.filter(
          doc => doc.getWordCount(word) > 0,
        ).length

        if (tempDf > maxDf) {
          maxDf = tempDf
        }
      })

      return Math.log(maxDf / (df + 1))
    }

    if (
      this.idfScoringMethod ===
      Scoring.IDF_PROBABILISTIC_INVERSE_DOCUMENT_FREQUENCY
    ) {
      return Math.log((this.docs.length - df + 1) / (df + 1))
    }
  }

  computeTFIDFScore(word, doc) {
    if (!this.hasBeenIndexed) {
      throw new Error(
        `The corpus "${this.name}" has not yet been indexed! Please invoke its \`index\` method before doing anything else with it.`,
      )
    }

    return this.computeTFScore(word, doc) * this.computeIDFScore(word)
  }

  computeTFScore(word, doc) {
    if (!this.hasBeenIndexed) {
      throw new Error(
        `The corpus "${this.name}" has not yet been indexed! Please invoke its \`index\` method before doing anything else with it.`,
      )
    }

    if (this.tfScoringMethod === Scoring.TF_BINARY) {
      return doc.getWordCount(word) > 0 ? 1 : 0
    }

    if (this.tfScoringMethod === Scoring.TF_RAW_COUNT) {
      return doc.getWordCount(word)
    }

    if (this.tfScoringMethod === Scoring.TF_TERM_FREQUENCY) {
      return doc.getWordCount(word) / doc.totalWordCount
    }

    if (this.tfScoringMethod === Scoring.TF_LOG_NORMALIZATION) {
      return Math.log(1 + doc.getWordCount(word))
    }

    if (this.tfScoringMethod === Scoring.TF_DOUBLE_NORMALIZATION_K) {
      let mostFrequentWordCount = 0

      doc.words.forEach(otherWord => {
        const count = doc.getWordCount(otherWord)

        if (count > mostFrequentWordCount) {
          mostFrequentWordCount = count
        }
      })

      return (
        this.tfScoringDoubleNormalizationK +
        ((1 - this.tfScoringDoubleNormalizationK) * doc.getWordCount(word)) /
          mostFrequentWordCount
      )
    }
  }

  getWordCounts(word) {
    if (!this.hasBeenIndexed) {
      throw new Error(
        `The corpus "${this.name}" has not yet been indexed! Please invoke its \`index\` method before doing anything else with it.`,
      )
    }

    return this.docs.map(doc => {
      return {
        doc: { name: doc.name, id: doc.id },
        count: doc.getWordCount(word),
      }
    })
  }

  async index(progress) {
    for (let i = 0; i < this.docs.length; i++) {
      const doc = this.docs[i]

      await doc.index(
        progress ? p => progress((i + p) / this.docs.length) : null,
      )
    }

    this.hasBeenIndexed = true
    return this
  }

  stringify() {
    return JSON.stringify(this.toObject(), ...arguments)
  }

  toObject() {
    return {
      docs: this.docs.map(doc => doc.toObject(...arguments)),
      hasBeenIndexed: this.hasBeenIndexed,
      idfScoringMethod: this.idfScoringMethod,
      maxNgramLength: this.maxNgramLength,
      name: this.name,
      ngrams: this.ngrams.toSortedArray(),
      tfScoringDoubleNormalizationK: this.tfScoringDoubleNormalizationK,
      tfScoringMethod: this.tfScoringMethod,
      words: this.words.toSortedArray(),
    }
  }
}

export { Corpus }
