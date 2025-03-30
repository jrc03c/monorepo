function removeDiacriticalMarks(x) {
  if (typeof x !== "string") {
    throw new Error(
      "The value passed into the `removeDiacriticalMarks` function must be a string!",
    )
  }

  return x.normalize("NFD").replace(/\p{Diacritic}/gu, "")
}

export { removeDiacriticalMarks }
