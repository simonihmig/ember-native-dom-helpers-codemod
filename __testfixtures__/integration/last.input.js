import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('foo-bar', 'Integration | Component | foo bar', {
  integration: true
});

test('transforms last() correctly', function(assert) {
  this.render(hbs`{{foo-bar}}`);

  assert.ok(this.$('.foo').last());

  const otherLast = someOtherObj.last();
});
