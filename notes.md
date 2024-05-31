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
