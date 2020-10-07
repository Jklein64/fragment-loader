import { getOptions } from 'loader-utils';
import { validate } from 'schema-utils';

const schema = {
  type: 'object',
  properties: {
    esModule: {
      type: 'boolean',
    },
  },
  additionalProperties: false,
};

export const raw = true;

export default function loader(source) {
  const options = getOptions(this) || {};
  const esModule = options.esModule || true;

  const str = JSON.stringify(source)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  validate(schema, options, { name: 'fragment-loader' });

  const newSource = `
    ${
      esModule ? 'export default' : 'module.exports ='
    } (function parseTemplate() {
      const template = document.createElement("template");
      template.innerHTML = ${str};
      return template;
    })()
  `;

  return `${newSource}`;
}
