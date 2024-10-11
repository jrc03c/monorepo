import { Corpus } from "./corpus/index.mjs"
import { Document } from "./document/index.mjs"

if (typeof window !== "undefined") {
  window.JSNLPTools = { Corpus, Document }
}

export { Corpus, Document }
