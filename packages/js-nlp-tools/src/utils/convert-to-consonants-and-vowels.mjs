import { removeDiacriticalMarks } from "./remove-diacritical-marks.mjs"

const vowels = ["a", "e", "i", "o", "u"]

function convertToConsonantsAndVowels(word) {
  const chars = removeDiacriticalMarks(word).toLowerCase().split("")
  let lastConsonantIndex = -1

  return chars.map((char, i) => {
    if (vowels.includes(char)) {
      return "v"
    }

    if (char === "y" && lastConsonantIndex === i - 1) {
      return "v"
    }

    lastConsonantIndex = i
    return "c"
  }).join("")
}

export { convertToConsonantsAndVowels }
