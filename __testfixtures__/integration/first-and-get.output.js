import { findAll } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('foo-bar', 'Integration | Component | foo bar', {
  integration: true
});

test('transforms first() correctly', function(assert) {
  this.render(hbs`{{foo-bar}}`);

  assert.ok(findAll('.foo')[0]);

  const otherFirst = someOtherObj.first();
});

test('transforms get() correctly', function(assert) {
  assert.ok(findAll('.foo')[1]);

  const otherGet = someOtherObj.get(1);
});
