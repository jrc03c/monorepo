import { defineReadOnlyProperty } from "../utils/define-read-only-property.mjs"

class Corpus {
  docs = []

  constructor(data) {
    data = data || {}
    this.docs = data.docs || this.docs
  }

  computeIDFScore(word) {
    return Math.log(
      this.docs.length / this.docs.filter(d => d.getWordCount(word) > 0).length,
    )
  }

  computeTFScore(word, doc) {
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
    return this
  }
}

export { Corpus }
