import { defineReadOnlyProperty } from "../utils/define-read-only-property.mjs"

class Corpus {
  docs = []

  constructor(data) {
    data = data || {}
    this.docs = data.docs || this.docs
  }

  getIDFScore(word) {
    return Math.log(
      this.docs.length / this.docs.filter(d => d.getWordCount(word) > 0).length,
    )
  }

  getTFScore(word, doc) {
    return (
      0.5 +
      (0.5 * doc.getWordCount(word)) / doc.getWordCount(doc.mostFrequentWord)
    )
  }

  getTFIDFScore(word, doc) {
    return this.getTFScore(word, doc) * this.getIDFScore(word)
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
