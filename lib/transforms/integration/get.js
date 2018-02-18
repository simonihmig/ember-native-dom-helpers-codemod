const {
  createFindAllExpression,
  isJQuerySelectExpression,
  addImportStatement,
  writeImportStatements,
  determineGetIndex
} = require("../../utils");

/**
 * Creates a `findAll(selector)[0]` expression
 *
 * @param j
 * @param findArgs
 * @param indexArg
 * @returns {*}
 */
function createExpression(j, findArgs, indexArg) {
  const index = determineGetIndex(j, indexArg);
  if (index > -1) {
    return j.memberExpression(
      createFindAllExpression(j, findArgs),
      j.literal(index)
    );
  } else {
    return j.memberExpression(
      j.callExpression(
        j.memberExpression(
          createFindAllExpression(j, findArgs),
          j.identifier('slice')
        ),
        [j.identifier(index)]
      ),
      j.literal(0)
    );
  }
}

/**
 * Check if `node` is a `this.$(selector).get(0)` expression
 *
 * @param j
 * @param node
 * @returns {*|boolean}
 */
function isJQueryExpression(j, path) {
  let node = path.node;
  return j.CallExpression.check(node)
    && j.MemberExpression.check(node.callee)
    && isJQuerySelectExpression(j, node.callee.object, path)
    && j.Identifier.check(node.callee.property)
    && node.callee.property.name === 'get';
}

/**
 * Transforms `this.$(selector).get(0)` to `findAll(selector)[0]`
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
    .filter((path) => isJQueryExpression(j, path))
    .replaceWith(({ node }) => createExpression(j, node.callee.object.arguments, node.arguments));

  if (replacements.length > 0) {
    addImportStatement(['findAll']);
  }

  writeImportStatements(j, root);
  return root.toSource({ quote: 'single' });
}

module.exports = transform;
