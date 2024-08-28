const {
  DataFrame,
  isEqual,
  normal,
  random,
  round,
  seed,
  Series,
} = require("@jrc03c/js-math-tools")

const fs = require("node:fs")
const makeKey = require("@jrc03c/make-key")
const parse = require("./parse")
const stringify = require("./stringify")
const unindent = require("./unindent")

function makeKeySeeded(n) {
  return makeKey(n, Math.round(random() * 999999) + 999999)
}

const files = []

test("tests that objects and arrays with circular references can be stringified", () => {
  const arr = [2, 3, 4]
  arr.push([[arr]])
  arr.push([5, 6, [arr]])

  const arrTrue = `[2,3,4,[["Symbol(@String):<reference to \\"/\\">"]],[5,6,["Symbol(@String):<reference to \\"/\\">"]]]`

  expect(stringify(arr)).toBe(arrTrue)

  const obj = { hello: { to: { the: "world" } } }
  obj.hello.to.copy = obj.hello.to
  obj["self"] = { x: { y: { z: obj.hello.to } } }
  obj["arr"] = { values: [2, obj.hello.to, 3, 4] }

  const objTrue = `{"hello":{"to":{"the":"Symbol(@String):world","copy":"Symbol(@String):<reference to \\"/hello/to\\">"}},"self":{"x":{"y":{"z":{"the":"Symbol(@String):world","copy":"Symbol(@String):<reference to \\"/hello/to\\">"}}}},"arr":{"values":[2,{"the":"Symbol(@String):world","copy":"Symbol(@String):<reference to \\"/hello/to\\">"},3,4]}}`

  expect(stringify(obj)).toBe(objTrue)
})

test("tests that indentation can be applied when stringifying", () => {
  function dubble(x) {
    return x * 2
  }

  seed(12345)

  const variables = [
    0,
    1,
    2.3,
    -2.3,
    234n,
    -234n,
    Infinity,
    -Infinity,
    NaN,
    "foo",
    true,
    false,
    null,
    undefined,
    Symbol.for("Hello, world!"),
    x => x,
    new Date(round(random() * 10e13)),
    dubble,
  ]

  const obj = {}
  const frontier = [obj]

  for (let i = 0; i < 100; i++) {
    const endpoint = frontier[parseInt(random() * frontier.length)]

    const value =
      random() < 1 / 4
        ? []
        : random() < 1 / 4
          ? {}
          : variables[parseInt(random() * variables.length)]

    if (endpoint instanceof Array) {
      endpoint.push(value)
    } else {
      const key = makeKeySeeded(parseInt(random() * 5) + 1)
      endpoint[key] = value
    }

    if (
      typeof value === "object" &&
      value !== null &&
      !(value instanceof Date)
    ) {
      frontier.push(value)
    }
  }

  const xPred = stringify(obj, "  ")

  const xTrue = unindent(`
{
  "26": -2.3,
  "66": -2.3,
  "126": "function dubble(x) {\\n    return x * 2;\\n  }",
  "6583": "x => x",
  "33d0": [
    {
      "8": [
        -2.3,
        -2.3,
        [],
        {
          "eg": -2.3,
          "6gg1": {
            "d5af0": "234n"
          },
          "24beb": {}
        },
        [
          2.3
        ]
      ],
      "6128": [],
      "b9": {
        "22": "2365-02-16T23:47:32.955Z",
        "91": {
          "78": [
            "234n"
          ],
          "4c413": {
            "c": -2.3
          }
        },
        "gb5a": {
          "7": 2.3,
          "10": "function dubble(x) {\\n    return x * 2;\\n  }",
          "65g9": [
            []
          ],
          "aa3g": 0,
          "e1": "-234n",
          "g": "Symbol(Hello, world!)"
        },
        "5e": 1,
        "af": true,
        "f5d": [
          [],
          {}
        ],
        "50f53": {}
      },
      "g23": 2.3,
      "1b1": "234n",
      "d3aa": 1,
      "9e": [
        [
          {
            "4": [
              [
                [
                  {}
                ]
              ],
              1,
              {
                "8dc8d": {
                  "7edbc": 1
                },
                "f1d1d": [
                  0
                ],
                "ddf7c": [
                  [
                    []
                  ],
                  false
                ],
                "a78": [
                  1
                ]
              }
            ]
          },
          "Symbol(Hello, world!)",
          [
            2.3,
            0
          ],
          [
            {}
          ]
        ],
        {}
      ],
      "5c2": {
        "b5": [
          null,
          "Symbol(@NaN)"
        ]
      },
      "f8858": [
        "Symbol(@String):foo",
        "Symbol(@undefined)"
      ],
      "b9a0": "-234n",
      "47d": "Symbol(@Infinity)"
    },
    "function dubble(x) {\\n    return x * 2;\\n  }",
    "x => x",
    null,
    [
      [
        "x => x"
      ],
      false
    ],
    false,
    -2.3,
    [
      [],
      "Symbol(Hello, world!)"
    ],
    []
  ],
  "c69": "Symbol(Hello, world!)",
  "cg7e9": "Symbol(@Infinity)",
  "b13": false,
  "a8e": [
    {
      "f": 2.3
    },
    []
  ],
  "897ee": [
    true,
    []
  ]
}
  `).trim()

  expect(xPred).toBe(xTrue)
})

test("tests that values can be stringified and parsed back to their original value", () => {
  const df1 = new DataFrame(normal([100, 10]))
  const df2 = new DataFrame(normal([100, 10]))
  df2.values = df2.values.map(row => row.map(() => makeKey(8)))
  df2.columns = df2.columns.map(() => makeKey(8))
  const series = new Series(normal(100))
  series.name = "123abc"

  const variables = [
    0,
    1,
    2.3,
    -2.3,
    Infinity,
    -Infinity,
    234n,
    -234n,
    NaN,
    "foo",
    true,
    false,
    null,
    undefined,
    Symbol.for("Hello, world!"),
    /hello, .*/g,
    new RegExp("hello, .*", "g"),
    [2, 3, 4],
    [
      [2, 3, 4],
      [5, 6, 7],
    ],
    ["a", "b", "c", "123abc", "abc123"],
    { hello: "world" },
    new Uint8Array([1, 3, 5, 7, 9]),
    { buffer: new Uint8Array([1, 3, 5, 7, 9]) },
    df1,
    df2,
    series,

    // values that look like non-strings but need to be returned as strings:
    "12345",
    "January 1, 1970",
    "Infinity",
    "NaN",
    "true",
    "null",
    "undefined",
    "Symbol.for('Uh-oh!')",
    "[1, 2, 3, 4, 5]",
    "{ 'hello': 'world' }",

    // note: this is currently causing this test to fail! for some reason,
    // strings inside of objects aren't getting treated like standalone strings!
    { myNumberLikeString: "12345" },

    // strings that contain newlines
    ["foo", "bar", "baz"].join("\n"),
    { whatevs: ["foo", "bar", "baz"].join("\n") },
  ]

  variables.forEach(value => {
    const s = stringify(value)
    const p = parse(s)
    expect(isEqual(value, p)).toBe(true)
  })

  // test that undefined values are NOT dropped from arrays during
  // stringification and parsing
  const aTrue = [2, undefined, 4]
  const aPred = parse(stringify(aTrue))
  expect(isEqual(aTrue, aPred)).toBe(true)

  const bTrue = { hello: [2, undefined, 4] }
  const bPred = parse(stringify(bTrue))
  expect(isEqual(bTrue, bPred)).toBe(true)
})

test("tests that stringification and parsing work when writing to and reading from disk", () => {
  seed(12345)

  const variables = [
    0,
    1,
    2.3,
    -2.3,
    Infinity,
    -Infinity,
    NaN,
    "foo",
    true,
    false,
    null,
    undefined,
    Symbol.for("Hello, world!"),
    /hello, .*/g,
    new RegExp("hello, .*", "g"),
    new Date(round(random() * 10e13)),
  ]

  const obj = {}
  const frontier = [obj]

  for (let i = 0; i < 100; i++) {
    const endpoint = frontier[parseInt(random() * frontier.length)]

    const value =
      random() < 1 / 4
        ? []
        : random() < 1 / 4
          ? {}
          : variables[parseInt(random() * variables.length)]

    if (endpoint instanceof Array) {
      endpoint.push(value)
    } else {
      const key = makeKeySeeded(parseInt(random() * 5) + 1)
      endpoint[key] = value
    }

    if (
      typeof value === "object" &&
      value !== null &&
      !(value instanceof Date)
    ) {
      frontier.push(value)
    }
  }

  const objTrue = parse(stringify(obj))
  const out = stringify(obj)
  const filename = makeKey(8) + ".json"
  files.push(filename)
  fs.writeFileSync(filename, out, "utf8")
  const objPred = parse(fs.readFileSync(filename, "utf8"))
  expect(isEqual(objPred, objTrue)).toBe(true)
})

afterAll(() => {
  files.forEach(file => {
    fs.unlinkSync(file)
  })
})

test("tests that core value types can be stringified correctly", () => {
  // prettier-ignore
  function dubble(x) { return 2 * x }
  const now = new Date()

  const selfReferencer = [2, 3, 4]
  selfReferencer.push(selfReferencer)

  const buffer = new ArrayBuffer(256)
  const f64Array = new Float64Array(buffer)

  f64Array.forEach((v, i) => {
    f64Array[i] = Math.random()
  })

  const ui8Array = new Uint8Array(buffer)

  const pairs = [
    [0, "0"],
    [1, "1"],
    [2.3, "2.3"],
    [-2.3, "-2.3"],
    [Infinity, '"Symbol(@Infinity)"'],
    [-Infinity, '"Symbol(@NegativeInfinity)"'],
    [NaN, '"Symbol(@NaN)"'],
    ["foo", '"Symbol(@String):foo"'],
    [true, "true"],
    [false, "false"],
    [null, "null"],
    [undefined, '"Symbol(@undefined)"'],
    [Symbol.for("Hello, world!"), '"Symbol(Hello, world!)"'],
    [/hello, .*/g, "/hello, .*/g"],
    [new RegExp("hello, .*", "g"), "/hello, .*/g"],
    [[2, 3, 4], "[2,3,4]"],
    [
      [
        [2, 3, 4],
        [5, 6, 7],
      ],
      "[[2,3,4],[5,6,7]]",
    ],
    [x => x, '"x => x"'],
    [dubble, JSON.stringify(dubble.toString())],
    [{ hello: "world" }, '{"hello":"Symbol(@String):world"}'],
    [now, JSON.stringify(now.toJSON())],
    [selfReferencer, '[2,3,4,"Symbol(@String):<reference to \\"/\\">"]'],
    [
      new Uint8Array([2, 3, 4]),
      '{"values":[2,3,4],"Symbol(@TypedArrayConstructor)":"Symbol(@String):Uint8Array"}',
    ],
    [
      buffer,
      `{"values":${JSON.stringify(
        Array.from(ui8Array),
      )},"Symbol(@TypedArrayConstructor)":"Symbol(@String):ArrayBuffer"}`,
    ],
  ]

  pairs.forEach(pair => {
    expect(stringify(pair[0])).toBe(pair[1])
  })
})
