const { addImportStatement, createArraySubscriptExpression, createFindAllExpression } = require('../../utils');

const sizzleFunctions = [ 'find', 'click', 'fillIn' ];

/**
 * Check if `node` is a selector function call with an :eq pattern as an argument
 *
 * @param j
 * @param node
 * @returns {*|boolean}
 */
function isAnEqExpression(j, node) {
  return j.CallExpression.check(node)
    && j.Identifier.check(node.callee)
    && sizzleFunctions.includes(node.callee.name)
    && j.Literal.check(node.arguments[0])
    && typeof node.arguments[0].value === 'string'
    && /:eq\(\d+\)$/.test(node.arguments[0].value)
    ;
}

/**
 * Transform `find(selector:eq(#))` to `findAll(selector)[#]`
 * and `click(selector:eq(#))` to `click(findAll(selector)[#])`
 *
 * @param file
 * @param api
 * @returns {*|string}
 */
function transform(file, api) {
  let source = file.source;
  let j = api.jscodeshift;

  let root = j(source);

  let replacements = root
    .find(j.CallExpression)
    .filter(({ node }) => isAnEqExpression(j, node))
    .replaceWith(({ node }) => {
      let [, selector, eqIndex ] = node.arguments[0].value.match(/(.+?):eq\((\d+)\)$/);
      node.arguments[0].value = selector;

      let eqExpression = createArraySubscriptExpression(j, createFindAllExpression(j, node.arguments.slice(0, 1)), +eqIndex);
      if (node.callee.name === 'find') {
        return eqExpression;
      } else {
        node.arguments = [ eqExpression, ...node.arguments.slice(1) ];
        return node;
      }
    })
    ;

  if (replacements.length > 0) {
    addImportStatement(j, root, ['findAll']);
  }

  return root.toSource({ quote: 'single' });
}

module.exports = transform;
