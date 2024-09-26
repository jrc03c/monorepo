function isDate(x) {
  return x instanceof Date && x.toString() !== "Invalid Date"
}

export default isDate
