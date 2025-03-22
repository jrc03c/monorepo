import { defineReadOnlyProperty } from "../utils/define-read-only-property.mjs"

class Corpus {
  docs = []

  constructor(data) {
    defineReadOnlyProperty(this, "docs", data.docs)
  }

  getIDFScore(word) {}

  getTFScore(word, doc) {}

  getTFIDFScore(word, doc) {}

  async process() {
    for (const doc of this.docs) {
      await doc.process()
    }

    return this
  }
}

export { Corpus }
