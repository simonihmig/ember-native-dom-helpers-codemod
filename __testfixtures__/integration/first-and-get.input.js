import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('foo-bar', 'Integration | Component | foo bar', {
  integration: true
});

test('transforms first() correctly', function(assert) {
  this.render(hbs`{{foo-bar}}`);

  assert.ok(this.$('.foo').first());

  const otherFirst = someOtherObj.first();
});

test('transforms get() correctly', function(assert) {
  assert.ok(this.$('.foo').get(1));

  const otherGet = someOtherObj.get(1);
});
