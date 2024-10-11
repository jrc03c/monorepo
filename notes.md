# Bundling

## What to bundle

**All libraries should be bundled!** See my notes [here](https://ameyama.com/wiki/#/doc/e2f71461022fb54dc7c939dc4bb16ceedf792fd1314cf4b1de20e32bee6240a1) for more info.

## Bundling rules & conventions

1. Libraries that are bundled should output a production file with the same name as the library. For example, the `js-math-tools` library's bundle file should be called `js-math-tools.js`. Libraries that are _not_ bundled but that are still intended for use in the browser should have a main file (as defined by the "main" property in the library's `package.json` file) with the same name as the library. For example, the

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
