import { sum } from "@jrc03c/js-math-tools"

function inverseDocumentFrequency(word, docs) {
  return (
    docs.length / sum(docs.map(doc => (doc.getWordCount(word) > 0 ? 1 : 0)))
  )
}

function inverseDocumentFrequencySmooth(word, docs) {
  return (
    Math.log(
      docs.length /
        (sum(docs.map(doc => (doc.getWordCount(word) > 0 ? 1 : 0))) + 1),
    ) + 1
  )
}

export { inverseDocumentFrequency, inverseDocumentFrequencySmooth }
