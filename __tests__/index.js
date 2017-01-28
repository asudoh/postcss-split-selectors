'use strict';

const postcss = require('postcss');
const plugin = require('../index.js');

async function run(input, output, opts) {
  const result = await postcss([plugin(opts)]).process(input);
  expect(result.css.trim()).toEqual(output.trim());
  expect(result.warnings().length).toBe(0);
}

it(`Should do nothing if the given selector has only one items`, async () => {
  await run('.foo { color: black; }', '.foo { color: black; }');
});

it(`Should split if the given selector has more than one items`, async () => {
  await run('.foo,.bar { color: black; }', '.foo { color: black; }\n.bar { color: black; }');
});
