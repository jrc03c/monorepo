# Bundling

## What to bundle

**Not all of the packages in this repo should be bundled!** See the notes [here](https://ameyama.com/wiki/#/doc/16ec1097e73a5ca700f9933bbcd22fea581987a3c85a0c04ad3f168250c56073) for more info.

The gist is that we _should_ bundle when the product is a website or callable script, but should _not_ bundle when the product is a library. Most of the tools in this repo are libraries, so most of them should not be bundled.

There's one important exception to this rule, though: **IIFE scripts** that are used to dump items into the global scope _can and should be bundled_ since (1) they're intended for use in the browser and (2) they must necessarily include all of their dependencies since they'll be executed immediately. (Of course, packages that are only intended for use in Node need not worry about bundling IIFE scripts at all. Such packages may output an IIFE via the `"bin"` property of `package.json`, but those scripts generally don't need to be bundled.)

## Bundling rules & conventions

Unless specific project requirements call for another configuration, this is generally how a project's `package.json` file should be configured:

```
{
  "main": "./path/to/src/entry.mjs",
  "module": "./path/to/src/entry.mjs",
  "name": "@jrc03c/whatever"
}
```

If the library is intended for use in the browser and should provide an IIFE script, then add:

```
{
  "scripts": {
    "build": "npx esbuild path/to/src/iife-entry.mjs --bundle --outfile=dist/iife.js",
    "watch": "npx esbuild path/to/src/iife-entry.mjs --bundle --outfile=dist/iife.js --watch",
  }
}
```

Notice that:

- There's a separate file for IIFE entry (`path/to/src/iife-entry.mjs`). Having a separate IIFE entry file means that the primary source entry file no longer has to do the dirty work of dumping things into the global scope.
- The bundled IIFE script is _not_ mentioned as one of the package's exports.
- The IIFE script is the only thing produced by the bundler.

# Moon cheat sheet

Moon's own cheat sheet can be found [here](https://moonrepo.dev/docs/cheat-sheet).

## Commands

### Initialize a project [[docs](https://moonrepo.dev/docs/commands/init)]

**NOTE:** This must be run from within the target project directory, not from the monorepo root!

```bash
moon init
```

### Run a project script (see ℹ️ below) [[docs](https://moonrepo.dev/docs/commands/run)]

```bash
moon run app-name:script-name

# or without `run`:
moon app-name:script-name
```

> ℹ️ **NOTE:** When a project is initialized for the first time, Moon copies its scripts from the project's `package.json` file to a new `moon.yml` file. When running a project script as shown above, make sure to reference the script name as defined in `moon.yml`, _not_ `package.json` (though ideally the two will be identical).

### Run all build and test tasks for all projects [[docs](https://moonrepo.dev/docs/commands/ci)]

```bash
moon ci
```

### Clean the cache [[docs](https://moonrepo.dev/docs/commands/clean)]

```bash
moon clean
```

### Display the project graph [[docs](https://moonrepo.dev/docs/commands/project-graph)]

```bash
moon project-graph
```
