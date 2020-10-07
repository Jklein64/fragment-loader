import compiler from './helpers/compiler';

test('Properly loads and inlines HTML file as string', async () => {
  const stats = await compiler('example.html');
  const output = stats.toJson().modules[0].source;

  expect(
    output
      .split('\n')
      .map((s) => s.trim())
      .join('')
  ).toBe(
    `
    export default (function parseTemplate() {
      const template = document.createElement("template");
      template.innerHTML = ${JSON.stringify(
        Buffer.from('<div>hi</div>\n').toJSON()
      )};
      return template;
    })()
`
      .split('\n')
      .map((s) => s.trim())
      .join('')
  );
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
