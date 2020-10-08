import { JSDOM } from 'jsdom';

import compiler from './helpers/compiler';

const jsdom = new JSDOM('<div>hi</div>');
const { window } = jsdom;

global.window = window;
global.document = window.document;

test('Properly loads and inlines HTML file as string', async () => {
  const stats = await compiler('example.html', { esModule: false });
  const output = stats.toJson().modules[0].source;

  expect(output).toMatch(
    new RegExp(String.raw`template.innerHTML = \"<div>hi</div>`)
  );
});

test('Respects esModule preferences', async () => {
  const esFalse = (await compiler('example.html', { esModule: false })).toJson()
    .modules[0].source;
  const esTrue = (await compiler('example.html', { esModule: true })).toJson()
    .modules[0].source;

  expect(esFalse).toMatch('module.exports');
  expect(esTrue).toMatch('export default');
});
// import {
//   compile,
//   execute,
//   getCompiler,
//   getErrors,
//   getWarnings,
//   readAsset,
// } from './helpers';

// describe('loader', () => {
//   it('should work', async () => {
//     const compiler = getCompiler('simple.js');
//     const stats = await compile(compiler);

//     expect(
//       execute(readAsset('main.bundle.js', compiler, stats))
//     ).toMatchSnapshot('result');
//     expect(getErrors(stats)).toMatchSnapshot('errors');
//     expect(getWarnings(stats)).toMatchSnapshot('warnings');
//   });
// });
