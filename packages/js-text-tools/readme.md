# Introduction

**js-text-tools** is just a little collection of tools for modifying text. It can be used either in the command line or in JS projects.

# Installation

To use in the command line:

```bash
git clone https://github.com/jrc03c/js-text-tools.js
cd js-text-tools
npm link
```

Or to use in Node or the browser:

```bash
npm install --save https://github.com/jrc03c/js-text-tools.js
```

# Usage

In Node / bundlers:

```js
const {
  camelify,
  indent,
  kebabify,
  pascalify,
  snakeify,
  stringify,
  unindent,
  wrap,
} = require("@jrc03c/js-text-tools")
```

In the browser (standalone):

```html
<script src="path/to/dist/js-text-tools.js"></script>
<script>
  // import functions individually
  const {
    camelify,
    indent,
    kebabify,
    parse,
    pascalify,
    snakeify,
    stringify,
    unindent,
    wrap,
  } = JSTextTools

  // or dump everything into the global scope
  JSTextTools.dump()
</script>
```

In the command line (where all results are written out to `stdout`):

```bash
camelify "Hello, world!"
# helloWorld

kebabify "Hello, world!"
# hello-world

snakeify "Hello, world!"
# hello_world

# indent the lines of somefile.txt by two spaces
indent somefile.txt "  "

# unindent the lines of somefile.txt
unindent somefile.txt

# wrap the lines in somefile.txt at 80 characters and show the output in stdout
wrap somefile.txt

# wrap the lines in somefile.txt at 40 characters and save the wrapped text
# back into somefile.txt
wrap -m 40 -s somefile.txt

# wrap the lines in somefile.txt to 80 characters and save the wrapped text
# into a new file called somewrappedfile.txt
wrap -o somewrappedfile.txt somefile.txt
```

# API

## `camelify(text)`

Returns the text in camel-case.

```js
camelify("Hello, world!")
// helloWorld
```

## `indent(text, chars="")`

Returns the text with all lines indented by `chars`. By default, `chars` is an empty string.

```js
indent("Hello, world!", "\t\t")
// \t\tHello, world!
```

## `kebabify(text)`

Returns the text in kebab-case.

```js
kebabify("Hello, world!")
// hello-world
```

## `parse(text)`

Returns the value represented by the string `text`. For security reasons, function strings are not parsed.

## `pascalify(text)`

Returns the text in Pascal-case.

```js
pascalify("Hello, world!")
// HelloWorld
```

## `snakeify(text)`

Returns the text in snake-case.

```js
snakeify("Hello, world!")
// hello_world
```

## `stringify(value, [indentation])`

Returns `value` converted to a string. If a string is passed as `indentation`, then that string is used to indent each line. For example, passing `"  "` will use two spaces for each indentation of each line; and passing `"\t"` will use a tab for each indentation of each line. If no value or an empty string is passed as `indentation`, then items in lists and key-value pairs in objects won't be placed on new lines and indented. In that way, its functionality is somewhat similar to `JSON.stringify`.

This function automatically handles cyclic references by replacing each cyclic reference with the string `<reference to "/some/path">` where `"/some/path"` represents the path down through the root object to the original referent. Consider this object:

```js
const myObj = {
  this: {
    is: {
      deeply: {
        nested: "yep!",
      },
    },
  },
}
```

We could add a circular reference to it:

```js
myObj.this.is.deeply.circular = myObj.this.is
```

Now, when we inspect the object, we see:

```js
const util = require("util")
console.log(util.inspect(myObj, { depth: null, colors: true }))
// {
//   this: {
//     is: <ref *1> {
//       deeply: { nested: 'yep!', circular: [Circular *1] }
//     }
//   }
// }
```

Since the circular reference points to `myObj.this.is`, the `stringify` function will replace the circular reference with `"<reference to \"/this/is\">"`:

```js
const { stringify } = require("@jrc03c/js-text-tools")
console.log(stringify(myObj, null, 2))
// {
//   "this": {
//     "is": {
//       "deeply": {
//         "nested": "yep!",
//         "circular": "<reference to \"/this/is\">"
//       }
//     }
//   }
// }
```

The gist is that the value to be stringified is first copied in such a way that cyclic references are replaced with string descriptions, and then the safe copy is actually what gets stringified.

Finally, note that the built-in typed arrays (e.g., `Float64Array`) are stringified in a special way: they're converted to objects and _then_ stringified. The objects to which they're converted have these properties:

- `constructor` = A string representing the name of the class to which the array belongs (e.g., a `Float64Array` would have a `constructor` value of `"Float64Array"`).
- `flag` = The string `"FLAG_TYPED_ARRAY"`.
- `values` = A new, non-typed array containing the values from the original typed array.

The reason for this additional stringification step is that typed arrays can't be stringified by `JSON.stringify` and then reinstantiated automatically in their original type by `JSON.parse`. So, the `stringify` and `parse` functions in this library are designed to handle those and a few other edge cases — though they otherwise function mostly like `JSON.stringify` and `JSON.parse`.

## `unindent(text)`

Returns the text with all lines unindented by the same number of characters. For example, if the _smallest_ amount of indentation is 4 spaces, then each line will be unindented by 4 spaces.

For example, suppose I have a file called `message.txt` with this content:

```
    Hello, world!
      My name is Josh.
        What's your name?
```

The smallest amount of indentation in the file is 4 spaces. So, unindenting it will move all lines to the left by 4 spaces.

```js
const { unindent } = require("@jrc03c/js-text-tools")
const fs = require("fs")
const message = fs.readFileSync("message.txt", "utf8")
const unindentedMessage = unindent(message)
fs.writeFileSync("unindented-message.txt", unindentedMessage, "utf8")
```

The contents of `unindented-message.txt` would be:

```
Hello, world!
  My name is Josh.
    What's your name?
```

**NOTE:** The `unindent` function does _not_ pay attention to whether indentation consists of spaces or tabs. It only cares whether or not a character is a whitespace character. It also makes no attempt to make the whitespace characters consistent (i.e., it doesn't try to begin each line with _all_ spaces or _all_ tabs); it merely removes the minimum number of whitespace characters from each line and returns the result.

## `wrap(text, maxLineLength=80)`

Returns the text with all lines wrapped to a maximum length of `maxLineLength`. By default, the `maxLineLength` is 80 in the browser or the minimum of 80 and the number of `stdout` columns in the command line. Note that this function only wraps at spaces; it does not wrap mid-word, and it does not attempt to hyphenate words. The wrapping _does_ preserve indentation, though.

```js
const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mollis tellus eu mi condimentum, a congue ipsum luctus. Donec vel suscipit dolor, vitae faucibus massa. Curabitur rhoncus semper tortor et mattis. Nullam laoreet lobortis nibh eget viverra. Nam molestie risus vitae ante placerat convallis. Pellentesque quis tristique dui. Vivamus efficitur mi erat, nec gravida felis posuere at. Donec sapien ipsum, viverra et aliquam quis, posuere ac ligula. Aenean egestas tincidunt mauris, in hendrerit tortor malesuada id. Proin viverra sodales ex eu fermentum. Aenean nisl ipsum, tristique venenatis massa eget, tempor facilisis felis. Praesent aliquam sem vitae arcu porta commodo. Aliquam tempor sollicitudin dapibus. Nulla ullamcorper orci eu ultricies cursus."

wrap(text, 20)

/*
Lorem ipsum dolor
sit amet,
consectetur
adipiscing elit. Nam
mollis tellus eu mi
condimentum, a
congue ipsum luctus.
Donec vel suscipit
dolor, vitae
faucibus massa.
Curabitur rhoncus
semper tortor et
mattis. Nullam
laoreet lobortis
nibh eget viverra.
Nam molestie risus
vitae ante placerat
convallis.
Pellentesque quis
tristique dui.
Vivamus efficitur mi
erat, nec gravida
felis posuere at.
Donec sapien ipsum,
viverra et aliquam
quis, posuere ac
ligula. Aenean
egestas tincidunt
mauris, in hendrerit
tortor malesuada id.
Proin viverra
sodales ex eu
fermentum. Aenean
nisl ipsum,
tristique venenatis
massa eget, tempor
facilisis felis.
Praesent aliquam sem
vitae arcu porta
commodo. Aliquam
tempor sollicitudin
dapibus. Nulla
ullamcorper orci eu
ultricies cursus.
*/
```
