`freeze` is a little function that returns an immutable copy of a JS object or array.

**Install:**

```bash
npm install --save https://github.com/jrc03c/freeze
```

**Use:**

```js
const freeze = require("@jrc03c/freeze")

const person = freeze({ name: "Alice" })
person.name = "Bob"
console.log(person.name)
// Alice

const myList = freeze([1, 2, 3])
myList.push(42)
console.log(myList)
// [1, 2, 3]
```

By default, the above operations fail silently. However, if you'd prefer for them to throw errors, you can pass a `true` value as the second argument:

```js
const shouldThrowErrors = true
const person = freeze({ name: "Alice" }, shouldThrowErrors)
person.name = "Bob"
// Uncaught Error: The target object is read-only, so its "name" property
// cannot be set!
```

**Notes:**

There might be sneaky ways of modifying "frozen" objects or arrays that haven't occurred to me yet. If you find any, please let me know!
