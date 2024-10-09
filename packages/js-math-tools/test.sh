npx fake-jest &&
npx madge --circular src/index.mjs &&
npx eslint src &&
echo 'Remember to test coverage as well!'