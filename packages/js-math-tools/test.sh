npx fake-jest &&
npx madge --circular src/index.js &&
npx eslint src &&
echo 'Remember to test coverage as well!'