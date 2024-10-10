import { indent, unindent, wrap } from "@jrc03c/js-text-tools"

function showHelpText(text) {
  console.log(wrap(indent(unindent(text), "  ")))
}

export { showHelpText }
