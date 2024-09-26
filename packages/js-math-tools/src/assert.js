import MathError from "./math-error.js"

export default function (isTrue, message) {
  if (!isTrue) throw new MathError(message)
}
