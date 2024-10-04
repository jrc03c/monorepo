const { fg, fx } = require("./packages/bash-colors")
const fs = require("fs")
const fsx = require("./packages/fs-extras")
const progress = require("./packages/progress")

const libraries = fs.readdirSync("packages")

const packageJsons = fsx
  .getFilesDeepSync(".")
  .filter(f => f.endsWith("package.json") && !f.includes("node_modules"))

const deps = []
const versions = {}

progress(packageJsons).forEach(file => {
  const packageJson = JSON.parse(fs.readFileSync(file, "utf8"))
  const name = file.split("/").at(-2)
  versions[name] = packageJson.version

  if (packageJson.dependencies) {
    Object.keys(packageJson.dependencies).forEach(dep => {
      const lib = libraries.find(lib => dep === lib || dep === "@jrc03c/" + lib)

      if (lib) {
        deps.push({ package: name, dependency: lib })
      }
    })
  }

  if (packageJson.devDependencies) {
    Object.keys(packageJson.devDependencies).forEach(dep => {
      const lib = libraries.find(lib => dep === lib || dep === "@jrc03c/" + lib)

      if (lib) {
        deps.push({ package: name, dependency: lib })
      }
    })
  }
})

const sorted = []

while (libraries.length > 0) {
  if (sorted.length === 0) {
    const nodeps = libraries.filter(
      lib => !deps.find(dep => dep.package === lib),
    )

    nodeps.forEach(lib => {
      sorted.push(lib)
      libraries.splice(libraries.indexOf(lib), 1)
    })
  } else {
    const nextlibs = libraries
      .filter(lib =>
        deps
          .filter(dep => dep.package === lib)
          .map(dep => dep.dependency)
          .every(d => sorted.includes(d)),
      )
      .toSorted(
        (a, b) =>
          deps.filter(dep => dep.package === a).length -
          deps.filter(dep => dep.package === b).length,
      )

    if (nextlibs.length > 0) {
      nextlibs.forEach(lib => {
        sorted.push(lib)
        libraries.splice(libraries.indexOf(lib), 1)
      })
    } else {
      break
    }
  }
}

const out = sorted
  .map((lib, i) =>
    [
      i.toString().padStart(sorted.length.toString().length, "0") +
        ") " +
        lib +
        " " +
        `(${versions[lib] || "???"})`,
    ]
      .concat(
        deps
          .filter(d => d.package === lib)
          .map(d => "  - " + d.dependency)
          .toSorted(),
      )
      .join("\n"),
  )
  .join("\n")

console.log(
  out
    .split("\n")
    .map(line => (line.match(/^\d+\)/g) ? fx.bright(fg.yellow(line)) : line))
    .join("\n"),
)

fs.writeFileSync(
  "dependencies-list.md",
  out
    .split("\n")
    .map(line => {
      if (line.match(/^\d+\)/g)) {
        return "# " + line.replace(/^\d+\)/g, "").trim()
      } else {
        return line
      }
    })
    .join("\n"),
  "utf8",
)
