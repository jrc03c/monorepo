function doubleNormalizationHalf(word, doc) {
  return doubleNormalizationK(word, doc, 0.5)
}

function doubleNormalizationK(word, doc, k) {
  k = k || 0.5

  return (
    k +
    ((1 - k) * doc.getWordCount(word)) / doc.getWordCount(doc.mostFrequentWord)
  )
}

function termFrequency(word, doc) {
  return doc.getWordCount(word) / doc.totalWordCount
}

export { doubleNormalizationHalf, doubleNormalizationK, termFrequency }
