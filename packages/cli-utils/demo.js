// properties of arguments:
// - short flag
// - long flag
// - variable name
// - value type
// - description / definition

// > at least one flag (long or short) is required
// > for boolean types, the presence of the flag is sufficient, though a value can also be passed
// > the value type is optional and only enforced if defined

const {
  createType,
  createTypedArray,
  defineTypedProperty,
} = require("@jrc03c/js-type-experiments")

const { fg, fx } = require("@jrc03c/bash-colors")
const { parse, stringify, wrap } = require("@jrc03c/js-text-tools")
const process = require("node:process")

const AnyType = createType("Any", () => true)

function throwNewError(x) {
  throw new Error(fg.red(x))
}

function isOfType(x, t) {
  try {
    return x instanceof t
  } catch (e) {
    return typeof x === t
  }
}

function typePhrase(type) {
  type = type.toString()
  const vowels = ["a", "e", "i", "o", "u"]
  return (vowels.indexOf(type.toLowerCase()[0]) > -1 ? "an" : "a") + " " + type
}

class ArgDef {
  constructor(options) {
    defineTypedProperty(this, "description", "string")
    defineTypedProperty(this, "long", "string")
    defineTypedProperty(this, "name", "string")
    defineTypedProperty(this, "ordered", "boolean")
    defineTypedProperty(this, "required", "boolean")
    defineTypedProperty(this, "short", "string")
    defineTypedProperty(this, "type", AnyType)

    this.description = options.description
    this.long = options.long
    this.name = options.name

    this.ordered =
      typeof options.ordered === "undefined"
        ? !this.short && !this.long
        : !!options.ordered

    this.required =
      typeof options.required === "undefined" ? false : !!options.required

    this.short = options.short
    this.type = options.type
  }
}

class APIExample {
  constructor(code, description) {
    this.code = code
    this.description = description
  }
}

class API {
  constructor(argdefs) {
    argdefs = createTypedArray(ArgDef).from(argdefs.map(v => new ArgDef(v)))
    defineTypedProperty(this, "argdefs", argdefs.constructor)
    this.argdefs = argdefs

    const examples = createTypedArray(APIExample)
    defineTypedProperty(this, "examples", examples.constructor)
    this.examples = examples

    defineTypedProperty(this, "invocation", "string")
  }

  showHelp() {
    console.log("")
    console.log(fx.bright("------"))
    console.log(fx.bright("Syntax"))
    console.log(fx.bright("------"))
    console.log("")

    console.log(
      wrap(
        `  ${fx.bright(fg.cyan(this.invocation))} ${fg.cyan(
          this.argdefs
            .map(a =>
              a.ordered
                ? `{${a.name}}`
                : a.long
                ? "--" + a.long
                : "-" + a.short,
            )
            .join(" "),
        )}`,
      ),
    )

    if (this.argdefs.length > 0) {
      console.log("")
      console.log(fx.bright("-------"))
      console.log(fx.bright("Options"))
      console.log(fx.bright("-------"))
      console.log("")

      for (const argdef of this.argdefs) {
        console.log(
          wrap(
            "  " +
              fg.yellow(
                argdef.ordered
                  ? `{${argdef.name}}`
                  : argdef.short && argdef.long
                  ? "-" + argdef.short + ", --" + argdef.long
                  : argdef.short
                  ? "-" + argdef.short
                  : "--" + argdef.long,
              ) +
              " = " +
              argdef.description,
          ),
        )

        console.log("")
      }
    }

    if (this.examples.length > 0) {
      console.log("")
      console.log(fx.bright("--------"))
      console.log(fx.bright("Examples"))
      console.log(fx.bright("--------"))
      console.log("")

      for (const example of this.examples) {
        if (example.description) {
          console.log(wrap("  " + fx.dim("# " + example.description)))
        }

        console.log(wrap("  " + example.code))
        console.log("")
      }
    }

    console.log("")
    process.exit()
  }

  parse(args) {
    args = args || Array.from(process.argv).slice(2)
    const out = { args: {}, kwargs: {} }

    this.argdefs.forEach(argdef => {
      if (argdef.ordered) {
        defineTypedProperty(out.args, argdef.name, argdef.type)
      } else {
        defineTypedProperty(out.kwargs, argdef.name, argdef.type)
      }
    })

    if (args.indexOf("-h") > -1 || args.indexOf("--help") > -1) {
      return this.showHelp()
    }

    const unorderedArgDefs = this.argdefs.filter(a => !a.ordered)
    const orderedArgDefs = this.argdefs.filter(a => a.ordered)

    unorderedArgDefs.forEach(argdef => {
      const shortIndex = args.findIndex(a => a === "-" + argdef.short)
      const longIndex = args.findIndex(a => a.includes("--" + argdef.long))

      if (shortIndex > -1 && longIndex > -1) {
        throwNewError(
          `Either the -${argdef.short} flag or the --${argdef.long} flag can be used, but not both at the same time!`,
        )
      }

      // if short flag is present...
      if (shortIndex > -1) {
        // if the variable type is boolean, then the presence of the flag is
        // equivalent to `true`
        if (argdef.type === "boolean") {
          out.kwargs[argdef.name] = true
        }

        // otherwise, get the value to the right of the short flag
        else {
          let value = args[shortIndex + 1]

          try {
            if (argdef.type !== "string") {
              value = parse(value)
            }
          } catch (e) {
            // ...
          }

          if (!isOfType(value, argdef.type)) {
            throwNewError(
              `The \`${argdef.name}\` variable must receive ${typePhrase(
                argdef.type,
              )} value, but ${typePhrase(typeof value)} value (${stringify(
                value,
              )}) was provided!`,
            )
          }

          out.kwargs[argdef.name] = value
        }

        // remove the arguments from the list
        args.splice(shortIndex, 2)
      }

      // or if the long flag is present...
      else if (longIndex > -1) {
        const arg = args[longIndex]
        const hasEqualsSign = arg.includes("=")

        let value = hasEqualsSign
          ? arg.split("=").slice(1).join("=")
          : args[longIndex + 1]

        try {
          value = parse(value)
        } catch (e) {
          // ...
        }

        if (!isOfType(value, argdef.type)) {
          throwNewError(
            `The \`${argdef.name}\` variable must receive ${typePhrase(
              argdef.type,
            )} value, but ${typePhrase(typeof value)} value (${stringify(
              value,
            )}) was provided!`,
          )
        }

        out.kwargs[argdef.name] = value

        // remove the arguments from the list
        args.splice(longIndex, hasEqualsSign ? 1 : 2)
      }

      // or if the argument simply isn't present, then set its value to
      // undefined (except for booleans, which can be set to `false`)
      else {
        if (argdef.required) {
          throwNewError(`The \`${argdef.name}\` argument is required!`)
        }

        out.kwargs[argdef.name] = argdef.type === "boolean" ? false : undefined
      }
    })

    const remainingValues = args.map(v => {
      try {
        return parse(v)
      } catch (e) {
        return v
      }
    })

    orderedArgDefs.forEach(argdef => {
      const index = remainingValues.findIndex(v => isOfType(v, argdef.type))
      const value = remainingValues[index]

      if (index > -1) {
        if (index > 0) {
          const t = typePhrase(argdef.type)

          throwNewError(
            `The ordered arguments you provided are out of order! (${
              t[0].toUpperCase() + t.slice(1)
            } value was expected, but ${typePhrase(
              typeof v,
            )} value (${stringify(value)}) was provided.)`,
          )
        }

        out.args[argdef.name] = value
        remainingValues.splice(0, 1)
      } else {
        out.args[argdef.name] = undefined
      }
    })

    orderedArgDefs.forEach(argdef => {
      if (argdef.required && typeof out.args[argdef.name] === "undefined") {
        throwNewError(`The \`${argdef.name}\` argument is required!`)
      }
    })

    return out
  }
}

const api = new API([
  new ArgDef({
    name: "command1",
    type: "string",
  }),
  new ArgDef({
    name: "command2",
    type: "string",
  }),
  new ArgDef({
    long: "apples",
    name: "appleCount",
    short: "a",
    type: "number",
  }),
  new ArgDef({
    long: "barn-doors",
    name: "barnDoorCount",
    short: "b",
    type: "number",
  }),
  new ArgDef({
    long: "curse",
    name: "favoriteCurse",
    short: "c",
    type: "string",
  }),
  new ArgDef({
    long: "dog",
    name: "dogExists",
    short: "d",
    type: "boolean",
  }),
  new ArgDef({
    long: "eagle",
    name: "eagleSymbol",
    short: "e",
    type: "symbol",
  }),
  new ArgDef({
    name: "filePath1",
    required: true,
    type: "string",
  }),
  new ArgDef({
    name: "filePath2",
    required: true,
    type: "string",
  }),
])

api.examples.push(new APIExample("whatevs /foo /bar", "basic usage"))

api.examples.push(new APIExample("whatevs -a 3 /foo /bar", "three apples"))

api.examples.push(
  new APIExample(
    "whatevs --curse=balls -a 3 /foo /bar",
    "three apples and balls",
  ),
)

api.examples.push(
  new APIExample(
    "whatevs --curse balls -a 3 /foo /bar",
    "three apples and balls (without the equals sign); and actually, this is a much longer description only because i want to see if the text wrapping works correctly",
  ),
)

api.invocation = "whatevs"
const args = api.parse()
console.log(parse(stringify(args)))
