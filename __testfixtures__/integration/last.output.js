import { findAll } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('foo-bar', 'Integration | Component | foo bar', {
  integration: true
});

test('transforms last() correctly', function(assert) {
  this.render(hbs`{{foo-bar}}`);

  assert.ok(findAll('.foo').slice(-1)[0]);

  const otherLast = someOtherObj.last();
});
