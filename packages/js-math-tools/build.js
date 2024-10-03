import esbuild from "esbuild"

esbuild
  .build({
    bundle: true,
    entryPoints: ["./src/index.js"],
    format: "esm",
    minify: true,
    outfile: "./dist/js-math-tools.js",
  })
  .then(() => {
    console.log("🎉 Built!")
  })
  .catch(e => {
    throw new Error(e)
  })
