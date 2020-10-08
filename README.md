<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![cover][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]

# fragment-loader

## Getting Started

To begin, you'll need to install `fragment-loader`:

```console
$ npm install fragment-loader --save-dev
```

<!-- isLoader ? use(this) : delete(isPlugin) -->

Then add the loader to your `webpack` config. For example:

**file.html**

```js
import file from 'file.html';
```

<!-- isLoader ? use(this) : delete(isPlugin) -->

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /.html$/,
        use: [
          {
            loader: `fragment-loader`,
            options: {
              ...options,
            },
          },
        ],
      },
    ],
  },
};
```

And run `webpack` via your preferred method.

## Options

### `esModule`

Type: `boolean`
Default: `false`

Use ES modules syntax

<!-- isLoader ? use(this) : delete(isPlugin) -->

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        loader: `fragment-loader`,
        options: {
          esModule: false,
        },
      },
    ],
  },
};
```

## Examples

To use `fragment-loader` with `html-loader`, you will need another loader to evaluate the return value of `html-loader`, since it returns a javscript module and `fragment-loader` expects only a string. In this example, `"execute-loader"` is an installed loader that runs `eval()` on its content. You can make this loader yourself or find one that does this.

**webpack.config.js**

```js
const path = require('path');
module.exports = {
  module: {
    rules: [
      {
        test: /\.fragment\.html$/,
        use: ['fragment-loader', 'execute-loader', 'html-loader'],
      },
    ],
  },
};
```

**src/file.fragment.html**

```html
<h1>Hello from another file!</h1>
```

**src/index.js**

```js
import fragment from './file.fragment.html';

// ... do whatever with this DocumentFragment,
// such as document.body.appendChild(fragment)
```

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](./.github/CONTRIBUTING.md)

## License

[MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/fragment-loader.svg
[npm-url]: https://npmjs.com/package/fragment-loader
[node]: https://img.shields.io/node/v/fragment-loader.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/fragment-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/fragment-loader
[tests]: https://dev.azure.com/webpack-contrib/fragment-loader/_apis/build/status/webpack-contrib.fragment-loader?branchName=master
[tests-url]: https://dev.azure.com/webpack-contrib/fragment-loader/_build/latest?definitionId=2&branchName=master
[cover]: https://codecov.io/gh/webpack-contrib/fragment-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/fragment-loader
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=fragment-loader
[size-url]: https://packagephobia.now.sh/result?p=fragment-loader
