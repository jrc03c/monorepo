# Checklist for converting from CommonJS to ES Module format

> **NOTE:** Pay close attention to the use of `.mjs` and `.cjs` extensions in the instructions that follow.

1. Install `esbuild`, `eslint`, and `prettier`. Configure `eslint`.

2. Create `src` and `dist` directories if they don't already exist, and move all source code into the `src` directory.

3. Rename all files to use either `.mjs` or `.cjs` extensions.

4. In `package.json`, add a `"type": "module"` key-value pair.

5. In `package.json`, add an `"exports"` property defined this way:

```json
{
  "exports": {
    "import": "./dist/lib.import.mjs",
    "require": "./dist/lib.require.cjs"
  }
}
```

(Note that both "import" and "require" point to bundles, not the source code entry point!)

6. In `package.json`, make sure that the `"main"` property points to the CommonJS bundle.

7. For _all_ libraries — including those that will only be used in Node — install `esbuild` and add some or all of these build commands:

```bash
# Node / CommonJS / `require`
npx esbuild src/index.js --bundle --platform=node --outfile=dist/lib.require.cjs

# ESM / `import`
npx esbuild src/index.js --bundle --format=esm --outfile=dist/lib.import.mjs

# Standalone / IIFE
npx esbuild src/index.js --bundle --outfile=dist/lib.standalone.cjs
```

If it makes sense, also add minified bundles using the `--minify` flag.

(See my notes [here](https://ameyama.com/wiki/#/doc/e2f71461022fb54dc7c939dc4bb16ceedf792fd1314cf4b1de20e32bee6240a1) for my reasoning behind these.)

7. Convert all `module.exports` and `require` statements in the source code to `export` and `import` respectively.

> **NOTE:** Importantly, use only named exports and _never_ default exports! That's because default exports are unpleasant to use in CommonJS environments.

8. For libraries that employ unit testing, uninstall `jest` and install my `fake-jest` library.

9. In any web pages rely on scripts from a library, make sure that any `<script>` tags have a `type="module"` attribute-value pair _if_ they point to ESM scripts.

10. Update all documentation!
