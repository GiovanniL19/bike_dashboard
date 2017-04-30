import DS from 'ember-data';
import MF from 'model-fragments';

const {
  attr,
  hasMany
} = DS;

const {
  fragmentArray
} = MF;

export default DS.Model.extend({
  type: attr("string", {defaultValue: 'Order'}),
  transactions: hasMany('transaction', {async: true, defaultValue: []}),
  bikeType: attr("string"),
  parts: fragmentArray("part-fragment")
});
