import { defineReadOnlyProperty } from "../utils/define-read-only-property.mjs"

class Corpus {
  docs = []
  hasBeenProcessed = false

  constructor(data) {
    data = data || {}
    this.docs = data.docs || this.docs

    if (data.hasBeenProcessed) {
      defineReadOnlyProperty(this, "docs", this.docs)
      defineReadOnlyProperty(this, "hasBeenProcessed", true)
    }
  }

  computeIDFScore(word) {
    if (!this.hasBeenProcessed) {
      throw new Error(
        "The `Corpus` instance has not yet been processed! Please invoke the instance's `process` method before calling any of the scoring methods.",
      )
    }

    return Math.log(
      this.docs.length / this.docs.filter(d => d.getWordCount(word) > 0).length,
    )
  }

  computeTFScore(word, doc) {
    if (!this.hasBeenProcessed) {
      throw new Error(
        "The `Corpus` instance has not yet been processed! Please invoke the instance's `process` method before calling any of the scoring methods.",
      )
    }

    return (
      0.5 +
      (0.5 * doc.getWordCount(word)) / doc.getWordCount(doc.mostFrequentWord)
    )
  }

  computeTFIDFScore(word, doc) {
    return this.computeTFScore(word, doc) * this.computeIDFScore(word)
  }

  async process(progress) {
    for (let i = 0; i < this.docs.length; i++) {
      await this.docs[i].process()

      if (progress) {
        progress(i / this.docs.length)
      }
    }

    if (progress) {
      progress(1)
    }

    defineReadOnlyProperty(this, "docs", this.docs)
    defineReadOnlyProperty(this, "hasBeenProcessed", true)
    return this
  }
}

export { Corpus }
