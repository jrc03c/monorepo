# Intro

FileDB is a simple database tool for Node. It writes and reads plaintext files to and from disk.

# Installation

`npm install --save @jrc03c/filedb`

# Usage

```js
const FileDB = require("@jrc03c/filedb")

// create a new database, specifying the directory in which to write data
// (which will be created automatically if it doesn't exist)
const db = new FileDB("some/directory")

// write data
const payload = { x: 5, y: 7, z: "Hello, world!" }
db.writeSync("/foo", payload)

// read data
const results = db.readSync("/foo")
console.log(results)
// {x: 5, y: 7, z: "Hello, world!"}

// delete data
db.writeSync("/foo", null)
```

FileDB works by writing data as files and folders on disk. There are a few implications of this design:

- It's possible to add new stuff to the "database" (the `FileDB` instance's working directory) without using FileDB. In other words, you can manually modify the files and folders in the database without using `filedb` at all!
- It's easy to read and understand what data is being written and read because you can examine and modify the files and folders directly.

# An example in detail

Suppose that Alice is working on a project that needs a database. Her project is located `/home/alice/my-project`. She decides she needs a database for the project, and she wants the data to live in `/home/alice/my-project/data`. She can create the new `filedb` database in one of two ways:

1. She can pass the absolute path to the database directory into the `FileDB` constructor. For example: `new FileDB("/home/alice/my-project/data")`
2. From anywhere along the path to the database directory, she can pass a relative path into the `FileDB` constructor. For example, from within the `/home/alice/my-project` directory, she can do: `new FileDB("data")`

So, Alice creates a script at `/home/alice/my-project/index.js` with this content:

```js
const FileDB = require("@jrc03c/filedb")
const db = new FileDB("data")
```

Now she wants to write some data into the database. Suppose that her project involves keeping track of some user data. She could do something like this (where the long, random-looking strings are the MD5 hashes of the users' email addresses):

<!-- prettier-ignore -->
```js
db.writeSync("/users", {
  "c160f8cc69a4f0bf2b0362752353d060": {
    name: "Alice",
    email: "alice@example.com",
    age: 21,
    preferences: {
      darkMode: true,
    },
  },
  "4b9bb80620f03eb3719e0a061c14283d": {
    name: "Bob",
    email: "bob@example.com",
    age: 34,
    preferences: {
      darkMode: false,
    },
  },
  "f6f24749c91477e8c31c26b21a51c732": {
    name: "Candice",
    email: "candice@example.com",
    age: 56,
    preferences: {
      darkMode: true,
    },
  },
})
```

Now the structure of her `/home/alice/my-project/data` directory looks like this:

```
data
└── users
    ├── 4b9bb80620f03eb3719e0a061c14283d
    │   ├── age
    │   ├── email
    │   ├── name
    │   └── preferences
    │       └── darkMode
    ├── c160f8cc69a4f0bf2b0362752353d060
    │   ├── age
    │   ├── email
    │   ├── name
    │   └── preferences
    │       └── darkMode
    └── f6f24749c91477e8c31c26b21a51c732
        ├── age
        ├── email
        ├── name
        └── preferences
            └── darkMode
```

> 💡 **NOTE:** The order in which the users are listed above is different from the order in which the users were listed in the object that Alice stored in the database. That's because the `tree` command I used to print out this fancy directory tree sorts items before printing them, and Bob's email hash ("4b9bb80620f03eb3719e0a061c14283d") comes before Alice's email hash ("c160f8cc69a4f0bf2b0362752353d060") when sorted in this way. We'll see the same thing in a moment when Alice reads the data back from disk.

Each of the leaf nodes on this tree are files containing the value that corresponds to that key name. For example:

```bash
cat /home/alice/my-project/data/users/c160f8cc69a4f0bf2b0362752353d060/name
# "Alice"
```

To retrieve the user data later, Alice can do this:

```js
const myData = db.readSync("/users")
console.log(myData)

// {
//   '4b9bb80620f03eb3719e0a061c14283d': {
//     age: 34,
//     email: 'bob@example.com',
//     name: 'Bob',
//     preferences: { darkMode: false }
//   },
//   c160f8cc69a4f0bf2b0362752353d060: {
//     age: 21,
//     email: 'alice@example.com',
//     name: 'Alice',
//     preferences: { darkMode: true }
//   },
//   f6f24749c91477e8c31c26b21a51c732: {
//     age: 56,
//     email: 'candice@example.com',
//     name: 'Candice',
//     preferences: { darkMode: true }
//   }
// }
```

She can also retrieve specific bits of data by reading further along each path. For example, she can retrieve her own dark mode preference this way:

```js
const aliceDarkModePreference = db.readSync(
  "/users/c160f8cc69a4f0bf2b0362752353d060/preferences/darkMode",
)

console.log(aliceDarkModePreference)
// true
```

## Reading and writing arrays

There's only one case where `filedb` writes extra data in addition to what you pass to it: when it needs to write an array to disk. Suppose that Alice wants to store a list of email addresses in the database for quick reference. Should could do something like this:

```js
db.writeSync("/emails", [
  "alice@example.com",
  "bob@example.com",
  "candice@example.com",
])
```

Now, her directory tree looks like this:

```
data
├── emails
│   ├── 0
│   ├── 1
│   ├── 2
│   └── .filedb.meta.is-array
└── users
    ├── 4b9bb80620f03eb3719e0a061c14283d
    │   ├── age
    │   ├── email
    │   ├── name
    │   └── preferences
    │       └── darkMode
    ├── c160f8cc69a4f0bf2b0362752353d060
    │   ├── age
    │   ├── email
    │   ├── name
    │   └── preferences
    │       └── darkMode
    └── f6f24749c91477e8c31c26b21a51c732
        ├── age
        ├── email
        ├── name
        └── preferences
            └── darkMode
```

You may have spotted an extra file in there called `.filedb.meta.is-array` under `data/emails`. That file is just a little flag that `filedb` uses to remind itself that the data stored in the `data/users` directory is an array. Right now, if Alice reads the data back from disk, she gets what she expects:

```js
const emailsArray = db.readSync("/emails")
console.log(emailsArray)
// [ 'alice@example.com', 'bob@example.com', 'candice@example.com' ]
```

However, if she deletes the `.filedb.meta.is-array` file, then there's a chance that the data can be read back as an object. If all of the keys are whole numbers over a range in which no numbers are skipped (e.g., [0, 1, 2, 3, 4, 5, 6]), then the data will be read back as an array. But if any of the keys are not whole numbers, or if any whole numbers are missing from the range of whole numbers (e.g., if 2 is missing from [0, 1, 3, 4, 5, 6]), then the data will be read back as an object. We can see this if Alice intentionally deletes _both_ the `.filedb.meta.is-array` file _and_ the data at index 1:

```js
// delete those files
db.writeSync("/emails/.filedb.meta.is-array", null)
db.writeSync("/emails/1", null)

// read the data
const emailsObject = db.readSync("/emails")
console.log(emailsObject)
// { '0': 'alice@example.com', '2': 'candice@example.com' }
```

If Alice deletes the data at index 1 but _does not_ delete the `.filedb.meta.is-array` file, then the data will be read back as an array with a missing value at index 1.

## Valid filesystem paths

Since every index and key down through an object or array is converted to a file or directory and written to disk, every index and key must be safe to use as a name for a file or directory. Since various filesystems apparently allow different sets of characters, I've set the list of valid characters to be those that seem common to all Unix filesystems: forward slashes ("/"), alphanumerics (0-9, A-Z, a-z), hyphens ("-"), underscores ("\_"), and periods ("."). Paths also cannot contain whitespace, and they cannot include file or directory names that consist only of a single period (".") or a double period ("..").

For example, these won't work:

```js
// Nope. 🔴 😿
db.readSync("../something")
db.readSync("path/./to/./something")
db.readSync("my spaced out path")
db.readSync("$HOME")
db.readSync("`pwd`")
```

But these will:

```js
// Yep! 🟢 😸
db.readSync("/my/cool/path")
db.readSync("this_is-totally.fine")
db.readSync(".so.is.this.")
db.readSync("1/2/3/4")
```

Also note that paths are subject to whatever other constraints are placed on them by the filesystem, including maximum path lengths. For example, you might find that `db.writeSync("/smol", true)` throws an error if the absolute path to `/smol` is too long.

Finally, note that paths ending in a forward slash ("/") don't make any sense because they're neither a file nor a directory; so all such trailing forward slashes are merely removed, no warnings are given, and no errors are thrown.

## Maximum read depth

Data can become quite deeply nested, and it's not always necessary to retrieve all of it. In such cases, a maximum read depth can be passed to the `read` or `readSync` methods.

Suppose that Alice wants to get a list of all of the MD5 hashes of her users' email addresses. She can accomplish this by reading the `/users` path but restricting the depth from which data is read. For example:

```js
const hashes = db.readSync("/users", 0)
console.log(hashes)

// [
//   '4b9bb80620f03eb3719e0a061c14283d',
//   'c160f8cc69a4f0bf2b0362752353d060',
//   'f6f24749c91477e8c31c26b21a51c732'
// ]
```

Alice's user data has 4 levels of depth: users → email hash → preferences → dark mode. Reading the full depth of the data is equivalent to passing a 3 as the maximum read depth (since the depth starts at 0):

```js
// no maximum depth
console.log(db.readSync("/users"))

// {
//   '4b9bb80620f03eb3719e0a061c14283d': {
//     age: 34,
//     email: 'bob@example.com',
//     name: 'Bob',
//     preferences: { darkMode: false }
//   },
//   c160f8cc69a4f0bf2b0362752353d060: {
//     age: 21,
//     email: 'alice@example.com',
//     name: 'Alice',
//     preferences: { darkMode: true }
//   },
//   f6f24749c91477e8c31c26b21a51c732: {
//     age: 56,
//     email: 'candice@example.com',
//     name: 'Candice',
//     preferences: { darkMode: true }
//   }
// }

// maximum depth of 3, which in this case is the same as having no maximum depth
console.log(db.readSync("/users", 3))

// {
//   '4b9bb80620f03eb3719e0a061c14283d': {
//     age: 34,
//     email: 'bob@example.com',
//     name: 'Bob',
//     preferences: { darkMode: false }
//   },
//   c160f8cc69a4f0bf2b0362752353d060: {
//     age: 21,
//     email: 'alice@example.com',
//     name: 'Alice',
//     preferences: { darkMode: true }
//   },
//   f6f24749c91477e8c31c26b21a51c732: {
//     age: 56,
//     email: 'candice@example.com',
//     name: 'Candice',
//     preferences: { darkMode: true }
//   }
// }
```

# API

## Constructor

## `FileDB([path])`

Constructs a new `FileDB` instance. The given path (which is optional) is the directory in which the instance will do all of its reading and writing. Paths can be relative or absolute. If no path is provided, then the path resolves to the current working directory.

## Properties

## Methods

## `exists(key, [callback])`

Asynchronously checks to see whether or not a key exists. Returns a `Promise` that resolves to a boolean. Passing a callback function is optional.

## `existsSync(key)`

Synchronously checks to see whether or not a key exists. Returns a boolean.

## `fork(key)`

Creates a `FileDB` instance relative to the current instance at the subdirectory `key` (i.e., at `path.join(this.path, key)`). So, for example:

```js
const db1 = new FileDB("foo/bar")
console.log(db1.path)
// /absolute/path/to/foo/bar

const db2 = db1.fork("something/else")
console.log(db2.path)
// /absolute/path/to/foo/bar/something/else
```

## `write(key, value, [ignored], [callback])`

Asynchronously writes a key-value pair to disk. Returns a `Promise` that resolves to a boolean indicating whether or not the value was written to disk. Generally, this will be a `true` value, but it can be `false` in cases where the given key matches a pattern in the `ignored` list. Passing an `ignored` list is optional; but if passed, it must be an array containing strings and/or regular expressions against which to match paths. Passing a callback function is optional.

## `writeSync(key, value, [ignored])`

Synchronously writes a key-value pair to disk. Returns a boolean indicating whether or not the value was written to disk. Generally, this will be a `true` value, but it can be `false` in cases where the given key matches a pattern in the `ignored` list. Passing an `ignored` list is optional; but if passed, it must be an array containing strings and/or regular expressions against which to match paths.

## `read(key, [maxDepth], [ignored], [callback])`

Asynchronously reads the value of a key from disk. Returns a `Promise` that resolves to whatever kind of data the stored value represents. Passing a callback function is optional. A maximum depth value is also optional and represents the depth of data to return. For example, if there's a key at `"/a/b/c/d/e/.../z"`, and I call `db.read("/a/b/c", 3)`, then the returned data will only go as deep as `/a/b/c`. See the example below for further clarification. Passing an `ignored` list is optional; but if passed, it must be an array containing strings and/or regular expressions against which to match paths.

## `readSync(key, [maxDepth], [ignored])`

Synchronously reads the value of a key from disk. Returns whatever kind of data the stored value represents. A maximum depth value is optional and represents the depth of data to return. For example, if there's a key at `"/a/b/c/d/e/.../z"`, and I call `db.read("/a/b/c", 3)`, then the returned data will only go as deep as `/a/b/c`. See the example below for further clarification. Passing an `ignored` list is optional; but if passed, it must be an array containing strings and/or regular expressions against which to match paths.

# Caveats and other musings

- I've tried to mitigate the risk of accidentally (or intentionally) using a key that converts to a path _outside of_ the database's working directory. Valid filesystem paths are described above. However, it may still be possible to work around this roadblock. If you find a way to do so, please let me know so I can patch it up! If you're really worried about this, though, one potential solution could be to create a password and symmetrically encrypt each key with it such that the key becomes an alphanumeric string before you try to read or write with it. Thus if a key somehow contains malicious code that could allow it to read from or write to parts of the filesystem outside of the database's working directory, then this method would convert the key to only alphanumeric characters for storage; but it could be decrypted later using the same password. Note that this is _absolutely not_ a method for keeping data safe or private; it's only a possible strategy for mitigating nefarious reads and writes caused by a nefarious key. In fact, I'd recommend finding a super simple encryption algorithm, one that can work fast and produce relatively short strings, since the goal in this particular case has nothing to do with encrypting the data at rest.
- This package intentionally doesn't include any options to encrypt the data at rest because such a feature is out of scope.
- I don't know what I'm doing. This is probably horribly designed and executed. But it works for my needs, so I'm happy with it.
- I have no idea how it'll respond to binary data. I haven't tried it yet. But I suspect that, as long as the data can be stringified, it can be written and read with FileDB. I should probably add that to the to-do list...
- Good luck! Feel free to give me feedback!
