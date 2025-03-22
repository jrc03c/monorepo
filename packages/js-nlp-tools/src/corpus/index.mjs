import { defineReadOnlyProperty } from "../utils/define-read-only-property.mjs"
import { inverseDocumentFrequency } from "../utils/scoring/idf.mjs"
import { termFrequency } from "../utils/scoring/tf.mjs"

class Corpus {
  docs = []
  idf = null
  tf = null

  constructor(data) {
    data = data || {}
    this.docs = data.docs || this.docs
    this.idf = data.idf || inverseDocumentFrequency
    this.tf = data.tf || termFrequency
  }

  getIDFScore(word) {
    return this.idf(word, this.docs)
  }

  getTFScore(word, doc) {
    return this.tf(word, doc)
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
